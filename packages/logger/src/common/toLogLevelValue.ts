import { LOG_LEVELS, LogLevel } from './model';

const toLogLevelValue = (logLevel: LogLevel) => LOG_LEVELS[logLevel] || 0;

export { toLogLevelValue };
