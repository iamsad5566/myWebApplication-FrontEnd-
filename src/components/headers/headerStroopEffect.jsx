import React from 'react';
import { Helmet } from 'react-helmet';

const HeaderStroopEffect = () => {
    return ( 
        <Helmet>
            <title>Stroop effect exp</title>
            <meta property="og:url" content="https://tw-yk.com/psychology/stroopEffect" />
            <meta property="og:locale" content="zh_TW" />
            <meta property="og:description" content="Experiment for stroop effect here" />
            <meta property="og:title" content="Stroop effect exp" />
            <meta property="og:type" content="website" />
            <meta property="fb:admins" content="153906327962277" />
            <meta property="og:image" content="https://tw-yk.com/stroop.jpg" />
        </Helmet>
     );
}
 
export default HeaderStroopEffect;