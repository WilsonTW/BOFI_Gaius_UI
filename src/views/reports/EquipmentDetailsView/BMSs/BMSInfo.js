import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles,
  Grid
} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import PersonIcon from '@material-ui/icons/PersonOutline';
import Label from 'src/components/Label';

const useStyles = makeStyles((theme) => ({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));

const BMSInfo = ({
  equipment,
  className,
  station,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
          container
          spacing={1}
        >
           <Grid
             lg={4}
             sm={6}
             xs={12}
          >
            <CardHeader 
            classes={{ action: classes.current }}
            subheader={"Station ID : " + station}
            subheaderTypographyProps={{ color: 'primary', variant: 'body2' }}
            titleTypographyProps={{ color: 'textPrimary' }}
            title={"系統基本資訊"}  
            />
            <Divider />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    電池組充電電流(Ａ)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.tA}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    電池組總電壓(V)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.tV}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    電池組剩餘毫安培時量(Ah)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.sAh}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    電池組總毫安培時量(Ah)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.tAh}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    電池循環
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.cycle}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    SOC(%)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.soc}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    SOH(%)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.soh}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    均衡狀態
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.equal}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    濕度(%)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.humidity}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid
             lg={4}
             sm={6}
             xs={12}
          >
            <CardHeader 
            classes={{ action: classes.current }}
            subheader={"show all cells' voltage"}
            subheaderTypographyProps={{ color: 'primary', variant: 'body2' }}
            titleTypographyProps={{ color: 'textPrimary' }}
            title={"電池單體電壓"}  
            />
            <Divider />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    電池節數
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.vM}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體1電壓(mV)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.v1}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體2電壓(mV)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.v2}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體3電壓(mV)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.v3}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體4電壓(mV)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.v4}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體5電壓(mV)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.v5}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體6電壓(mV)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.v6}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體7電壓(mV)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.v7}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                  單體8電壓(mV)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.v8}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體9電壓(mV)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.v9}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體10電壓(mV)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.v10}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                  單體11電壓(mV)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.v11}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體12電壓(mV)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.v12}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體13電壓(mV)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.v13}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                  單體14電壓(mV)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.v14}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體15電壓(mV)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.v15}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體16電壓(mV)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.v16}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid
             lg={4}
             sm={6}
             xs={12}
          >
            <CardHeader 
            classes={{ action: classes.current }}
            subheader={"show all cells' temperature"}
            subheaderTypographyProps={{ color: 'primary', variant: 'body2' }}
            titleTypographyProps={{ color: 'textPrimary' }}
            title={"電池單體溫度"}  
            />
            <Divider />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體溫度數量
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.tN}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體1溫度(°C)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.t1}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體2溫度(°C)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.t2}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體3溫度(°C)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.t3}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體4溫度(°C)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.t4}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體5溫度(°C)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.t5}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體6溫度(°C)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.t6}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體7溫度(°C)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.t7}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體8溫度(°C)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.t8}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體9溫度(°C)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.t9}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體10溫度(°C)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.t10}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體11溫度(°C)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.t11}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體12溫度(°C)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.t12}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體13溫度(°C)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.t13}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體14溫度(°C)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.t14}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體15溫度(°C)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.t15}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    單體16溫度(°C)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.t16}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
      </Grid>
    </Card>
  );
};

BMSInfo.propTypes = {
  className: PropTypes.string,
  equipment: PropTypes.object.isRequired
};

export default BMSInfo;
