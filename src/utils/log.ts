import chalk from "chalk";

export default class Log {
  static info(message: string) {
    console.log(chalk.blueBright.bold("INFO: "), message);
  }

  static error(message: string, ...args: string[]) {
    console.log(chalk.red(chalk.red.bold("ERROR: "), message), args);
  }

  static warning(message: string, ...args: string[]) {
    console.log(
      chalk.yellowBright(chalk.yellowBright.bold("WARNING: "), message),
      args,
    );
  }
}
