const
    fs      = require('fs-extra'),
    express = require('express'),
    static  = require('serve-static'),
    bodyParser = require('body-parser'),
    
    app = express()

let API_KEY

const search = term => new Promise(resolve => {
    const YT = require('youtube-api-search')
    
    YT({ key: API_KEY, term }, results => {
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
})

;(async () => {
    try {
        API_KEY = await fs.readFile('key.txt')
    } catch (e) {
        console.error(e.toString())
    }
})()

app

    .set('port', process.env.PORT || 3000)

    .use(bodyParser.urlencoded({ extended: true }))
    .use(static(__dirname + '/public'))

    .post('/search', async (req, res) => {
        res.json(await search(req.body.term))
    })

    .listen(app.get('port'), err => {
        if (err) console.error(err.toString());
        else console.log('Listening on port %s', app.get('port'));
    })