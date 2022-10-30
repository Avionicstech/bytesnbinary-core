import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import winston from 'winston';
export interface LogMessage {
  key?: string;
  message: string;
  level: number;
  timestamp?: Date;
}
export interface ILogger {
  log(info: LogMessage): void;
  info(msg: string, key?: string): void;
  warn(msg: string, key?: string): void;
  error(msg: string, key?: string): void;
  debug(msg: string, key?: string): void;
}
export interface LoggerService {
  logger: winston.Logger;
}

@injectable({scope: BindingScope.TRANSIENT})
export class WinstonLoggerService implements LoggerService {
  constructor(/* Add @inject to inject parameters */) {}

  logger: winston.Logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.printf(info => {
            return `[${info.timestamp}]  ${info.level}: ${info.message}`;
          }),
        ),
      }),
    ],
  });
}
