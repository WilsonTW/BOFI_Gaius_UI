import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import POWERInfo from './POWERInfo';


const useStyles = makeStyles(() => ({
  root: {}
}));

const POWERs = ({
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
      {equipment.map((powermeter, i) => (
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <POWERInfo equipment={powermeter} station={i+1}/>
        </Grid>
      ))}
    </Grid>
  );
};

POWERs.propTypes = {
  className: PropTypes.string,
  equipment: PropTypes.object.isRequired
};

export default POWERs;
