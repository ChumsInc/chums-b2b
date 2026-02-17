import 'dotenv/config';
import process from "node:process"

export const API_PORT = process.env.API_PORT ?? '8081';
export const APP_PORT = process.env.PORT ?? '8084';
