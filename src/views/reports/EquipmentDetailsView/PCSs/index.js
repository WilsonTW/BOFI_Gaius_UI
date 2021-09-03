import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import PCSInfo from './PCSInfo';


const useStyles = makeStyles(() => ({
  root: {}
}));

const PCSs = ({
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
      {equipment.map((pcs, i) => (
        <Grid
          // item
          // lg={4}
          // md={6}
          // xl={3}
          // xs={12}
          item xs={12} spacing={3}
        >
          <PCSInfo equipment={pcs} station={i+1}/>
        </Grid>
      ))}
    </Grid>
  );
};

PCSs.propTypes = {
  className: PropTypes.string,
  equipment: PropTypes.object.isRequired
};

export default PCSs;
