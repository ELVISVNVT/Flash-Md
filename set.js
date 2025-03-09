const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOExqN2V3MzFhRDMzcGIwa2haZk1Hb0Fua3UxZlMyTVVTbzBVcWl0dUlrdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidDU2NEZ2NUlGeU1uWnlzWEpHY0JwUS9jQkxOdlZzT09CSG5HemdzUDZBST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtRUhJdzlWdUNETHhGNGxOUG1RSkdTM04vc3BXZ3lxM3R3TndGcFJmdlg4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRVkpKMjZRK21TSUhNeDhoY2tMOWhQYVlDc2hGNzAxeDlLeUt4bWNiYUJFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFHSGtDNUppM3N2SDJ1N3JmMkxTUVBtMCtEWmE1M3g4dEdVNC8wN2RkWE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVDeFpYYklFSE0xakw1Rkt0REVacndPN1FnSnJPSUZwUkZmZmQ3dmdqMW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ1BvcnQ3b3ZtRnhsY1JPU3N3S1F3emdNRHpEbmZMNXZhVDlDSVR2WC9uZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUmdpQVQrS3RuZSt0Uk5BZ0pXZTlEbUlBa3FnK3BDV01qdERKdWVSSUJFdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxYbXdWeXY3a3lOVitQQzZXRTBYb1dId0gyaFRtdXl3WGJVd0dSVnlxTkpGZDJJbHh4L3I1NGVIdEs2S2tHQnFsNzd3ZW02Wi9QU0dra0hyc1NzYmpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYzLCJhZHZTZWNyZXRLZXkiOiIzK0dFaWlibG4veWkza1ROcmRjd2FleVkyMzRNMXdxbmpiYlU2NzhYRnd3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIyODk4MDcwODg3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjlCOTQ4ODEzMTk0OERDQUU0RDlEOTY0MThDMzU4NkI4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDE1NDczNzJ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkpVdFhRdWVrU2s2QWl4TnV6NHhiRnciLCJwaG9uZUlkIjoiN2I0ZGI1M2UtN2U2NS00YmNjLTgyOWUtYjY0MTJiODJiOTBmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IloyU0hNcXM4Qmx4eFk5SEdtTGhLeGtObTA3TT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsamhXSlYxMHprYWVHajJrZXhTUnAyRXdXaEU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRTYxR1JYTUciLCJtZSI6eyJpZCI6IjIyODk4MDcwODg3OjMzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdl6nwnZeh8J2XqfCdl6cgIHzwnZO88J2TrvCdk7vwnZO/8J2TsvCdk6zwnZOuVlBTIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQMnZ4T01FRU5mT3Q3NEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIybUJRRE1tQ0M3NnYvaVEvL2NlN2FUT2NIN3c5a1FrRG45UlJDOVB6TGprPSIsImFjY291bnRTaWduYXR1cmUiOiI4c005T2hqM1Jac2tyQXMyaCtrZnlCTTFXMEJoSWI1eEEwQWhja2NUTXNqM2hzcHV3eTVrU3FQUGNWVkZjcmVFRFJiNDBQN2wzQmZFNkR0M2k3Ry9Bdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoicVcvQ2lhRXFicXpQRGJtdytsVEczQjRSNUp1dzhnOVBIcnpLOU1GdEcwd1FQazhQVGNVSEJJWFIvQVNGTjk4Mk9vZHRhMkNSR3BkSDVGTTJxenhxaEE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjg5ODA3MDg4NzozM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkcGdVQXpKZ2d1K3IvNGtQLzNIdTJrem5CKzhQWkVKQTUvVVVRdlQ4eTQ1In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQxNTQ3MzY1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUpJNiJ9',
    PREFIXES: (process.env.PREFIX || '#').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "VNVT",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "22898070887",
    AUTO_LIKE: process.env.STATUS_LIKE || "off",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'on',
    A_REACT: process.env.AUTO_REACTION || 'off',
    L_S: process.env.STATUS_LIKE || 'off',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    ANTIVIEW: process.env.VIEWONCE,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "off",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
