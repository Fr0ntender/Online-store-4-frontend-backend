import 'react-app-polyfill/ie9'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"

import store from './store/'
import { GlobalStyle } from './styles/global.style'
import RouteHandler from "./router/";

const App = () => (
    <Provider store={store}>
        <GlobalStyle themeColor={true} />
        <RouteHandler />
    </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))