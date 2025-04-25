import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Paper, Typography, Grid } from '@mui/material';

const CreateLink = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('ETH');
  const [network, setNetwork] = useState('Ethereum');
  const [landing, setLanding] = useState('Trust');

  const currencies = ['ETH', 'USDT', 'BTC', 'BNB'];
  const networks = ['Ethereum', 'BSC', 'Tron', 'Polygon'];
  const landings = ['Trust', 'OKX', 'Binance', 'MetaMask'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика создания ссылки
    alert(`Ссылка создана: ${amount} ${currency} в сети ${network} для ${landing}`);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom style={{ marginBottom: '30px' }}>Создать новую ссылку</Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Сумма"
              variant="outlined"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Валюта</InputLabel>
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                label="Валюта"
                required
              >
                {currencies.map((curr) => (
                  <MenuItem key={curr} value={curr}>{curr}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="caption" color="textSecondary">
              Текущий курс: 1 {currency} = $1800 (пример)
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Сеть</InputLabel>
              <Select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                label="Сеть"
                required
              >
                {networks.map((net) => (
                  <MenuItem key={net} value={net}>{net}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Лендинг</InputLabel>
              <Select
                value={landing}
                onChange={(e) => setLanding(e.target.value)}
                label="Лендинг"
                required
              >
                {landings.map((land) => (
                  <MenuItem key={land} value={land}>{land}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth size="large">
              Создать ссылку
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CreateLink;