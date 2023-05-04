
const query = new URLSearchParams(window.location.search)
const id = query.get('id')
const catid = query.get('catId')
const count = document.querySelector('.cart-counter')
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

window.onload = async () => {
    const temp = window.localStorage.getItem('cart')
    if (temp != null) {
        const temp2 = JSON.parse(temp)
        for (var k in temp2)
            arr.push(temp2[k])
       
    }
    count.innerHTML = arr.length
    const success = await fetch(`http://localhost:3000/item/${id}/${catid}`)
    const respo = await success.json()
    let arr2 = []
    console.log(respo)
    arr2.push(respo[0].image)
    arr2.push(respo[0].name)
    arr2.push(respo[0].price)
    arr2.push(respo[0].description)
    const data = document.querySelectorAll('.data')
    for (var i = 0; i < data.length; i++) {
        if (i == 0)
            data[i].src = arr2[i]
        else
            data[i].innerHTML = arr2[i]
    }
}
const counterminus = document.querySelector(".minus");
const counterplus = document.querySelector(".plus");
const counter = document.querySelector(".count");

counterminus.addEventListener('click', () => {
    let count = parseInt(counter.innerHTML)
    if (count > 1) {
        counter.innerHTML = count - 1
    }
})
counterplus.addEventListener('click', () => {
    let count = parseInt(counter.innerHTML)

    counter.innerHTML = count + 1
})

