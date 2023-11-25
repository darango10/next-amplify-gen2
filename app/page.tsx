import type {Schema} from '@/amplify/data/resource'
import {generateClient} from 'aws-amplify/api'
import Button from "@/app/ui/CreateButton";
import {updateTodo} from "@/app/lib/actions";
import Todo from "@/app/ui/Todo";
// import {useEffect, useState} from "react";

const client = generateClient<Schema>()

export default async function TodoList() {
  //const [data, setTodos] = useState<Schema["Todo"][]>([])

  // const fetchTodos = async () => {
  const {data, errors} = await client.models.Todo.list({
    selectionSet: ["id", "content", "done", "priority", "details", "createdAt", "updatedAt"],
  })
  //   setTodos(items)
  if (errors) console.error(errors);
  console.log(data)
  // }

  //Sort data based on content
  const sortedTodos = data.sort((a, b) => {
      if (a.content.toLowerCase() < b.content.toLowerCase()) {
        return -1;
      }
      if (a.content.toLowerCase() > b.content.toLowerCase()) {
        return 1;
      }
      return 0;
    }
  )

  // useEffect(() => {
  //   const sub = client.models.Todo
  //     .observeQuery()
  //     .subscribe({
  //       next: ({items}) => {
  //         setTodos([...items])
  //       }
  //     })
  //
  //   return () => sub.unsubscribe()
  // }, [])
  //
  //
  // const createTodo = async () => {
  //   await client.models.Todo.create({
  //     content: window.prompt("Todo content?"),
  //     done: false,
  //     priority: 'low'
  //   })
  // }

  return (
    <div className={"flex flex-col m-5"}>
      {/*<button onClick={createTodo}>Add new todo</button>*/}
      <Button/>
      <div className={'flex flex-row items-center justify-center flex-wrap'}>
        {data.map((todo) => (
          <div className={'m-5'} key={todo.id}>
            <Todo todo={todo}/>
          </div>
        ))}
      </div>
    </div>
  )
}