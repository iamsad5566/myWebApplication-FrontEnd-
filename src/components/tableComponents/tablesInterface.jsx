import React, { useState } from 'react';
import ConTable from './conTable';
import EmpTable from './empTable';
import EduTable from './eduTable';

const TableInterface = () => {
    const [selection, setSelection] = useState(0);

    function handleSelect(value) {
        setSelection(value);
    }

    const tableArr = [
        <EduTable/>,
        <ConTable/>,
        <EmpTable/>
    ]

    const styleForTables = {
        position:"relative",
        display:"table-cell", 
        verticleAlign:"middle",
        fontSize:"0.9em",
        width:"90%"
    }

    return ( 
        <React.Fragment>
        <div  style = {styleForTables}>
            <table className="table">
            <thead>
                <tr>
                <th colspan="3" scope="col">
                    <button id = "tableSelect" className='btn btn-primary m-2' onClick={()=>handleSelect(0)}>Education</button>
                    <button id = "tableSelect" className='btn btn-secondary m-2' onClick={()=>handleSelect(1)}>Conferences</button>
                    <button id = "tableSelect" className='btn btn-danger m-2' onClick={()=>handleSelect(2)}>Employments</button>
                </th>
                </tr>
            </thead>
            <tbody>
                <tr className='table-dark' style={{height:"2em"}}>
                <th scope="row"></th>
                </tr>
                {tableArr[selection]}
            </tbody>
            
        </table>
        
        
        </div>

        </React.Fragment> 
    );
}
 
export default TableInterface;