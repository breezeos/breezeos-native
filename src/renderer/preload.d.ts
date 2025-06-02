import { electronApiHandler } from "../main/preload";

declare global {
  interface Window {
    electronApi: typeof electronApiHandler;
  }
}
