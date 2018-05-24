import * as React from 'react'
import axios, { AxiosError } from 'axios'
import { Button, ControlGroup, InputGroup, Intent } from '@blueprintjs/core'
import { ITodo } from '../types'

interface IState {
  isLoading: boolean
  text: string
}

export default class Creator extends React.Component<{}, IState> {
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
          <InputGroup value={text} onChange={this.onChange} />
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
