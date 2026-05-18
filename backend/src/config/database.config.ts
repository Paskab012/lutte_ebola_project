import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'lutte_ebola',
  password: process.env.DB_PASSWORD || 'change_me_in_production',
  name: process.env.DB_NAME || 'lutte_ebola_db',
}));
