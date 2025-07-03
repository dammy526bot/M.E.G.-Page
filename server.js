// server.js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const webhookURL = process.env.WEBHOOK_URL || 'https://discord.com/api/webhooks/1390151370170175619/6hLLa1AFnO7C8MPPWMSUAGdmsPoLlPfFYGPudQmiGacMrJfLEeuavGjGhy4h0CaDAEG9'; // 建議用 .env 保護

app.post('/submit', async (req, res) => {
  const {
    roblox, discord, age, profile, rank, reason, intro
  } = req.body;

  const payload = {
    embeds: [{
      title: '📝 新的部落申請 / New Clan Application',
      color: 0x38bdf8,
      fields: [
        { name: '👤 Roblox Username', value: roblox },
        { name: '💬 Discord Username', value: discord },
        { name: '🎂 年齡', value: age },
        { name: '🔗 Roblox Profile Link', value: profile },
        { name: '🎖️ CBRN Rank', value: rank },
        { name: '🧾 申請理由 / Reason to Join', value: reason },
        { name: '📝 自我介紹 / Introduction', value: intro }
      ],
      footer: { text: '由 Discord Apply 表單自動發送' },
      timestamp: new Date()
    }]
  };

  try {
    const webhookRes = await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!webhookRes.ok) throw new Error('Webhook 發送失敗');
    res.status(200).send('OK');
  } catch (err) {
    console.error('Webhook Error:', err);
    res.status(500).send('Fail');
  }
});

app.listen(PORT, () => console.log(`✅ Server is running on http://localhost:${PORT}`));
