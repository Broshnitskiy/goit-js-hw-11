import "./css/styles.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.2.min.css";
import axios from "axios";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formRef = document.querySelector("#search-form");
const galleryRef = document.querySelector(".gallery");
const btnLoadRef = document.querySelector(".load-more");

btnLoadRef.classList.add("hidden");
let page = 1;
const per_page = 40;
let inputName = "";


formRef.addEventListener("submit", onSubmitForm);
btnLoadRef.addEventListener("click", onBtnLoadClick)

async function onSubmitForm(event) {
    event.preventDefault();
    galleryRef.innerHTML = "";
    page = 1;
    btnLoadRef.classList.add("hidden");
    inputName = event.target.searchQuery.value;

  if (inputName.trim() === "") {
      return;
    };
  
    try {
      const data = await getImages(inputName.trim());
      
        if (data.hits.length===0) {
          Notify.failure("Sorry, there are no images matching your search query. Please try again.", { timeout: 3500 });
        } else {
          Notify.success(`Hooray! We found ${data.totalHits} images`, { timeout: 2500 });
          markImageCard(data.hits);
          new SimpleLightbox('.gallery a', {captionsData: "alt", captionDelay: 250});
          page += 1;

          btnLoadRef.classList.remove("hidden");
        }
      
    }
    catch(error) {
      console.log(error.message);
    }
};

async function onBtnLoadClick(){
  try {
    const data = await getImages(inputName.trim());
    
      if ((page * per_page) >= data.totalHits) {
        btnLoadRef.classList.add("hidden");
        Notify.info("We're sorry, but you've reached the end of search results.", { timeout: 5000 },)
       }
      
    markImageCard(data.hits);
    
    page += 1;
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
            per_page,
        }
    };

    const response = await axios.get("https://pixabay.com/api/", searchParams);
    return response.data;
};


function markImageCard(images) {
  const markUp = images.map(image => {
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
    return `<a class="gallery__item" href="${largeImageURL}">
      <div class="photo-card">
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
    </div>
    </a>`;
  }).join("");
  galleryRef.insertAdjacentHTML("beforeend", markUp)
};







