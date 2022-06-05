import React from 'react';

const StroopEnd = () => {
    const styleForCenter = {
        height:"100vh",
        display:"flex", 
        alignItems:"center", 
        justifyContent:"center"
    }

    return ( 
        <React.Fragment>
            <h1 style={styleForCenter}> The end, thanks for attending the experiment! </h1>
        </React.Fragment>
     );
}
 
export default StroopEnd;