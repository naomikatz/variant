//-----------------------LOAD THE PAGE------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  console.log('loaded')

//------------------------VARIABLES---------------------------------------------
const indexURL = 'http://localhost:3000/api/songs'
const remixListDisplay = document.querySelector('.remix-list')
const mainContainer = document.querySelector('#main-container')
const navbar = document.querySelector('#navbar')
let songs



//------------------------SHOW SONGS-------------------------------------
function fetchSongs(){
fetch(indexURL)
 .then(res => res.json())
 .then(songsArray => {
   songs = songsArray
   renderSongs()
    })
  }

fetchSongs()

//----------------------ADD A SONG----------------------------------------------

navbar.addEventListener('click', (event) => {
  if (event.target.dataset.action === "add-song"){
    mainContainer.innerHTML = ""
    mainContainer.innerHTML = `
      <form data-action="add-song-form">
        <input type="text" placeholder="Song Name" value="">
        <input type="text" placeholder="Song Genre" value="">
        <input type="text" placeholder="Song Artist" value="">
        <input type="text" placeholder="Song URL" value="">
        <input type="submit">
      </form>
    `
  }
})


//--------------------ADD A REMIX-----------------------------------------------

//add a remix event listener

mainContainer.addEventListener('submit', (event) => {
  event.preventDefault()

  if (event.target.dataset.action === "submit-remix-form"){
    console.log(event.target)
    const remixName = event.target.elements[0].value
    const remixGenre = event.target.elements[1].value
    const remixArtist = event.target.elements[2].value
    const remixURL = event.target.elements[3].value

    fetch(`${indexURL}/${event.target.dataset.id}/remixes`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        song_id: event.target.dataset.id,
        remix_name: remixName,
        remix_genre: remixGenre,
        remix_artist: remixArtist,
        remix_url: remixURL,
        remix_likes: 0
      })
    })
    .then(response => response.json())
    .then(fetchSongs)

  }

if (event.target.dataset.action === "add-song-form"){
  console.log(event.target.elements)
  const songName = event.target.elements[0].value
  const songGenre = event.target.elements[1].value
  const songArtist = event.target.elements[2].value
  const songURL = event.target.elements[3].value


  fetch(indexURL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      song_name: songName,
      song_genre: songGenre,
      song_artist: songArtist,
      song_url: songURL
    })
  })
  .then(response => response.json())
  .then(fetchSongs)

}

})

mainContainer.addEventListener('click', (event) => {
  if (event.target.dataset.action === "add-remix"){
    console.log(event)
      mainContainer.innerHTML = ""
      mainContainer.innerHTML = `
        <form data-action="submit-remix-form" data-id="${event.target.dataset.id}">
          <input type="text" placeholder="Remix Name" value="">
          <input type="text" placeholder="Remix Genre" value="">
          <input type="text" placeholder="Remix Artist" value="">
          <input type="text" placeholder="Remix URL" value="">
          <input type="submit">
        </form>
      `
  }
//-------------------------EDIT REMIX-------------------------------------------
//
// mainContainer.addEventListener('click', (event) => {
//   if (event.target.dataset.action === "edit-remix"){
//       remixListDisplay.innerHTML = ""
//       remixListDisplay.innerHTML = `
//         <form data-action="edit-remix-form" data-id="${event.target.dataset.id}">
//           <input type="text" placeholder="Remix Name" value="">
//           <input type="text" placeholder="Remix Genre" value="">
//           <input type="text" placeholder="Remix Artist" value="">
//           <input type="text" placeholder="Remix URL" value="">
//           <input type="submit">
//         </form>
//       `
//   }
// })

// mainRemixContainer.addEventListener('submit', (event) => {
//   event.preventDefault()
//   if (event.target.dataset.action === "submit-remix-form"){
//     const remixName = event.target.elements[0].value
//     const remixGenre = event.target.elements[1].value
//     const remixArtist = event.target.elements[2].value
//     const remixURL = event.target.elements[3].value
//
//     fetch(`${indexURL}/${event.target.dataset.id}/remixes`, {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         song_id: event.target.dataset.id,
//         remix_name: remixName,
//         remix_genre: remixGenre,
//         remix_artist: remixArtist,
//         remix_url: remixURL,
//         remix_likes: 0
//       })
//     })
//     .then(response => response.json())
//     // .then(data => renderSongs(data))
//     .then(renderSongs())
//       }
//     })





//-------------------------LIKE REMIX-------------------------------------------

  if (event.target.dataset.action === "like") {
        const remixId = parseInt(event.target.dataset.id)
        const songId = parseInt(event.target.dataset.songid)
        console.log(event)
        const songObject = songs.find(song => song.id === songId)
        const remixes = songObject.remixes
        const remixObject = remixes.find(remix => remix.id === remixId)
        const newLikes = ++remixObject.remix_likes
        remixObject.remix_likes = newLikes

        fetch(`${indexURL}/${songId}/remixes/${remixId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            remix_likes: newLikes
          })
        })
        .then(response => response.json())
        .then(fetchSongs)
          }




//-------------------------DELETE REMIX-----------------------------------------


  if (event.target.dataset.action === "delete-remix") {
        const remixId = parseInt(event.target.dataset.id)
        const songId = parseInt(event.target.dataset.songid)

        fetch(`${indexURL}/${songId}/remixes/${remixId}`, {
          method: "DELETE"
        })
        console.log(event)
        event.target.parentNode.parentNode.parentNode.remove()
      }
    })


//-------------------------HELPER FUNCTIONS-------------------------------------

function renderSongs(){
  mainContainer.innerHTML = ""
  mainContainer.innerHTML = songs.map((song) => {
    // console.log(song)
    return `

            <h3>${song.song_name}
              <button class="circular tiny ui icon button"><i class="fitted large orange plus icon" data-action="add-remix" data-id="${song.id}"></i></button>
            </h3>
            <div class="remix-container">
            <div class="ui middle aligned divided list">
              ${song.remixes.map((remix) => {
                    return `

                              <div class="item">
                                <div class="right floated content">
                                  <div class="ui basic icon buttons">
                                    <button class="ui tiny grey basic button" data-action="like" data-id="${remix.id}" data-songid="${remix.song_id}">🍆 ${remix.remix_likes}</i></button>
                                    <button class="ui tiny grey basic button" data-action="add-to-playlist" data-id="${remix.id}"><i class="save outline icon"></i></button>
                                    <button class="ui tiny grey basic button" data-action="edit-remix" data-id="${remix.id}" data-songid="${remix.song_id}">🔧</i></button>
                                    <button class="ui tiny grey basic button" data-action="delete-remix" data-id="${remix.id}" data-songid="${remix.song_id}">❌</i></button></div>
                                </div>
                                <div class="content">
                                <i class="blue play icon"></i>${remix.remix_name}
                                </div>
                              </div>

                          `
                  }).join("")
                }
                </div>
            </div>

            `
  }).join("")

}

});

//"ui orange raised very padded raised text container segment"
//        <div class="ui grey raised very padded raised container segment" class="song-container">
