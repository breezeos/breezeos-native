import { clsx, type ClassValue } from "clsx"
import path from "path";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId() {
  let count = 0;
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

export function getAssetsPath(...paths: string[]) {
  const RESOURCES_PATH = path.join(__dirname, "../assets");
  return path.join(RESOURCES_PATH, ...paths);
}