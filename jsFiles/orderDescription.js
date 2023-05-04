const arr = []
const val = new URLSearchParams(window.location.search)
window.onload = async () => {
    const response2 = await fetch(`http://localhost:3000/order/Ship/${val.get('id')}`)
    const respo2 = await response2.json()
    const response = await fetch(`http://localhost:3000/order/single/${val.get('id')}`)
    const respo = await response.json()
    const head = document.querySelector('.ShipDate')
    let obj = new Date(respo2.date)
    if (obj > new Date()) {
        head.classList.add = "text-danger"
        head.innerHTML = "pending"
    }
    else {
        head.classList.add = "text-success"
        head.innerHTML = "delivered"
    }
    for (i in respo)
        arr.push(new item(respo[i].id, respo[i].name, respo[i].catId, respo[i].image, respo[i].price, respo[i].count, respo[i].description))
    fillCart(arr)
}

const getTotalPrice = () => {
    let sum = 0
    for (var i in arr)
        sum = sum + (arr[i].price * arr[i].count)
    return sum
}

const fillCart = (arr) => {
    const arr2 = []
    const parent = document.querySelector('.m-auto')
    for (var i in arr) {
        arr2.length = 0
        let div = document.createElement('div')
        div.className = "row my-4 container text-center"
        for (var j = 0; j < 4; j++) {
            const div2 = document.createElement('div')
            arr2.push(div2)
            arr2[j].className = "col-4 d-flex align-items-center text-center"
        }
        const div2 = document.createElement('div')
        const img = document.createElement('img')
        img.src = arr[i].image
        img.className = "w-75"
        div2.append(img)
        arr2[0].append(div2)
        const heading = document.createElement('h4')
        heading.className = "text-center"
        heading.innerHTML = arr[i].name
        arr2[1].append(heading)
        const heading2 = document.createElement('h4')
        heading2.className = "text-center"
        heading2.innerHTML = `${arr[i].price}*${arr[i].count}=${arr[i].price * arr[i].count}`
        arr2[2].append(heading2)

        div.append(arr2[0])
        div.append(arr2[1])
        div.append(arr2[2])
        parent.append(div)
    }
    let priceTotal = []
    for (var k = 0; k < 2; k++) {
        const div = document.createElement('div')
        priceTotal.push(div)
        priceTotal[k].className = "col-6"
    }
    let div2 = document.createElement('div')
    div2.className = "row my-4 container text-center"
    const heading = document.createElement('h1')
    const heading2 = document.createElement('h1')
    heading.innerHTML = "TOTAL =" + getTotalPrice()
    priceTotal[1].append(heading)
    priceTotal[0].append(heading2)

    for (var i in priceTotal)
        div2.append(priceTotal[i])
    parent.append(div2)
}

