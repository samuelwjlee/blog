import React from 'react'
import { createUseStyles } from 'react-jss'

import AuthGoogleButton from 'client/components/AuthGoogleButton'

const useStyles = createUseStyles({
  welcomePage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80
  },
  appDescription: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 35,
    marginTop: 100
  }
})

const WelcomePage: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.welcomePage}>
      <div className={classes.appDescription}>
        Learn new words while having fun
      </div>
      <AuthGoogleButton />
    </div>
  )
}

export default WelcomePage
