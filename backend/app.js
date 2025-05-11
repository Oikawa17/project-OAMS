const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const loginRoutes = require('./Login/loginRoutes');
const dashboardRoutes = require('./Dashboard/dashboardRoutes');

const applicationRoutes = require('./applicationForm/applicationRoutes');


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/login', loginRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/application-form', applicationRoutes);

module.exports = app;
