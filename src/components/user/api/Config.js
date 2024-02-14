const configFile = require('./config.json')
const serverEnv = process.env.API_SERVER_HOST
const config = configFile[serverEnv]

export const BACKEND_URL = config['BACKEND_URL']
export const HTTP_ONLY = config['HTTP_ONLY']
