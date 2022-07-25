import axios from "axios";

class GetData {
    serverAddress = "https://tw-yk.website:81/";
    testAddress = "http://localhost:8080/";

    getAllArticles(category) {
        return axios.get( this.serverAddress + `article/getAllArticles/${category}` );
    }

    getRowsByCategory(category) {
        return axios.get( this.serverAddress + `article/get_rows_by_category/${category}` );
    }

    getPageContent(offset, pageSize, category) {
        return axios.post( this.serverAddress + `article/get_page_content`, {"offset":offset, "pageSize":pageSize, "category":category});
    }

    getSingleArticle(postId) {
        return axios.get( this.serverAddress + `article/getSingleArticle/${postId}`);
    }

    getBlogBrowse() {
        return axios.get( this.serverAddress + `article/getBlogBrowse` );
    }

    getArticleBrowse(postId) {
        return axios.get( this.serverAddress + `article/getArticleBrowse?postId=${postId}` );
    }
}

export default new GetData();