import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

const galleryForm = document.querySelector('.form');

galleryForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const searchQuery = evt.currentTarget.elements['search-text'].value.trim();
    if (searchQuery === "") {
        iziToast.warning({ message: "Please enter a search term!", position: "topRight" });
        return;
    }
    clearGallery();

    showLoader();

    getImagesByQuery(searchQuery)
        .then((data) => {
            if (data.hits.length === 0) {
                iziToast.error({
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: "topRight",
                });
                return;
            }
            createGallery(data.hits);
            
             galleryForm.reset(); 
        })
        .catch((error) => {
            console.log(error);
            iziToast.error({
                title: "Error",
                message: "Something went wrong with the server connection. Please try again later!",
                position: "topRight",
            });
        })
        .finally(() => {
            hideLoader();
        })
    
});