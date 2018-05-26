import * as React from 'react'
import axios from 'axios'
import { ActionCreators } from '../store/actions'
import { Checkbox, EditableText, Intent } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ITodo } from '../types'

interface IProps {
  todo: ITodo
  updateTodo: (todo: ITodo) => any
  skeleton?: boolean
}

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
          multiline={true}
          intent={Intent.PRIMARY}
        />
      </div>
    )
  }
}

const mapActions = (dispatch: Dispatch) => ({
  updateTodo: (todo: ITodo) => dispatch(ActionCreators.todoUpdated.create(todo)),
})

export default connect(null, mapActions)(Item)
