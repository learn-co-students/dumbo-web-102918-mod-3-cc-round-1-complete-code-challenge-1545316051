document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  imageId = 1716 //Enter the id from the fetched image here
  // let url = `https://randopic.herokuapp.com/images/:id`
  divImage = document.getElementById('image');
  title = document.getElementById('name');
  like=document.getElementById('likes');
  likeBtn = document.getElementById('like_button');
  likeBtn.addEventListener('click', updateLike)


  inputComment = document.getElementById('comment_input');
  ulComment = document.getElementById('comments');
  submit = document.querySelector('[type="submit"]');
  submit.addEventListener('click', addComment)

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(res => res.json())
    .then(data => displayImage(data))

})
function displayImage (data) {
  // body...
  console.log(data);

  divImage.src=data.url
  title.innerText = data.name
  like.innerText = data.like_count
  for(let comment of data.comments){
    let li = document.createElement('li');
    li.innerText = comment.content;
    li.setAttribute('id', comment.id);
    ulComment.appendChild(li);

    let liDel = document.createElement('button');
    liDel.innerText = "Delete";
    liDel.style.display = 'inline';
    ulComment.appendChild(liDel);
    liDel.addEventListener('click', deleteComment);
  }
  // divImage.appendChild()
  // console.log(data.url);
}
function updateLike (e) {
  // body...
  let likes = ++e.target.previousElementSibling.childNodes[1].innerText;

  fetch('https://randopic.herokuapp.com/likes',{
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      image_id:imageId,
      like_count:likes
    })
  })

  // console.log(likes);
}


function addComment (e) {
  // body...
  e.preventDefault();
  // console.log(ulComment);
  let liComment = document.createElement('li');
  liComment.innerText = inputComment.value;
  ulComment.appendChild(liComment);

  let liDel = document.createElement('button');
  liDel.innerText = "Delete";
  ulComment.appendChild(liDel);
  liDel.addEventListener('click', deleteComment);

  // inputComment.value = "";

  fetch('https://randopic.herokuapp.com/comments',{
    method: 'POST',
    headers:{'Accept': 'application/json',
    'Content-Type': 'application/json'},
    body:JSON.stringify({
      image_id:imageId,
      content:inputComment.value
    })
  })
  // .then(res=>res.json())
  // .then(json=>showComment(json))


  inputComment.value = "";
}
function deleteComment (e) {
  // body...
  // console.log(e.target);
  let commentBox = e.target.previousElementSibling;
  let comment_id = commentBox.getAttribute('id');
  commentBox.remove();
  e.target.remove();

  fetch(`https://randopic.herokuapp.com/comments/${comment_id}`,{
    method: 'DELETE',
    headers:{'Accept': 'application/json',
    'Content-Type': 'application/json'},
    body:JSON.stringify({
      image_id:imageId,
      content:inputComment.value
    })
  })
}

// function showComment (comment) {
//   // body...
//   let liComment = document.createElement('li');
//   liComment.innerText = inputComment.value;
//   ulComment.appendChild(liComment);
//
//   let liDel = document.createElement('button');
//   liDel.innerText = "Delete";
//   ulComment.appendChild(liDel);
//   liDel.addEventListener('click', deleteComment);
// }
