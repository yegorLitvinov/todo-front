import keyBy from 'lodash-es/keyBy'
import { Action, ActionCreators } from './actions'
import { ITag, ITodo, IUser } from '../types'

export interface IReduxState {
  user: IUser | null
  todos: { [id: string]: ITodo }
  tags: { [id: string]: ITag }
}

const initialState: IReduxState = {
  user: null,
  todos: {},
  tags: {},
}

const reorderTodos = (todos: { [id: string]: ITodo }, newTodo: ITodo) => {
  const oldTodo = todos[newTodo.id]
  const [oldOrder, newOrder] = [oldTodo.order, newTodo.order]
  const [minOrder, maxOrder] = oldOrder < newOrder ? [oldOrder, newOrder] : [newOrder, oldOrder]
  const sign = oldOrder < newOrder ? -1 : 1
  Object.keys(todos)
    .filter(id => todos[id].order >= minOrder && todos[id].order <= maxOrder)
    .forEach(id => {
      if (todos[id].order === oldOrder) {
        todos[id].order = newOrder
      } else {
        todos[id].order += sign
      }
    })
}

export default (state = initialState, action: Action): IReduxState => {
  switch (action.type) {
    case ActionCreators.todosLoaded.type:
      return { ...state, todos: keyBy(action.payload, 'id') }

    case ActionCreators.todoUpdated.type:
      const todos = { ...state.todos }
      const newTodo = action.payload
      const oldTodo = todos[newTodo.id]
      if (oldTodo && oldTodo.order !== newTodo.order) {
        reorderTodos(state.todos, newTodo)
      }
      return { ...state, todos: { ...state.todos, [newTodo.id]: newTodo } }

    case ActionCreators.login.type:
      sessionStorage.setItem('user', JSON.stringify(action.payload))
      return { ...initialState, user: action.payload }

    case ActionCreators.logout.type:
      sessionStorage.removeItem('user')
      return initialState

    default:
      return state
  }
}
