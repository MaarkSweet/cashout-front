import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const Statistics = () => {
  // Пример данных статистики
  const statsData = [
    {
      date: '2023-05-15',
      wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      network: 'Ethereum',
      ETH: 0.25,
      USDT: 100,
      BTC: 0
    },
    {
      date: '2023-05-14',
      wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      network: 'BSC',
      ETH: 0,
      USDT: 50,
      BTC: 0.01
    },
    {
      date: '2023-05-13',
      wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      network: 'Tron',
      ETH: 0,
      USDT: 200,
      BTC: 0
    }
  ];

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>Статистика по приходам</Typography>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Дата</TableCell>
              <TableCell>Кошелек</TableCell>
              <TableCell>Сеть</TableCell>
              <TableCell>ETH</TableCell>
              <TableCell>USDT</TableCell>
              <TableCell>BTC</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statsData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.wallet}</TableCell>
                <TableCell>{row.network}</TableCell>
                <TableCell>{row.ETH}</TableCell>
                <TableCell>{row.USDT}</TableCell>
                <TableCell>{row.BTC}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Statistics;