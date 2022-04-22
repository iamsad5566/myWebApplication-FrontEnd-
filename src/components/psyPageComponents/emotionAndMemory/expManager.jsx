import React, { useState } from 'react';
import Exp from './exp';
import Prepare from './prepare';
import Respond from './respond';
import stimuli from './stimuli';

const ExpManager = () => {
    const [round, setRound] = useState(1);
    const [ready, setReady] = useState(false);
    const [done, setDone] = useState(false);

    const trials = 7;

    const handleDone = () => {
        setDone(true);
        setRound(round => round+1);
    }

    const handlReady = () => {
        stimuli.randomShuffle(stimuli.neutral);
        setReady(true);
    }

    const handleSumbit = () => {
        setReady(false);
        setDone(false);
    }

    return ( 
        <React.Fragment>
            {ready?
                (done? <Respond handleSumbit={handleSumbit}/>:<Exp trials={trials} handleDone={handleDone} round={round}/>):<Prepare round={round} handlReady={handlReady}/>
            }
        </React.Fragment>
     );
}
 
export default ExpManager;