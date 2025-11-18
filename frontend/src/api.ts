import axios from 'axios'
import { Task } from './types'

const api = axios.create({ baseURL: '/api' })

export async function fetchTasks(): Promise<Task[]> {
  const res = await api.get<Task[]>('/tasks')
  return res.data
}

export async function fetchTask(id: number): Promise<Task> {
  const res = await api.get<Task>(`/tasks/${id}`)
  return res.data
}

export async function createTask(task: Task): Promise<Task> {
  const res = await api.post<Task>('/tasks', task)
  return res.data
}

export async function updateTask(id: number, task: Task): Promise<Task> {
  const res = await api.put<Task>(`/tasks/${id}`, task)
  return res.data
}

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/tasks/${id}`)
}

export default api
