import React from 'react';
import { Helmet } from 'react-helmet';

const HeaderBlogPage = () => {
    return ( 
        <Helmet>
            <title>YK's blog</title>
            <meta property="og:url" content="https://tw-yk.website/blog" />
            <meta property="og:locale" content="zh_TW" />
            <meta property="og:description" content="Welcome to my blog!" />
            <meta property="og:title" content="YK's blog" />
            <meta property="og:image" content="https://tw-yk.website/pi512.png" />
        </Helmet>
     );
}
 
export default HeaderBlogPage;