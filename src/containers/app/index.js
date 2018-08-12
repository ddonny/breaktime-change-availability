import React from 'react';
import { Route } from 'react-router-dom';
import Main from '../main';

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Main} />
    </main>
  </div>
);

export default App;
