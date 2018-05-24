import * as React from 'react'
import axios from 'axios'
import { ActionCreators } from '../store/actions'
import { Checkbox } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ITodo } from '../types'

interface IProps {
  todo: ITodo
  updateTodo: (todo: ITodo) => any
}

class Item extends React.Component<IProps, ITodo> {
  state: ITodo = {
    ...this.props.todo,
  }

  updateTodo() {
    axios
      .put<ITodo>(`/todos/${this.state.id}/`, this.state)
      .then(response => this.props.updateTodo(response.data))
  }

  render() {
    const { completed } = this.state
    return (
      <div className="todo-item">
        <Checkbox
          large={true}
          checked={completed}
          onChange={() => this.setState({ completed: !completed }, this.updateTodo)}
        />
        <div className={completed ? 'completed' : ''}>{this.state.text}</div>
      </div>
    )
  }
}

const mapActions = (dispatch: Dispatch) => ({
  updateTodo: (todo: ITodo) => dispatch(ActionCreators.todoUpdated.create(todo)),
})

export default connect(null, mapActions)(Item)
