import { type GlobalVariableType } from "../types";

const globalVariable = {
  languageData: {},
};

export default class GlobalVariable {
  static #globalVariable: GlobalVariableType = globalVariable;

  static setVariables(payload: Record<string, unknown>) {
    Object.entries(payload).forEach(([key, value]) => {
      const variableKey = key as keyof GlobalVariableType;
      this.#globalVariable[variableKey] =
        value as GlobalVariableType[typeof variableKey];
    });
  }

  static getAllVariables() {
    return this.#globalVariable;
  }

  static getVariable<T = unknown>(key: keyof GlobalVariableType) {
    return this.#globalVariable[key] as T;
  }
}
