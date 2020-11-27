import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  dashBoard: {
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black'
  },
  message: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  stats: {
    display: 'flex',
    marginTop: 20
  },
  statsItem: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 20,
    marginRight: 20
  },
  statsAddedLabel: {},
  statsAddedVal: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

/**
 * encouraging message on top
 * visualizes users' milestones
 * stats on words added and mastered
 */
const Dashboard: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.dashBoard}>
      <div className={classes.message}>Woohoo! Keep going!</div>
      <div className={classes.stats}>
        <div className={classes.statsItem}>
          <div className={classes.statsAddedLabel}>Added</div>
          <div className={classes.statsAddedVal}>321</div>
        </div>
        <div className={classes.statsItem}>
          <div className={classes.statsAddedLabel}>Masterd</div>
          <div className={classes.statsAddedVal}>100</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
