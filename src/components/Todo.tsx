import * as React from 'react'
import axios from 'axios'
import Creator from './Creator'
import Item from './Item'
import values from 'lodash-es/values'
import { ActionCreators } from '../store/actions'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IReduxState } from '../store/reducers'
import { ITodo } from '../types'
import { Tab, Tabs } from '@blueprintjs/core'

enum TabId {
  Active = 'Active',
  Completed = 'Completed',
}

interface IProps {
  todosLoaded: (todos: ITodo[]) => any
  todos: ITodo[]
}

interface IState {
  selectedTabId: TabId
}

class Todo extends React.Component<IProps, IState> {
  state: IState = {
    selectedTabId: TabId.Active,
  }

  componentDidMount() {
    axios.get<ITodo[]>('/todos/').then(response => {
      this.props.todosLoaded(response.data)
    })
  }

  onTabChange = (newTabId: TabId) => this.setState({ selectedTabId: newTabId })

  render() {
    const { selectedTabId } = this.state
    return (
      <>
        <Creator />
        <Tabs id="TabsExample" selectedTabId={selectedTabId} onChange={this.onTabChange}>
          <Tabs.Expander />
          <Tab id={TabId.Active} title={TabId.Active} panel={<div />} />
          <Tab id={TabId.Completed} title={TabId.Completed} panel={<div />} />
          <Tabs.Expander />
        </Tabs>
        <div>
          {this.props.todos
            .filter(todo => (selectedTabId === TabId.Completed ? todo.completed : !todo.completed))
            .map(todo => <Item key={todo.id} todo={todo} />)}
        </div>
      </>
    )
  }
}

const mapState = (state: IReduxState) => ({
  todos: values(state.todos),
})

const mapActions = (dispatch: Dispatch) => ({
  todosLoaded: (todos: ITodo[]) => dispatch(ActionCreators.todosLoaded.create(todos)),
})

export default connect(mapState, mapActions)(Todo)
