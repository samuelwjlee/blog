import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  welcomePage: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 80
  },
  appDescription: {
    fontSize: 30,
    fontWeight: 'bold'
  }
})

const WelcomePage: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.welcomePage}>
      <div className={classes.appDescription}>
        Learn new words while having fun
      </div>
    </div>
  )
}

export default WelcomePage
