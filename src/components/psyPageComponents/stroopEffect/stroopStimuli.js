class StroopStimuli {
    colorArray = [
        {target:{string:"紅", color:"blue"}, interference:{string:"藍", color:"red"}},
        {target:{string:"藍", color:"red"}, interference:{string:"紅", color:"blue"}},
        {target:{string:"綠", color:"gold"}, interference:{string:"黃", color:"green"}},
        {target:{string:"黃", color:"green"}, interference:{string:"綠", color:"gold"}},
        {target:{string:"紅", color:"red"}, interference:{string:"藍", color:"blue"}},
        {target:{string:"藍", color:"blue"}, interference:{string:"紅", color:"red"}},
        {target:{string:"綠", color:"green"}, interference:{string:"黃", color:"gold"}},
        {target:{string:"黃", color:"gold"}, interference:{string:"綠", color:"green"}}
    ];

    randomShuffle(array) {
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
}

export default new StroopStimuli();