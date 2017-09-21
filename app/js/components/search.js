import React, { Component } from 'react'
import { debounce } from 'lodash'
import PropTypes from 'prop-types'

import connect from './helpers/connect'
import request from '../actions/request.actions'

class Search extends Component {
    static propTypes = {
        request: PropTypes.func
    }

    componentDidMount () {
        this.enterListener = e => {
            const
                focused = document.activeElement.tagName,
                { keyCode } = e
            if (focused == 'INPUT' && keyCode == 13) this.search(true)
        }
        window.addEventListener('keydown', this.enterListener)
    }

    componentWillUnmount = () => window.removeEventListener('keydown', this.enterListener)

    search = () => {
        this.props.request('SEARCH', this.input.value)
    }

    render = () => (
        <div className='header'>
            <input
                className='header__search'
                name='search-videos'
                placeholder='Search...'
                ref={i => this.input = i}
            />
            <button
                className='header__submit-button'
                onClick={this.search}
                type='submit'
            >SEARCH</button>
        </div>
    )

}

export default connect(Search, null, { request })