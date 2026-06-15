export const logger = {
  info: (msg: string, ctx?: Record<string, any>) => {
    console.log(JSON.stringify({ level: 'info', msg, ...ctx, timestamp: new Date().toISOString() }));
  },
  warn: (msg: string, ctx?: Record<string, any>) => {
    console.warn(JSON.stringify({ level: 'warn', msg, ...ctx, timestamp: new Date().toISOString() }));
  },
  error: (msg: string, error?: any, ctx?: Record<string, any>) => {
    console.error(JSON.stringify({
      level: 'error',
      msg,
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
      ...ctx,
      timestamp: new Date().toISOString()
    }));
  }
};
