//-----------------------LOAD THE PAGE------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  console.log('loaded')

//------------------------VARIABLES---------------------------------------------
const indexURL = 'http://localhost:3000/api/songs'
const remixListDisplay = document.querySelector('.remix-list')
const mainContainer = document.querySelector('#main-container')
let songs;


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




//--------------------ADD A REMIX-----------------------------------------------

//add a remix event listener

mainContainer.addEventListener('click', (event) => {
  if (event.target.dataset.action === "add-remix"){
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
})

mainContainer.addEventListener('submit', (event) => {
  event.preventDefault()
  if (event.target.dataset.action === "submit-remix-form"){
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

})

//-------------------------EDIT REMIX-------------------------------------------

mainContainer.addEventListener('click', (event) => {
  if (event.target.dataset.action === "edit-remix"){
      remixListDisplay.innerHTML = ""
      remixListDisplay.innerHTML = `
        <form data-action="edit-remix-form" data-id="${event.target.dataset.id}">
          <input type="text" placeholder="Remix Name" value="">
          <input type="text" placeholder="Remix Genre" value="">
          <input type="text" placeholder="Remix Artist" value="">
          <input type="text" placeholder="Remix URL" value="">
          <input type="submit">
        </form>
      `
  }
})

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
mainContainer.addEventListener("click", (event) => {
  if (event.target.dataset.action === "like") {
        const remixId = parseInt(event.target.dataset.id)
        const songId = parseInt(event.target.dataset.songid)
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
        .then(renderSongs)
          }
        })



//-------------------------DELETE REMIX-----------------------------------------

mainContainer.addEventListener("click", (event) => {
  if (event.target.dataset.action === "delete-remix") {
        const remixId = parseInt(event.target.dataset.id)
        const songId = parseInt(event.target.dataset.songid)

        fetch(`${indexURL}/${songId}/remixes/${remixId}`, {
          method: "DELETE"
        })
        event.target.parentNode.remove()
      }
    })


//-------------------------HELPER FUNCTIONS-------------------------------------

function renderSongs(){
  mainContainer.innerHTML = ""
  mainContainer.innerHTML = songs.map((song) => {
    // console.log(song)
    return `
          <div class="song-container">
            <h3>${song.song_name}
              <button data-action="add-remix" data-id="${song.id}">Add a Remix</button>
            </h3>
            <div class="remix-container">
            <ul>
              ${song.remixes.map((remix) => {
                    return `
                            <li>
                              ${remix.remix_name}<br>

                              // <div class="ui labeled button" tabindex="0">
                              //   <div class="ui purple button">
                              //     <i class="heart icon"></i> Like
                              //   </div>
                              //   <a class="ui basic purple left pointing label">
                              //     1,048
                              //   </a>
                              // </div>

                                <button data-action="like" data-id="${remix.id}" data-songid="${remix.song_id}">🍆 ${remix.remix_likes}</button>
                                <button data-action="add-to-playlist" data-id="${remix.id}">➕</button>
                                <button data-action="edit-remix" data-id="${remix.id}" data-songid="${remix.song_id}">🔧</button>
                                <button data-action="delete-remix" data-id="${remix.id}" data-songid="${remix.song_id}">❌</button>
                            </li>
                          `
                  }).join("")
                }
            </ul>
            </div>
          </div>
            `
  }).join("")

}

});
