import { ActionCreator } from 'react-redux-typescript'
import { ITodo } from '../types'

export const ActionCreators = {
  todosLoaded: new ActionCreator<'TODOS_LOADED', ITodo[]>('TODOS_LOADED'),
  todoUpdated: new ActionCreator<'TODO_UPDATED', ITodo>('TODO_UPDATED'),
}

export type Action = typeof ActionCreators[keyof typeof ActionCreators]
