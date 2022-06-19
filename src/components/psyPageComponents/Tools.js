class Tools {
    
    randomShuffle = array => {
        let len = array.length;
        let output = [];

        while(output.length !== len) {
            let index = Math.floor(len * Math.random());
            if(!output.includes(array[index]))
                output.push(array[index]);
        }

        for(let i = 0; i < len; i++)
            array[i] = output[i];
    }

    randomSelect = num => {
        let newNum = Math.ceil(num * Math.random());
        return newNum;
    } 
}

export default new Tools();