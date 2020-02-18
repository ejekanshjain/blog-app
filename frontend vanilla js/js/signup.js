$(document).ready(() => {
    localStorage.clear()
    M.AutoInit()
})

$('form').submit(async e => {
    e.preventDefault()
    $('.btn-signup').attr('disabled', true)
    if (document.getElementById('password').value !== document.getElementById('confirmpassword').value) {
        M.toast({ html: 'Passwords do not match!', completeCallback: () => $('.btn-signup').attr('disabled', false) })
    } else if (document.getElementById('password').value.trim().length < 6) {
        M.toast({ html: 'Password length must be greater than or equal to 6!', completeCallback: () => $('.btn-signup').attr('disabled', false) })
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById('email').value))) {
        M.toast({ html: 'Email must be a valid email', completeCallback: () => $('.btn-signup').attr('disabled', false) })
    } else {
        const data = {}
        const elements = document.getElementById('signup').elements
        $(elements).serializeArray().map(item => {
            if (item.name && item.name !== 'confirmpassword') {
                data[item.name] = item.value
            }
        })
        let result = await fetch(apiEndPoint + '/users', {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        result = await result.json()
        M.toast({
            html: result.message,
            displayLength: 1500,
            completeCallback: () => {
                if (result.status == 201) {
                    location.href = baseUri + '/signin.html'
                } else {
                    $('.btn-signup').attr('disabled', false)
                }
            }
        })
    }
})