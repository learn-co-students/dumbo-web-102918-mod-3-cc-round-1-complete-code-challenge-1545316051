document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1707 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  display(imageURL)
  incLikes(likeURL)
  addComment()
  deleteComment()
})

function display(imageURL){
  fetch(imageURL)
    .then(res => res.json())
    .then(data => {
      document.querySelector("#likes").innerText = data.like_count
      document.querySelector("#name").innerText = data.name
      data.comments.forEach((comment)=>{
        createComment(comment)
      })
    })
}

function createComment(comment){
  let newComment = document.createElement("li")
  newComment.setAttribute("data-id", comment.id)
  newComment.innerText = comment.content
  let delBtn = document.createElement("button")
  delBtn.className = "button"
  delBtn.innerText = "Delete"
  newComment.append(delBtn)
  document.querySelector("#comments").append(newComment)
}

function incLikes(likeURL){
  document.querySelector("#like_button").addEventListener("click",()=>{
    let currentNumLikes = parseInt(document.querySelector("#likes").innerText)
    document.querySelector("#likes").innerText = currentNumLikes + 1
    fetch("https://randopic.herokuapp.com/likes",{
      method: "POST",
      headers: {"Accept": "application/json", "Content-Type": "application/json"},
      body: JSON.stringify({image_id: 1707, like_count: currentNumLikes + 1})
    })
  })
}

function addComment(){
  let form = document.querySelector("#comment_form")
  form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let comment = {}
    comment.content = form.comment.value
    comment.id = 0
    createComment(comment)
    form.reset()
    fetch("https://randopic.herokuapp.com/comments",{
      method: "POST",
      headers: {"Accept": "application/json", "Content-Type": "application/json"},
      body: JSON.stringify({image_id: 1707, content: comment.content})
    }).then(res => res.json())
      .then(newComment => {
        document.querySelector('[data-id="0"]').dataset.id = newComment.id
      })
  })
}

function deleteComment(){
  document.querySelector("#comments").addEventListener("click",(e)=>{
    let idToDelete = e.target.parentElement.dataset.id
    if (idToDelete){
      fetch(`https://randopic.herokuapp.com/comments/${idToDelete}`,{
        method: "DELETE"
      })
      .then(upDom => {
        e.target.parentElement.remove()
      })
    }
  })
}
