enum LogEventType {
  Warning = 'warning',
  Info = 'info',
  Error = 'error',
  Debug = 'debug',
  Silly = 'silly',
}

// https://github.com/winstonjs/winston#logging-levels
const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 5,
  silly: 6,
};

type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'silly';
type LogMetaType = { [key: string]: any };

interface LogEvent {
  level: LogEventType;
  message: string;
  meta?: LogMetaType;
}

export type { LogEvent, LogMetaType, LogLevel };
export { LogEventType, LOG_LEVELS };
