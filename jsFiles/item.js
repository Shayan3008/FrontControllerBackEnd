const resp = window.localStorage.getItem('user')
let valueOfResp
const logOut = document.querySelector('.logOut')
logOut.addEventListener('click', () => {


    window.localStorage.clear()
    window.location.href = 'http://127.0.0.1:5500/login.html'

})
if (resp != null) {
    valueOfResp = JSON.parse(resp)
    console.log(valueOfResp[0].id)
}
const arr = []
const category = []
const favourite2 = []
const cart = []
const count = document.querySelector('.cart-counter')
const checkFavourite = (obj1) => {
    let success = false
    if (favourite2.length !== 0) {
        for (var i in favourite2) {
            if (obj1.id === favourite2[i].id && obj1.catId === favourite2[i].catId) {
                success = true
                break;
            }
        }
    }
    if (success)
        return "fas fa-heart fa-2x"
    return "far fa-heart fa-2x"
}

// POPULATING THE ITEMS
window.addEventListener("load", async () => {
    const temp = window.localStorage.getItem('cart')
    if (temp != null) {
        const temp2 = JSON.parse(temp)
        for (var k in temp2)
            cart.push(temp2[k])
        count.innerHTML = cart.length
    }
    const response1 = await fetch("http://localhost:3000/category", {
        headers: { 'Access-Control-Allow-Origin': '*', }
    })
    const respo1 = await response1.json()
    for (i in respo1)
        category.push(new Category(respo1[i].catId, respo1[i].catName))


    const response = await fetch("http://localhost:3000/item")
    const respo = await response.json()

    for (i in respo)
        arr.push(new item(respo[i].id, respo[i].name, respo[i].catId, respo[i].image, respo[i].price, 1, respo[i].description))



    const parent = document.querySelector('.category')
    for (i in category) {
        const option = document.createElement('option')
        option.value = category[i].catId
        option.innerHTML = category[i].catName
        parent.append(option)
    }
    fillCards(arr)


})

const fillCards = async (arr) => {
    favourite2.splice(0, favourite2.length)
    const response2 = await fetch("http://localhost:3000/item/favourite/" + valueOfResp[0].id)
    if (response2.status === 200) {
        const respo2 = await response2.json()

        for (i in respo2)
            favourite2.push(new item(respo2[i].id, respo2[i].name, respo2[i].catId, respo2[i].image, respo2[i].price, 1, respo2[i].description))
    }
    for (var i in arr) {

        const parent = document.querySelector('.parent')
        const ele1 = document.createElement('div')
        ele1.className = "card col-4 col-lg-3 mx-2 my-2"

        ele1.style.width = "18rem"
        const image = document.createElement('img')
        image.src = "https://media.istockphoto.com/photos/mens-shirt-picture-id488160041?k=20&m=488160041&s=612x612&w=0&h=OH_-skyES8-aeTvDQHdVDZ6GKLsqp6adFJC8u6O6_UY="
        image.className = "card-img-top"
        const buttonParent = document.createElement('button')
        buttonParent.className = "border-0 bg-light"
        buttonParent.value = i
        buttonParent.onclick = (e) => {
            let y = `http://127.0.0.1:5500/description.html?id=${arr[e.currentTarget.value].id}&catId=${arr[e.currentTarget.value].catId}`
            console.log(y)
            window.location.href = y
        }
        buttonParent.append(image)
        const body = document.createElement('div')
        body.className = "card-body"
        const divRow1 = document.createElement('div')
        divRow1.className = "row"
        const htitle = document.createElement('h5')
        htitle.className = "card-title col-4"
        htitle.innerHTML = "TITLE:"
        const h1 = document.createElement('h5')
        h1.className = "card-title col-4"
        h1.innerHTML = arr[i].name
        divRow1.append(htitle)
        divRow1.append(h1)
        const divRow2 = document.createElement('div');
        divRow2.className = "row"
        const ForPrice = document.createElement('h5')
        ForPrice.className = "card-price col-4"
        ForPrice.innerHTML = "PRICE:"
        const p = document.createElement('p')
        p.className = "card-text col-4"
        p.innerHTML = arr[i].price
        divRow2.append(ForPrice)
        divRow2.append(p)
        body.append(divRow1)
        body.append(divRow2)
        ele1.append(buttonParent)
        ele1.append(body)
        const iconDiv = document.createElement('div')
        iconDiv.className = 'd-flex justify-content-around'

        const im = document.createElement("i");
        im.className = checkFavourite(arr[i])
        const buttonIcon = document.createElement('button')
        buttonIcon.className = "btn btn-primary buttonIcon"
        buttonIcon.value = i
        buttonIcon.innerHTML = "Add to favourite"
        iconDiv.append(im)
        iconDiv.append(buttonIcon)
        ele1.append(iconDiv)
        const button = document.createElement('button')
        button.value = i
        button.className = 'btn btn-primary my-1'
        button.innerHTML = 'Add to cart'
        button.onclick = (e) => {
            addToCart(arr[e.currentTarget.value])
        }
        ele1.append(button)
        parent.append(ele1)
    }
    const favourite = document.querySelectorAll('.buttonIcon')
    const empty_heart_icon1 = document.querySelectorAll('.fa-2x')
    for (var i = 0; i < favourite.length; i++) {
        favourite[i].addEventListener('click', async (e) => {
            e.preventDefault()

            let index = e.currentTarget.value
            console.log(arr[index].id, arr[index].catId)
            if (empty_heart_icon1[index].classList.contains('far')) {


                const response = await fetch('http://localhost:3000/favourite', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "userId": valueOfResp[0].id,
                        "catId": arr[e.currentTarget.value].catId,
                        "productId": arr[e.currentTarget.value].id
                    })
                })
                if (response.status == 200) {
                    empty_heart_icon1[index].classList.remove('far')
                    empty_heart_icon1[index].classList.remove('fa-heart')
                    empty_heart_icon1[index].className = 'fas fa-heart fa-2x'
                }
                else {
                    alert('server Error')
                }
            }
            else {
                console.log('Shayan')
                const response = await fetch('http://localhost:3000/deleteFavourite', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "userId": valueOfResp[0].id,
                        "catId": arr[e.currentTarget.value].catId,
                        "productId": arr[e.currentTarget.value].id
                    })
                })
                if (response.status === 200) {
                    empty_heart_icon1[index].classList.remove('fas')
                    empty_heart_icon1[index].classList.remove('fa-heart')
                    empty_heart_icon1[index].className = 'far fa-heart fa-2x'
                }
                else {
                    alert('server down')
                }
            }

        })
    }
}

const counts = document.querySelector('.change-cart')

count.innerHTML = cart.length

const addToCart = (obj) => {


    let present = false
    if (cart.length == 0) {
        cart.push(obj)
        count.innerHTML = cart.length
        return
    }
    for (var i = 0; i < cart.length; i++) {

        if (cart[i].id === obj.id) {

            if (cart[i].catId === obj.catId) {
                console.log('correct')
                present = true
                cart[i].count += 1
                break
            }
        }
    }
    if (!present)
        cart.push(obj)

    count.innerHTML = cart.length


}


counts.addEventListener('click', (e) => {
    window.localStorage.setItem('cart', JSON.stringify(cart))
    window.location.href = "http://127.0.0.1:5500/cart.html"
})

const select = document.querySelector('.filter')
const select2 = document.querySelector('.category')
select.onchange = async () => {
    let val = select.value
    if (val === 'select') {
        const respo = await fetch(`http://localhost:3000/item`)
        const response = await respo.json()
        const card = document.querySelectorAll('.card')
        arr.splice(0, arr.length)

        for (i in response)
            arr.push(new item(response[i].id, response[i].name, response[i].catId, response[i].image, response[i].price, 1, response[i].description))
        for (var i = 0; i < card.length; i++)
            card[i].remove()
        fillCards(arr)
    }
    else if (val == 3 && select2.value == 'category') {
        const card = document.querySelectorAll('.card')
        const response = await fetch("http://localhost:3000/priceSort")
        const respo = await response.json()
        arr.splice(0, arr.length)

        for (i in respo)
            arr.push(new item(respo[i].id, respo[i].name, respo[i].catId, respo[i].image, respo[i].price, 1, respo[i].description))
        for (var i = 0; i < card.length; i++)
            card[i].remove()
        setTimeout(() => {
            fillCards(arr)
        }, 1500);


    }
    else if (val == 3) {
        const card = document.querySelectorAll('.card')
        const response = await fetch(`http://localhost:3000/priceSort/${select2.value}`)
        const respo = await response.json()

        arr.splice(0, arr.length)

        for (i in respo)
            arr.push(new item(respo[i].id, respo[i].name, respo[i].catId, respo[i].image, respo[i].price, 1, respo[i].description))
        for (var i = 0; i < card.length; i++)
            card[i].remove()
        setTimeout(() => {
            fillCards(arr)
        }, 1500);
    }
    else if (val == 2) {
        const card = document.querySelectorAll('.card')
        const response = await fetch(`http://localhost:3000/item/favourite/${valueOfResp[0].id}`)
        const respo = await response.json()

        arr.splice(0, arr.length)

        for (i in respo)
            arr.push(new item(respo[i].id, respo[i].name, respo[i].catId, respo[i].image, respo[i].price, 1, respo[i].description))
        for (var i = 0; i < card.length; i++)
            card[i].remove()
        setTimeout(() => {
            fillCards(arr)
        }, 1500);
    }
    else if (val == 1) {
        const response = await fetch("http://localhost:3000/item")
        const respo = await response.json()
        arr.splice(0, arr.length)
        for (i in respo)
            arr.push(new item(respo[i].id, respo[i].name, respo[i].catId, respo[i].image, respo[i].price, 1, respo[i].description))
        for (var i = 0; i < card.length; i++)
            card[i].remove()
        setTimeout(() => {
            fillCards(arr)
        }, 1500);
    }
}

select2.onchange = async () => {
    select.value = 'select'
    if (select2.value !== 'category') {
        const respo = await fetch(`http://localhost:3000/item/${select2.value}`)
        const response = await respo.json()
        const card = document.querySelectorAll('.card')
        arr.splice(0, arr.length)

        for (i in response)
            arr.push(new item(response[i].id, response[i].name, response[i].catId, response[i].image, response[i].price, 1, response[i].description))
        for (var i = 0; i < card.length; i++)
            card[i].remove()
        fillCards(arr)
    }
    else {
        const respo = await fetch(`http://localhost:3000/item`)
        const response = await respo.json()
        const card = document.querySelectorAll('.card')
        arr.splice(0, arr.length)

        for (i in response)
            arr.push(new item(response[i].id, response[i].name, response[i].catId, response[i].image, response[i].price, 1, response[i].description))
        for (var i = 0; i < card.length; i++)
            card[i].remove()
        fillCards(arr)
    }

}


const search = document.querySelector('.search')
const search_content = document.querySelector('.search-content')

search.addEventListener('click', async (e) => {
    let temp = []
    e.preventDefault()
    if (search_content.value == "") {
        const respo = await fetch(`http://localhost:3000/item`)
        const response = await respo.json()
        const card = document.querySelectorAll('.card')
        arr.splice(0, arr.length)

        for (i in response)
            arr.push(new item(response[i].id, response[i].name, response[i].catId, response[i].image, response[i].price, 1, response[i].description))
        for (var i = 0; i < card.length; i++)
            card[i].remove()
        fillCards(arr)
    }
    else {
        for (var i in arr) {
            if (search_content.value == arr[i].name) {
                temp.push(arr[i])
            }
        }
        const card = document.querySelectorAll('.card')
        arr.splice(0, arr.length)
        for (var i in temp) {
            arr.push(temp[i])
        }
        for (var i = 0; i < card.length; i++)
            card[i].remove()
        fillCards(arr)
    }
})