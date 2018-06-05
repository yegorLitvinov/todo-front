import * as React from 'react'
import axios from 'axios'
import Item from './Item'
import SortableWrapper from './SortableWrapper'
import { ActionCreators } from '../store/actions'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IReduxState } from '../store/reducers'
import { ITodo } from '../types'
import { selectActiveTodosList, selectCompletedTodosList } from '../selectors'
import { Tab, Tabs } from '@blueprintjs/core'

const LOREM_STRINGS = [
  'Lorem ipsum dolor sit amet, consectetur elit',
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet',
  'Lorem ipsum dolor sit',
  'Lorem ipsum dolor',
  'Lorem ipsum',
]

enum TabId {
  Active = 'Active',
  Completed = 'Completed',
}

interface IProps {
  todosLoaded: (todos: ITodo[]) => any
  activeTodos: ITodo[]
  completedTodos: ITodo[]
  authenticated: boolean
}

interface IState {
  selectedTabId: TabId
}

class Todo extends React.Component<IProps, IState> {
  state: IState = {
    selectedTabId: TabId.Active,
  }

  componentDidMount() {
    this.getTodos()
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.authenticated !== this.props.authenticated) {
      this.getTodos()
    }
  }

  getTodos() {
    if (this.props.authenticated) {
      axios.get<ITodo[]>('/todos/').then(response => {
        this.props.todosLoaded(response.data)
      })
    } else {
      const todos = Array.from(Array(20).keys()).map(n => ({
        completed: this.state.selectedTabId === TabId.Completed,
        id: n,
        order: n,
        tag: '',
        text: LOREM_STRINGS[Math.floor(Math.random() * LOREM_STRINGS.length)],
        createdAt: '',
        updatedAt: '',
      }))
      this.props.todosLoaded(todos)
    }
  }

  onTabChange = (newTabId: TabId) => this.setState({ selectedTabId: newTabId })

  render() {
    const { selectedTabId } = this.state
    const { activeTodos, completedTodos } = this.props
    const todos = selectedTabId === 'Completed' ? completedTodos : activeTodos
    return (
      <div>
        <Tabs id="TabsExample" selectedTabId={selectedTabId} onChange={this.onTabChange}>
          <Tabs.Expander />
          <Tab id={TabId.Active} title={TabId.Active} panel={<div />} />
          <Tab id={TabId.Completed} title={TabId.Completed} panel={<div />} />
          <Tabs.Expander />
        </Tabs>
        <SortableWrapper todos={todos}>
          <div>
            {todos.map((todo, index) => (
              <Item key={todo.id} index={index} todo={todo} skeleton={!this.props.authenticated} />
            ))}
          </div>
        </SortableWrapper>
      </div>
    )
  }
}

const mapState = (state: IReduxState) => ({
  activeTodos: selectActiveTodosList(state),
  completedTodos: selectCompletedTodosList(state),
  authenticated: state.user !== null,
})

const mapActions = (dispatch: Dispatch) => ({
  todosLoaded: (todos: ITodo[]) => dispatch(ActionCreators.todosLoaded.create(todos)),
})

export default connect(
  mapState,
  mapActions,
)(Todo)
