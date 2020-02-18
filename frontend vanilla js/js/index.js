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
    M.AutoInit()
    let result = await fetch(apiEndPoint + '/posts?feed=true', {
        method: 'GET',
        headers: {
            'x-api-key': apiKey,
            'Authorization': 'Bearer ' + userState.token
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
                        <p>
                            <a href="./profile.html?user=${post.userInfo[0]._id}"
                                class="orange-text text-accent-4 tooltipped" data-position="bottom"
                                data-tooltip="View Profile">${post.userInfo[0].name}</a>
                        </p>
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
            $('.feed').append(element)
        })
    } else {
        M.toast({ html: result.message, displayLength: 2000, completeCallback: () => location.href = './signin.html' })
    }
    $('#preloader').remove()
})

$('.createpost').click(async e => {
    e.preventDefault()
    let title = $('#post_title').val()
    let body = $('#post_body').val()
    title = title.trim()
    body = body.trim()
    if (title.length < 1) {
        M.toast({ html: 'Title cannot be empty' })
    } else if (body.length < 1) {
        M.toast({ html: 'Body cannot be empty' })
    }
    else {
        $('#createpostmodal').modal('close')
        const data = { title, body }
        const { token } = JSON.parse(localStorage.getItem('userState'))
        let result = await fetch(apiEndPoint + '/posts', {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        result = await result.json()
        if (result.status == 201) {
            M.toast({ html: result.message, displayLength: 1000, completeCallback: () => location.href = baseUri })
        } else {
            M.toast({ html: result.message, displayLength: 2000, completeCallback: () => location.href = baseUri + '/signin.html' })
        }
    }
})

$('.signout').click(e => {
    e.preventDefault()
    localStorage.clear()
    location.href = baseUri + '/signin.html'
})