import React, { Component } from 'react'
import { debounce } from 'lodash'
import PropTypes from 'prop-types'

import connect from './helpers/connect'
import request from '../actions/request.actions'
import types   from '../types'

class Video extends Component {
    static propTypes = {
        video: PropTypes.shape({
            details: PropTypes.shape({
                id          : PropTypes.string,
                title       : PropTypes.string,
                description : PropTypes.string
            }),
            open: PropTypes.bool
        }),
        match: PropTypes.object,
        request: PropTypes.func
    }
    
    // since there's no native events for push/replace state
    // I'll just check if the URL is different from the id param periodically
    // Pretty damn hacky, and it's easy to tell; I tried
    checkUrl = () => {
        const { request, video, match } = this.props
        // console.log(`${video.details.id}, ${match.params.id}`)
        if ( video.details && (match.params.id !== video.details.id) ) {
            request('FETCH_CURRENT_VIDEO', match.params.id)
        }
    }
    
    componentWillMount = () => setTimeout(() => {
        const { request, match } = this.props
        request('FETCH_CURRENT_VIDEO', match.params.id)
    }, 200)

    componentDidMount    = () => {
        this.fixVideoHeight()
        setInterval(this.checkUrl, 1500)
    }
    componentDidUpdate   = () => this.calc()
    componentWillUnmount = () => {
        window.removeEventListener('resize', this.calculateVideoHeight)
        this.clearInterval(this.checkUrl)
    }

    fixVideoHeight () {
        this.calc = () => {
            const
                video       = document.getElementById('current-video'),
                description = document.getElementById('current-video-details'),
                container   = document.getElementById('current-video-container'),
                iframe      = document.getElementById('current-video-iframe')

            if (!video) return

            const
                width  = video.getBoundingClientRect().width,
                height = width * 9 / 16
                
            video.style.height = height + 'px'
            // fix the height of the container
            container.style.height = (description.getBoundingClientRect().height + height) + 'px'
        }

        this.calc()
        const calculateVideoHeight = debounce(this.calc, 300, { leading: false, trailing: true })
        window.addEventListener('resize', calculateVideoHeight)
    }


    render () {
        const
            { match, video } = this.props

        if (!video.open)
            return null
        if (video.error)
            return (<h1>ERROR</h1>)

        const { title, description } = video.details
        
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

export default connect(Video, 'video', { request })