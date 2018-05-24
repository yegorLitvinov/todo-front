export interface ITodo {
  id: string
  text: string
  order: number
  completed: boolean
  tag: string
}

export interface ITag {
  id: string
  text: string
}

export interface IUser {
  id: string
  email: string
}
