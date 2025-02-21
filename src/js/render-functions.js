import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
export function renderImages(images) {
    gallery.innerHTML = '';

    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
        `<a href="${largeImageURL}" class="gallery-item">
            <img src="${webformatURL}" alt="${tags}" class="gallery-image" />
            <div class="info">
                <p><strong>Likes:</strong> ${likes}</p>
                <p><strong>Views:</strong> ${views}</p>
                <p><strong>Comments:</strong> ${comments}</p>
                <p><strong>Downloads:</strong> ${downloads}</p>
            </div> 
        </a>`
    ).join("");

    gallery.innerHTML = markup;
    const lightbox = new SimpleLightbox(".gallery a", {
        captionsData: "alt",
        captionDelay: 250,
    }).refresh();
}