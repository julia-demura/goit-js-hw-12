import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';

const galleryForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

let query = "";
let page = 1;
const perPage = 15;

galleryForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const searchQuery = evt.currentTarget.elements['search-text'].value.trim();
    if (searchQuery === "") {
        iziToast.warning({ message: "Please enter a search term!", position: "topRight" });
        return;
    }

    query = searchQuery;
    page = 1;

    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(query, page);
        if (data.hits.length === 0) {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
            });
            return;
        }
        createGallery(data.hits);

        if (page * perPage >= data.totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight"
            });
        } else {
            showLoadMoreButton();
        }
        galleryForm.reset();
    } catch (error) {
        console.log(error);
        iziToast.error({
            title: "Error",
            message: "Something went wrong with the server connection. Please try again later!",
            position: "topRight",
        });
    } finally {
            hideLoader();
        }
    
});

loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(query, page);
        createGallery(data.hits);

        const firstGalleryItem = document.querySelector('.gallery-item');
        if (firstGalleryItem) {
            const cardHeight = firstGalleryItem.getBoundingClientRect().height;
            window.scrollBy({
                top: cardHeight * 2,
                behavior: 'smooth',
            });
        }

        if (page * perPage >= data.totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight"
            });
        } else {
            showLoadMoreButton();
        }

    } catch (error) {
        console.log(error);
        iziToast.error({
            message: "Failed to load more images. Please try again.",
            position: "topRight"
        });
    } finally {
        hideLoader();
    }
});