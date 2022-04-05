import axios from "axios";

class ManipulateData {
    serverAddress = "https://tw-yk.website:8443/";
    testAddress = "http://localhost:8080/";

    delete(title) {
        return axios.delete( this.serverAddress + `article/deleteArticle/${title}` );
    }

    saveArticle(title, content) {
        return axios.post( this.serverAddress + "article/saveArticle", {"title":title, "content":content} );
    }

    updatePost(title, content) {
        return axios.put( this.serverAddress + "article/updateArticle", {"title":title, "content":content} );
    }

    uploadPicture(file) {
        return axios.post( this.serverAddress + "article/uploadPicture", file, {headers:{"Content-type":"multipart/form-data"}} );
    }

    updatePicture(file) {
        return axios.put( this.serverAddress + "article/updatePictures", file, {headers:{"content-type":"multipart/form-data"}} );
    }


    postman(account, subject, to, date, subjectName, body, index) {
        return axios.post( this.serverAddress + "sendMail/" + index.toString(), {"from":account, "subject":subject, "to":to, "date":date, "name":subjectName, "body":body});
    }

    gmailRegister(account, password) {
        return axios.post( this.serverAddress + `gmailRegister?gmail=${account}&appPassword=${password}` );
    }

    checkGmail(account) {
        return axios.post( this.serverAddress + `gmailCheck?gmail=${account}` );
    }
}

export default new ManipulateData();