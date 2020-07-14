let vue = new Vue({
    el: '#quantidade-caracteres',
    data: {
        text: '',
        textChanged: '',
        font: {
            bold: false,
            italic: false,
            underline: false
        }
    },
    methods: {
        reverseText: function () {
            this.textChanged = this.text.split('').reverse().join('')
        },
        toUpper: function () {
            this.textChanged = this.text.toUpperCase()
        },
        toLower: function () {
            this.textChanged = this.text.toLowerCase()
        },
        capitalized: function () {
            this.textChanged = this.text.split(' ').join(', ').split('\n').join(', ').split(', ')
                .map(el => el.charAt(0).toUpperCase() + el
                    .toLowerCase().slice(1))
                .join(' ')
        },
        alterned: function () {
            this.textChanged = this.text.split('').map((el, idx) => {
                return idx % 2 == 0 ? el.toLowerCase() : el.toUpperCase()
            }).join('')
        },
        title: function () {
            this.textChanged = this.text.split(' ').map(el => {
                if (el.length == 1) {
                    return el.toLowerCase()
                } else {
                    return el.charAt(0).toUpperCase() + el.slice(1)
                }
            }).join(' ')
        },
        invert: function () {
            this.textChanged = this.text.split('').map(el => {
                if (el === el.toUpperCase()) {
                    return el.toLowerCase()
                } else {
                    return el.toUpperCase()
                }
            }).join('')
        },
        apagar: function () {
            this.text = ''
            this.textChanged = ''
        },
        upsideDown: function () {
            this.textChanged = this.text.split('').map(el => {
                var upsideDownCharacter = characters.find(element => Object.keys(element)[
                        0] ===
                    el);
                if (upsideDownCharacter) {
                    return upsideDownCharacter[Object.keys(upsideDownCharacter)]
                } else {
                    return el
                }
            }).join('');
        },
        negrito: function () {
            this.textChanged = this.text
            this.font.bold = true
        },
        italic: function () {
            this.textChanged = this.text
            this.font.italic = true
        },
        underline: function () {
            this.textChanged = this.text
            this.font.underline = true
        }
    },
    computed: {
        qtdCharacters: function () {
            return this.text.split('').length
        },
        qtdWords: function () {
            let wordsArr = this.text.split(' ').join(', ').split('\n').join(', ').split(', ')
            let wordArrCleaned = wordsArr.filter((el, idx) => {
                if (el != ' ' && el !== '' && el.length >= 1) return el
            })
            return wordArrCleaned.length
        },
        qtdLines: function () {
            var count = (this.text.match(/\n/g) || []).length
            return count
        }
    },
    delimiters: ['[[', ']]']
});
