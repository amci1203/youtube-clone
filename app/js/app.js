import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router'
import { Provider } from 'react-redux'

import store from './reducers/root.reducer'

import Search from './components/search'

const App = props => (
    <div>
        <Search />
        <div className='wrapper'>
            <h1 style={{textAlign:'center'}}>HELLO WORLD</h1>
        </div>
    </div>
)

render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('app'))