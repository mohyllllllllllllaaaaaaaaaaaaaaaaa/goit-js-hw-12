import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '48823979-822a726f00604f1f8a353c21f';

export async function fetchImages(searchQuery) {
    const params = {
        key: API_KEY,
        q: searchQuery, 
        image_type: "photo", 
        orientation: "horizontal",
        safesearch: true,
         mode: 'cors',
         per_page: 40,
         page: 1
    };
    const loader = document.querySelector(".loader");
    loader.style.display = "block";
 
    const response = await axios.get(BASE_URL, {params})
    try {
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
    }
    catch(error)  {
        
        iziToast.error({ message: 'Sorry. Please try again!'}); 
        console.error("Fetch error:", error);
        return [];
    }finally{
        loader.style.display = "none";
    };

}