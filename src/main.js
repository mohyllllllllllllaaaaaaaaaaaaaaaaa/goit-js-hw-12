import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages } from "./js/pixabay-api";
import { renderImages } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("#form");
const loader = document.querySelector(".loader");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = event.target.elements.text.value.trim();

    if (!text || /^\d+$/.test(text)) {
        iziToast.error({ message: "Please enter a search query!",
            position: "topRight",
            color: 'yellow',
         });
        return;
    }

    loader.style.display = "block"; 

    fetchImages(text)
        .then((images) => {
                renderImages(images);
            })
    
        .catch(() => {
            iziToast.error({ message: "There was an error fetching the images." });
        })
        .finally(() => {
            loader.style.display = "none"; 
        });
        form.reset();
});