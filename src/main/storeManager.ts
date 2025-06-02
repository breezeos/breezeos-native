import path from "path";
import fs from "fs";
import { app } from "electron";
import chokidar from "chokidar";
import { DATA_PATH } from "@/constants/paths";

const userData = app.getPath("userData");
const storePath = path.join(userData, "config.json");
const storeDefaultJSON = JSON.parse(
  fs.readFileSync(path.join(DATA_PATH, "store.json"), "utf-8"),
);

class Store {
  #store: Record<string, unknown> = {};

  constructor() {
    if (!fs.existsSync(storePath)) {
      fs.writeFileSync(storePath, JSON.stringify(storeDefaultJSON, null, 2));
    }

    this.#store = JSON.parse(fs.readFileSync(storePath, "utf-8"));

    chokidar.watch(storePath).on("change", () => {
      this.#store = JSON.parse(fs.readFileSync(storePath, "utf-8"));
    });
  }

  #updateConfigFile() {
    return fs.writeFileSync(storePath, JSON.stringify(this.#store, null, 2));
  }

  get(...keys: string[]) {
    return keys.map((key) => this.#store[key]);
  }

  set(params: Record<string, unknown>) {
    Object.entries(params).forEach(([key, value]) => {
      this.#store[key] = value;
    });
    this.#updateConfigFile();
  }

  clearAll() {
    this.#store = { ...storeDefaultJSON };
    return fs.writeFileSync(
      storePath,
      JSON.stringify(storeDefaultJSON, null, 2),
    );
  }

  delete(...keys: string[]) {
    keys.forEach((key) => delete this.#store[key]);
    this.#updateConfigFile();
  }

  reset(...keys: string[]) {
    keys.forEach((key) => {
      if (storeDefaultJSON[key]) {
        this.#store[key] = storeDefaultJSON[key];
      } else {
        this.delete(key);
      }
    });
    this.#updateConfigFile();
  }

  has(key: string) {
    return Object.prototype.hasOwnProperty.call(this.#store, key);
  }
}

export const store = new Store();
