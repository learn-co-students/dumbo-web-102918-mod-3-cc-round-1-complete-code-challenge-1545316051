document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1718 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImage(imageId)
  likeImage(imageId)
  postComment(imageId)
})

function getImage(imageId) {
  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
  .then(res => res.json())
  .then(image => renderImage(image))
}

function renderImage(image) {
  const imgCard = document.querySelector("#image_card")

  const img = document.querySelector("#image")
  img.src = image.url

  const hFourName = document.querySelector("#name")
  hFourName.innerText = image.name

  const likes = document.querySelector("#likes")
  likes.innerText = image.like_count

  imgCard.prepend(img)

  image.comments.forEach( comment => renderComment(comment))
}

function renderComment(comment) {
  const commentsUl = document.querySelector("#comments")
  const commentLi = document.createElement("li")
  commentLi.innerText = comment.content

  commentsUl.append(commentLi)
}

function likeImage(imageId) {
  const imageCard = document.querySelector("#image_card")
  imageCard.addEventListener("click", (e) => {
    if (e.target.id === "like_button") {
      let likes = document.querySelector("#likes")
      let addLike = parseInt(likes.innerText)
      addLike++
      likes.innerText = addLike
      fetch(`https://randopic.herokuapp.com/likes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          image_id: imageId
        })
      })
    }
  })
}

function postComment(imageId) {
  const commentForm = document.querySelector("#comment_form")
  commentForm.addEventListener("submit", (e) => {

    const commentInput = document.querySelector("#comment_input")
    const commentsUl = document.querySelector("#comments")
    const commentLi = document.createElement("li")
    commentLi.innerText = commentInput.value
    commentsUl.append(commentLi)

    e.preventDefault()
    fetch("https://randopic.herokuapp.com/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        image_id: imageId,
        content: commentInput.value
      })
    }).then(commentInput.value = "")
  })
}
