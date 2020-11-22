import React from 'react';
import { createUseStyles } from 'react-jss'

import AuthSection from 'client/components/AuthSection';

const useStyles = createUseStyles({
  "@global": {
    body: {
      fontFamily: 'Open Sans, sans-serif',
      position: 'fixed',
      top: 0,
      left: 0,
      margin: 0,
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      flexDirection: 'column',
      width: '100vw',
      height: '100vh'
    }
  }
});

const App: React.FC = () => {
  useStyles();

  return (
    <div className='App'>
      <AuthSection />
    </div>
  );
}

export default App;
