const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f='
const INGREDIENTS_URL = 'www.thecocktaildb.com/images/ingredients/'
const data_div = document.getElementById('data')
const search = document.getElementById('search')
const loading = document.getElementById('loading')
const ingredients_div = document.getElementById('ingredients-div')

let ingredients_list = []
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
            k.setAttribute('class', 'cocktail none')
        } else {
            k.setAttribute('class', 'cocktail')
        }
    }
})

async function get_data() {
    for await (const letter of alphabet) {
        await fetch(BASE_URL + letter)
            .then((response) => response.json())
            .then((data) => {
                if (data.drinks !== null) get_objects(data.drinks)
            })
    }

    await create_ingredients()
    create_list()
}

async function get_objects(data) {
    await data.forEach(async (drink) => {
        create_blocks(drink)
    })
}

async function create_blocks(data) {
    const div = document.createElement('div')
    const h1 = document.createElement('h1')
    const img = document.createElement('img')

    let ingredients = get_ingredients(data)

    img.src = data.strDrinkThumb + '/preview'
    h1.textContent = data.strDrink

    div.dataset.ingredients = ingredients

    div.appendChild(img)
    div.appendChild(h1)

    div.setAttribute('id', data.idDrink)
    div.setAttribute('class', 'cocktail show')
    data_div.appendChild(div)
}

function create_ingredients() {
    ingredients_list = ingredients_list.sort()
    ingredients_list = ingredients_list.splice(1, ingredients_list.length)
    for (const ingredient of ingredients_list) {
        const p = document.createElement('p')

        p.textContent = ingredient

        p.addEventListener('click', (e) => {
            p.classList.toggle('selected')
        })

        p.setAttribute('class', 'ingredient')

        ingredients_div.appendChild(p)
    }
}

function get_ingredients(data) {
    let ingredients = ''
    for (let i = 1; i <= 15; i++) {
        let ingredient = data['strIngredient' + i]
        if (ingredient !== null) {
            ingredients += ingredient + ','

            if (!ingredients_list.includes(ingredient)) {
                ingredients_list.push(ingredient)
            }
            continue
        }
        break
    }
    return ingredients.slice(0, ingredients.length - 1)
}

async function create_list() {
    data_list = document.getElementsByClassName('cocktail')
    search.value = ''
    document.body.removeAttribute('id')
    loading.removeAttribute('id')
    loading.setAttribute('class', 'none')
}

get_data()
