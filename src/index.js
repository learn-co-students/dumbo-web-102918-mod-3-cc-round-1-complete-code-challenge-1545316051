document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1705 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

fetchPicture()
likeUpdate()
commentForm()
})

function fetchPicture(){
  fetch(`https://randopic.herokuapp.com/images/1705`)
    .then(res => res.json())
    .then(data => {
        showPicture(data)
        showComment(data)
    })
}

function showPicture(data){
 document.querySelector("#image").src = data.url
 document.querySelector("#name").innerText = data.name
 document.querySelector("#likes").innerText = data.like_count

}

function likeUpdate(){
  let container = document.querySelector(".container")
  container.addEventListener("click", function(e){
    if (e.target === document.querySelector("#like_button")){
      let likeBtn = e.target
      let parentDiv = likeBtn.parentNode
      let strLikes = parentDiv.querySelector("#likes").innerText
      let numLikes = parseInt(strLikes)
        parentDiv.querySelector("#likes").innerText = numLikes + 1
      fetch(`https://randopic.herokuapp.com/likes`, {
        method: "POST",
        headers: {"Content-Type": "application/json",
        Accept: "application/json"},
        body: JSON.stringify({
          "like_count": numLikes + 1,
          "image_id": 1705
        })
      })
    }
  })
}
function showComment(data){
  console.log(data)
   data.comments.forEach(function(comment){
     let commentBoxUl = document.querySelector("#comments")
     let commentLi = document.createElement("li")
    commentLi.innerText = comment.content
    commentBoxUl.prepend(commentLi)
  })
}
function commentForm(){
  let commentBoxUl = document.querySelector("#comments")
  let commentForm = document.querySelector("#comment_form")
  commentForm.addEventListener("submit", function(e){
    e.preventDefault()
    let commentInput = e.target.querySelector('#comment_input')
    let commentLi = document.createElement("li")
   commentLi.innerText = commentInput.value
   commentBoxUl.prepend(commentLi)
   commentForm.reset()
   fetch(`https://randopic.herokuapp.com/comments`, {
     method: "POST",
     headers: {"Content-Type": "application/json",
     Accept: "application/json"},
     body: JSON.stringify({
       "content": commentLi.innerText,
       "image_id": 1705
     })
   })
  })

}
