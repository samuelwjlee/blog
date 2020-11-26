import React from 'react';
import { createUseStyles } from 'react-jss'

import { BODY_WIDTH_MIN_MAX } from 'client/constants/style.constants';

const useStyles = createUseStyles({
  wordContainer: {
    ...BODY_WIDTH_MIN_MAX,
    padding: 30,
    border: '1px solid black'
  },
  word: {},
  definition: {}
});

const Word: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.wordContainer}>
      <div className={classes.word}>

      </div>
      <div className={classes.definition}>

      </div>
    </div>
  );
}

export default Word;
