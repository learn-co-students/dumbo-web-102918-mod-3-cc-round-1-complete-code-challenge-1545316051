let imageId = 1 //Enter the id from the fetched image here
let pictureParent = document.querySelector('#image_card')


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

pictureParent.addEventListener('click', likePic)

function likePic() {
  let like = document.querySelector('#likes').innerText
  if (event.target.className.includes('likes')) {
    let newLike = like
    newLike++
    document.querySelector('#likes').innerText = newLike
  }
  
}

