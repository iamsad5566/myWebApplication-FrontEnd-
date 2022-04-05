import axios from "axios";

class GetData {
    serverAddress = "https://tw-yk.website:8443/";
    testAddress = "http://localhost:8080/";

    getAllArticles() {
        return axios.get( this.serverAddress + "article/getAllArticles" );
    }

    getSingleArticle(title) {
        return axios.get( this.serverAddress + `article/getSingleArticle/${title}`);
    }

    getAllPicturesInArticle(title) {
        return axios.get( this.serverAddress + `article/getAllPicturesInArticle/${title}`)
    }

    getBlogBrowse() {
        return axios.get( this.serverAddress + `article/getBlogBrowse` );
    }

    getArticleBrowse(title) {
        return axios.get( this.serverAddress + `article/getArticleBrowse?title=${title}` );
    }
}

export default new GetData();