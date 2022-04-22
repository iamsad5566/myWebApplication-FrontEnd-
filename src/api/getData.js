import axios from "axios";

class GetData {
    serverAddress = "https://tw-yk.website:81/";
    testAddress = "http://localhost:8080/";

    getAllArticles() {
        return axios.get( this.serverAddress + "article/getAllArticles" );
    }

    getSingleArticle(postId) {
        return axios.get( this.serverAddress + `article/getSingleArticle/${postId}`);
    }

    getAllPicturesInArticle(postId) {
        return axios.get( this.serverAddress + `article/getAllPicturesInArticle/${postId}`)
    }

    getBlogBrowse() {
        return axios.get( this.serverAddress + `article/getBlogBrowse` );
    }

    getArticleBrowse(postId) {
        return axios.get( this.serverAddress + `article/getArticleBrowse?postId=${postId}` );
    }
}

export default new GetData();