import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages } from "./js/pixabay-api";
import { renderImages } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";

const form = document.querySelector("#form");
const loader = document.querySelector(".loader");
const btnLoadMore = document.querySelector(".load-more");
const gallery = document.querySelector(".gallery");
let query = "";
let page = 1;
let per_page = 40;
let totalHits = 0;


form.addEventListener("submit", async (event) => {
    event.preventDefault();
    query = event.target.elements.text.value.trim();
    page = 1;
    gallery.innerHTML = ""; 
   
    
    if (!query ||  /^\d+$/.test(query.trim())) {
        iziToast.error({ message: "Please enter a search query!",
            position: "topRight",
            color: 'yellow',
         });
        return;
    }
      hiddenBtnLoadMore();
    loader.style.display = "block"; 
    try {
        const { images, totalHits: newTotalHits } = await fetchImages(query, page);
        totalHits = newTotalHits;
        renderImages(images);
    } catch (error) {
        iziToast.error({ message: "There was an error fetching the images.", position: "topRight", color: "red" });
    } finally {
        loader.style.display = "none"; 
        form.reset();
    }
    showBtnLoadMore();
});

function showBtnLoadMore() {
    btnLoadMore.classList.remove('hidden');
}

function hiddenBtnLoadMore() {
    btnLoadMore.classList.add('hidden');
}

function showEndMessage() {
    iziToast.info({ position: 'topRight', message: "Sorry, you've reached the end of search results.", color: 'red' });
}

function scrollToNewGallery() {
   const galleryItem = document.querySelector(".gallery-item:last-child");
  if (galleryItem) {
       const rect = galleryItem.getBoundingClientRect();
      const itemHeight = rect.height;
      window.scrollBy({ top:  itemHeight * 2, behavior: 'smooth',});
    };}

btnLoadMore.addEventListener('click', async () => {
    page += 1; 
    loader.style.display = "block";
    try {
        const { images } = await fetchImages(query, page);
        renderImages(images);
        scrollToNewGallery();
      
        if (gallery.children.length >= totalHits) {
            hiddenBtnLoadMore();
            showEndMessage();
        }
       
    } catch (error) {
        console.error("Fetch error:", error);
    } finally {
        loader.style.display = "none";
    }
});
 
