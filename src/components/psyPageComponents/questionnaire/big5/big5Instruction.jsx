import React from 'react';

const Big5Instruction = props => {
    const instruction = "大五人格特質是現代心理學中，描述最高組織層次的五面向特質，這五大特質構成了人的主要個性區隔，分別是：開放度" + 
    "、責任感、外向性、親和性、神經質。五大人格測驗總共有五十題，能測出你在五大人格特質的偏向。以下題目只是描述您的特質，答案並沒有對錯之" +
    "分，請您就個人的觀感或意見陳述即可。請詳細閱讀每一題，並依據您的符合程度點選。"

    const handleCheck = props.handleCheck;

    const styleForMiddle = {
        height:"100vh",
        display:"flex", 
        alignItems:"center", 
        justifyContent:"center"
    }

    return ( 
        <React.Fragment>
            <div style={styleForMiddle}>
                <div style={{display:"block", textAlign:"center"}}>
                    <span style={{display:"inline-block", width:"60%", lineHeight:"2em", marginBottom:"8em"}}>
                        <h3>大五人格測驗 (Big Five)</h3>
                        <span style={{marginTop:"2em", display:"inline-block"}}>{instruction}</span>
                    </span>
                    <div style={{marginTop:"-7em"}}>
                        <button className="btn btn-primary" style={{borderRadius:"10% 50% 10% 50%"}} onClick={handleCheck}> Next </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default Big5Instruction;