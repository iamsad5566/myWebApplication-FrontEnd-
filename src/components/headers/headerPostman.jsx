import React from 'react';
import { Helmet } from 'react-helmet';

const HeaderPostman = () => {
    return ( 
        <Helmet>
            <title>Postman</title>
            <meta property="og:url" content="https://tw-yk.com/testing/postman" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:description" content="This is a website for sengin a batch of mails withe the content as templates from your gmail account to the receiver. please see the instruction for detail" />
            <meta property="og:title" content="Postman" />
            <meta property="og:type" content="website" />
            {/* <meta property="fb:app_id" content="IwAR1HnJrjh4HyncY7ZMqrlZGOXHOUFRdqzI8XPckBcwK8eOVgk69pmlC5PRg" /> */}
            <meta property="fb:admins" content="153906327962277" />
            <meta property="og:image" content="https://tw-yk.com/pi512.png" />
        </Helmet>
     );
}
 
export default HeaderPostman;