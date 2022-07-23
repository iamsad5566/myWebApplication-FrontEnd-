import axios from "axios";

class ManipulateData {
    serverAddress = "https://tw-yk.website:81/";
    testAddress = "http://localhost:8080/";

    delete(title) {
        return axios.delete( this.serverAddress + `article/deleteArticle/${title}` );
    }

    saveArticle(title, content, category) {
        return axios.post( this.serverAddress + "article/saveArticle", {"title":title, "content":content, "category":category} );
    }

    updatePost(title, content, postId) {
        return axios.put( this.serverAddress + "article/updateArticle", {"title":title, "content":content, "postId":postId} );
    }

    postman(account, subject, to, date, subjectName, body) {
        return axios.post( this.serverAddress + "sendMail/", {"from":account, "subject":subject, "to":to, "date":date, "name":subjectName, "body":body});
    }

    gmailRegister(account, password) {
        return axios.post( this.serverAddress + `gmailRegister?gmail=${account}&appPassword=${password}` );
    }

    checkGmail(account) {
        return axios.post( this.serverAddress + `gmailCheck?gmail=${account}` );
    }

    sendTemplate(key, body) {
        return axios.post( this.serverAddress + "saveTemplate", {"key":key, "body":body} )
    }

    getAllTemplate() {
        return axios.get( this.serverAddress + "getTemplates" );
    }

    deleteTemplate(id) {
        return axios.post( this.serverAddress + `deleteTemplateById?id=${id}` );
    }

}

export default new ManipulateData();