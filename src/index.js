document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1714 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
fetchImage(imageURL)
editLikes()
addComments()
})

function fetchImage(imageURL) {
  fetch(imageURL)
  .then(res => res.json())
  .then(imageData => showImage(imageData))

}

function showImage(imageData){

    let imageDiv = document.querySelector("#image_card")
    let imageName = document.querySelector("#name")
    imageName.innerText = imageData.name

    let imageLikes = document.querySelector("#likes").innerText = imageData.like_count
    let image = document.querySelector("#image").src = imageData.url
    // let imageId = document.querySelector("#image").dataSet= imageData.id
    imageDiv.append(imageName)
    imageDiv.append(image)
    imageDiv.append(imageLikes)
    // parentDiv.append(imageId)
}


function editLikes(){

  let parentDiv = document.querySelector("#image_card")
  parentDiv.addEventListener("click", function(event){
    event.preventDefault()
    let likeNum = parseInt(event.target.parentNode.querySelector("#likes").innerText)
    likeNum++
    fetch("https://randopic.herokuapp.com/likes/1714", {
      method: "POST",
      headers: {"Content-Type": "Application/json"},
      body: JSON.stringify({"like_count": likeNum})
    }).then(res => {
      event.target.parentNode.querySelector("#likes").innerText = likeNum
    })
  })
}

function addComments(){
  let commentForm = document.querySelector("#comment_form")
  commentForm.addEventListener("submit", function(event){
    event.preventDefault()
  let comment = event.target.querySelector("#comment_input").value
  // I am running out of time, so my plan here is to find the ul using queryselector
  // then create an li and assign it the comment and append it
  // then show it below
  fetch("https://randopic.herokuapp.com/comments/1714", {
    method: "POST",
    headers: {"Content-Type": "Application/json"},
    body: JSON.stringify({"comments": comment})
  }).then(res => res.json()).then(newData => {
    // show li here
    event.target.reset
  })
})
}
