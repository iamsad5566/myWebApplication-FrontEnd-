import React, { useState } from 'react';
import { geoMercator, geoPath } from 'd3';

const MapControl = props => {
    const {feature, addSelected, deleteSelected} = props;
    let county = feature.properties.COUNTYNAME;
    const [selected, setSelected] = useState(false);
    
    function handleClick() {
        
        if(selected === false) {
            setSelected(true);
            addSelected(county);
        }

        else {
            setSelected(false);
            deleteSelected(county);
        }
    }

    let projection = geoMercator()
        .center([121,24])
        .scale(9000);
    
    if(window.screen.width < 575.98) {
        projection = geoMercator()
        .center([123.5,23])
        .scale(5000);
    }

    let path = geoPath()
        .projection(projection);

    return (
        <React.Fragment>
            <path d = {path(feature)} onClick={ () => {
                handleClick();
             } } fill = {selected? "red":""}/>
        </React.Fragment>
        );
}
 
export default MapControl;