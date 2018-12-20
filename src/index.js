let imageId = 1 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', getPicture)

function getPicture () {
  fetch('https://randopic.herokuapp.com/images/1713')
  .then(response => response.json())
  .then(data => postPicture(data))
}

function postPicture(data) {
  console.log(data)
  let pictureParent = document.querySelector('#picParent')
  let image = document.querySelector('#image')
    image.src = data.url
  let name = document.querySelector('#name')
    name.innerText = data.name
  let likes = document.querySelector('#likes')
    likes.innerText = data.like_count
  let button = document.querySelector('#like_button')
  let commentForm = document.querySelector('#comment_form')
  let commentInput = document.querySelector('#comment_input')
  let commentsUl = document.querySelector('#comments')
    comment = document.createElement('li')
    comment.innerText = data.comments[0].content
    commentsUl.appendChild(comment)
}

