"use server";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {generateClient} from "aws-amplify/api";
import {Schema} from "@/amplify/data/resource";
import {Amplify} from "aws-amplify";
import config from "@/amplifyconfiguration.json";

Amplify.configure(config, {
  ssr: true
});

const client = generateClient<Schema>()

export async function createTodo(content: string = "-") {

  await client.models.Todo.create({
    content,
    done: false,
    priority: 'medium',
    details: '-----------'
  });

  revalidatePath("/");
}

export async function updateTodo(todo: Schema["Todo"]) {

  const r = await client.models.Todo.update({
    ...todo,
    done: !todo.done
  });

  console.log(r);

  revalidatePath("/");
  // redirect("/dashboard/invoices");
}
