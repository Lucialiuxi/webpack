import React from 'react';
import ReactDOM from 'react-dom';
import Trying from './one';

export default class App extends React.Component {
    render() {
        return <Trying/>
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));