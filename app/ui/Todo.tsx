'use client';

import {Schema} from "@/amplify/data/resource";
import {updateTodo} from "@/app/lib/actions";

export default function Todo({todo}: { todo: Schema["Todo"] }) {

  return (
    <div className={'flex flex-col p-5 bg-red-200 text-black items-center justify-between'}>
      <p>{todo.content}</p>
      <p>{todo.priority}</p>
      <p className={'cursor-pointer'} onClick={() => updateTodo(todo)}>{String(todo.done)}</p>
      <hr/>
    </div>
  )
}