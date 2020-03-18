import React from 'react';
import ReactDOM from 'react-dom';
import Carlist from '../../components/carlist/app.jsx';

// console.log(_.partition([1, 2, 3, 4], n => n % 2))
ReactDOM.render([<Carlist key="Carlist" />], document.getElementById('app'));