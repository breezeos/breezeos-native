import chalk from "chalk";

export default class Log {
  static info(...message: string[]) {
    console.log(chalk.blueBright.bold(message));
  }

  static error(...message: string[]) {
    console.log(chalk.red(chalk.red.bold("ERROR: ") + message));
  }

  static warning(...message: string[]) {
    console.log(
      chalk.yellowBright(chalk.yellowBright.bold("WARNING: ") + message),
    );
  }
}
