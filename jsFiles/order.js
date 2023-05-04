let orders = []
const resp = window.localStorage.getItem('user')
let valueOfResp
if (resp != null) {
    valueOfResp = JSON.parse(resp)
    console.log(valueOfResp[0].id)
}
window.onload = async () => {
    const parent = document.querySelector('.row')
    const response = await fetch("http://localhost:3000/order/" + valueOfResp[0].id)

    const respo = await response.json()

    for (var i = 0; i < respo.length; i++)
        orders.push(new order(respo[i].userId, respo[i].orderId, respo[i].orderStatus, respo[i].price))
    for (var i = 0; i < orders.length; i++) {
        const button = document.createElement('button')
        button.value = i
        button.className = 'my-4 hovs'
        button.style.border = 'none'
        button.style.backgroundColor = 'white'
        button.onclick = (e) => {
            window.location.href = `http://127.0.0.1:5500/orderDescription.html?id=` + orders[e.currentTarget.value].orderId
        }
        const div = document.createElement('div')
        div.className = 'row my-4'
        let list = []
        let list2 = []
        for (var j = 0; j < 3; j++) {
            let head = document.createElement('h1')
            let div2 = document.createElement('div')
            list.push(div2)
            list2.push(head)
        }
        list[0].className = "col-3 text-center"
        list[1].className = "col-6 "
        list[2].className = "col-3"
        list2[0].innerHTML = orders[i].orderId
        list2[1].innerHTML = `ORDER NO ${i + 1}`
        list2[2].innerHTML = "$" + orders[i].price
        list[0].append(list2[0])
        div.append(list[0])
        list[1].append(list2[1])
        div.append(list[1])
        list[2].append(list2[2])
        div.append(list[2])
        button.append(div)
        parent.append(button)
    }
}