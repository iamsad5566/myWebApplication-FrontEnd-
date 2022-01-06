import React from 'react';

const Table = () => {
    return ( <React.Fragment>
        <span  style = {{display:"table-cell", verticleAlign:"middle",fontSize:"0.9em"}}>
        <h3>EDUCATION</h3>
        <table className="table table-success table-striped">
            <tbody>
                <tr>
                <th scope="row">2011 - 2016</th>
                <td></td>
                <td></td>
                </tr>

                <tr>
                <th scope="row" style = {{textAlign:"center"}}>B.A.</th>
                <td>National ChengChi University</td>
                <td>Department of Psychology</td>
                </tr>

                <tr>
                <th scope="row">2018 - 2021</th>
                <td></td>
                <td></td>
                </tr>

                <tr>
                <th scope="row" style = {{textAlign:"center"}}>M.A.</th>
                <td>National Taiwan University</td>
                <td>Department of Psychology</td>
                </tr>

            </tbody>
        </table>

        <h3 style = {{marginTop: "5vh"}}>EMPLOYMENT</h3>
        <table className="table table-primary table-striped">
            <tbody>
                <tr>
                <th scope="row"> 2021 - 2022 </th>
                <td> Research Assistant, Department of Psychology, National Taiwan University, Taipei, Taiwan </td>
                </tr>

                <tr>
                <th scope="row"> 2020 - 2021 </th>
                <td> Teaching Assistant, Course: ‘‘Seminar”, Department of Psychology, National Taiwan University, Taipei, Taiwan </td>
                </tr>

                <tr>
                <th scope="row"> 2019 - 2021 </th>
                <td> Adjunct Researcher Assistant in National Taiwan University Hospital, Taiwan </td>
                </tr>

                <tr>
                <th scope="row">2019 - 2020</th>
                <td> Teaching Assistant, Course: ‘‘General Psychology”, Department of Psychology, National Taiwan University, Taipei, Taiwan </td>
                </tr>

                <tr>
                <th scope="row">2014 - 2015</th>
                <td> Contingent worker in National Taiwan University Hospital, Taiwan </td>
                </tr>

            </tbody>
        </table>

        <h3 style = {{marginTop: "5vh"}}> CONFERENCE PRESENTATIONS </h3>
        <table className="table table-warning table-striped">
            <tbody>
                <tr>
                <th scope="row" style={{textAlign:"left"}}> "P3b does not reflect perceived contrasts," Association for the Scientific Study of Consciousness, Speaker, Virtual Meeting, June 2021. </th>
                </tr>

                <tr>
                <th scope="row" style={{textAlign:"left"}}> "NCC, P3b, and no-report paradigms" Society for Philosophy and Psychology, 47th Annual Meeting, 2021. Virtual Princeton, NJ, United States, June 28-July 2, 2021. </th>
                </tr>
            </tbody>
        </table>
        </span>

    </React.Fragment> );
}
 
export default Table;