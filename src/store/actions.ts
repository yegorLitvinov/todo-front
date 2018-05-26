import { ActionCreator } from 'react-redux-typescript'
import { ITodo, IUser } from '../types'

export const ActionCreators = {
  todosLoaded: new ActionCreator<'TODOS_LOADED', ITodo[]>('TODOS_LOADED'),
  todoUpdated: new ActionCreator<'TODO_UPDATED', ITodo>('TODO_UPDATED'),
  login: new ActionCreator<'AUTH_LOGIN', IUser>('AUTH_LOGIN'),
  logout: new ActionCreator<'AUTH_LOGOUT', null>('AUTH_LOGOUT'),
}

export type Action = typeof ActionCreators[keyof typeof ActionCreators]
