export interface ITodo {
  id: string
  text: string
  order: number
  completed: boolean
  tag: string | null
  createdAt: string
  updatedAt: string
}

export interface ITag {
  id: string
  text: string
  createdAt: string
}

export interface IUser {
  id: string
  email: string
  createdAt: string
}
