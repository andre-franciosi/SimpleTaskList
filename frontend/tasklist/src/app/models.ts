export type TaskStatus = 0 | 1 | 2

export type TaskItem = {
  id: number
  title: string
  description: string
  status: TaskStatus
}

export type UserItem = {
  id: number
  name: string
  idade: number | null
}