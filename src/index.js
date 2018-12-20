document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1708;

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})
// ADD IMAGE AND LOAD INITAL DATA
async function getImage() {
  const response = await fetch(`https://randopic.herokuapp.com/images/1708`);
  const data = await response.json();
  return data;
}

// MANAGE DATA FOR BOTH IMAGE AND COMMENT SEPARATELY
getImage().then(image => {
  image_id = image["id"];
  showImageInfo(image["id"], image["url"], image["like_count"]);

  image['comments'].forEach(function (comment) {
    showCommentInfo(comment.id, comment.image_id, comment.content)
  });
  document.getElementById('name').innerText = "LaSkilzs Code Challenge";
});

// SHOW IMAGE INFO
function showImageInfo(id, url, likes) {
  document.getElementById('image').src = url;
  document.getElementById('likes').innerText = likes;
}
// SHOW COMMENT INFO
function showCommentInfo(id, image_id, content) {
  document.getElementById('comments').innerHTML += `<li>${content}</li>`
}

// EVENT LISTENER FOR LIKES
document.getElementById('like_button').addEventListener('click', changeLike)

function changeLike(e) {
  like_count = parseInt(document.getElementById('likes').innerText)
  like_count = like_count + 1

  addLikes(image_id, like_count).then(likes => {
    document.getElementById('likes').innerText = like_count;
  })


}

async function addLikes(image_id, like_count) {
  const response = await fetch('https://randopic.herokuapp.com/likes', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image_id: image_id, like_count: like_count })
  });
}


// ADD COMMENT TO DOM

document.querySelector('input[type="submit"]').addEventListener('click', newComment)

function newComment(e) {
  let content = document.getElementById('comment_input').value;
  document.getElementById('comments').innerHTML += `<li>${content}</li>`
  document.getElementById('comment_input').value = "";
  e.preventDefault();
}


async function addComment(image_id, content) {
  const response = await fetch('https://randopic.herokuapp.com/comments', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image_id: image_id, content: content })
  })
  const resData = await response.json();
  return resData;
}





