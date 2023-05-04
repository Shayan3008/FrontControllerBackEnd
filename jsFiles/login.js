const form = document.querySelectorAll('.form-control')
const button = document.querySelector('.btn')

button.addEventListener('click', async (e) => {
    e.preventDefault()
    const resp = await fetch('http://localhost:3000/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'user': form[0].value,
            'pass': form[1].value
        })
    })
    if (resp.status == 200) {
        const response = await resp.json()
        localStorage.setItem('user', JSON.stringify(response))
        window.location.href = "http://127.0.0.1:5500/item.html"
    }
    else if (resp.status == 404) {
        const response = await resp.json()
        form[0].value = ""
        form[1].value = ""
        document.querySelector('.error').innerHTML = response.msg
        setTimeout(() => {
            document.querySelector('.error').innerHTML = ""


        }, 1500);
    }
})