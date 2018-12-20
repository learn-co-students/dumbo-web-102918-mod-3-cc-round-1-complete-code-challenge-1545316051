document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1717 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImage();
})

let imageCollection = document.querySelector(".row")

function getImage() {
  fetch(`https://randopic.herokuapp.com/images/1717`)
  .then(res => res.json())
  .then(data => {
    showImage(data)
    // console.log(data)
  })
}

function showImage(data) {
  let imageCard = document.querySelector(".card")

    Object.keys(data).forEach(image => {
    let imageId = image.id
    let imageUrl = image.url
    let imageName = image.name
    let imageLikeCount = image.like_count
    let imageComments = image.comments
    imageCard.innerHTML = `<img src= ${imageUrl} id="image"> <h4 id="name">${imageName}</h4> <span>Likes: ${imageLikeCount}</span> <button id="like_button"> Like </button>`
    imageCollection.append(imageCard);
  })
}

likeButton = document.getElementById("like_button")
imageCollection.addEventListener(click, inputHandler)

function inputHandler(event) {
  if (event.target.id === likeButton) {
    
  }
}
