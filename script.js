const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=";
const INGREDIENTS_URL = "www.thecocktaildb.com/images/ingredients/";
const data_div = document.getElementById("data");
const search = document.getElementById("search");
const loading = document.getElementById("loading");
const ingredients_div = document.getElementById("ingredients-div");
const ingredients_open = document.getElementById("ingredients");
const ingredients_search = document.getElementById("search-ingredients");
const apply_button = document.getElementById("apply");

let ingredients_list = [];
let ingredients_list_lower = [];
let filter_ingredients = [];
let data_list = [];
let alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];

let searching = false;

// ZOBRAZENI FILTRU PO KLIKNUTI NA TLACITKO INGREDIENCE A NAOPAK
ingredients_open.addEventListener("click", (e) => {
    ingredients_div.classList.toggle("none");
});

// VYHLEDAVANI PODLE JMENA
search.addEventListener("input", (e) => {
    for (const k of data_list) {
        if (
            !k.childNodes[1].textContent
                .toLowerCase()
                .includes(search.value.toLowerCase())
        ) {
            k.setAttribute("class", "cocktail none");
        } else {
            k.setAttribute("class", "cocktail");
        }
    }
});

// APLIKACE FILTRU
apply_button.addEventListener("click", () => {
    ingredients_search.value = "";
    find_ingredients();
    ingredients_div.classList.toggle("none");
    search_by_ingredients();
});

// VYHLEDAVANI INGREDIENCI
ingredients_search.addEventListener("input", find_ingredients);

function find_ingredients() {
    for (const ingredient of ingredients_list) {
        if (
            ingredient.textContent
                .toLowerCase()
                .includes(ingredients_search.value.toLowerCase())
        ) {
            ingredient.classList.remove("none");
        } else {
            ingredient.classList.add("none");
        }
    }
}

// VYHLEDAVANI POMOCI INGREDIENCI
function search_by_ingredients() {
    for (const div of data_list) {
        const ingredients_in_div = div.dataset.ingredients.split(",");
        if (!check_if_subarray(ingredients_in_div)) {
            div.setAttribute("class", "cocktail none");
        } else {
            div.setAttribute("class", "cocktail");
        }
    }
}

// ZJISTENI ZDA JE POLE V JINEM POLI
function check_if_subarray(ingredients_in_div) {
    ingredients_in_div = ingredients_in_div.map((ingredient) =>
        ingredient.toLowerCase(),
    );

    return filter_ingredients.every((ingredient) => {
        return ingredients_in_div.includes(ingredient);
    });
}

// PRIDANI INGREDIENCI DO POLE S FILTREM
function add_ingredient_to_filter(ingredient) {
    ingredient.classList.toggle("selected");

    if (ingredient.classList.contains("selected")) {
        filter_ingredients.push(ingredient.textContent.toLowerCase());
    } else {
        let i = filter_ingredients.indexOf(
            ingredient.textContent.toLowerCase(),
        );
        if (i !== -1) {
            filter_ingredients.splice(i, 1);
        }
    }
}

// VYTVORENI HTML ELEMENTU PRO INGREDIENCE
function create_ingredients() {
    ingredients_list_lower = ingredients_list_lower
        .sort()
        .splice(1, ingredients_list_lower.length);
    for (const ingredient of ingredients_list_lower) {
        const p = document.createElement("p");

        p.textContent = ingredient;

        p.addEventListener("click", () => {
            add_ingredient_to_filter(p);
        });

        p.setAttribute("class", "ingredient");

        ingredients_div.appendChild(p);
    }
}

// ZISKANI DAT Z API
async function get_data() {
    for await (const letter of alphabet) {
        await fetch(BASE_URL + letter)
            .then((response) => response.json())
            .then((data) => {
                if (data.drinks !== null) get_objects(data.drinks);
            });
    }

    await create_ingredients();
    create_list();
}

async function get_objects(data) {
    data.forEach(async (drink) => {
        create_blocks(drink);
    });
}

// VYTVORENI
async function create_blocks(data) {
    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    const img = document.createElement("img");

    let ingredients = get_ingredients(data);

    img.src = data.strDrinkThumb + "/preview";
    h1.textContent = data.strDrink;

    div.dataset.ingredients = ingredients;

    div.appendChild(img);
    div.appendChild(h1);

    div.setAttribute("id", data.idDrink);
    div.setAttribute("class", "cocktail");
    data_div.appendChild(div);
}

// ZISKANI INGREDIENCI Z API
function get_ingredients(data) {
    let ingredients = "";
    for (let i = 1; i <= 15; i++) {
        let ingredient = data["strIngredient" + i];
        if (ingredient !== null) {
            ingredients += ingredient + ",";

            if (!ingredients_list_lower.includes(ingredient.toLowerCase())) {
                ingredients_list_lower.push(ingredient.toLowerCase());
            }
            continue;
        }
        break;
    }
    return ingredients.slice(0, ingredients.length - 1);
}

// VYTVORENI POLE SE VSEMI
async function create_list() {
    data_list = document.getElementsByClassName("cocktail");
    ingredients_list = document.getElementsByClassName("ingredient");
    ingredients_search.value = "";
    search.value = "";
    document.body.removeAttribute("id");
    loading.removeAttribute("id");
    loading.setAttribute("class", "none");
}

get_data();
