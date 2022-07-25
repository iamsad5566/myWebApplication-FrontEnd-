import React, { useState } from 'react';
import Tools from '../Tools';
import Block from './Block';
import End from './end';

const BlockController = () => {
    const [currIndex, setCurrIndex] = useState(0);
    const trialNum = 8;

    let condition = ["easy", "hard"];
    let [currTrial, setCurrTrial] = useState(0);

    if(currTrial === 0) {
        Tools.randomShuffle(condition);
    }

    const handleNextTrial = () => {
        setCurrTrial(currTrial => currTrial+1);
    }

    const handleNextRound = () => {
        setCurrIndex(currIndex => currIndex+1);
        setCurrTrial(0);
    }

    return ( 
        <React.Fragment>
            {currIndex < 2? <Block currIndex={currIndex+1} level={condition[currIndex]} currTrial={currTrial} handleNextTrial={handleNextTrial} trialNum={trialNum} handleNextRound={handleNextRound}/>:<End/>}
        </React.Fragment>
     );
}
 
export default BlockController;