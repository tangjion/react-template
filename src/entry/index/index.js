import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from '../../stores'
import Index from '../../components/index/app.jsx';
$('.test').css({
  width: '100px',
  height: '100px',
  background: 'yellow'
})
console.log(_.partition([1, 2, 3, 4], n => n % 2))
const App = (
  <Provider store={store}>
    <Index />
  </Provider>
)
ReactDOM.render(App, document.getElementById('app'));