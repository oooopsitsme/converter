import { LOG_LEVELS, LogLevel, LogMetaType } from '../common/model';

import { toLogLevelValue } from '../common/toLogLevelValue';

// Returns date in 'YYYY-MM-DD hh:mm:ss' format
const getCurrentTimestamp = () =>
  new Date().toLocaleString('lt', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

interface CreateLoggerProps {
  logLevel?: LogLevel;
}

interface LogFormatterProps {
  level: LogLevel;
  message: string;
  meta?: LogMetaType;
}

const createLogger = ({
  logLevel = (process.env.LOG_LEVEL as LogLevel) || (process.env.NEXT_PUBLIC_LOG_LEVEL as LogLevel),
}: CreateLoggerProps = {}) => {
  const level = toLogLevelValue(logLevel);

  const logMessage = ({ level, message, meta }: LogFormatterProps) => {
    const timestamp = getCurrentTimestamp();
    let messageString = `${timestamp} - [${level}]: ${message}`;
    if (!!meta) {
      messageString = `${messageString} ${JSON.stringify(meta)}`;
    }
    console.log(messageString);
  };

  const warning = (message: string, meta?: LogMetaType) => {
    if (level >= LOG_LEVELS.warn) {
      logMessage({ level: 'warn', message, meta });
    }
  };
  const info = (message: string, meta?: LogMetaType) => {
    if (level >= LOG_LEVELS.info) {
      logMessage({ level: 'info', message, meta });
    }
  };
  const error = (message: string, meta?: LogMetaType) => {
    if (level >= LOG_LEVELS.error) {
      logMessage({ level: 'error', message, meta });
    }
  };
  const debug = (message: string, meta?: LogMetaType) => {
    if (level >= LOG_LEVELS.debug) {
      logMessage({ level: 'debug', message, meta });
    }
  };
  const silly = (message: string, meta?: LogMetaType) => {
    if (level >= LOG_LEVELS.silly) {
      logMessage({ level: 'silly', message, meta });
    }
  };

  return {
    warning,
    info,
    error,
    debug,
    silly,
  };
};

const logger = createLogger();
type Logger = ReturnType<typeof createLogger>;
export type { Logger };
export { logger };
