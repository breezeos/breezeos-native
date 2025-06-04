import { clsx, type ClassValue } from "clsx"
import path from "path";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId() {
  const arr = new Uint32Array(1);
  window.crypto.getRandomValues(arr);
  return arr[0] % 10;
}

export function getAssetsPath(...paths: string[]) {
  const RESOURCES_PATH = path.join(__dirname, "assets");
  console.log(path.join(RESOURCES_PATH, ...paths))
  return path.join(RESOURCES_PATH, ...paths);
}
