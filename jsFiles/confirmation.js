const resp2 = window.localStorage.getItem('user')
let valueOfResp
if (resp2 != null)
    valueOfResp = JSON.parse(resp2)

const resp = new URLSearchParams(window.location.search)
const oid = resp.get('id')
const shipId = resp.get('shipId')
const button = document.querySelector('.enter')
const input = document.querySelector('input')
window.onload = async () => {
    const user = window.localStorage.getItem('user')
    const user2 = JSON.parse(user)

    let Parent = document.querySelector('.container')

    const response = await fetch('http://localhost:3000/mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "email": valueOfResp[0].email,
            "oId": oid,
            "shipId": shipId,
            "Address":valueOfResp[0].address,
        })
    })
    document.querySelector('.spinner-border').style.display = 'none'
    document.querySelector('.heading').innerHTML = 'Success'
    const head = document.createElement('h5')
    head.innerHTML = 'MAIL SENT PLEASE CHECK FOR SHIPPING DETAILS'
    Parent.append(head)
    const button = document.createElement('button')
    button.className = 'btn btn-primary'
    button.innerHTML = "Return to Item Page"
    button.onclick = () => {
        window.location.href = "http://127.0.0.1:5500/item.html"
    }
    Parent.append(button)
}

