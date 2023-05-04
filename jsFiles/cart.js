
const resp = window.localStorage.getItem('user')
let valueOfResp
if (resp != null)
    valueOfResp = JSON.parse(resp)

const arr = []

const removeCart = (obj) => {
    for (var i = 0; i < arr.length; i++) {
        if (obj.id == arr[i].id) {
            if (obj.count > 1) {
                arr[i].count -= 1
            }
            else {
                arr.splice(i, 1)
            }
        }
    }
    window.localStorage.removeItem('cart')
    window.localStorage.setItem('cart', JSON.stringify(arr))
    const quer = document.querySelectorAll('.row')
    for (var i = 0; i < quer.length; i++)
        quer[i].remove()
    const but = document.querySelector('.btn')
    but.remove()
    fillCart(arr)
}
const getTotalPrice = () => {
    // localStorage.setItem('user',user)
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
        div.className = "row my-3 container text-center"
        for (var j = 0; j < 4; j++) {
            const div2 = document.createElement('div')
            arr2.push(div2)
            arr2[j].className = "col-3 d-flex align-items-center"
        }
        const div2 = document.createElement('div')
        const img = document.createElement('img')
        img.src = arr[i].image
        img.className = "w-75"
        div2.append(img)
        arr2[0].append(div2)
        const heading = document.createElement('h4')
        heading.innerHTML = arr[i].name
        arr2[1].append(heading)
        const heading2 = document.createElement('h4')
        heading2.innerHTML = `${arr[i].price}*${arr[i].count}=${arr[i].price * arr[i].count}`
        arr2[2].append(heading2)
        const button = document.createElement("button")
        button.value = i
        button.className = "but"
        const icon = document.createElement("i")
        icon.style.color = "red"
        icon.className = "fa fa-trash fa-2x"
        button.append(icon)
        button.onclick = (e) => {
            removeCart(arr[e.currentTarget.value])
        }

        arr2[3].append(button)
        div.append(arr2[0])
        div.append(arr2[1])
        div.append(arr2[2])
        div.append(arr2[3])
        parent.append(div)
    }
    const priceTotal = []
    for (var k = 0; k < 2; k++) {
        const div = document.createElement('div')
        priceTotal.push(div)
        priceTotal[k].className = "col-6"
    }
    let div2 = document.createElement('div')
    div2.className = "row my-4 container text-center"
    const heading = document.createElement('h1')
    heading.className = "priceHead"
    const heading2 = document.createElement('h1')
    heading.innerHTML = "TOTAL =" + getTotalPrice()
    priceTotal[1].append(heading)
    priceTotal[0].append(heading2)

    for (var i in priceTotal)
        div2.append(priceTotal[i])
    parent.append(div2)
    const button = document.createElement('button')
    const button2 = document.createElement('button')
    const button3 = document.createElement('button')
    if (arr.length > 0) {

        button.className = 'btn btn-primary'
        button.innerHTML = 'Place order'
        button.onclick = async () => {

            let btn = document.querySelectorAll('.btn-2')

            for (var k = 0; k < btn.length; k++) {
                btn[k].classList.add('animate')
                console.log(k)

            }
            setTimeout(() => {
                let btn = document.querySelectorAll('.btn-2')

                for (var k = 0; k < btn.length; k++) {
                    btn[k].style.opacity = 1
                }
            }, 1600);
        }
        button3.className = 'btn btn-primary btn-2 mx-4'
        button3.innerHTML = 'Pay with cash'
        button3.onclick = async () => {
            const response = await fetch('http://localhost:3000/order/' + valueOfResp[0].id, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(arr)
            })
            if (response.status == 200) {
                const resp = await response.json()
                console.log(resp.oId)
                localStorage.removeItem('cart')
                window.location.href = "confirm.html?id=" + resp.oId + "&shipId=" + resp.shipId
            }
        }
        parent.append(button)
        parent.append(button3)
    }
}
const temp = window.localStorage.getItem('cart')
if (temp != null) {
    const temp2 = JSON.parse(temp)
    for (var k in temp2)
        arr.push(temp2[k])
    fillCart(arr)
}

