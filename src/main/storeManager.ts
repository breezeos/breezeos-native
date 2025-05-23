import path from "path";
import fs from "fs";
import { app } from "electron";
import chokidar from "chokidar";

const userData = app.getPath("userData");
const storePath = path.join(userData, "config.json");
const storeDefaultJSON = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../store.json"), "utf-8"),
);

export default class StoreManager {
  private store: Record<string, unknown> = {};

  public constructor() {
    if (!fs.existsSync(storePath)) {
      fs.writeFileSync(storePath, JSON.stringify(storeDefaultJSON, null, 2));
    }

    this.store = JSON.parse(fs.readFileSync(storePath, "utf-8"));

    chokidar.watch(storePath).on("change", () => {
      this.store = JSON.parse(fs.readFileSync(storePath, "utf-8"));
    });
  }

  private updateConfigFile() {
    return fs.writeFileSync(storePath, JSON.stringify(this.store, null, 2));
  }

  public get<T = unknown>(key: string) {
    return this.store[key] as T;
  }

  public set(key: string, value: unknown) {
    this.store[key] = value;
    this.updateConfigFile();
  }

  public clear() {
    this.store = { ...storeDefaultJSON };
    return fs.writeFileSync(
      storePath,
      JSON.stringify(storeDefaultJSON, null, 2),
    );
  }

  public delete(key: string) {
    delete this.store[key];
    this.updateConfigFile();
  }

  public reset(...keys: string[]) {
    if (keys.length === 0) return;
    keys.forEach((key) => {
      if (storeDefaultJSON[key]) {
        this.set(key, storeDefaultJSON[key]);
      } else {
        this.delete(key);
      }
    });
    this.updateConfigFile();
  }

  public has(key: string) {
    if (this.store[key]) {
      return true;
    }
    return false;
  }
}
