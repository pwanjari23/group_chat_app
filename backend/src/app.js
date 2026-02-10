const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/chats', require('./routes/chat.routes'));
// app.use('/api/messages', require('./routes/message.routes'));

module.exports = app;
