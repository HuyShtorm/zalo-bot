const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const ACCESS_TOKEN = '1236451742861039202:TintsRsjThMzqVaJaTAMACZRSQAnZEjAUtBvVqzQweyPXtXPtDaDAfyfJsafEFpV';

// Cho phép truy cập file xác thực Zalo
app.use(express.static(path.join(__dirname)));

// Trang test
app.get('/', (req, res) => {
  res.send('✅ Zalo bot của Huy đang hoạt động!');
});

// 🔥 Khi Zalo xác thực webhook (gọi POST "/"), trả về OK
app.post('/', (req, res) => {
  res.status(200).send('OK');
});

// Webhook thật xử lý tin nhắn người dùng
app.post('/webhook', async (req, res) => {
  try {
    const { event_name, message } = req.body;

    if (event_name === 'user_send_text') {
      const userId = message.from.id;
      const userMsg = message.text;

      await axios.post('https://openapi.zalo.me/v3.0/oa/message/text', {
        recipient: { user_id: userId },
        message: { text: `Vợ của Huy nói: ${userMsg} đó hả ❤️` },
      }, {
        headers: {
          'Content-Type': 'application/json',
          'access_token': ACCESS_TOKEN,
        },
      });
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('❌ Lỗi webhook:', error.message);
    res.status(500).send('Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Bot đang chạy ở cổng ${PORT}`));
