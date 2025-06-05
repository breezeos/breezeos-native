import path from "path";

/*
  Due to the configuration of latest versions of Electron React Boilerplate,
  we can't use __dirname to return the src directory we wanted as it
  points to `.erb/dll`. This issue here is only present in the main process.
*/
export const SRC_PATH = path.join(__dirname, "../../src");

export const LANGUAGES_PATH = path.join(SRC_PATH, "languages");
