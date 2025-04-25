import React from 'react';
import { Typography, Divider, Grid } from '@mui/material';

const WithdrawSummary = ({ data }) => {
  return (
    <div>
      <Typography variant="h6">Всего: ${data.total}</Typography>
      
      <Divider style={{ margin: '15px 0' }} />
      
      <Typography variant="subtitle1">По токенам:</Typography>
      <Grid container spacing={2} style={{ marginTop: '10px' }}>
        {Object.entries(data.byToken).map(([token, amount]) => (
          <Grid item xs={4} key={token}>
            <Typography>{token}: ${amount}</Typography>
          </Grid>
        ))}
      </Grid>
      
      <Divider style={{ margin: '15px 0' }} />
      
      <Typography variant="subtitle1">По сетям:</Typography>
      <Grid container spacing={2} style={{ marginTop: '10px' }}>
        {Object.entries(data.byNetwork).map(([network, amount]) => (
          <Grid item xs={4} key={network}>
            <Typography>{network}: ${amount}</Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WithdrawSummary;