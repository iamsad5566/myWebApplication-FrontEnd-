import axios from "axios";

class psyService {
    serverAddress = "";
    testAddress = "http://localhost:8844/";

    saveStroopEffect(subject, information, result) {
        return axios.post(this.testAddress + "stroop_effect/save/" + {"subject":subject, "information":information, "result":result});
    }

    getStroopEffect(subject) {
        return axios.get(this.testAddress + `stroop_effect/get?subject=${subject}`);
    }
}

export default new psyService();