import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Paper, 
  Typography, 
  Grid,
  Box,
  Link as MuiLink,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

const CreateLink = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USDT');
  const [network, setNetwork] = useState('Tron');
  const [landing, setLanding] = useState('Trust');
  const [generatedLink, setGeneratedLink] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [usdEquivalent, setUsdEquivalent] = useState('');

  const currencies = ['USDT', 'TRX', 'USDC'];
  const networks = ['Tron'];
  const landings = ['Trust', 'OKX', 'Binance', 'MetaMask'];

  // Функция для получения курса валюты (заглушка)
  const fetchExchangeRate = async () => {
    // В реальном приложении здесь будет запрос к API
    return 1.0; // Для USDT
  };

  // Подключение WalletConnect для Tron
  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      const provider = new WalletConnectProvider({
        rpc: {
          1: "https://api.trongrid.io",
        },
        chainId: 1 // Tron mainnet
      });

      await provider.enable();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      
      // Для Tron нужно преобразование адреса
      if (window.tronWeb) {
        const tronAddress = window.tronWeb.address.fromHex(accounts[0]);
        setWalletAddress(tronAddress);
      } else {
        setWalletAddress(accounts[0]);
      }
    } catch (error) {
      console.error("WalletConnect error:", error);
      setOpenSnackbar(true);
    } finally {
      setIsConnecting(false);
    }
  };

  const generateUniqueId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setOpenSnackbar(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!walletAddress) {
      alert('Пожалуйста, подключите кошелек');
      return;
    }

    if (!amount || isNaN(amount)) {
      alert('Пожалуйста, введите корректную сумму');
      return;
    }

    const exchangeRate = await fetchExchangeRate();
    setUsdEquivalent((amount * exchangeRate).toFixed(2));

    const uniqueId = generateUniqueId();
    const link = `${window.location.origin}/payment/${uniqueId}?amount=${amount}&currency=${currency}&network=${network}&address=${walletAddress}`;
    setGeneratedLink(link);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom style={{ marginBottom: '30px' }}>Создать платежную ссылку</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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
                  type="number"
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
                {usdEquivalent && (
                  <Typography variant="caption" color="textSecondary">
                    ≈ {usdEquivalent} USD
                  </Typography>
                )}
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
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  onClick={connectWallet}
                  disabled={isConnecting}
                  startIcon={isConnecting ? <CircularProgress size={20} /> : null}
                >
                  {walletAddress ? `Кошелек: ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` : 'Подключить кошелек'}
                </Button>
              </Grid>
              
              <Grid item xs={12}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="secondary" 
                  fullWidth 
                  size="large"
                  disabled={!walletAddress}
                >
                  Создать платежную ссылку
                </Button>
              </Grid>
            </Grid>
          </form>
          
          {generatedLink && (
            <Box mt={4}>
              <Typography variant="h6">Ваша платежная ссылка:</Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <MuiLink href={generatedLink} target="_blank" rel="noopener">
                  {generatedLink}
                </MuiLink>
                <Button 
                  size="small" 
                  onClick={copyToClipboard}
                  startIcon={<ContentCopyIcon />}
                >
                  Копировать
                </Button>
              </Box>
            </Box>
          )}
        </Grid>
        
        <Grid item xs={12} md={6}>
          {generatedLink ? (
            <iframe 
              srcDoc={`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Receive ${currency}</title>
                  <style>
                    ${document.querySelector('style').innerHTML}
                  </style>
                </head>
                <body>
                  <div class="card">
                    <div class="header">Receive ${currency}</div>
                    <div class="amount">+${amount} ${currency}</div>
                    <div class="approx">≈ ${usdEquivalent} $</div>

                    <div class="usdt-network">
                      <img src="https://static.tildacdn.com/tild6434-3666-4665-b762-653139336362/2025-04-02_084547.jpg" alt="${currency} Logo">
                      <div class="text">
                        <span class="usdt">${currency}</span>
                        <span class="tron">${network}</span>
                      </div>
                    </div>

                    <div class="qr">
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(generatedLink)}" alt="QR Code">
                    </div>
                    <div class="timer">
                      <div style="display: flex; align-items: center;">
                        <div class="spinner"></div>
                        Awaiting receive...
                      </div>
                      <div id="countdown">10:00</div>
                    </div>
                    <div class="restart-block">
                      <p>Waiting time has expired</p>
                      <button id="restart-btn">Refresh receive</button>
                    </div>
                    <div class="details">
                      <div class="detail-row">
                        <div class="label">Date</div>
                        <div class="value">${new Date().toISOString().split('T')[0]}</div>
                      </div>
                      <div class="detail-row">
                        <div class="label">Status</div>
                        <div class="value">Pending...</div>
                      </div>
                      <div class="detail-row sender">
                        <div class="label">Receiver address</div>
                        <div class="value">${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}</div>
                      </div>
                      <div class="detail-row">
                        <div class="label">Network Fee</div>
                        <div class="value">1 ${network === 'Tron' ? 'TRX' : currency}</div>
                      </div>
                    </div>
                    <div class="btn-wrapper">
                      <button class="btn">RECEIVE</button>
                    </div>
                  </div>
                  <script>
                    ${document.querySelector('script').innerHTML}
                  </script>
                </body>
                </html>
              `}
              style={{
                width: '100%',
                height: '600px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px'
              }}
              title="Payment Preview"
            />
          ) : (
            <Box 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              height="100%"
              minHeight="400px"
              border="1px dashed #e0e0e0"
              borderRadius="8px"
            >
              <Typography variant="body1" color="textSecondary">
                Здесь будет предпросмотр платежной страницы
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Ссылка скопирована в буфер обмена!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CreateLink;