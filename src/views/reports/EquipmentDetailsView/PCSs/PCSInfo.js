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
  makeStyles
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

const PCSInfo = ({
  equipment,
  className,
  station,
  ...rest
}) => {
  const classes = useStyles();
  const error0Name =['AC輸入頻率損失',
                     'AC輸入欠電壓',
                     'AC輸入長時間平均電壓過載',
                     'AC頻率低欠相',
                     'AC頻率高欠相',
                     'AC電壓低欠壓',
                     'AC電壓高欠壓',
                     '混合模式下電池電壓過低',
                     '電池電壓過高',
                     '電池開路',
                     '電池電壓過低',
                     '電池低電位',
                     '太陽能輸入2電壓過高',
                     '太陽能輸入1電壓過高',
                     '太陽能輸入2欠壓',
                     '太陽能輸入1欠壓'];
  const error1Name =['AC輸入波型失真','EPO啟動','負載過載','溫度超限','AC輸入相位錯誤','AC輸入孤島'];
  const wModeName = ['開機模式', '待機模式', '旁路模式', '電池模式', '故障模式', '混合模式', '充電模式'];
  const status0Name = ['NO', 'EN'];
  const status1Name = ['Idle', 'Work'];
  const status2Name = ['Idle', 'Work'];
  const status3Name = ['Do nothing', 'Charge', 'Discharge'];
  const status4Name = ['Do nothing', 'AC-DC', 'DC-AC'];
  const status5Name = ['Do nothing', 'Input', 'Output'];
  const con1Name =['寬AC輸入設定 (啟/閉)',
                   '發電機模式設定 (啟/閉)'];
  const con2Name =['市電併網功率自動調整 (啟/閉)',
                   '太陽能不足電池供市電併網 (啟/閉)',
                   '太陽能充足電池供市電併網 (啟/閉)',
                   '太陽能無輸入電池供電設定 (啟/閉)',
                   '太陽能不足電池供電設定 (啟/閉)',
                   '市電併網設定 (啟/閉)',
                   'AC充電電池設定 (啟/閉)',
                   '電池充放設定 (啟/閉)'];
  const error0List =[(parseInt(equipment.error0) & 0x1),
                     ((parseInt(equipment.error0) & 0x2) >> 1),
                     ((parseInt(equipment.error0) & 0x4) >> 2),
                     ((parseInt(equipment.error0) & 0x8) >> 3),
                     ((parseInt(equipment.error0) & 0x10) >> 4),
                     ((parseInt(equipment.error0) & 0x20) >> 5),
                     ((parseInt(equipment.error0) & 0x40) >> 6),
                     ((parseInt(equipment.error0) & 0x80) >> 7),
                     ((parseInt(equipment.error0) & 0x100) >> 8),
                     ((parseInt(equipment.error0) & 0x200) >> 9),
                     ((parseInt(equipment.error0) & 0x400) >> 10),
                     ((parseInt(equipment.error0) & 0x800) >> 11),
                     ((parseInt(equipment.error0) & 0x1000) >> 12),
                     ((parseInt(equipment.error0) & 0x2000) >> 13),
                     ((parseInt(equipment.error0) & 0x4000) >> 14),
                     ((parseInt(equipment.error0) & 0x8000) >> 15)];
  const error1List =[((parseInt(equipment.error1) & 0x400) >> 10),
                     ((parseInt(equipment.error1) & 0x800) >> 11),
                     ((parseInt(equipment.error1) & 0x1000) >> 12),
                     ((parseInt(equipment.error1) & 0x2000) >> 13),
                     ((parseInt(equipment.error1) & 0x4000) >> 14),
                     ((parseInt(equipment.error1) & 0x8000) >> 15)];
  const con1List =[((parseInt(equipment.con1) & 0x800) >> 11),
                   ((parseInt(equipment.con1) & 0x1000) >> 12)];
  const con2List =[((parseInt(equipment.con2) & 0x100) >> 8),
                    ((parseInt(equipment.con2) & 0x200) >> 9),
                    ((parseInt(equipment.con2) & 0x400) >> 10),
                    ((parseInt(equipment.con2) & 0x800) >> 11),
                    ((parseInt(equipment.con2) & 0x1000) >> 12),
                    ((parseInt(equipment.con2) & 0x2000) >> 13),
                    ((parseInt(equipment.con2) & 0x4000) >> 14),
                    ((parseInt(equipment.con2) & 0x8000) >> 15)];
const renderError0 = [];
const renderError1 = [];
const renderCon1 = [];
const renderCon2 = [];
for (var i=0; i<16; i++) {
  renderError0.push(
    <TableRow>
    <TableCell className={classes.fontWeightMedium}>
      {error0Name[i]}
    </TableCell>
    <TableCell>
      <Typography
        variant="body2"
        color="textSecondary"
      >
        {error0List[i]}
      </Typography>
    </TableCell>
    </TableRow>
  );
}
for (var i=0; i<6; i++) {
  renderError1.push(
    <TableRow>
    <TableCell className={classes.fontWeightMedium}>
      {error1Name[i]}
    </TableCell>
    <TableCell>
      <Typography
        variant="body2"
        color="textSecondary"
      >
        {error1List[i]}
      </Typography>
    </TableCell>
    </TableRow>
  );
}
for (var i=0; i<2; i++) {
  renderCon1.push(
    <TableRow>
    <TableCell className={classes.fontWeightMedium}>
      {con1Name[i]}
    </TableCell>
    <TableCell>
      <Typography
        variant="body2"
        color="textSecondary"
      >
        {con1List[i]}
      </Typography>
    </TableCell>
    </TableRow>
  );
}
for (var i=0; i<8; i++) {
  renderCon2.push(
    <TableRow>
    <TableCell className={classes.fontWeightMedium}>
      {con2Name[i]}
    </TableCell>
    <TableCell>
      <Typography
        variant="body2"
        color="textSecondary"
      >
        {con2List[i]}
      </Typography>
    </TableCell>
    </TableRow>
  );
}

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title={"PCS Info : Station "+ station} />
      <Divider />
      <Table>
        <TableBody>
          {renderError0}
          {renderError1}
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              工作模式
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {wModeName[parseInt(equipment.wMode)]}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              電池電壓(V)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.bV}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              外部電池溫度(°C)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.bT}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              AC輸入實功率(V)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.acInAcP}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              AC輸出電壓(V)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.acOutV}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              AC輸出實功率(W)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.acOutAcP}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              AC輸出頻率(Hz)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.acOutF}
              </Typography>
            </TableCell>
          </TableRow>  
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              AC輸出電流(A)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.acOutC}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              電池容量(%)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.bCap}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              太陽能輸入功率(W)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.sInP1}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              電池電流(A)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.bC}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              太陽能輸入電壓(V)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.sInV1}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              設備最高溫(°C)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.maxT}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              總AC輸入實功率(W)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.acInToAcP}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              AC輸入電流(A)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.acInC}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              太陽能輸入電流(A)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.sInC1}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              AC輸出視在功率(VA)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.acOutAppP}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              AC輸入電壓(V)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.acInV}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              AC輸入頻率(Hz)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.acInF}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              AC輸出功率比例(%)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.acOutPP}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              內部溫度(°C)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.innT}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              AC輸出連接狀態
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {status0Name[((parseInt(equipment.status0) & 0xF0000) >> 16)]}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              太陽能輸入1狀態
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {status1Name[((parseInt(equipment.status0) & 0xF000000) >> 24)]}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              太陽能輸入2狀態
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {status2Name[((parseInt(equipment.status1) & 0xF))]}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              電池運行狀態
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {status3Name[((parseInt(equipment.status1) & 0xF00) >> 8)]}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              DC/AC運行狀態
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {status4Name[((parseInt(equipment.status1) & 0xF0000) >> 16)]}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              主線運行狀態
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {status5Name[((parseInt(equipment.status1) & 0xF000000) >> 24)]}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              AC總輸出功率(W)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.acOutToP}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              電池電量(W)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.bP}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              總發電量(KWh)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.totGenE}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              每小時發電量(Wh)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.genEnH}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              每天發電量(Wh)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.genEnD}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              每月發電量(Wh)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.genEnM}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              每年發電量(Wh)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.genEnY}
              </Typography>
            </TableCell>
          </TableRow>
          {renderCon1}
          {renderCon2}
          {/* <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              控制 1
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.con1}
              </Typography>
            </TableCell>
          </TableRow> */}
          {/* <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              控制 2
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.con2}
              </Typography>
            </TableCell>
          </TableRow> */}
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              設備備援供電設定(啟/閉)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.con3}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              AC充電穩壓設定(啟/閉)
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {equipment.con4}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* <Box
        p={1}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Button startIcon={<LockOpenIcon />}>
          Reset &amp; Send Password
        </Button>
        <Button startIcon={<PersonIcon />}>
          Login as Customer
        </Button>
      </Box> */}
    </Card>
  );
};

PCSInfo.propTypes = {
  className: PropTypes.string,
  equipment: PropTypes.object.isRequired
};

export default PCSInfo;
