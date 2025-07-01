require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

// Load environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const XAI_API_KEY = process.env.XAI_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ADMIN_PHONE = process.env.ADMIN_PHONE;
const SILLY_PHONE = process.env.SILLY_PHONE;
const SILLY_ADDRESS = process.env.SILLY_ADDRESS;
const SILLY_PRIVATE_KEY = process.env.SILLY_PRIVATE_KEY;
const SILLY_INITIAL_BALANCE = parseFloat(process.env.SILLY_INITIAL_BALANCE);
const SILLY_OIL_BALANCE = parseFloat(process.env.SILLY_OIL_BALANCE);

// Simulated token generation (use JWT in production)
function generateToken(phoneNumber) {
    return Buffer.from(phoneNumber).toString('base64');
}

// Middleware to verify admin token
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    const decodedPhone = Buffer.from(token, 'base64').toString();
    if (decodedPhone !== ADMIN_PHONE) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    next();
}

// Admin verification endpoint
app.post('/api/auth/verify', (req, res) => {
    const { phoneNumber } = req.body;
    if (phoneNumber === ADMIN_PHONE) {
        const token = generateToken(phoneNumber);
        res.json({ isAdmin: true, token });
    } else {
        res.json({ isAdmin: false });
    }
});

// Wallet update endpoint (admin only)
app.post('/api/wallet/update', verifyToken, (req, res) => {
    try {
        console.log('Updating wallet for address:', SILLY_ADDRESS);
        console.log('Balance:', SILLY_INITIAL_BALANCE, 'Oil:', SILLY_OIL_BALANCE);
        res.json({ success: true, message: 'Wallet updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Export for Vercel
module.exports = app;
