

// VARIABLES
const playListInput = document.getElementById('playlistName');
const createPlaylistBtn = document.getElementById('createPlaylistBtn')
const playlistContainer = document.querySelector('.sideNav__playlist')
let playLists = []
let laterAddedPlaylist =[]
const playListTitle = document.querySelector('.playlistTitle')
const usernameTyped = document.getElementById('username');
const passwordTyped = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const usernameSpan = document.getElementById('usernameSpan')
let currentUser = ""
let imgAvatar = document.getElementById('img-avatar');
const logooutBtn = document.getElementById('logout');
const albumSongsNodes = document.querySelectorAll('.table-album tr')
const musicPlayer = document.getElementById('music-player');
const favIcon = document.querySelector('.fav-icon')




let hamburger = document.querySelector('.navBar__hamburger');
const indexNavbar = document.querySelector('.index__navBar')
const defaultUser = {
    username: "Guest",
    password: "guest",
    avatar: "https://www.kindpng.com/picc/m/52-525992_woman-question-mark-clip-art-question-mark-face.png",
    playlists:["Guest Playlist"]
}


const users = [{
    username: "rita.petillo",
    name:"Rita",
    password: "rita1234",
    avatar: "https://img2.pngio.com/avatar-female-person-user-woman-young-icon-avatar-person-png-512_512.png",
    playlists: ["Rita's Playlist", "Italian Songs"],
    
},
    {
        username: "nello",
        name:"Nello",
        password: "nello1234",
        avatar: "https://st2.depositphotos.com/1007566/12304/v/950/depositphotos_123041468-stock-illustration-avatar-man-cartoon.jpg",
        playlists:["Top Italia","90' Songs"]

    },
    {
        username: "fede",
        name:"Federico",
        password: "fede1234",
        avatar: "https://cdn0.iconfinder.com/data/icons/avatar-25/64/avatar-man-beard-brown-long-hair-beard-512.png",
        playlists:["Top USA","Top Global'"]
               
},defaultUser]





// FUNCTIONS

const displayMobileMenu = () => {
    console.log(indexNavbar)
    indexNavbar.classList.toggle('d-none')
}


const createPlaylist = (user) => {
    const newPlaylist = playListInput.value
    playLists.push(newPlaylist)
    localStorage.setItem('playLists', JSON.stringify(playLists))
    playListInput.value = ""
    console.log(JSON.parse(localStorage.getItem('playLists')))
   clearPlaylist()
    renderPlaylist()
}
const renderPlaylist = () => {
    playLists = JSON.parse(localStorage.getItem('playLists'))
    playLists.forEach((playlist, i) => {
    let a = document.createElement('a');
    a.href = `playlist.html?${playlist}`
    a.innerHTML = `<span class="sideNav__nav-play-thumb text-white"><i class="fas fa-music"></i></span><span> ${playlist}</span>`
    playlistContainer.appendChild(a)
    })
   
}

const clearPlaylist = () => {
    while (!playlistContainer.lastElementChild.classList.value.includes('sideNav__nav-addPlay')) {
        playlistContainer.removeChild(playlistContainer.lastChild)
    }
  
}

const login = () => {
    //getting user and pass typed 
    let userTped = usernameTyped.value
    let password = passwordTyped.value
//retrive the user
    let user = validateUsername(userTped);
    //validate password
    let passMatch = user?.password === password
    let userFound = user !== undefined ? true : false
//if the user exist and the password match
    if (userFound && passMatch) {
        //save the user in the local storage and go to index
        localStorage.setItem('currentUser', JSON.stringify(user))
        window.location.href = "index.html";
    } else {
        //else activate warning text
        let loginWarn = document.querySelector('.login-warning')
        loginWarn.classList.remove('d-none')
    }

       
}
const logout = () => {
    currentUser = "";
    localStorage.clear()
    window.location.href = "login.html";
}
const renderUsername = (username) => {
    usernameSpan.innerHTML = username.name
    imgAvatar.src = username.avatar
}

const validateUsername = (username) => {
    return users.find(user => user.username === username);
}
const updatePlaylist = (username) => {
    let user = users.find(user => user.username === username.username);
    if (localStorage.getItem(localStorage.getItem('playLists'))) {
        playlists = localStorage.getItem(localStorage.getItem('playLists'))
    }
    else {
        playLists = [...playLists, ...username.playlists]
            // localStorage.setItem('playLists', JSON.stringify(playLists))


    }
    console.log(localStorage.getItem('playLists'))

}

/////////---------PLAY SONG----------//////////////
const playSong = (code) => {
    musicPlayer.src = `https://open.spotify.com/embed/track/${code}`
    console.log(document.querySelector('iframe'))
    document.querySelector('iframe').click()

}



// ON WINDOW LOAD

window.onload = function () {

/////////---------MOBILE NAV TOGGLE IN INDEX----------//////////////
    hamburger?.addEventListener('click',displayMobileMenu)

   
/////////---------LOGIN----------//////////////
    //add login event
    loginBtn?.addEventListener('click', login)
    // const currentUser = localStorage.getItem('currentUser')
    currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log(currentUser)
    currentUser ? currentUser : defaultUser;
    renderUsername(currentUser)
    updatePlaylist(currentUser)
      clearPlaylist()
        renderPlaylist()

   
    
    /////////---------LOGOUT----------//////////////
    logooutBtn?.addEventListener('click', logout)
    
        
/////////---------PLAY SONGS----------//////////////
    if (albumSongsNodes) {
        [...albumSongsNodes].forEach((album, i) => {
            album.addEventListener('click', () => {
                playSong(albumQueenBohemian[i])
            })
        })
    }

   
  
    
    
/////////---------PLAYLIST-----------//////////////
//create a new lateral playlist
    createPlaylistBtn?.addEventListener('click', createPlaylist)
//display playlist page
    //I'm looking for the playlist name so that I can display it in the playlist page.
    if (location.search.substring(1)) {
        let queryString = location.search.substring(1);
        let playListSelected = queryString.split("|")[0]
        console.log(playListSelected)
        //when the window load, I render the title of the playlist
        playListTitle.innerHTML = playListSelected
        playLists.push(playListSelected)
        
    }
    /////////---------LIKED ALBUMS-----------//////////////
    favIcon?.addEventListener('click', () => {
        favIcon.classList.toggle('fas');
        const bedge = document.getElementById('bedge')
        bedge.classList.toggle('d-none')
    })



}