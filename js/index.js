/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import AppLayout from './components/AppLayout';

ReactDOM.render((
     <BrowserRouter>
          <Route path="/" component={AppLayout}/>
     </BrowserRouter>
     ),
     document.getElementById('app')
);
