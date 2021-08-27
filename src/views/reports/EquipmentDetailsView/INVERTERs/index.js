import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import INVERTERInfo from './INVERTERInfo';


const useStyles = makeStyles(() => ({
  root: {}
}));

const INVERTERs = ({
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
      {equipment.map((inverter, i) => (
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <INVERTERInfo equipment={inverter} station={i+1} />
        </Grid>
      ))}
      {/* <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <INVERTERInfo equipment={equipment[1]} station={'02'}/>
      </Grid> */}
    </Grid>
  );
};

INVERTERs.propTypes = {
  className: PropTypes.string,
  equipment: PropTypes.object.isRequired
};

export default INVERTERs;
