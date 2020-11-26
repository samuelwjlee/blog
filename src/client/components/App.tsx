import React from 'react';
import { createUseStyles } from 'react-jss'

import Header from 'client/components/Header';
import Dashboard from 'client/components/Dashboard';
import Word from 'client/components/Word';

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
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className='App'>
      <Header />
      <div className={classes.content}>
        <Dashboard />
        <Word />
      </div>
    </div>
  );
}

export default App;
