import React from 'react';
import { Helmet } from 'react-helmet';

const HeaderPostman = () => {
    return ( 
        <Helmet>
            <title>Postman</title>
            <meta property="og:url" content="https://tw-yk.website/testing/postman" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:description" content="Welcome to my website! I'm dedicated to updating this web, so just feel free to come anytime, maybe you will find something new and interesting!" />
            <meta property="og:title" content="Postman" />
            <meta property="og:image" content="https://tw-yk.website/pi512.png" />
        </Helmet>
     );
}
 
export default HeaderPostman;