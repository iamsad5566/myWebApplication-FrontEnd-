import React, { useEffect } from 'react';
import c3 from 'c3';
import "../../../../css/c3.css";

const BarChartPercentage = props => {
    const {countyList, countyPercentageList} = props;
    useEffect(() => {
        let size = {
            height: 550,
            width: 600
        }

        if(window.screen.width < 575.98) 
            size = {
                height: 300,
                width: 400
            }

        c3.generate({
        bindto: '#chart',
        data: {
            columns: [
                countyPercentageList
            ],
            type: 'bar',
            colors: {
                心理師公會會員百分比人數:"orange"
            }
        },

        legend:{
            show: false
        },

        axis:{
            rotated: false,  //旋轉圖表
            x: {
            show: true,               // 顯示 X 軸
            type: "category",         // X 軸資料類型
            categories: countyList,     // X 軸需顯示的資料
            tick: {
                multiline: false      // 顯示換行設定
            },
            label: {
            }
            },
            y: {
                show: true,               // 顯示 Y 軸 
                tick:{
                    format: function(d) {return (d * 100).toFixed(2) + "%"},
                },
                max: 0.95                  // Y 軸資料最大值
            },
        },
        
        size: size
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countyList.length]);

    const listLength = countyList.length;

    return (
        <React.Fragment>
            {listLength === 0? <></>:<div id="chart" />}
        </React.Fragment>
    );
}
 
export default BarChartPercentage;