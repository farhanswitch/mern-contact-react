import { AES } from "crypto-js";

export const encrypt = (text) =>
  AES.encrypt(text, import.meta.env.VITE_KEY).toString();
