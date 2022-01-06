import axios from "axios";

class ManipulateData {
    serverAddress = "https://tw-yk.website:8443/";
    testAddress = "http://localhost:8080/";

    delete(id) {
        return axios.delete( this.serverAddress + `article/deleteArticle/${id}` );
    }

    saveArticle(title, content) {
        return axios.post( this.serverAddress + "article/saveArticle", {"title":title, "content":content} );
    }

    updatePost(id, title, content) {
        return axios.put( this.serverAddress + "article/updateArticle", {"id":id, "title":title, "content":content} );
    }

    uploadPicture(file) {
        return axios.post( this.serverAddress + "article/uploadPicture", file, {headers:{"Content-type":"multipart/form-data"}} );
    }

    updatePicture(file) {
        return axios.put( this.serverAddress + "article/updatePicture", file, {headers:{"content-type":"multipart/form-data"}} );
    }
}

export default new ManipulateData();