import React, { useState } from 'react';
import StroopEnd from './end';
import StroopColorBlock from './stroopColorBlock';
import StroopSemanticBlock from './stroopSemanticBlock';

const StroopController = () => {
    /* 
        Only two blocks in thise experiment. In the first block we need to select color of a word, in the second block, we need to select the smatic meaning of a word
    */
    const randomIndex = maxNum => {
        return Math.floor(Math.random() * maxNum);
    }

    const blockArray = ["Color", "Semantic meaning"];
    const [block, setBlock] = useState(blockArray[randomIndex(2)]);
    const [acc, setAcc] = useState(0);
    const [end, setEnd] = useState(false);

    const handleMoveToNextBlock = () => {
        switch(acc) {
            case 0:
                setAcc(acc => acc+1);
                if(block === "Color")
                    setBlock("Semantic meaning");
                else
                    setBlock("Color");
                break;
            
            case 1:
                setEnd(true);
                break;
        }
    }

    return ( 
        <React.Fragment>
            { end? <StroopEnd/>:(block === "Color"? <StroopColorBlock handleMoveToNextBlock={handleMoveToNextBlock}/>:<StroopSemanticBlock handleMoveToNextBlock={handleMoveToNextBlock}/>)}
        </React.Fragment>
     );
}
 
export default StroopController;