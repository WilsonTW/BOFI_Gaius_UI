import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import MPPTInfo from './MPPTInfo';


const useStyles = makeStyles(() => ({
  root: {}
}));

const MPPTs = ({
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
      {equipment.map((mppt, i) => (
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <MPPTInfo equipment={mppt} station={i+1}/>
        </Grid>
      ))}
    </Grid>
  );
};

MPPTs.propTypes = {
  className: PropTypes.string,
  equipment: PropTypes.object.isRequired
};

export default MPPTs;
