import React from 'react';
import NavBar from '../nav/nav';
import PsyMainContent from '../components/psyPageComponents/psyMainContent';
import DocumentMeta from 'react-document-meta';

const Psychology = () => {
    const meta = {
        title:"Psy Info",
        description:"Psychological infromation here!",
        canonical:"https://tw-yk.website/psychology",
        meta:{
            charset:"utf-8"
        }
    }
    return ( 
        <div> 
            <div>
                <DocumentMeta {...meta}>
                <NavBar/>
                <PsyMainContent/>
                </DocumentMeta>
            </div>
        </div> );
}
 
export default Psychology;