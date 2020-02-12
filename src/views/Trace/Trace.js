import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { TraceDetails } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    minHeight: 100
  }
}));

const Trace = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <TraceDetails />
        </Grid>
      </Grid>
    </div>
  );
};

export default Trace;
