$(document).ready(async () => {
    const userState = JSON.parse(localStorage.getItem('userState'))
    if (userState == null) {
        localStorage.clear()
        location.href = baseUri + '/signin.html'
    } else {
        if (userState.expAt < Date.now()) {
            localStorage.clear()
            location.href = baseUri + '/signin.html'
        }
    }
    const urlParams = new URLSearchParams(location.search)
    if (urlParams.has('user')) {
        $('.update-profile-btn-div').remove()
        const userId = urlParams.get('user')
        let result = await getUserProfile(userId, userState.token)
        result = await result.json()
        if (result.status == 200) {
            setUserProfile(result.results[0], false)
        } else {
            M.toast({
                html: result.message,
                displayLength: 1000,
                completeCallback: () => location.href = baseUri + '/signin.html'
            })
        }
        getUsersPost(userId, userState.token)
    } else {
        let result = await getUserProfile(userState.user._id, userState.token)
        result = await result.json()
        if (result.status == 200) {
            setUserProfile(result.results[0], true)
        } else {
            M.toast({
                html: result.message,
                displayLength: 1000,
                completeCallback: () => location.href = baseUri + '/signin.html'
            })
        }
        getUsersPost(userState.user._id, userState.token)
    }
    M.AutoInit()
    $('#preloader').remove()
})

const getUserProfile = async (id, token) => (
    await fetch(apiEndPoint + `/users/${id}`, {
        method: 'GET',
        headers: {
            'x-api-key': apiKey,
            'Authorization': 'Bearer ' + token
        }
    })
)

const setUserProfile = ({ name, email, createdAt, updatedAt }, isSelfUser) => {
    const breakedDate = createdAt.split('T')
    const nameInstance = $('#name')
    const emailInstance = $('#email')
    const createdAtInstance = $('#createdAt')
    nameInstance.val(name)
    emailInstance.val(email)
    createdAtInstance.val(breakedDate[0])
    if (isSelfUser) {
        nameInstance.attr('readonly', false)
        nameInstance.addClass('validate')
        emailInstance.attr('readonly', false)
        emailInstance.addClass('validate')
        const element = `<div class="row grey-text text-darken-2">Last Updated at: ${Date(updatedAt).toString()}</div>`
        $('#profile').append(element)
    }
}

const getUsersPost = async (id, token) => {
    let result = await fetch(apiEndPoint + `/posts?user=${id}`, {
        method: 'GET',
        headers: {
            'x-api-key': apiKey,
            'Authorization': 'Bearer ' + token
        }
    })
    result = await result.json()
    if (result.status == 200) {
        result.results.map(post => {
            const date = new Date(post.createdAt)
            const element = `<div class="col s12 m6 l6" id="${post._id}">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">
                            ${post.title}
                            <i class="material-icons right">expand_less</i></span>
                        <blockquote class="truncate blockquote-custom-border">
                            ${post.body}
                        </blockquote>
                        <p class="purple-text text-accent-3">${date.toDateString()}</p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">
                            <i class="material-icons right">close</i>
                        </span>
                        <p>
                            ${post.body}
                        </p>
                    </div>
                </div>
            </div>`
            $('.user-feed').append(element)
        })
    } else {
        M.toast({ html: result.message, displayLength: 2000, completeCallback: () => location.href = './signin.html' })
    }
}

$('form').submit(async e => {
    e.preventDefault()
    $('.btn-update-profile').attr('disabled', true)
    let name = $('#name').val()
    let email = $('#email').val()
    name = name.trim()
    email = email.trim()
    const userState = JSON.parse(localStorage.getItem('userState'))
    if (userState.user.name == name && userState.user.email == email) {
        M.toast({ html: 'Already up to date' })
    } else {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            const data = { name, email }
            let result = await fetch(apiEndPoint + '/users', {
                method: 'PATCH',
                headers: {
                    'x-api-key': apiKey,
                    'Authorization': 'Bearer ' + userState.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            result = await result.json()
            if (result.status == 200 && result.updatedCount == 1) {
                const newUserState = {
                    user: result.results[0],
                    token: userState.token,
                    expAt: userState.expAt
                }
                localStorage.setItem('userState', JSON.stringify(newUserState))
                M.toast({ html: result.message })
            } else {
                M.toast({
                    html: result.message,
                    displayLength: 1000,
                    completeCallback: () => location.href = baseUri + '/signin.html'
                })
            }
        } else {
            M.toast({ html: 'Email must be a valid email!' })
        }
    }
    $('.btn-update-profile').attr('disabled', false)
})

$('.signout').click(e => {
    e.preventDefault()
    localStorage.clear()
    location.href = baseUri + '/signin.html'
})