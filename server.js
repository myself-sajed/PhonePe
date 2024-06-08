// do all the express server configuration
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
const PORT = 4000 || process.env.PORT;


app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/api/generateOTP', (req, res) => {
    // generate 6 digit otp number
    try {
        const otp = Math.floor(Math.random() * 900000) + 100000;
        console.log('OTP generated: ', otp);
        res.send({ message: 'ok', otp: otp });
    } catch (error) {
        res.send({ message: 'fail', otp: otp });
    }


})


app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
})

