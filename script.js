const api_key = '&access_token=a7c8409d03789ad97c959ba39f4a5eeb&format=json'
const BASE_URL = 'https://api.collection.cooperhewitt.org/rest/?'
const TRACES = 'method=cooperhewitt.objects.traces.getList'
const OBJECT_INFO = 'method=cooperhewitt.objects.getInfo'
const data_div = document.getElementById('data')

async function get_data() {
    let traces = await fetch(BASE_URL + TRACES + api_key)
        .then((response) => response.json())
        .then((response) => response.traces)
    get_objects(traces)
}

async function get_objects(traces) {
    await traces.forEach((trace) => {
        let object = fetch(
            BASE_URL + OBJECT_INFO + api_key + '&object_id=' + trace.object_id
        )
            .then((response) => response.json())
            .then((data) => create_blocks(data))
    })
}

async function create_blocks(data) {
    const div = document.createElement('div')
    const p = document.createElement('p')
    const img = document.createElement('img')

    img.src = data.object.images[0].n.url

    p.textContent = data.object.title

    div.appendChild(img)
    div.appendChild(p)

    data_div.appendChild(div)
}

get_data()
