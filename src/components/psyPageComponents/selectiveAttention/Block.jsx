import React, { useEffect, useState } from 'react';
import CentralPosition from '../CentralPosition';
import Tools from '../Tools';
import expStimuli from './expStimuli';

const Block = props => {
    const prefix = "/SelectiveAttention/";
    const[fixation, setFixation] = useState("");
    const[picture, setPicture] = useState("");
    const[stimIndex, setStimIndex] = useState(0);
    const[switcher, setSwitcher] = useState({
        memorySet:"none",
        picture:"none",
    });
    const[text, setText] = useState("");
    const[probe, setProbe] = useState({
        num:-1,
        display:"none"
    });
    const[trial, setTrial] = useState(0);

    let condition = [expStimuli.condition].concat([expStimuli.condition]);
    let level = props.level;

    let stimuliList = expStimuli.stimuli;

    let memorySet = expStimuli.numberArr;
    let repetition = 2;

    let storage = [...expStimuli.numberArr];
    
    const[listening, setListening] = useState(false);

    // document.addEventListener('keydown', event => {
    //     console.log(props.trial);
    //     console.log(listening);
    //         if(event.key === "Enter" && listening) {
    //             handleNextTrial();
    //             console.log(props.trial);
    //         }
    //     }
    // );

    useEffect( () => {
        // Randomised
        expStimuli.randomShuffle(stimuliList);
        setListening(false);

        if(trial % 4 === 0) {
            expStimuli.randomShuffle(storage);
        }
        
        if(trial === 0) {
            setFixation("Round " + props.currIndex);
        }
        
        let milliSec = 0;
        // Round count down
        milliSec += 3000;
        let countDown = setTimeout( () => {
            setFixation("");
        }, milliSec)
        
        // Start
        // Fixation
        milliSec += 1000;
        countDown = setTimeout( () => {
            setFixation("+");
        }, milliSec)

        // MemorySet
        milliSec += 500;
        countDown = setTimeout( () => {
            setFixation("");
            setSwitcher({
                memorySet:"",
                picture:"none"
            });
        }, milliSec)
        
        // Show up fixation again
        milliSec += 1500;
        countDown = setTimeout( () => {
            setSwitcher({
                memorySet:"none",
                picture:"none"
            });
            setFixation("+");
        }, milliSec)

        // Show up images
        milliSec += 850;
        expStimuli.randomShuffle(condition[trial]);

        switch(condition[trial].length) {
            case 2:
                countDown = setTimeout( () => {
                    let name = ""
                    if(condition[trial][0] === "distraction") {
                        let arr = stimuliList[stimIndex].distraction;
                        name = arr[Tools.randomSelect(arr.length)];
                    } else {
                        name = stimuliList[stimIndex].target;
                    }

                    setText(name);
                    setPicture(prefix + stimuliList[stimIndex].target + ".jpeg");
                    setFixation("");
                    setSwitcher({
                        memorySet:"none",
                        picture:""
                    });
                    setStimIndex(stimIndex=>stimIndex+1);
                }, milliSec)

                // Response time
                milliSec += 500;
                countDown = setTimeout( () => {
                    setText("");
                    setFixation("");
                    setSwitcher({
                        memorySet:"none",
                        picture:"none"
                    });
                }, milliSec);

                // Second picture
                milliSec += 1250;
                countDown = setTimeout( () => {
                    let name = ""
                    if(condition[trial][1] === "distraction") {
                        let arr = stimuliList[stimIndex+1].distraction;
                        name = arr[Tools.randomSelect(arr.length)];
                    } else {
                        name = stimuliList[stimIndex+1].target;
                    }

                    setText(name);
                    setPicture(prefix + stimuliList[stimIndex+1].target + ".jpeg");
                    setFixation("");
                    setSwitcher({
                        memorySet:"none",
                        picture:""
                    });
                    setStimIndex(stimIndex=>stimIndex+1);
                }, milliSec)

                // Response time
                milliSec += 500;
                countDown = setTimeout( () => {
                    setText("");
                    setFixation("");
                    setSwitcher({
                        memorySet:"none",
                        picture:"none"
                    });
                }, milliSec);
                break;
            
            case 3:
                countDown = setTimeout( () => {
                    let name = ""
                    if(condition[trial][0] === "distraction") {
                        let arr = stimuliList[stimIndex].distraction;
                        name = arr[Tools.randomSelect(arr.length)];
                    } else {
                        name = stimuliList[stimIndex].target;
                    }

                    setText(name);
                    setPicture(prefix + stimuliList[stimIndex].target + ".jpeg");
                    setFixation("");
                    setSwitcher({
                        memorySet:"none",
                        picture:""
                    });
                    setStimIndex(stimIndex=>stimIndex+1);
                }, milliSec)

                // Response time
                milliSec += 500;
                countDown = setTimeout( () => {
                    setText("");
                    setFixation("");
                    setSwitcher({
                        memorySet:"none",
                        picture:"none"
                    });
                }, milliSec);

                // Second picture
                milliSec += 1250;
                countDown = setTimeout( () => {
                    let name = ""
                    if(condition[trial][1] === "distraction") {
                        let arr = stimuliList[stimIndex+1].distraction;
                        name = arr[Tools.randomSelect(arr.length)];
                    } else {
                        name = stimuliList[stimIndex+1].target;
                    }

                    setText(name);
                    setPicture(prefix + stimuliList[stimIndex+1].target + ".jpeg");
                    setFixation("");
                    setSwitcher({
                        memorySet:"none",
                        picture:""
                    });
                    setStimIndex(stimIndex=>stimIndex+1);
                }, milliSec)

                // Response time
                milliSec += 500;
                countDown = setTimeout( () => {
                    setText("");
                    setFixation("");
                    setSwitcher({
                        memorySet:"none",
                        picture:"none"
                    });
                }, milliSec);

                // Third picture
                milliSec += 1250;
                countDown = setTimeout( () => {
                    let name = ""
                    if(condition[trial][2] === "distraction") {
                        let arr = stimuliList[stimIndex+2].distraction;
                        name = arr[Tools.randomSelect(arr.length)];
                    } else {
                        name = stimuliList[stimIndex+2].target;
                    }

                    setText(name);
                    setPicture(prefix + stimuliList[stimIndex+2].target + ".jpeg");
                    setFixation("");
                    setSwitcher({
                        memorySet:"none",
                        picture:""
                    });
                    setStimIndex(stimIndex=>stimIndex+1);
                }, milliSec)

                // Response time
                milliSec += 500;
                countDown = setTimeout( () => {
                    setText("");
                    setFixation("");
                    setSwitcher({
                        memorySet:"none",
                        picture:"none"
                    });
                }, milliSec);
                break;

            case 4:
                countDown = setTimeout( () => {
                    let name = ""
                    if(condition[trial][0] === "distraction") {
                        let arr = stimuliList[stimIndex].distraction;
                        name = arr[Tools.randomSelect(arr.length)];
                    } else {
                        name = stimuliList[stimIndex].target;
                    }

                    setText(name);
                    setPicture(prefix + stimuliList[stimIndex].target + ".jpeg");
                    setFixation("");
                    setSwitcher({
                        memorySet:"none",
                        picture:""
                    });
                    setStimIndex(stimIndex=>stimIndex+1);
                }, milliSec)

                // Response time
                milliSec += 500;
                countDown = setTimeout( () => {
                    setText("");
                    setFixation("");
                    setSwitcher({
                        memorySet:"none",
                        picture:"none"
                    });
                }, milliSec);

                // Second picture
                milliSec += 1250;
                countDown = setTimeout( () => {
                    let name = ""
                    if(condition[trial][1] === "distraction") {
                        let arr = stimuliList[stimIndex+1].distraction
                        name = arr[Tools.randomSelect(arr.length)];
                    } else {
                        name = stimuliList[stimIndex+1].target;
                    }

                    setText(name);
                    setPicture(prefix + stimuliList[stimIndex+1].target + ".jpeg");
                    setFixation("");
                    setSwitcher({
                        memorySet:"none",
                        picture:""
                    });
                    setStimIndex(stimIndex=>stimIndex+1);
                }, milliSec)

                // Response time
                milliSec += 500;
                countDown = setTimeout( () => {
                    setText("");
                    setFixation("");
                    setSwitcher({
                        memorySet:"none",
                        picture:"none"
                    });
                }, milliSec);

                // Third picture
                milliSec += 1250;
                countDown = setTimeout( () => {
                    let name = ""
                    if(condition[trial][2] === "distraction") {
                        let arr = stimuliList[stimIndex+2].distraction;
                        name = arr[Tools.randomSelect(arr.length)];
                    } else {
                        name = stimuliList[stimIndex+2].target;
                    }

                    setText(name);
                    setPicture(prefix + stimuliList[stimIndex+2].target + ".jpeg");
                    setFixation("");
                    setSwitcher({
                        memorySet:"none",
                        picture:""
                    });
                    setStimIndex(stimIndex=>stimIndex+1);
                }, milliSec)

                // Response time
                milliSec += 500;
                countDown = setTimeout( () => {
                    setText("");
                    setFixation("");
                    setSwitcher({
                        memorySet:"none",
                        picture:"none"
                    });
                }, milliSec);

                // Fourth picture
                milliSec += 1250;
                countDown = setTimeout( () => {
                    let name = ""
                    if(condition[trial][3] === "distraction") {
                        let arr = stimuliList[stimIndex+3].distraction;
                        name = arr[Tools.randomSelect(arr.length)];
                    } else {
                        name = stimuliList[stimIndex+3].target;
                    }

                    setText(name);
                    setPicture(prefix + stimuliList[stimIndex+3].target + ".jpeg");
                    setFixation("");
                    setSwitcher({
                        memorySet:"none",
                        picture:""
                    });
                    setStimIndex(stimIndex=>stimIndex+1);
                }, milliSec)

                // Response time
                milliSec += 500;
                countDown = setTimeout( () => {
                    setText("");
                    setFixation("");
                    setSwitcher({
                        memorySet:"none",
                        picture:"none"
                    });
                }, milliSec);
                break;

            
        }

        // Wait for response and present probe
        milliSec += 1250;
        countDown = setTimeout( () => {
            setSwitcher({
                memorySet:"none",
                picture:"none"
            })
            setProbe({
                num:storage[trial],
                display:""
            })
        }, milliSec)

        // Wait 3000ms
        milliSec += 3000;
        countDown = setTimeout( () => {
            setProbe({
                num:-1,
                display:"none"
            })
        }, milliSec)

        // Wait 3000ms
        milliSec += 3000;
        countDown = setTimeout( () => {
            console.log("Next");
            setTrial(trial => trial+1);
        }, milliSec)
        
        return () => {
            clearTimeout(countDown);
        }

    // eslint-disable-next-line
    } ,[trial])

    const styleForCenter = CentralPosition.central;
    return ( 
        <React.Fragment>
            <div style={styleForCenter}>
                <h1 style={{position:"absolute"}}>{fixation}</h1>
                <h2 style={{position:"absolute", display:switcher.memorySet}}>
                    {memorySet.map( element => {
                        if(memorySet.indexOf(element) !== memorySet.length-1) {
                            return element + " ,";
                        } else {
                            return element;
                        }
                    } )}
                </h2>
                <img src={picture} style={{position:"absolute", display:switcher.picture}} alt="Error"/>
                <h2 style={{zIndex:"3", marginTop:"12em"}}>{text}</h2>
                <h2 style={{zIndex:"3", display:probe.display}}>{probe.num}</h2>
            </div>
        </React.Fragment>
     );
}
 
export default Block;