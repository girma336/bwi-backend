require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express')
const userRouter = require('./src/routes/userRoute');
const cors = require('cors');
const swaggerDocumentation = require('./src/utils/swagger')

const app = express();
const url = process.env.MONGO_URI;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!')
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error.message));

const allowedOrigins = ['*', 'http://localhost:3000'];
app.use(express.json());
app.use(cors({ origin: allowedOrigins }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Route to handle the GET request for data
app.use('/api/v1/users', userRouter);

const port = process.env.PORT || 5001;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation))
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
