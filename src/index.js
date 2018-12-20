document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1715 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let likes = parseInt(document.querySelector('#likes').innerText)

  function slapLikeOnDom(event) {
    likes ++
    event.target.parentElement.children[2].children[0].innerText = `${likes}`
    fetchLikes(likes)
  }


  fetch(imageURL)
    .then(res=>res.json())
    .then(renderImage)




  document.querySelector('#like_button').addEventListener('click', slapLikeOnDom)
  document.querySelector('#comment_form').addEventListener('submit', addComment)



})



function renderImage(data) {
  document.querySelector('#image').src = data.url
  document.querySelector('#name').innerText = data.name
  document.querySelector('#likes').innerText = data.like_count
  data.comments.forEach(renderComments)

}

function renderComments(comment) {
  const li = document.createElement('li')
  li.innerText = comment.content
  document.querySelector('#comments').append(li)
}




function fetchLikes(likes) {
  fetch("https://randopic.herokuapp.com/likes", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      image_id: 1715,
      likes: likes
    })
  })
}


function addComment(event) {
  event.preventDefault()
  let li = document.createElement('li')
  li.innerText = event.target.comment.value
  document.querySelector('#comments').append(li)
  event.target.comment.value = ''
  postComment(li)
}




function postComment(li) {
  fetch(`https://randopic.herokuapp.com/comments/`, {
    method: 'POST',
    headers: {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      image_id: 1715,
      content: li.innerText
    })
  })
}
