import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

ListItem.propTypes = {
    title           : PropTypes.string.isRequired,
    id              : PropTypes.string.isRequired,
    description     : PropTypes.string.isRequired,
    thumbnails      : PropTypes.object.isRequired,
    isSaved         : PropTypes.bool.isRequired,
    toggleSaveState : PropTypes.func.isRequired,
    setActiveVideo  : PropTypes.func.isRequired
}

export default function ListItem ({ title, id, description, thumbnails, isSaved, toggleSaveState, setActiveVideo }) {
    const
        href = '/watch/' + id,
        videoActive = window.location.pathname.includes('/watch/'),
        thumbnail = videoActive ? thumbnails.default.url : thumbnails.medium.url,
        savedSpan = isSaved ? <span>Saved</span> : null

    let cls = 'video-list__item'
    if (videoActive) cls = `${cls} ${cls}--aside`
    cls += ' media'
    
    const VidLink = ({ className, children }) => (
        <Link
            to={ href }
            className={ className }
            onClick={ setActiveVideo }
        >{ children }</Link>
    )

    const titleLimit = 32
    let _title = title
    if (videoActive && title.length > titleLimit)
        _title = title.substring(0, titleLimit) + '...'
    
    return (
        <div className={ cls }>
            <VidLink className='media__thumbnail'><img src= { thumbnail } /></VidLink>
            <div className='media__body'>
                <VidLink className='media__body__title'>{ _title }</VidLink>
                <p className='media__body__description'>{ description }</p>
                <div className='media__body__save-button'>
                    { savedSpan }
                    <img
                        id='save-star'
                        src='/img/star.png'
                        onClick={toggleSaveState}
                    />
                </div>
            </div>
        </div>
    )
}