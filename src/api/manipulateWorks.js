import axios from "axios";

class ManipulateWorks {
    serverAddress = "https://tw-yk.website:8443/";
    testAddress = "http://localhost:8080/";

    saveWork(title, url, iconUrl) {
        return axios.post( this.serverAddress + `works/saveWork`, {"title":title, "url":url, "iconUrl":iconUrl} );
    }

    getAllWorks() {
        return axios.get( this.serverAddress + `works/getAllWorks`);
    }

    deleteWork(title) {
        return axios.delete( this.serverAddress + `works/deleteWork/${title}` )
    }
}

export default new ManipulateWorks();