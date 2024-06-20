const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f='
const data_div = document.getElementById('data')

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

async function get_data() {
    alphabet.forEach((letter) => {
        bla(letter)
    })
}

async function bla(letter) {
    await fetch(BASE_URL + letter)
        .then((response) => response.json())
        .then((data) => get_objects(data.drinks))
}

async function get_objects(data) {
    data.forEach((drink) => {
        create_blocks(drink)
    })
}

async function create_blocks(data) {
    const div = document.createElement('div')
    const p = document.createElement('p')
    const h1 = document.createElement('h1')
    const img = document.createElement('img')

    img.src = data.strDrinkThumb
    h1.textContent = data.strDrink
    p.textContent = data.strInstructions

    console.log(data)

    div.appendChild(img)
    div.appendChild(h1)
    div.appendChild(p)

    div.setAttribute('id', data.objectID)
    data_div.appendChild(div)
}

get_data()
