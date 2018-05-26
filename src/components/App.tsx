import * as React from 'react'
import AuthDialog from './AuthDialog'
import Creator from './Creator'
import Todos from './Todos'

export default class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <Creator />
        <Todos />
        <AuthDialog />
      </div>
    )
  }
}
