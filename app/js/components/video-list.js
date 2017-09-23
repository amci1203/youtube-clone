import React, { Component } from 'react'
import PropTypes from 'prop-types'

import connect from './helpers/connect'
import request from '../actions/request.actions'
import Item from './video-list-item'

class VideoList extends Component {
    static propTypes = {
        match   : PropTypes.object,
        request : PropTypes.func,
        saves   : PropTypes.shape({
            videos: PropTypes.arrayOf(PropTypes.object)
        }),
        search  : PropTypes.shape({
            term    : PropTypes.string,
            results : PropTypes.arrayOf(PropTypes.object)
        })
    }

    componentWillMount () {
        const { request } = this.props
        setTimeout(() => {
            request('FETCH_LAST_SEARCH_RESULTS')
            request('FETCH_SAVES')
        }, 200)
    }

    render () {
        const { search, saves, match, request } = this.props

        if (!search.results.length && !saves.videos.length) return (
            <section className="video-list">
                <h1 className='video-list--placeholder'>No Videos Found.</h1>
            </section>
        )
        
        const ListSection = ({ heading, videos }) => videos.length ? (
            <section className='video-list__section'>
                <h2 className='video-list__section__heading'>{ heading }</h2>
                <div className='video-list__list'>{ makeThumbnails(...videos) }</div>
            </section>
        ) : null

        const makeThumbnails = (...videos) => videos.map(video => {
            const isSaved = saves.videos
            ? saves.videos.map(v => v.id).indexOf(video.id) > -1
            : false
            const props = {
                ...video,
                key: video.id,
                isSaved,
                toggleSaveState: () => request('TOGGLE_SAVE', video),
                setActiveVideo: () => request('ADD_VIDEO_TO_HISTORY', video)
            }
            return <Item { ...props } />
        })

        let cls = 'video-list'
        if (window.location.pathname.includes('/watch/'))
            cls = cls + ` ${cls}--aside`

        return (
            <section className={ cls }>
                <ListSection
                    heading={ `Results for "${search.term}"` }
                    videos={ search.results } 
                />
                <ListSection
                    heading='Saved Videos'
                    videos={ saves.videos }
                />
            </section>
        )
    }
}

export default connect(VideoList, 'search saves', { request })