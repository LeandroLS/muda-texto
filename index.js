const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
app.use(express.static('public'))
const port = 80
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('views', './views')
app.get('/', (req, res) => res.render('home.html'))
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))