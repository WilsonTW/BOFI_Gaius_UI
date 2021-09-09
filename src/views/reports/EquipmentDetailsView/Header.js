import React, {
  useCallback,
  useState,
  useEffect,
  useContext
} from 'react';
import { MqttContext } from 'src/contexts/MqttContext';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { Edit as EditIcon } from 'react-feather';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = ({ className, equipment, ...rest }) => {
  const classes = useStyles();

  const [state, dispatch, stateDevice, dispatchDevice] = useContext(MqttContext);
  const isMountedRef = useIsMountedRef();
  const [pcs, setPcs] = useState('pcs');

  const getPcs = useCallback(async () => {
    try {
      // const responsePcs = await axios.get('/api/equipments/pcs');

      // if (isMountedRef.current) {
      //   setPcs(responsePcs.data.pcs);
      // }
      setPcs(stateDevice.pcs[0]);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getPcs();
  }, [getPcs]);

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            BESS
          </Link>
          <Typography
            variant="body1"
            color="textPrimary"
          >
            Monitor
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="h3"
          color="textPrimary"
        >
          Equipment Overview
        </Typography>
      </Grid>
      <Grid item>
      <Typography
          variant="h5"
          color="textPrimary"
        >
          {/* 系統時間 */}
          {stateDevice.pcs[0].sysTime}
        </Typography>
      </Grid>
      {/* <Grid item>
        <Button
          color="secondary"
          variant="contained"
          component={RouterLink}
          to="/app/management/customers/1/edit"
          startIcon={
            <SvgIcon fontSize="small">
              <EditIcon />
            </SvgIcon>
          }
        >
          Edit
        </Button>
      </Grid> */}
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  equipment: PropTypes.object.isRequired
};

export default Header;
