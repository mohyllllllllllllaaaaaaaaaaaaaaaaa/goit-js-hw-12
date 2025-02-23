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

function showBtnLoadMore() {
    btnLoadMore.classList.remove('hidden');
}

function hiddenBtnLoadMore() {
    btnLoadMore.classList.add('hidden');
}

function showEndMessage() {
    iziToast.info({ position: 'bottomCenter', message: "Sorry, you've reached the end of search results.", color: 'red' });
}
function showLoader(afterElement){
    loader.style.display = "block"; 
    afterElement.insertAdjacentElement("afterend", loader);
}
function hiddenLoader(){
    loader.style.display = "none"; 
}

function scrollToNewGallery() {
   const galleryItem = document.querySelector(".gallery-item:last-child");
  if (galleryItem) {
       const rect = galleryItem.getBoundingClientRect();
      const itemHeight = rect.height;
      window.scrollBy({ top:  itemHeight * 2, behavior: 'smooth',});
    };}
    function checkPage(){
        const totalPage = Math.ceil(totalHits / per_page);
        if(page >= totalPage){
            hiddenBtnLoadMore();
            showEndMessage();
        }else{
            showBtnLoadMore();
        }
    };

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
          showLoader(form);
        try {
            const { images, totalHits: newTotalHits } = await fetchImages(query, page);
            totalHits = newTotalHits;
            if(images.length === 0){
                iziToast.error({
                    message: "No images found", position: "topRight", color: "red"
                });
                return;
            }
            renderImages(images);
            checkPage();
        } catch (error) {
            iziToast.error({ message: "There was an error fetching the images.", position: "topRight", color: "red" });
            hiddenBtnLoadMore();
        } finally {
            hiddenLoader();
            form.reset();
        }
    });

btnLoadMore.addEventListener('click', async () => {
    page += 1; 
    showLoader(btnLoadMore);
    try {
        const { images } = await fetchImages(query, page);
        if (images.length === 0) {
            hiddenBtnLoadMore();
            return;
        }
        renderImages(images);
        scrollToNewGallery();
        checkPage();  
    } catch (error) {
        iziToast.error({
            message: "Error loading more images.", position: "topRight", color: "red",
        });
        hiddenBtnLoadMore();
    } finally {
        hiddenLoader();
    }
});

 
