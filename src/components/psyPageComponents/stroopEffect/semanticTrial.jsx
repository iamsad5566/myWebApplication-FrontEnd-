import React, {useState, useEffect} from 'react';
import stroopStimuli from './stroopStimuli';

let trial = 0;
const SemanticTrial = props => {
    let totalTrails = 16;

    const [result, setResult] = useState([]);
    const [question, setQuestion] = useState("藍色");
    const [questionColor, setQuestionColor] = useState("white");
    const [leftOption, setLeftOption] = useState({string:"", color:""});
    const [rightOption, setRightOption] = useState({string:"", color:""});

    // eslint-disable-next-line
    let listener = document.addEventListener('keydown', event => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            let correction = ""
            if (event.key === "ArrowLeft" && question.includes(leftOption.string)) {
                correction = "correct"
            } else {
                correction = "wrong"
            }
            
            let res = `"contion":"semantic", "trial":"${trial}", "response":"${event.key}", "correction":"${correction}"`;
            let tmp = [...result];
            tmp.push(res);
            setResult(tmp);

            if(trial === totalTrails) {
                trial = 0;
                

                
                props.handleMoveToNextBlock();
            } 
        }
    });

    useEffect( () => {
        let stimuliList = stroopStimuli.colorArray;
        let listening = false;

        const listener = event => {
            if (listening && (event.key === "ArrowRight" || event.key === "ArrowLeft")) {
                let correction = "";
                if (event.key === "ArrowLeft" && stimuliList[trial%length].target.string === leftOption.color) {
                    correction = "correct";
                } else {
                    correction = "wrong";
                }
                let res = `"contion":"color", "trial":"${trial+1}", "response":"${event.key}", "correction":"${correction}"`;
                let tmp = [...result];
                tmp.push(res);
                setResult(tmp);
                console.log(res);
                if(trial === totalTrails) {
                    trial = 0;
                    handleMoveToNextBlock();
                }
            }
            trial++;
        }
        
        window.addEventListener('keydown', listener);

        const removeEvent = () => {
            window.removeEventListener('keydown', listener);
        }

        if(trial % 8 === 0) {
            stroopStimuli.randomShuffle(stimuliList);
        }

        let length = stimuliList.length;
        const arr = [stimuliList[trial%length].target, stimuliList[trial%length].interference];

        if(trial % 2 === 0) {
            stroopStimuli.randomShuffle(arr);
        }

        setQuestionColor("white");
        setQuestion(`請選擇詞義為『${stimuliList[trial%length].target.string}』的選項`);
        setLeftOption({string:"", color:""});
        setRightOption({string:"", color:""});

        let countQuestion = setTimeout( () => {
            setQuestionColor("black");
        }, 500)

        let gap = setTimeout( () => {
            setQuestionColor("white");
            setQuestion("########");
        }, 2000)

        let countStimuli = setTimeout( () => {
            setLeftOption(arr[0]);
            setRightOption(arr[1]);
            listening = true;
        }, 3000)

        return () => {
            clearTimeout(countQuestion);
            clearTimeout(gap);
            clearTimeout(countStimuli);
            removeEvent();
        };
        // eslint-disable-next-line
    } ,[result])
    
    return ( 
        <React.Fragment>
            <div style={{width:"90%", textAlign:"center"}}>
                <div style={{marginTop:"-4em", color:questionColor, fontWeight:"bold", textAlign:"center", fontSize:"1.5em"}}>{question}</div>
                <div></div>
                
                <div className="container" style={{marginTop:"2em"}}>
                    <div className="row justify-content-md-center">
                        <div className="col" style={{textAlign:"right", fontWeight:"bold", color:leftOption.color, fontSize:"3em"}} id="option">
                            {leftOption.string}
                        </div>
                        <div className="col-2" style={{textAlign:"center", fontWeight:"bold", fontSize:"3em"}}>
                            +
                        </div>
                        <div className="col" style={{textAlign:"left", fontWeight:"bold", color:rightOption.color, fontSize:"3em"}} id="option">
                            {rightOption.string}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default SemanticTrial;
