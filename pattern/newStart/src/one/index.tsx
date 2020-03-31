import React from "react";
import { Carousel } from "antd";
// import img from '@/asset/image/1.jpeg';
import "antd/dist/antd.css";
import './index.less';

export default class Trying extends React.Component {
    render() {
        return <Carousel autoplay={false}>
                    <div>
                        <span className="icon iconfont icon-guanbi"/>
                    </div>
                {/*<div><img src={img} alt=''/></div>*/}
                <div><h3>22222</h3></div>
                <div><h3>4</h3></div>
              </Carousel>
    }
}
