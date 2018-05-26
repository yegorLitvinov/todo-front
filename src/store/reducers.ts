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

export default (state = initialState, action: Action): IReduxState => {
  switch (action.type) {
    case ActionCreators.todosLoaded.type:
      return { ...state, todos: keyBy(action.payload, 'id') }

    case ActionCreators.todoUpdated.type:
      return { ...state, todos: { ...state.todos, [action.payload.id]: action.payload } }

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
