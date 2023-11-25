'use client';

import {createTodo} from "@/app/lib/actions";

export default function Button() {

  return (
    <button onClick={() => createTodo(window.prompt("Todo content?") as string)}>Add new todo</button>
  )
}