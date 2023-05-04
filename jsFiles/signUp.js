const user = localStorage.getItem('user')
if (user != null)
    window.location.href = "http://127.0.0.1:5500/item.html"
const button = document.querySelector('.btn-primary')
const input = document.querySelectorAll('.form-control')
button.addEventListener('click', async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3000/login/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "Fname": input[0].value,
            "Lname": input[1].value,
            "Password": input[2].value,
            "Email": input[3].value,
            "Phone": input[4].value,
            "Address": input[5].value
        })
    })
    const resp = await response.json()
    if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(resp))
        window.location.href = "http://127.0.0.1:5500/item.html"
    }
    else {
        input[0].value = ""
        input[1].value = ""
        input[2].value = ""
        input[3].value = ""
        input[4].value = ""
        input[5].value = ""
        document.querySelector('.error').innerHTML = response.msg
        setTimeout(() => {
            document.querySelector('.error').innerHTML = ""


        }, 1500);
    }

})