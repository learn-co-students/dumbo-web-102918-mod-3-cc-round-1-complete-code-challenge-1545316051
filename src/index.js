const imageComments = document.querySelector('#comments')
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1706 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let image = document.querySelector('#image')
  let imageName = document.querySelector('#name')
  let imageLikes = document.querySelector('#likes')
  const imageCard = document.querySelector('#image_card')
  const likeButton = document.querySelector('#like_button')
  const likeHolder = document.querySelector('#likes')
  const form = document.querySelector('#comment_form')

    fetch(imageURL)
    .then(res => res.json())
    .then(data => {
      image.src = data.url;
      imageName.innerText = data.name
      imageLikes.innerText = data.like_count

      data.comments.forEach(function(comment){
        newComment(comment.content, comment.id)
      })
    })

    imageCard.addEventListener("click", function(event){
      if (event.target === likeButton){

        let parent = event.target.parentElement;
        let addedLike = ++likeHolder.innerText
        
        
        fetch(likeURL, {
          method: 'POST',
          body: JSON.stringify({image_id: imageId, like_count: addedLike}),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        
      }
    })

    form.addEventListener("submit", function(event){
      event.preventDefault()
      let input = form.querySelector('input')
      let comment = input.value
      input.value = ""
      newComment(comment, "")

      fetch(commentsURL, {
        method: 'POST',
        body: JSON.stringify({image_id: imageId, content: comment}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      
    })

    imageComments.addEventListener("click", function(event){
      if (event.target.class === "delete-btn"){
          parent = event.target.parentElement
          let id = parent.id
          imageComments.removeChild(parent)

          fetch(`https://randopic.herokuapp.com/comments/${id}`,{
            method: 'DELETE'
          })
      }
    })


})

function newComment(info, id){
  let newComment = document.createElement('li')
  newComment.innerText = info
  newComment.id = id
  delete_button = document.createElement('button')
  delete_button.innerText = "Delete"
  delete_button.class = "delete-btn"
  newComment.append(delete_button)
  imageComments.append(newComment)
}