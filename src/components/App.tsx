import * as React from 'react'
import AuthDialog from './AuthDialog'
import Creator from './Creator'
import SortableTodos from './SortableTodos'

export default class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <Creator />
        <SortableTodos />
        <AuthDialog />
      </div>
    )
  }
}
