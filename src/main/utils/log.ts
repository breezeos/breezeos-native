import chalk from "chalk";

export default class Log {
  static info<T>(...message: T[]) {
    console.log(chalk.blueBright.bold(message));
  }

  static error<T>(...message: T[]) {
    console.log(chalk.red(chalk.red.bold("ERROR: ") + message));
  }

  static warning<T>(...message: T[]) {
    console.log(
      chalk.yellowBright(chalk.yellowBright.bold("WARNING: ") + message),
    );
  }
}
