import React from 'react';
import { Helmet } from 'react-helmet';

const HeaderTesting = () => {
    return ( 
        <Helmet>
            <title>Testing</title>
            <meta property="og:url" content="https://tw-yk.website/testing" />
            <meta property="og:locale" content="zh_TW" />
            <meta property="og:description" content="Kinds of thoughts tested here!" />
            <meta property="og:title" content="Testing function" />
            <meta property="og:image" content="https://tw-yk.website/pi512.png" />
        </Helmet>
     );
}
 
export default HeaderTesting;