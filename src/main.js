import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages } from "./js/pixabay-api";
import { renderImages } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("#form");
const loader = document.querySelector(".loader");
const text = e.target.elements.text.value.trim();
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!text || /^\d+$/.test(text)) {
        iziToast.error({ message: "Please enter a search query!",
            position: "topRight",
            color: 'yellow',
         });
        return;
    }
    loader.style.display = "block"; 
 try{ const images = await fetchImages(text);
                renderImages(images);
            }
    
        catch(error){
            iziToast.error({ message: "There was an error fetching the images." });
        }
        finally{
            loader.style.display = "none"; 
            form.reset();
        };      
});