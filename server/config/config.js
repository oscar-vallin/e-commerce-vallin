require('dotenv').config();

module.exports = {
    DATABASE: process.env.DATABASE,
    PORT: process.env.PORT || 4000,
    JSON_SECRET: process.env.JSON_SECRET || 'wordsecret',
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    CLIENT_URL: process.env.CLIENT_URL,
    CLIENT_GOOGLE_ID: process.env.CLIENT_GOOGLE_ID,
    CLIENT_GOOGLE_SECRET: process.env.CLIENT_GOOGLE_SECRET
}