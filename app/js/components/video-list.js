import React from 'react';

import toggleVideoSaveStatus from '../actions/saves.actions'
import Item from './video-list-item';

const VideoList = ({ search, saves, match }) => (
    [...search.results, ...saves.videos].length === 0
    ?
        (
            <section className="video-list">
                <h1 className='video-list--placeholder'>No Videos Found.</h1>
            </section>
        )
    :
        (
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
)

const makeThumbnails = (...videos) => videos.map(video => {
    const props = {
        ...video,
        key: video.id,
        toggleSaveState: () => toggleVideoSaveStatus(video)
    }
    return <Item {...props} />
})

const ListSection = ({ heading, videos }) => videos.length === 0 ? null : (
    <section className='video-list__section'>
        <h2 className='video-list__section__heading'>{ heading }</h2>
        <div className='video-list__list'>{ makeThumbnails(...videos) }</div>
    </section>
)

export default connect(VideoList, 'search saves', { toggleVideoSaveStatus })