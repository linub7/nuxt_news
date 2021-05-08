import { axios } from "../nuxt.config";

export default function({ $axios }) {
    $axios.onRequest( config => {
        config.headers.common['Authorization'] = process.env.NEWS_API_KEY;
    })
}