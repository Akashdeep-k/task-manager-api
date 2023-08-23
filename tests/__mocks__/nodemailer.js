const mockTransporter = {
    sendMail: (mailOptions, callback) => {
        const info = { message: 'Email sent successfully' };
        callback(null, info);
    }
};

const createTransport = () => {
    return mockTransporter;
};

module.exports = {
    createTransport
}