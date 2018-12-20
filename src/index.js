document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1720 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
  .then(res => res.json())
  .then(renderRandoPic)

  // const like_button = document.getElementById('like_button')
  // like_button.addEventListener('click', addLike)
  const divCont = document.querySelector('.container')
  divCont.addEventListener('click', addLike)
  const newForm = document.getElementById('comment_form')
  newForm.addEventListener('submit', addComment)
})

function addComment(event) {
  event.preventDefault()
  let imageId = 1720
  const input = document.getElementById('comment_input').value
  fetch('https://randopic.herokuapp.com/comments/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: input
    })
  })
}


function renderRandoPic(data) {
  const likes = document.getElementById('likes')
  const comments = document.getElementById('comments')
  const divCard = document.getElementById('image_card')
  divCard.dataset.id = data.id
  const image = divCard.querySelector('img')
  image.src = data.url
  const h = divCard.querySelector('h4')
  h.innerText = data.name
  const span = divCard.querySelector('span')
  const li = document.createElement('li')
  li.innerText = data.comments
  likes.innerText = `${data.like_count} Likes`
  comments.appendChild(li)
  divCard.appendChild(image)
  divCard.appendChild(h)
  divCard.appendChild(span)

}

function addLike(event) {
  if (event.target.id === 'like_button') {
    const imageId = event.target.parentNode.dataset.id
    const likeAmount = parseInt(document.getElementById('likes').innerText.split(' ')[0]) + 1
    fetch(`https://randopic.herokuapp.com/likes`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        image_id: imageId,
        like_count: likeAmount
      })
    })
  }
}
