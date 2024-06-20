const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f='
const INGREDIENTS_URL = 'www.thecocktaildb.com/images/ingredients/'
const data_div = document.getElementById('data')
const search = document.getElementById('search')

let data_list = []
let alphabet = [
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

search.addEventListener('input', (e) => {
    e.preventDefault()
    for (let k of data_list) {
        if (
            !k.childNodes[1].textContent
                .toLowerCase()
                .includes(search.value.toLowerCase())
        ) {
            k.setAttribute('class', 'coctail none')
        } else {
            k.setAttribute('class', 'coctail show')
        }
    }
})

function filter_idk(a) {
    console.log(a)
}

async function get_data() {
    for await (const letter of alphabet) {
        await fetch(BASE_URL + letter)
            .then((response) => response.json())
            .then((data) => {
                if (data.drinks !== null) get_objects(data.drinks)
            })
    }

    create_list()
}

async function bla(letter) {}

async function get_objects(data) {
    await data.forEach(async (drink) => {
        create_blocks(drink)
    })
}

function create_blocks(data) {
    const div = document.createElement('div')
    const h1 = document.createElement('h1')
    const img = document.createElement('img')

    img.src = data.strDrinkThumb
    h1.textContent = data.strDrink

    div.appendChild(img)
    div.appendChild(h1)

    div.setAttribute('id', data.idDrink)
    div.setAttribute('class', 'coctail show')
    data_div.appendChild(div)
}

async function create_list() {
    data_list = document.getElementsByClassName('coctail')
    console.log('nacteno')
}

window.addEventListener('load', () => {
    search.value = ''
})

get_data()
