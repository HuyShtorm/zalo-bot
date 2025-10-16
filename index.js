// index.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const ACCESS_TOKEN = '1236451742861039202:TintsRsjThMzqVaJaTAMACZRSQAnZEjAUtBvVqzQweyPXtXPtDaDAfyfJsafEFpV '; // dán token từ tin nhắn Zalo vào đây

// Webhook nhận sự kiện tin nhắn
app.post('/webhook', async (req, res) => {
  const { event_name, message } = req.body;

  // Kiểm tra loại sự kiện là có tin nhắn từ user
  if (event_name === 'user_send_text') {
    const userId = message.from.id;
    const userMsg = message.text;

    // Gửi lại tin nhắn phản hồi
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
});

app.listen(3000, () => console.log('Zalo bot đang chạy ở cổng 3000'));
