import React, { useEffect, useState } from "react";
import MapControl from "./mapControl";
import {select} from "d3";

import DataInput from "./dataInput";
import GetPsyData from '../../../api/getPsyData';
import AuthenticationService from '../../../api/authenticationService';

import BarChartPercentage from "./barComponents/barChartPercentage";
import { BarChart } from "./barComponents/barChart";
import BarChartPopulation from "./barComponents/barChartPopulation";

const DrawMap = props => {
    let buttonClass = "btn btn-sm m-3";
    document.title = "Information about Taiwanese couselling psychology";

    const adminUser = "twyk";
    const [isLoaded, setIsLoaded] = useState(false);
    const [total, setTotal] = useState(0);
    const [dataMap, setDataMap] = useState([]);
    const [countyNumbersList, setCountyNumbersList] = useState(["心理師公會會員數"]);
    const [countyPercentageList, setCountyPercentageList] = useState(["心理師公會會員百分比人數"])
    const [populationEachCounty, setPopulationEachCounty] = useState(["每萬人之中心理師人數"])
    const [selection, setSelection] = useState([0]);

    const populationData = [
        {county:"新北市", population:4008113},
        {county:"臺中市", population:2813490},
        {county:"高雄市", population:2744691},
        {county:"臺北市", population:2524393},
        {county:"桃園市", population:2272391},
        {county:"臺南市", population:1862059},
        {county:"彰化縣", population:1255330},
        {county:"屏東縣", population:804440},
        {county:"雲林縣", population:670132},
        {county:"新竹縣", population:575580},
        {county:"苗栗縣", population:538178},
        {county:"嘉義縣", population:493316},
        {county:"南投縣", population:484897},
        {county:"新竹市", population:452640},
        {county:"宜蘭縣", population:450692},
        {county:"基隆市", population:363977},
        {county:"花蓮縣", population:321358},
        {county:"嘉義市", population:264727},
        {county:"臺東縣", population:213386},
        {county:"金門縣", population:141539},
        {county:"澎湖縣", population:106340},
        {county:"連江縣", population:13645},
    ]

    useEffect( () => {
        setTimeout(()=>{}, 100);

        if(window.screen.width < 575.98) {
            select("svg")
            .attr("width",480)
            .attr("height", 480)

            select("#loading")
            .attr("width", 30)
            .attr("height", 30)
        }

        setSelection(0);

        if(AuthenticationService.isUserLoggedIn()) {
            let token = "Bearer " + sessionStorage.getItem(adminUser);
            AuthenticationService.setupAxiosInterceptor(token);
            GetPsyData.getTotalNumbers()
            .then( data => setTotal(data.data) );

            GetPsyData.getNumbersByAllCounty()
            .then( response => { 
                setDataMap( response.data );
                setIsLoaded(true);
             })
        }
    
        AuthenticationService.executeJWTAuthenticationService("guest", "guest")
        .then( response => {
                    AuthenticationService.registerSuccessfulLogin("guest", response.data.token);
                    GetPsyData.getTotalNumbers()
                    .then( data => setTotal(data.data) );

                    GetPsyData.getNumbersByAllCounty()
                    .then( response => { 
                        setDataMap( response.data );
                        setIsLoaded(true);
                     })
                }
        );
    }, [])

    const {features} = props.data;
    const [countyList, setCountyList] = useState([]);

    let Features = [];
    let county = 0;
    
    if(features !== undefined)
        Features = [...features];

    function addSelected(county) {
        let list = [...countyList];
        list.push(county);
        setCountyList(list); 

        let key = -1;
        for(let i = 0; i < dataMap.length; i++) {
            if(dataMap[i].county === county) {
                key = i;
                break;
            }
        }

        let numbersList = [...countyNumbersList];
        let percentageList = [...countyPercentageList];
        let populationList = [...populationEachCounty];

        let populationOfCounty = 0;
        for(let i = 0; i < populationData.length; i++) {
            if(populationData[i].county === county) {
                populationOfCounty = populationData[i].population;
                break;
            }
        }

        if(key === -1) {
            numbersList.push(0);
            percentageList.push(0);
            populationList.push(0);
        }
        else {
            let numbers = dataMap[key].numbers
            numbersList.push(numbers);
            percentageList.push( (numbers / total).toFixed(4) );
            populationList.push( (numbers*10000 / populationOfCounty).toFixed(2) );
        }
        
        setCountyPercentageList( percentageList );
        setCountyNumbersList( numbersList );
        setPopulationEachCounty( populationList );
    }

    function deleteSelected(county) {
        let list = [...countyList];
        list = list.filter( element => {return element !== county} );
        setCountyList(list);

        let index = -1;
        for(let i = 0; i < dataMap.length; i++) {
            if(dataMap[i].county === county) {
                index = i;
                break;
            }
        }

        let numbers = 0, percentage = 0, populationOfCounty = 0, percentageByPopulation = 0;
        if(index !== -1) {
            numbers = dataMap[index].numbers;
            percentage = (numbers / total).toFixed(4);
            
            // Get population of the county
            for(let i = 0; i < populationData.length; i++) {
                if(populationData[i].county === county) {
                    populationOfCounty = populationData[i].population;
                    break; 
                }
            }

            percentageByPopulation = (numbers*10000 / populationOfCounty).toFixed(2);
        }

        let numbersList = [...countyNumbersList];
        let percentageList = [...countyPercentageList];
        let populationList = [...populationEachCounty];

        numbersList = numbersList.filter( element => {
            if(element === numbers) {
                numbers--;
                return null;
            }
            return element !== numbers;
        } );

        percentageList = percentageList.filter( element => {
            if(element === percentage) {
                percentage--;
                return null;
            }

            return element !== percentage;
        })

        populationList = populationList.filter( element => {
            if(element === percentageByPopulation) {
                percentageByPopulation--;
                return null;
            }

            return element !== percentageByPopulation;
        })

        setCountyPercentageList(percentageList);
        setCountyNumbersList(numbersList);
        setPopulationEachCounty(populationList);
    }

    function handleSelect(value) {
        setSelection(value);
    }

    const styleForContainer = {
        position:"relative",
        top:"1px",
    };

    const styleForFullCover = {
        position:"relative",
        display:"flex",
        alignItem:"center",
        textAlign:"center",
        marginTop:"8em",
    };

    const styleForTaiwan = {
        position:"relative",
        display:"flex",
        alignItem:"center",
        textAlign:"right",
        justifyContent:"center"
    }

    const styleForBarChart = {
        position:"relative",
        display:"flex",
        alignItem:"center",
        textAlign:"right",
        justifyContent:"center",
        marginTop:"3em"
    }

    const styleForInput = {
        width:"100%",
        height:"30vh",
        position: "relative",
        display:"block",
        marginTop:"3em"
    }

    let componentArr = [
        <BarChart countyList = {countyList} countyNumbersList = {countyNumbersList}/>, 
        <BarChartPercentage countyList = {countyList} countyPercentageList = {countyPercentageList}/>,
        <BarChartPopulation countyList = {countyList} populationEachCounty = {populationEachCounty}/>
    ]

    return ( 
        <React.Fragment>
            <div className = "container-fluid" style = {styleForContainer}>
                <div className = "row" style = {styleForFullCover}>
                    <h3>109年全臺諮商心理師執業人數： { isLoaded? 
                        total:
                                <svg id = "loading" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                </svg> } 人
                    </h3>
                    <p>(資料來源：社團法人中華民國諮商心理師公會全國聯合會)</p>
                    <p> *** 請點選地圖查看各縣市資料 *** </p>
                    <div>
                        <button className={selection === 0? buttonClass + " btn-info btn-active ":buttonClass + " btn-warning"} onClick={ () => handleSelect(0) }> 人數 </button>
                        <button className={selection === 1? buttonClass + " btn-info btn-active ":buttonClass + " btn-warning"} onClick={ () => handleSelect(1) }> 各縣市心理師人數/心理師總數 </button>
                        <button className={selection === 2? buttonClass + " btn-info btn-active ":buttonClass + " btn-warning"} onClick={ () => handleSelect(2) }> 各縣市心理師/各縣市人口 </button>
                    </div>
                    <div className = "col-sm-6" id = "tw" style={styleForTaiwan}>
                        <svg className = "img-fluid" height = "750" width = "750">
                            <g stroke = "white" id = "twMap" fill = "DarkGreen">
                                {
                                    Features.map( feature => {
                                        return <MapControl key = {county++} feature = {feature} addSelected={addSelected} deleteSelected={deleteSelected}/>
                                    } )
                                }
                            </g>
                        </svg>
                    </div>
                    
                    <div className = "col-sm-6" style={styleForBarChart}>
                        {componentArr[selection]}
                    </div>
                </div>

                { AuthenticationService.isUserLoggedIn()? <div className = "row" style = {styleForInput}><DataInput/></div> : <></>}
                
            </div>
        </React.Fragment>
     );
}
 
export default DrawMap;