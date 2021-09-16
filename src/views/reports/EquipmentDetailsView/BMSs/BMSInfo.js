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
  const warningName =['正常',
                     '低於下限',
                     '高於上限',
                     '其他錯誤'];
  const errorColor = ["textSecondary","error"];
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
                    電池組充放電電流(Ａ)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.tA}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.tAWarn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.tAWarn) > 2) ? 3 : parseInt(equipment.tAWarn))]}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.fontWeightMedium}>
                    電池組總電壓(mV)
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {equipment.tV}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.tVWarn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.tVWarn) > 2) ? 3 : parseInt(equipment.tVWarn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.vMWarn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.vMWarn) > 2) ? 3 : parseInt(equipment.vMWarn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.v1Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.v1Warn) > 2) ? 3 : parseInt(equipment.v1Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.v2Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.v2Warn) > 2) ? 3 : parseInt(equipment.v2Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.v3Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.v3Warn) > 2) ? 3 : parseInt(equipment.v3Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.v4Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.v4Warn) > 2) ? 3 : parseInt(equipment.v4Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.v5Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.v5Warn) > 2) ? 3 : parseInt(equipment.v5Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.v6Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.v6Warn) > 2) ? 3 : parseInt(equipment.v6Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.v7Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.v7Warn) > 2) ? 3 : parseInt(equipment.v7Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.v8Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.v8Warn) > 2) ? 3 : parseInt(equipment.v8Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.v9Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.v9Warn) > 2) ? 3 : parseInt(equipment.v9Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.v10Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.v10Warn) > 2) ? 3 : parseInt(equipment.v10Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.v11Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.v11Warn) > 2) ? 3 : parseInt(equipment.v11Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.v12Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.v12Warn) > 2) ? 3 : parseInt(equipment.v12Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.v13Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.v13Warn) > 2) ? 3 : parseInt(equipment.v13Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.v14Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.v14Warn) > 2) ? 3 : parseInt(equipment.v14Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.v15Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.v15Warn) > 2) ? 3 : parseInt(equipment.v15Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.v16Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.v16Warn) > 2) ? 3 : parseInt(equipment.v16Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.tNWarn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.tNWarn) > 2) ? 3 : parseInt(equipment.tNWarn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.t1Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.t1Warn) > 2) ? 3 : parseInt(equipment.t1Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.t2Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.t2Warn) > 2) ? 3 : parseInt(equipment.t2Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.t3Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.t3Warn) > 2) ? 3 : parseInt(equipment.t3Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.t4Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.t4Warn) > 2) ? 3 : parseInt(equipment.t4Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.t5Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.t5Warn) > 2) ? 3 : parseInt(equipment.t5Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.t6Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.t6Warn) > 2) ? 3 : parseInt(equipment.t6Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.t7Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.t7Warn) > 2) ? 3 : parseInt(equipment.t7Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.t8Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.t8Warn) > 2) ? 3 : parseInt(equipment.t8Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.t9Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.t9Warn) > 2) ? 3 : parseInt(equipment.t9Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.t10Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.t10Warn) > 2) ? 3 : parseInt(equipment.t10Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.t11Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.t11Warn) > 2) ? 3 : parseInt(equipment.t11Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.t12Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.t12Warn) > 2) ? 3 : parseInt(equipment.t12Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.t13Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.t13Warn) > 2) ? 3 : parseInt(equipment.t13Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.t14Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.t14Warn) > 2) ? 3 : parseInt(equipment.t14Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.t15Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.t15Warn) > 2) ? 3 : parseInt(equipment.t15Warn))]}
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
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={errorColor[((parseInt(equipment.t16Warn) > 0) ? 1 : 0)]}
                    >
                      {warningName[((parseInt(equipment.t16Warn) > 2) ? 3 : parseInt(equipment.t16Warn))]}
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
