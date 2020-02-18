$(document).ready(() => {
    localStorage.clear()
    M.AutoInit()
})

$('form').submit(async e => {
    e.preventDefault()
    $('.btn-signin').attr('disabled', true)
    const data = {}
    const elements = document.getElementById('signin').elements
    $(elements).serializeArray().map(item => {
        if (item.name) {
            data[item.name] = item.value
        }
    })
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById('email')))) return M.toast({ html: 'Email must be a valid email!', displayLength: 2000, completeCallback: () => $('.btn-signin').attr('disabled', false) })
    let result = await fetch(apiEndPoint + '/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        },
        body: JSON.stringify(data)
    })
    result = await result.json()
    M.toast({ html: result.message })
    if (result.status == 200) {
        const userState = {
            user: result.results,
            token: result.token,
            expAt: Date.now() + expTime
        }
        localStorage.setItem('userState', JSON.stringify(userState))
        location.href = baseUri
    } else {
        $('.btn-signin').attr('disabled', false)
    }
})