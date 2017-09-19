import React from 'react';

import connect from './helpers/connect'
import request from '../actions/request.actions'
import Item from './video-list-item';

const VideoList = ({ search, saves, match, request }) => {
    let numVids = 0
    if (Array.isArray(search.results)) {
        numVids += search.results.length
    }
    if (Array.isArray(saves.videos)) {
        numVids += saves.videos.length
    }

    if (!numVids) return (
        <section className="video-list">
            <h1 className='video-list--placeholder'>No Videos Found.</h1>
        </section>
    )
    
    const ListSection = ({ heading, videos }) => !videos || videos.length === 0 ? null : (
        <section className='video-list__section'>
            <h2 className='video-list__section__heading'>{ heading }</h2>
            <div className='video-list__list'>{ makeThumbnails(...videos) }</div>
        </section>
    )

    const makeThumbnails = (...videos) => videos.map(video => {
        const isSaved = saves.videos
        ? saves.videos.map(v => v.id).indexOf(video.id) > -1
        : false
        const props = {
            ...video,
            key: video.id,
            isSaved,
            toggleSaveState: () => request('TOGGLE_SAVE', video)
        }
        return <Item {...props} />
    })

    return (
        <section className='video-list'>
            <ListSection
                heading='Search Results'
                videos={search.results} 
            />
            <ListSection
                heading='Saved Videos'
                videos={saves.videos}
            />
        </section>
    )
}

export default connect(VideoList, 'search saves', { request })