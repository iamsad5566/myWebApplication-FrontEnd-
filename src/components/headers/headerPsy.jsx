import React from 'react';
import { Helmet } from 'react-helmet';

const HeaderPsy = () => {
    return ( 
        <Helmet>
            <title>Psy info</title>
            <meta property="og:url" content="https://tw-yk.com/psychology" />
            <meta property="og:locale" content="zh_TW" />
            <meta property="og:description" content="Psychological information here!" />
            <meta property="og:title" content="Psy info" />
            <meta property="og:type" content="website" />
            {/* <meta property="fb:app_id" content="IwAR1HnJrjh4HyncY7ZMqrlZGOXHOUFRdqzI8XPckBcwK8eOVgk69pmlC5PRg" /> */}
            <meta property="fb:admins" content="153906327962277" />
            <meta property="og:image" content="https://tw-yk.com/pi512.png" />
        </Helmet>
     );
}
 
export default HeaderPsy;