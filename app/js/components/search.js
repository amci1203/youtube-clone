import React, { Component } from 'react';
import { debounce } from 'lodash';

export default class Search extends Component {

    constructor (props) {
        super(props);
        this.lastChanged = null;

        this.search = this.search.bind(this);
        this.searchNow = this.searchNow.bind(this);
    }

    componentDidMount () {
        this.debounced = debounce(this.search, 2000, { leading: false });
        this.enterListener = e => {
            const
                focused = document.activeElement.tagName,
                { keyCode } = e;
            if (focused.toLowerCase() == 'input' && keyCode == 13) this.searchNow();
        }

        window.addEventListener('keydown', this.enterListener);
    }

    componentWillUnmount () {
        window.removeEventListener('keydown', this.enterListener);
    }

    searchNow () {
        this.debounced.cancel;
        this.search();
    }

    search () {
        this.props.onSearch(this.input.value)
    }

    render () {
        const { searchNow,  debounced } = this
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
                    onClick={searchNow}
                    type='submit'
                >SEARCH</button>
            </div>
        )
    }

}
