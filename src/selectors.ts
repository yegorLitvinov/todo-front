import orderBy from 'lodash-es/orderBy'
import values from 'lodash-es/values'
import { createSelector } from 'reselect'
import { IReduxState } from './store/reducers'

export const selectTodos = (state: IReduxState) => state.todos
const selectTodosList = createSelector(selectTodos, todos => orderBy(values(todos), 'order', 'asc'))
export const selectCompletedTodosList = createSelector(selectTodosList, todos =>
  todos.filter(todo => todo.completed),
)
export const selectActiveTodosList = createSelector(selectTodosList, todos =>
  todos.filter(todo => !todo.completed),
)
