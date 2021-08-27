import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import PLCInfo from './PLCInfo';


const useStyles = makeStyles(() => ({
  root: {}
}));

const PLCs = ({
  equipment,
  className,
  station,
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
      {equipment.map((plc, i) => (
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <PLCInfo equipment={plc} station={i+1}/>
        </Grid>
      ))}
    </Grid>
  );
};

PLCs.propTypes = {
  className: PropTypes.string,
  equipment: PropTypes.object.isRequired
};

export default PLCs;
