import axios from "axios";

class psyService {
    serverAddress = "";
    testAddress = "http://localhost:8844/";

    saveStroopEffectSubject(subject, information) {
        return axios.post(this.testAddress + "stroop_effect/save_subject", {"subject":subject, "information":information});
    }

    getStroopEffect(subject) {
        return axios.get(this.testAddress + `stroop_effect/get?subject=${subject}`);
    }

    updateStroopEffect(subject, reponse) {
        
    }
}

export default new psyService();