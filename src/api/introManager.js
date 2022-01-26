import axios from "axios";

class introManager {
    serverAddress = "https://tw-yk.website:8443/";
    testAddress = "http://localhost:8080/";

    getIntro() {
        return axios.get(this.serverAddress + "getIntro");
    }

    getStatus() {
        return axios.get(this.serverAddress + "getStatus");
    }

    updateIntro(content) {
        return axios.post(this.serverAddress + "updateIntro", {"content":content});
    }

    updateStatus(content) {
        return axios.post(this.serverAddress + "updateStatus", {"content":content});
    }
}

export default new introManager();