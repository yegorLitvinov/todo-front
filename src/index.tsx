import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App'
import axios, { AxiosError } from 'axios'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import { AppToaster } from './toaster'
import { Intent } from '@blueprintjs/core'
import { Provider } from 'react-redux'
import './index.css'

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
    }
    AppToaster.show({ message, intent: Intent.DANGER })
    return error
  },
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
registerServiceWorker()
