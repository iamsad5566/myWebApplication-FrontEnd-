import axios from "axios";

class GetPsyData {
    serverAddress = "https://tw-yk.website:81/";
    testAddress = "http://localhost:8080/";

    getList() {
        return axios.get( this.serverAddress + "getList" );
    }

    getDataMap(link) {
        return axios.post( this.serverAddress + "getDataMap" , {"link":link});
    }

    getTotalNumbersEachCounty(county) {
        return axios.get( this.serverAddress + "getTotalNumbersEachCounty", { "county":county } );
    }

    getNumbersByEachYearAndCounty(year, county) {
        return axios.get( this.serverAddress + "getNumbersByEachYearAndCounty", { "year":year, "county":county}  );
    }

    getNumbersByAllCounty() {
        return axios.get( this.serverAddress + "getNumbersByAllCounty" );
    }

    saveData(year, county, numbers) {
        return axios.post( this.serverAddress + "saveData", {"year":year, "county":county, "numbers":numbers} );
    }

    resetData() {
        return axios.delete( this.serverAddress + "resetData" );
    }
}

export default new GetPsyData();