import * as React from 'react'
import axios from 'axios'
import { ActionCreators } from '../store/actions'
import { Button, ControlGroup, Dialog, InputGroup } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IReduxState } from '../store/reducers'
import { IUser } from '../types'

interface IProps {
  authenticated: boolean
  login: (user: IUser) => any
}

interface IState {
  email: string
  password: string
}

class AuthDialog extends React.Component<IProps, IState> {
  state: IState = {
    email: '',
    password: '',
  }

  login = () => {
    axios.post<IUser>('/auth/login/', this.state).then(response => {
      this.props.login(response.data)
    })
  }

  render() {
    return (
      <Dialog
        icon="inbox"
        isOpen={!this.props.authenticated}
        isCloseButtonShown={false}
        canOutsideClickClose={false}
        canEscapeKeyClose={false}
        title="Login"
      >
        <div className="pt-dialog-body">
          <ControlGroup fill={true} vertical={true}>
            <InputGroup
              leftIcon="unlock"
              placeholder="Email"
              name="email"
              large={true}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ email: event.target.value })
              }
            />
            <InputGroup
              leftIcon="panel-stats"
              placeholder="Password"
              type="password"
              name="password"
              large={true}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ password: event.target.value })
              }
            />
            <Button icon="user" large={true} onClick={this.login}>
              Login
            </Button>
          </ControlGroup>
        </div>
      </Dialog>
    )
  }
}

const mapState = (state: IReduxState) => ({
  authenticated: state.user !== null,
})

const mapActions = (dispatch: Dispatch) => ({
  login: (user: IUser) => dispatch(ActionCreators.login.create(user)),
})

export default connect(mapState, mapActions)(AuthDialog)
