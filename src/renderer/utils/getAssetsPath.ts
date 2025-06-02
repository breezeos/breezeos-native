import path from "path";

export default function getAssetsPath(...paths: string[]) {
  const RESOURCES_PATH = path.join(__dirname, "../assets");
  return path.join(RESOURCES_PATH, ...paths);
}
