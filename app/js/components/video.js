import React, { Component } from 'react';
import { debounce } from 'lodash';

import connect from './helpers/connect'

class Video extends Component {

    constructor (props) {
        super(props);
    }

    componentWillMount () {
        this.getVideoDetails();
    }

    componentWillUpdate (nextProps) {
        this.getVideoDetails();
    }
    
    componentDidMount () {
        this.fixVideoHeight();
    }

    componentDidUpdate () {
        this.calc()
    }

    fixVideoHeight () {
        this.video       = document.getElementById('current-video');
        this.description = document.getElementById('current-video-details');
        this.container   = document.getElementById('current-video-container');
        this.iframe      = document.getElementById('current-video-iframe');

        this.calc = () => {
            const
                width  = this.video.getBoundingClientRect().width,
                height = width * 9 / 16;
                
            this.video.style.height = height + 'px';

            // fix the height of the container
            this.container.style.height = (this.description.getBoundingClientRect().height + height) + 'px';
        };

        this.calc();

        this.calculateVideoHeight = debounce(this.calc, 300, { leading: false, trailing: true });
        window.addEventListener('resize', this.calculateVideoHeight);
    }

    

    getVideoDetails () {
        if (!window.localStorage.getItem('current-video')) {
            window.localStorage.setItem('current-video', '[]');
        }
        this.details = JSON.parse(window.localStorage.getItem('current-video'));
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.calculateVideoHeight)
    }

    render () {
        const
            { match, video } = this.props,
            { title, description } = this.details;
        return (
            <div controls id='current-video-container' className='current-video'>
                <div id='current-video' className="current-video__video">
                    <iframe
                        id='current-video-iframe'
                        className='current-video__video__iframe'
                        src={'https://youtube.com/embed/' + match.params.id}
                    ></iframe>
                </div>
                <div id='current-video-details' className="current-video__details">
                    <p className='current-video__details__title'>{title}</p>
                    <p className='current-video__details__description'>{description}</p>
                </div>
            </div>
        )
    }
}

export default connect(Video, 'video')