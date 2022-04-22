import React from 'react';
import { Helmet } from 'react-helmet';

const HeaderBig5 = () => {
    return ( 
        <Helmet>
            <title>Big5</title>
            <meta property="og:url" content="https://tw-yk.com/psychology/questionnaire/big5" />
            <meta property="og:locale" content="zn_TW" />
            <meta property="og:description" content="Nothing but a big 5" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Big5" />
            {/* <meta property="fb:app_id" content="IwAR1HnJrjh4HyncY7ZMqrlZGOXHOUFRdqzI8XPckBcwK8eOVgk69pmlC5PRg" /> */}
            <meta property="fb:admins" content="153906327962277" />
            <meta property="og:image" content="https://tw-yk.com/pi512.png" />
        </Helmet>
     );
}
 
export default HeaderBig5;