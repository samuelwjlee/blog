import React from 'react'
import { createUseStyles } from 'react-jss'

import Auth from 'components/Auth'
import { HEADER_HEIGHT } from 'constants/style.constants'

const useStyles = createUseStyles({
  header: {
    top: 0,
    left: 0,
    width: '100vw',
    boxSizing: 'border-box',
    height: HEADER_HEIGHT,
    background: '#ffff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 30px'
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold'
  }
})

const Header: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.header}>
      <div className={classes.logo}>Wordful</div>
      <Auth />
    </div>
  )
}

export default Header
