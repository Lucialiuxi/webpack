
import {add} from './tools/tools'

import '@/style/theme.css'
import './sass/test.scss'

//import Vue from './vue/vue.js'
import Vue from 'v'

console.log(Vue)

console.log(add(1, 2));

console.log('124534');

let app = document.getElementById('app')

let newDiv = document.createElement('div');
newDiv.innerHTML = 12345645;
app.appendChild(newDiv);

if(module.hot){
  module.hot.accept();
}
