import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import WithdrawSummary from './WithdrawSummary';
import LinkList from './LinkList';

const Dashboard = () => {
  // Пример данных
  const withdrawData = {
    total: 1250,
    byToken: {
      ETH: 500,
      USDT: 500,
      BTC: 250
    },
    byNetwork: {
      Ethereum: 750,
      BSC: 300,
      Tron: 200
    }
  };

  const links = [
    { id: 1, date: '2023-05-15 14:30', amount: '0.25 ETH', status: 'active' },
    { id: 2, date: '2023-05-14 10:15', amount: '100 USDT', status: 'cancelled' },
    { id: 3, date: '2023-05-13 18:45', amount: '0.01 BTC', status: 'completed' }
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>Общая сумма снятия</Typography>
          <WithdrawSummary data={withdrawData} />
        </Paper>
      </Grid>
      
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>Список ссылок</Typography>
          <LinkList links={links} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;