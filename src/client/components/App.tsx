import React from 'react';
import { createUseStyles } from 'react-jss'

import Header from 'client/components/Header';

const useStyles = createUseStyles({
  '@global': {
    body: {
      fontFamily: 'Open Sans, sans-serif',
      top: 0,
      left: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      height: '100vh'
    },
    '#root': {
      width: '100vw',
      height: '100vh'
    },
  }
});

const App: React.FC = () => {
  useStyles();

  return (
    <div className='App'>
      <Header />
    </div>
  );
}

export default App;
