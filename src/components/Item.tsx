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
  todoUpdated: (todo: ITodo) => any
  skeleton?: boolean
}

const DragHandle = SortableHandle((props: { className?: string }) => (
  <Icon icon="drag-handle-vertical" className={props.className} title="Drag item" />
))

class Item extends React.Component<IProps, ITodo> {
  state: ITodo = {
    ...this.props.todo,
  }

  updateTodo = () => {
    axios
      .put<ITodo>(`/todos/${this.state.id}/`, this.state)
      .then(response => this.props.todoUpdated(response.data))
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
          style={{ marginTop: '5px' }}
        />
        <EditableText
          onConfirm={this.updateTodo}
          value={text}
          className={skeletonClassName + (completed ? ' completed' : '') + ' w-100 '}
          onChange={newText => this.setState({ text: newText })}
          multiline={true}
        />
        <DragHandle className={skeletonClassName} />
      </div>
    )
  }
}

const mapActions = (dispatch: Dispatch) => ({
  todoUpdated: (todo: ITodo) => dispatch(ActionCreators.todoUpdated.create(todo)),
})

export default SortableElement(
  connect(
    null,
    mapActions,
  )(Item),
)
