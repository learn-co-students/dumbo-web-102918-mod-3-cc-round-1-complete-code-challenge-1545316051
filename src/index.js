document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1711 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const newImage = document.getElementById('image');
  const nameImage = document.getElementById('name');

  fetch(imageURL)
  .then(function (response){
    return response.json();
  })
  .then(function(data){

    console.log(data);

    for(element in data){
      console.log(element);

      newImage.src = element.url;
      nameImage = element.name;
      
    }

  })


})
