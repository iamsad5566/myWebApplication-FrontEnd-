import axios from "axios";

class ManipulateData {
    delete(id) {
        return axios.delete(`http://localhost:8080/article/deleteArticle/${id}`);
    }

    savePost(title, content) {
        return axios.post("http://localhost:8080/article/saveArticle", {"title":title, "content":content});
    }

    uploadPicture(file) {
        return axios.post("http://localhost:8080/article/upload", file, {headers:{"Content-type":"multipart/form-data"}});
    }

    updatePost(id, title, content) {
        return axios.put("http://localhost:8080/article/update", {"id":id, "title":title, "content":content});
    }
}

export default new ManipulateData();