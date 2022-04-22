import React from 'react';
import NavBar from '../../../nav/nav';
import HeaderCounselling from '../../headers/headerCounselling';
import TaiwanMap from './taiwanMap';

const CounsellingContainer = () => {
    return (
        <React.Fragment> 
            <HeaderCounselling/>
            <NavBar/>
            <TaiwanMap/>
        </React.Fragment>
     );
}
 
export default CounsellingContainer;