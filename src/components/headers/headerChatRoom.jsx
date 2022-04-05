import React from 'react';
import { Helmet } from 'react-helmet';

const HeaderChatRoom = () => {
    return ( 
        <Helmet>
            <title>Chat room</title>
            <meta property="og:url" content="https://tw-yk.website/testing/chatRoom" />
            <meta property="og:locale" content="zh_TW" />
            <meta property="og:description" content="Wellcome! this is a public chat room, wish you meet interesting people and have fun here!" />
            <meta property="og:title" content="純愛聊天室" />
            <meta property="og:image" content="https://tw-yk.website/pi512.png" />
        </Helmet>
     );
}
 
export default HeaderChatRoom;