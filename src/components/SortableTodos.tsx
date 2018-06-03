import * as React from 'react'
import axios from 'axios'
import Todos from './Todos'
import { ActionCreators } from '../store/actions'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ITodo } from '../types'
import { SortableContainer, SortEnd } from 'react-sortable-hoc'

interface IProps {
  todoUpdated: (todo: ITodo) => any
}

class SortableTodos extends React.Component<IProps> {
  onSortEnd = (sort: SortEnd) => {
    console.log(sort.oldIndex, ' -> ', sort.newIndex, sort.collection)
    if (sort.newIndex === sort.oldIndex) {
      return
    }
    axios
      .post<ITodo>('/todos/reorder/', {
        newOrder: sort.newIndex,
        oldOrder: sort.oldIndex,
      })
      .then(response => {
        this.props.todoUpdated(response.data)
      })
      .catch(error => {
        // this.props.todoUpdated()
      })
  }

  render() {
    const Wrapper = SortableContainer(Todos)
    return <Wrapper onSortEnd={this.onSortEnd} useDragHandle={true} />
  }
}

const mapActions = (dispatch: Dispatch) => ({
  todoUpdated: (todo: ITodo) => dispatch(ActionCreators.todoUpdated.create(todo)),
})

export default connect(null, mapActions)(SortableTodos)
