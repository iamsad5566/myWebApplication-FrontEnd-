import React from 'react';
import { Helmet } from 'react-helmet';

const HeaderBlogPost = (props) => {
    const {title, content, postId} = props;
    return ( 
        <Helmet>
            <title>{title}</title>
            <meta property="og:url" content={`https://tw-yk.com/blog/${postId}`} />
            <meta property="og:locale" content="zh_TW" />
            <meta property="og:description" content={content} />
            <meta property="og:title" content={title} />
            <meta property="og:type" content="article" />
            {/* <meta property="fb:app_id" content="IwAR1HnJrjh4HyncY7ZMqrlZGOXHOUFRdqzI8XPckBcwK8eOVgk69pmlC5PRg" /> */}
            <meta property="fb:admins" content="153906327962277" />
            <meta property="og:image" content="https://tw-yk.com/book.jpg" />
        </Helmet>
     );
}
 
export default HeaderBlogPost;