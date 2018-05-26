import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App'
import axios, { AxiosError } from 'axios'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import { ActionCreators } from './store/actions'
import { AppToaster } from './toaster'
import { Intent } from '@blueprintjs/core'
import { IUser } from './types'
import { Provider } from 'react-redux'
import './styles.css'

axios.defaults.baseURL = '/api/v1/'
axios.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    let message = error.message
    if (error.response && error.response.status === 400) {
      const { data } = error.response
      message = Object.keys(data)
        .map(key => `${key}: ${data[key].Tag}`)
        .join('. ')
    } else if (error.response && error.response.status === 401) {
      const action = ActionCreators.logout.create(null)
      store.dispatch(action as any)
    }
    AppToaster.show({ message, intent: Intent.DANGER })
    return Promise.reject(error)
  },
)

const userStr = sessionStorage.getItem('user')
if (userStr) {
  const user = JSON.parse(userStr) as IUser
  const action = ActionCreators.login.create(user)
  store.dispatch(action as any) // typing errors wtf
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
registerServiceWorker()
