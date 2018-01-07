import React from 'react';
import ReactDOM from 'react-dom';

import Component from './components/Carousel/Carousel';

const items = [
    {
        target:'javascript:',//
        // target:'https://www.google.com',
        img:'https://img10.360buyimg.com/da/jfs/t13792/76/2553225335/85708/1fdcb73c/5a434610N72ec02cb.jpg',
        alt:'谷歌'
    },
    {
        target:'https://www.bing.com',
        img:'https://img11.360buyimg.com/da/jfs/t5464/106/472798610/142359/66551a05/58ffffc8Naea1f2a2.jpg',
        alt:'bing'
    },
    {
        target:'https://www.baidu.com',
        img:'https://img14.360buyimg.com/da/jfs/t12136/20/2273406938/197444/b45a2120/5a38e383Nfff777c0.jpg',
        alt:'baidu'
    }
]

ReactDOM.render(<Component items={items}/>, document.getElementById('root'));