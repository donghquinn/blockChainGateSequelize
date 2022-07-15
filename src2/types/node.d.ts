import { Dialect } from 'sequelize/types';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      USER: string;
      HOST: string;
      DATABASE: string;
      PASSWORD: string;
      DIALECT: Dialect;
    }
  }
}

export {};