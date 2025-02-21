import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '48823979-822a726f00604f1f8a353c21f';

export function fetchImages(searchQuery) {
    const loader = document.querySelector(".loader");
    loader.style.display = "block";

    return axios.get(BASE_URL, {
        params: {
            key: API_KEY,
            q: searchQuery, 
            image_type: "photo", 
            orientation: "horizontal",
            safesearch: true,
             mode: 'cors'
        }
    })
    .then((response) => {
        const images = response.data.hits;
        
        if (images.length === 0) {
            iziToast.error({
                position: 'topRight',
                color: 'red',
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
        }
        return images;
    })
    .catch((error) => {
        loader.style.display = "none";
        iziToast.error({ message: 'Sorry. Please try again!'}); 
        console.error("Fetch error:", error);
        return [];
    });

}