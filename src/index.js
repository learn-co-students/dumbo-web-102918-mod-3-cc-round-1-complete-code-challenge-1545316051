document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1712 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  document.getElementById("like_button").addEventListener("click", likeHandler);

  document.getElementById("comment_form").addEventListener("submit", formCommentHandler);

  document.getElementById("comments").addEventListener("click", deleteHandler);

  fetch(imageURL).then(res => res.json()).then(loadImageHandler);

})

function loadImageHandler(imageData) {
  const title = document.getElementById("name");
  const likes = document.getElementById("likes");

  title.innerText = imageData.name;
  likes.innerText = imageData.like_count;
  for(comment of imageData.comments) {
    addComment(comment);
  }
}

function addComment(comment) {
  const ulRoot = document.getElementById("comments");
  const liNode = document.createElement("li");
  const btnDelete = document.createElement("button");
  btnDelete.type = "button";
  btnDelete.innerText = "Delete";
  if(comment.id === undefined) btnDelete.dataset.id = 0;
  else btnDelete.dataset.id = comment.id;
  liNode.innerText = comment.content;
  liNode.appendChild(btnDelete);
  ulRoot.appendChild(liNode);
}

function likeHandler() {
  const totalLikes = ++(document.getElementById("likes").innerText);
  const imageId = 1712; //Enter the id from the fetched image here
  const likeURL = `https://randopic.herokuapp.com/likes/`;

  fetch(likeURL, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ image_id: imageId }) })
}

function formCommentHandler(e) {
  e.preventDefault();
  const imageId = 1712;
  const commentsURL = `https://randopic.herokuapp.com/comments/`;
  let commentValue = { content: e.target.children[0].value };
  addComment(commentValue);

  fetch(commentsURL, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ image_id: imageId, content: commentValue.content }) }).then(res => res.json()).then(data => {
    document.getElementById("comments").lastChild.children[0].dataset.id = data.id;
  });

  e.target.reset();

}

function deleteHandler(e) {
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  if(e.target.type === "button") {
    const commentId = e.target.dataset.id;
    fetch(commentsURL + `${commentId}`, { method: "DELETE" })
    e.target.parentNode.remove();
  }
}
