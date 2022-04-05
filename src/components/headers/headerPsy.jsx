import React from 'react';
import { Helmet } from 'react-helmet';

const HeaderPsy = () => {
    return ( 
        <Helmet>
            <title>Psy info</title>
            <meta property="og:url" content="https://tw-yk.website/psychology" />
            <meta property="og:locale" content="zh_TW" />
            <meta property="og:description" content="Psychological information here!" />
            <meta property="og:title" content="Psy info" />
            <meta property="og:image" content="https://tw-yk.website/pi512.png" />
        </Helmet>
     );
}
 
export default HeaderPsy;