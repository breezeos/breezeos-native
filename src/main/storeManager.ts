import path from "path";
import fs from "fs";
import { app } from "electron";
import chokidar from "chokidar";
import defaultConfig from "@/data/store.json";
import { type StoreConfigKey } from "../common/types";

const userData = app.getPath("userData");

const storePath = path.join(userData, "config.json");

class Store {
  #store: Record<StoreConfigKey, unknown>;

  constructor() {
    if (!fs.existsSync(storePath)) {
      fs.writeFileSync(storePath, JSON.stringify(defaultConfig, null, 2));
    }

    this.#store = JSON.parse(fs.readFileSync(storePath, "utf-8"))

    chokidar.watch(storePath).on("change", () => {
      this.#store = JSON.parse(fs.readFileSync(storePath, "utf-8"));
    });
  }

  #updateConfigFile() {
    return fs.writeFileSync(storePath, JSON.stringify(this.#store, null, 2));
  }

  getAllItems() {
    return this.#store;
  }

  getItem<T = unknown>(key: StoreConfigKey) {
    return this.#store[key] as T;
  }

  setItems(params: Record<string, unknown>) {
    Object.entries(params).forEach(([key, value]) => {
      const storeKey = key as StoreConfigKey;
      this.#store[storeKey] = value;
      console.log(`set ${key} to ${value}`)
    });
    console.log(this.#store)
    this.#updateConfigFile();
  }

  resetAllItems() {
    this.#store = { ...defaultConfig };
    return fs.writeFileSync(storePath, JSON.stringify(defaultConfig, null, 2));
  }

  deleteItems(...keys: StoreConfigKey[]) {
    keys.forEach((key) => delete this.#store[key]);
    this.#updateConfigFile();
  }

  resetItems(...keys: StoreConfigKey[]) {
    keys.forEach((key) => {
      if (defaultConfig[key]) {
        this.#store[key] = defaultConfig[key];
      } else {
        this.deleteItems(key);
      }
    });
    this.#updateConfigFile();
  }

  hasItem(key: StoreConfigKey) {
    return Object.prototype.hasOwnProperty.call(this.#store, key);
  }
}

export const store = new Store();
