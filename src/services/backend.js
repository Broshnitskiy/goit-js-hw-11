import axios from "axios";

export async function getImages(name, page, per_page) {
    const searchParams = {
        params: {
            key: "24331770-d1c322a83c5704f619e69b687",
            q:`${name}`,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page,
            per_page,
        }
    };

    const response = await axios.get("https://pixabay.com/api/", searchParams);
    return response.data;
};