import React from 'react';
import ReactDOM from 'react-dom';
import Trying from './one/index';
import './asset/iconfont/iconfont.css';

export default class App extends React.Component {
    render() {
        return <Trying/>
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));
