// server/server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sendLicenseExpiryEmail } = require('./emailSender');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { email, licenseName, days, expiryDate } = req.body;

    try {
        await sendLicenseExpiryEmail(email, licenseName, days, expiryDate);
        res.status(200).json({ message: "Email sent!" });
    } catch (error) {
        console.error("Email send failed:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
