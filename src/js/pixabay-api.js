import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '48823979-822a726f00604f1f8a353c21f';


export async function fetchImages(query, page) {
    const params = {
        key: API_KEY,
        q: query, 
        image_type: "photo", 
        orientation: "horizontal",
        safesearch: true,
        mode: 'cors',
        per_page: 40,
        page: page,
    };

    const loader = document.querySelector(".loader");
    loader.style.display = "block";

    try {
        const response = await axios.get(BASE_URL, { params });
        const images = response.data.hits;
        const totalHits = response.data.totalHits;

        if (images.length === 0) {
            iziToast.error({
                position: 'topRight',
                color: 'red',
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
        }
        return { images, totalHits };
    } catch (error) {
        iziToast.error({ message: 'Sorry. Please try again!' });
        console.error("Fetch error:", error);
        return { images: [], totalHits: 0 };
    } finally {
        loader.style.display = "none";
    }
}