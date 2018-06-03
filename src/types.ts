export interface ITodo {
  id: number
  text: string
  order: number
  completed: boolean
  tag: string | null
  createdAt: string
  updatedAt: string
}

export interface ITag {
  id: number
  text: string
  createdAt: string
}

export interface IUser {
  id: number
  email: string
  createdAt: string
}
