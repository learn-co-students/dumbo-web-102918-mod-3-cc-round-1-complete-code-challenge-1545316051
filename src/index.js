let imageId = 1709 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/1709`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

let imageElement = () => document.querySelector('#image_card')
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  imageAdaptor()
  imageElement().addEventListener('click', (event) => addLike(event))
  imageElement().addEventListener('submit', (event) => addComment(event))

})

function imageAdaptor(){
  fetch(imageURL)
  .then(res => res.json())
  .then(data => showImage(data))
}

function showImage(data){
  url = data.url
  imageElement().innerHTML += `<img src= ${url}><h4 id="name">${data.name}</h4>
  <span>Likes:
    <span id="likes">${data.like_count}</span>
  </span>
  <button id="like_button">Like</button>`
  console.log(data.url)
}

function addLike(event){
  let likesCount = imageElement().querySelector('span').innerText.split(' ')[1]
  let newLike = ++likesCount
  let likesElement = imageElement().querySelector('span')
  let likeButton = imageElement().querySelector('button')
  if(event.target === likeButton){
    fetch('https://randopic.herokuapp.com/likes', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: '<1709>',
        like_count: newLike
      })
    })
    .then(likesElement.innerText = `Likes ${newLike}`)
  }
}


function addComment(event){
 debugger
  let comment = imageElement().querySelector('form input').value
  let commmentElement = imageElement().querySelector('ul')
  event.preventDefault()
  fetch('https://randopic.herokuapp.com/comments', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: '<1709>',
      content: `<${comment}>`
    })
  })
  .then(res => res.json())
  .then(data => {
    commmentElement.innerHTML += `${data.content}`
    console.log(data.content)
  })
}
