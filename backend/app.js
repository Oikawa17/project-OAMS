const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const loginRoutes = require('./Login/loginRoutes');
const dashboardRoutes = require('./Dashboard/dashboardRoutes');
const applicationRoutes = require('./applicationForm/applicationRoutes');
const documentuploadRoutes = require('./documentUpload/documentuploadRoutes'); // New import
const applicationStatusRoutes = require('./applicationStatus/applicationStatusRoutes');
const messageRoutes = require('./messages/messageRoutes');
const paymentRoutes = require('./payment/paymentRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/login', loginRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/application-form', applicationRoutes);
app.use('/document-upload', documentuploadRoutes); // Register upload route
app.use('/application-status', applicationStatusRoutes); // Register status route
app.use('/messages', messageRoutes);
app.use('/payment', paymentRoutes);


module.exports = app;
