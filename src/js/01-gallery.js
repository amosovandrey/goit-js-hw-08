// Описан в документации
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.min.js';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryEl = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);
galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

function onItemClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const imageUrl = e.target.dataset.source;

  modalOpen(imageUrl);
}

function modalOpen(imageUrl) {
  const instance = basicLightbox.create(
    `
<img src="${imageUrl}">
`,
    {
      onShow: () => {
        window.addEventListener('keydown', modalClose);
      },
      onClose: () => {
        window.removeEventListener('keydown', modalClose);
      },
    }
  );

  function modalClose(e) {
    if (e.key === 'Escape') {
      instance.close();
    }
  }

  instance.show();
}

galleryEl.addEventListener('click', onItemClick);
