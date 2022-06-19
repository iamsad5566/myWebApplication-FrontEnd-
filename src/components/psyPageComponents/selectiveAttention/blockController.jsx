import React, { useState } from 'react';
import Tools from '../Tools';
import Block from './Block';
import End from './end';

const BlockController = () => {
    const [currIndex, setCurrIndex] = useState(0);

    let condition = ["easy", "hard"];
    Tools.randomShuffle(condition);

    const handleRound = () => {
        setCurrIndex(currIndex => currIndex+1);
    }

    return ( 
        <React.Fragment>
            {currIndex < 2? <Block currIndex={currIndex+1} level={condition[currIndex]} handleRound={handleRound}/>:<End/>}
        </React.Fragment>
     );
}
 
export default BlockController;