import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryForm = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
    const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img 
            class="gallery-image" 
            src="${webformatURL}" 
            alt="${tags}" 
            loading="lazy" 
          />
        </a>
        <ul class="info">
          <li class="info-item"><b>Likes</b> ${likes}</li>
          <li class="info-item"><b>Views</b> ${views}</li>
          <li class="info-item"><b>Comments</b> ${comments}</li>
          <li class="info-item"><b>Downloads</b> ${downloads}</li>
        </ul>
      </li>
    `
    )
        .join('');
    galleryForm.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
  galleryForm.innerHTML = '';
}

export function showLoader() {
  if (loader) {
    loader.classList.remove('is-hidden');
  }
}

export function hideLoader() {
  if (loader) {
    loader.classList.add('is-hidden');
  }
}

export function showLoadMoreButton() {
  if (loadMoreBtn) loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  if (loadMoreBtn) loadMoreBtn.classList.add('is-hidden');
}