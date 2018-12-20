document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1710 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/1710`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
likes()
}) //maybe drag this all the way down later.
let imgId = document.getElementById("image")

//fetch and render image first 
fetch("https://randopic.herokuapp.com/images/1710")
  .then(response => response.json())
  .then(image => renderImage(image))

  function renderImage(image){
    let img = document.getElementById("image")
    
    img.src = image.url
    document.querySelector("#name").innerText = image.name
    
  }
// image data: {id: 1710, url: "http://blog.flatironschool.com/wp-content/uploads/2017/06/IMAG2936-352x200.jpg", name: "Science Fair", like_count: 0, comments: Array(1)}
counter = 0 
function likes(){
  imageCard = document.querySelector("#image_card")
  const likeBtn = document.querySelector("#like_button")
  let likes = document.querySelector("#likes").innerText

  imageCard.addEventListener('click', function(event){
    event.preventDefault()
    event.target === likeBtn 
    fetch('https://randopic.herokuapp.com/likes/', {
  method: 'POST',
  body: likes
})
  likes = ++counter  //ok this works in debugger/console
  })
//Ok I thought I knew all of this, but my mind just went empty. Sighs...

}
  