import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import BMSInfo from './BMSInfo';


const useStyles = makeStyles(() => ({
  root: {}
}));

const BMSs = ({
  equipment,
  className,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      {equipment.map((bms, i) => (
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <BMSInfo equipment={bms} station={i+1} />
        </Grid>
      ))}
    </Grid>
  );
};

BMSs.propTypes = {
  className: PropTypes.string,
  equipment: PropTypes.object.isRequired
};

export default BMSs;
