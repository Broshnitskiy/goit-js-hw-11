import "./css/styles.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.2.min.css";
import axios from "axios";

const formRef = document.querySelector("#search-form");
const galleryRef = document.querySelector(".gallery");
const btnLoadRef = document.querySelector(".load-more");

btnLoadRef.setAttribute("disabled", "true");
let page = 1;
let inputName = "";

formRef.addEventListener("submit", onSubmitForm);

  async function onSubmitForm(event) {
    event.preventDefault();
    galleryRef.innerHTML = "";
    btnLoadRef.removeAttribute("disabled", "true");
    inputName = event.target.searchQuery.value;
    if (inputName.trim() === "") {
        return
    };
    // getImages(inputName)
    //     .then(( { hits: images } ) => {
    //         if(images.length===0) {
    //             Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    //         }
    //     images.map(image => {
    //       galleryRef.insertAdjacentHTML("beforeend", markImageCard(image))
    //     });
    //       page += 1;
    //     })
    //     .catch(error => {
    //     console.log(error)
    // })
    
    try {
      const data = await getImages(inputName.trim());
      const images = data.hits;

        if (images.length===0) {
           Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        }
      
      images.map(image => {
          galleryRef.insertAdjacentHTML("beforeend", markImageCard(image))
        });

    }
    catch(error) {
      console.log(error.message)
    }
}

  
 async function getImages(name) {
    const searchParams = {
        params: {
            key: "24331770-d1c322a83c5704f619e69b687",
            q:`${name}`,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page,
            per_page: 40,
        }
    };

    const response = await axios.get("https://pixabay.com/api/", searchParams);
    return response.data;
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







