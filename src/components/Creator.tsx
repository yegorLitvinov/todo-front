import * as React from 'react'
import axios, { AxiosError } from 'axios'
import { ActionCreators } from '../store/actions'
import { Button, ControlGroup, InputGroup, Intent } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ITodo } from '../types'

interface IProps {
  updateTodo: (todo: ITodo) => any
}

interface IState {
  isLoading: boolean
  text: string
}

class Creator extends React.Component<IProps, IState> {
  state: IState = {
    isLoading: false,
    text: '',
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ text: event.target.value })

  create = () => {
    const { text } = this.state
    this.setState({ isLoading: true })
    axios
      .post<ITodo>('/todos/', { text })
      .then(response => {
        this.setState({ isLoading: false, text: '' })
        this.props.updateTodo(response.data)
      })
      .catch((error: AxiosError) => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { isLoading, text } = this.state
    return (
      <div>
        <ControlGroup fill={true}>
          <InputGroup
            value={text}
            onChange={this.onChange}
            name="text"
            onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Enter') {
                this.create()
              }
            }}
          />
          <Button
            icon="add"
            style={{ maxWidth: '50px' }}
            intent={Intent.PRIMARY}
            loading={isLoading}
            onClick={this.create}
          />
        </ControlGroup>
      </div>
    )
  }
}

const mapActions = (dispatch: Dispatch) => ({
  updateTodo: (todo: ITodo) => dispatch(ActionCreators.todoUpdated.create(todo)),
})

export default connect(null, mapActions)(Creator)
