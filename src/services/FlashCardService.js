import axios from "axios"

const FlashCardService = axios.create({
    baseURL: "http://localhost:3001"
});

export default FlashCardService;
