"use client"
import type {Schema} from '@/amplify/data/resource'
import {generateClient} from 'aws-amplify/api'
// import { client } from '@/utils/data' // Uncomment this if you want to use the imported client instead
import {Amplify} from 'aws-amplify';
import config from '@/amplifyconfiguration.json';
import {useEffect, useState} from "react";

Amplify.configure(config);
const client = generateClient<Schema>()

export default function TodoList() {
  const [todos, setTodos] = useState<Schema["Todo"][]>([])

  const fetchTodos = async () => {
    const {data: items, errors} = await client.models.Todo.list()
    setTodos(items)
    console.log(items)
  }

  useEffect(() => {
    const sub = client.models.Todo
      .observeQuery()
      .subscribe({
        next: ({items}) => {
          setTodos([...items])
        }
      })

    return () => sub.unsubscribe()
  }, [])


  const createTodo = async () => {
    await client.models.Todo.create({
      content: window.prompt("Todo content?"),
      done: false,
      priority: 'low'
    })
  }

  return (
    <div>
      <button onClick={createTodo}>Add new todo</button>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.content}</p>
          <p>{todo.priority}</p>
          <p>{todo.done}</p>
        </div>
      ))}
    </div>
  )
}