import chalk from '../../lib/chalk'

export const prefixes = {
  wait: chalk.white(chalk.bold('○')),
  error: chalk.red(chalk.bold('X')),
  warn: chalk.yellow(chalk.bold('⚠')),
  ready: chalk.bold('▲'), // no color
  info: chalk.white(chalk.bold(' ')),
  event: chalk.green(chalk.bold('✓')),
  trace: chalk.magenta(chalk.bold('»')),
} as const

const LOGGING_METHOD = {
  log: 'log',
  warn: 'warn',
  error: 'error',
} as const

function prefixedLog(prefixType: keyof typeof prefixes, ...message: any[]) {
  if ((message[0] === '' || message[0] === undefined) && message.length === 1) {
    message.shift()
  }

  const consoleMethod: keyof typeof LOGGING_METHOD =
    prefixType in LOGGING_METHOD
      ? LOGGING_METHOD[prefixType as keyof typeof LOGGING_METHOD]
      : 'log'

  const prefix = prefixes[prefixType]
  // If there's no message, don't print the prefix but a new line
  if (message.length === 0) {
    console[consoleMethod]('')
  } else {
    console[consoleMethod](prefix, ...message)
  }
}

export function createPrefix(prefixType: keyof typeof prefixes) {
  return ' ' + prefixes[prefixType]
}

// export function now() {
//   let date = new Date()
//   let hour = date.getHours()
//   let min = date.getMinutes()
//   let sec = date.getSeconds()
//   let mil = date.getMilliseconds()

//   // pad start with 0 for single digit numbers
//   const hourStr = hour < 10 ? '0' + hour : hour
//   const minStr = min < 10 ? '0' + min : min
//   const secStr = sec < 10 ? '0' + sec : sec

//   // pad start with 0 for milliseconds to always show 3 digits
//   const milStr = mil < 100 ? (mil < 10 ? '00' + mil : '0' + mil) : mil

//   return `${hourStr}:${minStr}:${secStr}:${milStr}`
// }

// const timestampPrefixLength = now().length
export function bootstrap(...message: any[]) {
  console.log(' ', ...message)
}

export function wait(...message: any[]) {
  prefixedLog('wait', ...message)
}

export function error(...message: any[]) {
  prefixedLog('error', ...message)
}

export function warn(...message: any[]) {
  prefixedLog('warn', ...message)
}

export function ready(...message: any[]) {
  prefixedLog('ready', ...message)
}

export function info(...message: any[]) {
  prefixedLog('info', ...message)
}

export function event(...message: any[]) {
  prefixedLog('event', ...message)
}

export function trace(...message: any[]) {
  prefixedLog('trace', ...message)
}

const warnOnceMessages = new Set()
export function warnOnce(...message: any[]) {
  if (!warnOnceMessages.has(message[0])) {
    warnOnceMessages.add(message.join(' '))

    warn(...message)
  }
}
