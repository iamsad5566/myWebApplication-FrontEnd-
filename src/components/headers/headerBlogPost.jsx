import React from 'react';
import { Helmet } from 'react-helmet';

const HeaderBlogPost = (props) => {
    const {title, content} = props;
    return ( 
        <Helmet>
            <title>{title}</title>
            <meta property="og:url" content={`https://tw-yk.website/blog/${title}`} />
            <meta property="og:locale" content="zh_TW" />
            <meta property="og:description" content={content} />
            <meta property="og:title" content={title} />
            <meta property="og:image" content="https://tw-yk.website/pi512.png" />
        </Helmet>
     );
}
 
export default HeaderBlogPost;