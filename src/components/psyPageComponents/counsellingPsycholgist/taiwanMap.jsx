import React, { useState, useEffect } from "react";
import { feature } from "topojson";
import { json } from "d3";
import DrawMap from "./drawMap";

const TaiwanMap = () => {

    const [data, setData] = useState([]);
    useEffect ( ()=>{
        json("../Taiwan.json")
        .then( topojsonData => {
            const {COUNTY_MOI_1090820} = topojsonData.objects;
            setData( feature(topojsonData, COUNTY_MOI_1090820) );
        })
    }, [])
    
    return ( 
        <React.Fragment>
            <DrawMap data = {data}/>
        </React.Fragment>
     );
}
 
export default TaiwanMap;