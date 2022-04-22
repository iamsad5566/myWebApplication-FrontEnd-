import React from 'react';
import { Helmet } from 'react-helmet';

const HeaderChatRoom = () => {
    return ( 
        <Helmet>
            <title>Chat room</title>
            <meta property="og:url" content="https://tw-yk.com/testing/chatRoom" />
            <meta property="og:locale" content="zh_TW" />
            <meta property="og:description" content="Wellcome! this is a public chat room, wish you meet interesting people and have fun here!" />
            <meta property="og:title" content="Chat room" />
            <meta property="og:type" content="website" />
            {/* <meta property="fb:app_id" content="IwAR1HnJrjh4HyncY7ZMqrlZGOXHOUFRdqzI8XPckBcwK8eOVgk69pmlC5PRg" /> */}
            <meta property="fb:admins" content="153906327962277" />
            <meta property="og:image" content="https://tw-yk.com/pi512.png" />
        </Helmet>
     );
}
 
export default HeaderChatRoom;