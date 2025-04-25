import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Search = () => {
  const [wallet, setWallet] = useState('');
  const [amount, setAmount] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Здесь будет логика поиска
    // Временные данные для демонстрации
    setResults([
      {
        wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        amount: '0.25 ETH',
        date: '2023-05-15'
      },
      {
        wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        amount: '100 USDT',
        date: '2023-05-14'
      }
    ]);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>Поиск</Typography>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <TextField
          label="Кошелек"
          variant="outlined"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
        <TextField
          label="Сумма"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Поиск
        </Button>
      </div>
      
      {results.length > 0 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Кошелек</TableCell>
                <TableCell>Сумма</TableCell>
                <TableCell>Дата</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={index}>
                  <TableCell>{result.wallet.substring(0, 6)}...{result.wallet.substring(result.wallet.length - 4)}</TableCell>
                  <TableCell>{result.amount}</TableCell>
                  <TableCell>{result.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default Search;