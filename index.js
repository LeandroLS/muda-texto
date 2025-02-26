const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
app.use(express.static('public'))
let inDevelopment = function(){
    if (process.env.AMBIENTE == 'development'){
        return true;
    } else {
        return false;
    }
}();
app.locals.projectURL = inDevelopment ? 'localhost:3000' : 'convertexto.com';
const port = 3000
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
function wwwRedirect(req, res, next) {
    if(!inDevelopment){
        let host = req.headers.host;
        if (host.slice(0, 4) === 'www.' && (req.protocol === 'http' || req.protocol === 'https')) {
            let newHost = host.slice(4);
            return res.redirect(301, 'https://' + newHost + req.originalUrl);
        } else if (req.protocol === 'http') {
            return res.redirect(301, 'https://' + req.headers.host + req.originalUrl);
        }
    }
    next();
};
languages = require('./languages')
app.set('trust proxy', true);
app.use(wwwRedirect);
app.set('views', './views')

app.get('/gera-e-valida-cpf', (req, res) => {
    return res.render('pt-br/cpf.html', { language: languages.pt })
});

app.get('/:country?', (req, res) => {
    if(req.params.country){
        let pais = req.params.country
        let countryText = Object.keys(languages).filter(el => {
            return el == pais
        });
        if(countryText.length >= 1){
            return res.render(pais+'/index.html', { language: languages[countryText] })
        }
    }
    return res.render('pt-br/index.html', { language: languages.pt})
});
app.listen(port, () => console.log(`Convertexto listening at http://localhost:${port}`))