document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

  let imageId = 1721; //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

  const likeURL = `https://randopic.herokuapp.com/likes/`;

  const commentsURL = `https://randopic.herokuapp.com/comments/`;
  getImage(imageURL);
});

function getImage(imageURL) {
  fetch(`${imageURL}`)
    .then(res => res.json())
    .then(data => getData(data));
}

function getData(data) {
  document.querySelector("#image").src = data.url;
  document.querySelector("#likes").innerText = data.like_count;
  document.querySelector("#name").innerText = data.name;
  let commentsUl = document.querySelector("#comments");
  comments = data.comments;
  comments.forEach(comment => {
    let commentLi = document.createElement("li");
    commentLi.innerText = comment.content;
    commentsUl.append(commentLi);
  });
  // comments.
}

let likeButton = document.querySelector("#like_button");
likeButton.addEventListener("click", function() {
  let likes = document.querySelector("#likes").innerText;
  let total = parseInt(likes) + 1;
  document.querySelector("#likes").innerText = total;
  addLike(total);
});

function addLike(total) {
  document.preventDefault();
  fetch("https://randopic.herokuapp.com/likes/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: 1721, like_count: total })
  });
  // debugger;
}
