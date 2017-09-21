import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router'
import { Provider } from 'react-redux'

// All middlewares and such are handled at this path as well
import store from './reducers/root.reducer'

import Search from './components/search'
import Video from './components/video'
import VideoThumbnails from './components/video-list'

const App = props => (
    <div>
        <Search />
        <div className='wrapper'>
            <Route path='/watch/:id' component={ Video } />
            <Route path='/' component={ VideoThumbnails } />
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