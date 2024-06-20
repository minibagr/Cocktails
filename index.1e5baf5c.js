const t = document.getElementById('data'),
    e = document.getElementById('search')
let n = [],
    a = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
    ]
async function c() {
    for await (let t of a)
        await fetch(
            'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=' + t
        )
            .then((t) => t.json())
            .then((t) => {
                null !== t.drinks && o(t.drinks)
            })
    s()
}
async function o(e) {
    await e.forEach(async (e) => {
        !(function (e) {
            let n = document.createElement('div'),
                a = document.createElement('h1'),
                c = document.createElement('img')
            ;(c.src = e.strDrinkThumb),
                (a.textContent = e.strDrink),
                n.appendChild(c),
                n.appendChild(a),
                n.setAttribute('id', e.idDrink),
                n.setAttribute('class', 'coctail show'),
                t.appendChild(n)
        })(e)
    })
}
async function s() {
    ;(n = document.getElementsByClassName('coctail')), console.log('nacteno')
}
e.addEventListener('input', (t) => {
    for (let a of (t.preventDefault(), n))
        a.childNodes[1].textContent
            .toLowerCase()
            .includes(e.value.toLowerCase())
            ? a.setAttribute('class', 'coctail show')
            : a.setAttribute('class', 'coctail none')
}),
    window.addEventListener('load', () => {
        e.value = ''
    }),
    c()
//# sourceMappingURL=index.1e5baf5c.js.map
