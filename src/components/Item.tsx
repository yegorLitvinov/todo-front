import * as React from 'react'
import axios from 'axios'
import { ActionCreators } from '../store/actions'
import { Checkbox, EditableText, Icon } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ITodo } from '../types'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'

interface IProps {
  todo: ITodo
  updateTodo: (todo: ITodo) => any
  skeleton?: boolean
}

const DragHandle = SortableHandle((props: { className?: string }) => (
  <Icon icon="drag-handle-vertical" className={props.className} />
))

class Item extends React.Component<IProps, ITodo> {
  state: ITodo = {
    ...this.props.todo,
  }

  updateTodo = () => {
    axios
      .put<ITodo>(`/todos/${this.state.id}/`, this.state)
      .then(response => this.props.updateTodo(response.data))
  }

  render() {
    const { completed, text } = this.state
    const skeletonClassName = this.props.skeleton ? 'pt-skeleton' : ''
    return (
      <div className="todo-item">
        <Checkbox
          large={true}
          checked={completed}
          onChange={() => this.setState({ completed: !completed }, this.updateTodo)}
          className={skeletonClassName}
        />
        <EditableText
          onConfirm={this.updateTodo}
          value={text}
          className={skeletonClassName + (completed ? ' completed' : '')}
          onChange={newText => this.setState({ text: newText })}
        />
        <DragHandle className={skeletonClassName} />
      </div>
    )
  }
}

const mapActions = (dispatch: Dispatch) => ({
  updateTodo: (todo: ITodo) => dispatch(ActionCreators.todoUpdated.create(todo)),
})

export default SortableElement(connect(null, mapActions)(Item))
