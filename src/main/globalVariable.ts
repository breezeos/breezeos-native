type GlobalVariableType = {
  setupSequence: Record<string, any>;
  languageData: Record<string, any>;
  [key: string]: unknown;
};

const globalVariable = {
  setupSequence: {},
  languageData: {},
};

export default class GlobalVariable {
  static #globalVariable: GlobalVariableType = globalVariable;

  static setVariable(params: Record<string, unknown>) {
    Object.entries(params).forEach(([key, value]) => {
      this.#globalVariable[key] = value;
    });
  }

  static getVariable(...keys: string[]) {
    return keys.map((key) => this.#globalVariable[key]);
  }
}
