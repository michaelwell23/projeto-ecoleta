import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './Pages/Home';
import CreatePoint from './Pages/CreatePoint';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Home} />
      <Route path='/create-point' component={CreatePoint} />
    </BrowserRouter>
  );
};

export default Routes;
