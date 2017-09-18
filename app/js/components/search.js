import React, { Component } from 'react'
import { debounce } from 'lodash'

import connect from './helpers/connect'
import request from '../actions/request.actions'

class Search extends Component {

    constructor (props) {
        super(props)
        this.lastChanged = null

        this.search = this.search.bind(this)
    }

    componentDidMount () {
        this.debounced = debounce(this.search, 2000, { leading: false })
        this.enterListener = e => {
            const
                focused = document.activeElement.tagName,
                { keyCode } = e
            if (focused == 'INPUT' && keyCode == 13) this.search(true)
        }

        window.addEventListener('keydown', this.enterListener)
    }

    componentWillUnmount () {
        window.removeEventListener('keydown', this.enterListener)
    }

    search (cancel = false) {
        if (cancel) this.debounced.cancel
        this.props.request('SEARCH', this.input.value)
    }

    render () {
        const { search, debounced } = this
        return (
            <div className='header'>
                <input
                    className='header__search'
                    name='search-videos'
                    placeholder='Search...'
                    ref={i => this.input = i}
                    onChange={debounced}
                />
                <button
                    className='header__submit-button'
                    onClick={search}
                    type='submit'
                >SEARCH</button>
            </div>
        )
    }

}

export default connect(null, { request }, Search)