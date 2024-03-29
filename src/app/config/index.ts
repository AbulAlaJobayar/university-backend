/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_slat_round: process.env.BCRYPT_SLAT_ROUND,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  access_token_expire_in: process.env.ACCESS_TOKEN_EXPIRE_IN

};