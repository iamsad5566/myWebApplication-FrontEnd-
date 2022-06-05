import React from 'react';
import { Helmet } from 'react-helmet';

const HeaderBlogPage = () => {
    return ( 
        <Helmet>
            <title>YK's blog</title>
            <meta property="og:url" content="https://tw-yk.com/blog" />
            <meta property="og:locale" content="zh_TW" />
            <meta property="og:description" content="Welcome to my blog!" />
            <meta property="og:title" content="YK's blog" />
            <meta property="og:type" content="website" />
            {/* <meta property="fb:app_id" content="IwAR1HnJrjh4HyncY7ZMqrlZGOXHOUFRdqzI8XPckBcwK8eOVgk69pmlC5PRg" /> */}
            <meta property="fb:admins" content="153906327962277" />
            <meta property="og:image" content="https://tw-yk.com/blog.jpg" />
        </Helmet>
     );
}
 
export default HeaderBlogPage;