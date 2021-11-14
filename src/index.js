import "./css/styles.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.2.min.css";
import axios from "axios";

const formRef = document.querySelector("#search-form");
const galleryRef = document.querySelector(".gallery");

formRef.addEventListener("submit", onSubmitForm);

function onSubmitForm(event) {
    event.preventDefault();
    galleryRef.innerHTML = "";
    const inputName = event.target.searchQuery.value;
    getImages(inputName)
        .then(({ data: { hits: images } }) => {
            if(images.length===0) {
                Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            }
        images.map(image => {
         galleryRef.insertAdjacentHTML("beforeend", markImageCard(image))})
        })
        .catch(error => {
        console.log(error)
    })
   
}

  
 async function getImages(name) {
    const searchParams = {
        params: {
            key: "24331770-d1c322a83c5704f619e69b687",
            q:`${name}`,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
        }
    };

    const response = await axios.get("https://pixabay.com/api/", searchParams);
    return response;
};


function markImageCard({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
    return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes </b>${likes}
    </p>
    <p class="info-item">
      <b>Views </b>${views}
    </p>
    <p class="info-item">
      <b>Comments </b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads </b>${downloads}
    </p>
  </div>
</div>`
}







