const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
app.use(express.static('public'))
const port = 3000
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
function wwwRedirect(req, res, next) {
    if(process.env.AMBIENTE == 'production'){
        let host = req.headers.host;
        console.log(req.protocol);
        if (host.slice(0, 4) === 'www.' && (req.protocol === 'http' || req.protocol === 'https')) {
            let newHost = host.slice(4);
            return res.redirect(301, 'https://' + newHost + req.originalUrl);
        } else if (req.protocol === 'http') {
            return res.redirect(301, 'https://' + req.headers.host + req.originalUrl);
        }
    }
    next();
};
app.set('trust proxy', true);
app.use(wwwRedirect);
app.set('views', './views')
app.get('/', (req, res) => res.render('home.html'))
app.listen(port, () => console.log(`Convertexto listening at http://localhost:${port}`))