$(document).ready(async () => {
    const userState = JSON.parse(localStorage.getItem('userState'))
    if (userState == null) {
        const element = `<nav>
            <div class="nav-wrapper purple accent-2">
                <a href="./" class="brand-logo">Blog App</a>
                <a data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    <li><a href="./signin.html">Sign In</a></li>
                    <li><a href="./signup.html">Sign Up</a></li>
                    <li class="active"><a><i class="material-icons right">info</i>About</a></li>
                </ul>
            </div>
        </nav>
        <ul class="sidenav" id="mobile-demo">
            <li><a href="./signin.html">Sign In</a></li>
            <li><a href="./signup.html">Sign Up</a></li>
            <li class="active"><a><i class="material-icons right">info</i>About</a></li>
        </ul>`
        $('.header-section').append(element)
    } else {
        if (userState.expAt < Date.now()) {
            localStorage.clear()
            location.href = baseUri + '/signin.html'
        } else {
            const element = `<nav>
            <div class="nav-wrapper light-blue">
                <a href="./" class="brand-logo">Blog App</a>
                <a data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    <li><a href="./"><i class="material-icons right">home</i>Home</a></li>
                    <li><a href="./profile.html"><i class="material-icons right">person</i>Profile</a></li>
                    <li class="active"><a><i class="material-icons right">info</i>About</a></li>
                    <li>
                        <a href="#signoutmodal" class="modal-trigger">
                            <i class="material-icons right">power_settings_new</i>
                            Sign Out
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <ul class="sidenav" id="mobile-demo">
            <li><a href="./"><i class="material-icons right">home</i>Home</a></li>
            <li><a href="./profile.html"><i class="material-icons right">person</i>Profile</a></li>
            <li class="active"><a><i class="material-icons right">info</i>About</a></li>
            <li>
                <a href="#signoutmodalm" class="modal-trigger">
                    <i class="material-icons right">power_settings_new</i>
                    Sign Out
                </a>
            </li>
        </ul>`
            $('.header-section').append(element)
        }
    }
    M.AutoInit()
    $('.collapsible.expandable').collapsible({ accordion: false })
    $('#preloader').remove()
})

$('.signout').click(e => {
    e.preventDefault()
    localStorage.clear()
    location.href = baseUri + '/signin.html'
})