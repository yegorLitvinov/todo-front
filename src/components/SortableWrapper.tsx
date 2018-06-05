import * as React from 'react'
import axios from 'axios'
import { ActionCreators } from '../store/actions'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ITodo } from '../types'
import { SortableContainer, SortEnd } from 'react-sortable-hoc'

interface IProps {
  todoUpdated: (todo: ITodo) => any
  todos: ITodo[]
}

const Inner = (props: { children: React.ReactNode }) => <>{props.children}</>

class SortableWrapper extends React.Component<IProps> {
  onSortEnd = (sort: SortEnd) => {
    if (sort.oldIndex === sort.newIndex) {
      return
    }
    const dstTodo = { ...this.props.todos[sort.newIndex] }
    const srcTodo = { ...this.props.todos[sort.oldIndex] }
    const newTodo = { ...srcTodo, order: dstTodo.order }
    this.props.todoUpdated(newTodo)
    this.updateTodo(newTodo).catch(error => {
      this.props.todoUpdated(srcTodo)
    })
  }

  updateTodo = (todo: ITodo) => {
    return axios.put<ITodo>(`/todos/${todo.id}/`, todo)
  }

  render() {
    const Wrapper = SortableContainer(Inner)
    return (
      <Wrapper onSortEnd={this.onSortEnd} useDragHandle={true}>
        {this.props.children}
      </Wrapper>
    )
  }
}

const mapActions = (dispatch: Dispatch) => ({
  todoUpdated: (todo: ITodo) => dispatch(ActionCreators.todoUpdated.create(todo)),
})

export default connect(
  null,
  mapActions,
)(SortableWrapper)
