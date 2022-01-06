import axios from "axios";

class GetData {
    serverAddress = "https://tw-yk.website:8443/";
    testAddress = "http://localhost:8080/";

    getAllArticles() {
        return axios.get( this.serverAddress + "article/getAllArticles" );
    }

    getSingleArticle(id) {
        return axios.get( this.serverAddress + `article/getSingleArticle/${id}`);
    }

    getSinglePicture(title) {
        return axios.get( this.serverAddress + `article/getSinglePicture/${title}` );
    }

    getBlogBrowse() {
        return axios.get( this.serverAddress + `article/getBlogBrowse` );
    }

    getArticleBrowse(id) {
        return axios.get( this.serverAddress + `article/getArticleBrowse?id=${id}` );
    }
}

export default new GetData();