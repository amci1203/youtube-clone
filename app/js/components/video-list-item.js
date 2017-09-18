import React from 'react';
import { Link } from 'react-router-dom';

export default ({ title, id, description, thumbnails, isSaved, toggleSaveState }) => (
    <div className='video-list__item media'>
        <Link to={`/watch/${id}`} className='media__thumbnail'>
            <img src= {(
                window.location.pathname.split('/').indexOf('watch') > -1
                ? thumbnails.default.url
                : thumbnails.medium.url
            )} />
        </Link>
        <div className='media__body'>
            <Link to={`/watch/${id}`} className="media__body__title"><p>{title}</p></Link>
            <p className='media__body__description'>{description}</p>
            <div className='media__body__save-button'>
                { isSaved ? <span>Saved</span> : null }
                <img
                    id='save-star'
                    src='/img/star.png'
                    onClick={toggleSaveState}
                />
            </div>
        </div>
    </div>
)