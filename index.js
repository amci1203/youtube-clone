const
    fs      = require('fs-extra'),
    express = require('express'),
    static  = require('serve-static'),
    bodyParser = require('body-parser'),
    
    app = express()

let API_KEY

const search = term => new Promise((resolve, reject) => {
    const YT = require('youtube-api-search')
    try {
        YT({ key: 'AIzaSyDbi82FzrzEesB2Ra-LclTEy2M0Ug8pE1k', term }, results => {
            if (results.length === 0)
                resolve('NO RESULTS FOUND')
            
            const videos = results.map((v, i) => {
                const { title, description, thumbnails } = v.snippet
                return {
                    id: v.id.videoId,
                    index: i,
                    title,
                    description,
                    thumbnails
                }
            })

            resolve(videos)
        })
    } catch (e) {
        reject(e.toString())
    }
})

;(async () => {
    try {
        API_KEY = await fs.readFile('key.txt')
        console.log('API_KEY set: %s', API_KEY)
    } catch (e) {
        console.error(e.toString())
    }
})()

app

    .set('port', process.env.PORT || 3000)

    .use(bodyParser.json())
    .use(static(__dirname + '/public', {
        fallthrough: true
    }))

    .post('/search', async (req, res) => {
        console.log(req.body)
        const results = await search(req.body.term)
        res.json(results)
    })

    .listen(app.get('port'), err => {
        if (err) console.error(err.toString());
        else console.log('Listening on port %s', app.get('port'));
    })