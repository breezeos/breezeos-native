import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import appsReducer from "./reducers/apps";
import appearanceReducer from "./reducers/appearance";
import calculatorReducer from "./reducers/calculator";
import headerReducer from "./reducers/header";
import desktopReducer from "./reducers/desktop";
import desktopBodyReducer from "./reducers/desktopbody";
import dockReducer from "./reducers/dock";
import filesReducer from "./reducers/files";
import panelReducer from "./reducers/panel";
import modalReducer from "./reducers/modal";
import msgboxReducer from "./reducers/msgbox";
import shutdownReducer from "./reducers/shutdown";
import systemReducer from "./reducers/system";
import settingsReducer from "./reducers/settings";
import setupReducer from "./reducers/setup";
import startMenuReducer from "./reducers/startmenu";
import wifiPasswordReducer from "./reducers/wifipassword";
import newWifiReducer from "./reducers/newwifi";
import wallpaperReducer from "./reducers/wallpaper";
import weatherReducer from "./reducers/weather";
import imgViewReducer from "./reducers/imgview";
import videoViewReducer from "./reducers/videoview";
import shellReducer from "./reducers/shell";
import widgetReducer from "./reducers/widget";
import surfaceReducer from "./reducers/surface";
import timeReducer from "./reducers/time";
import touchbarReducer from "./reducers/touchbar";
import terminalWindowReducer from "./reducers/terminalwindow";
import textEditorReducer from "./reducers/texteditor";
import vscodeReducer from "./reducers/vscode";
import lockReducer from "./reducers/lock";
import windowReducer from "./reducers/window";

const reducers = {
  apps: appsReducer,
  appearance: appearanceReducer,
  calculator: calculatorReducer,
  header: headerReducer,
  desktop: desktopReducer,
  desktopbody: desktopBodyReducer,
  dock: dockReducer,
  files: filesReducer,
  panel: panelReducer,
  modal: modalReducer,
  msgbox: msgboxReducer,
  shutdown: shutdownReducer,
  system: systemReducer,
  settings: settingsReducer,
  setup: setupReducer,
  startmenu: startMenuReducer,
  wifipassword: wifiPasswordReducer,
  newwifi: newWifiReducer,
  wallpaper: wallpaperReducer,
  weather: weatherReducer,
  imgview: imgViewReducer,
  videoview: videoViewReducer,
  shell: shellReducer,
  widget: widgetReducer,
  surface: surfaceReducer,
  time: timeReducer,
  touchbar: touchbarReducer,
  terminalwindow: terminalWindowReducer,
  texteditor: textEditorReducer,
  vscode: vscodeReducer,
  lock: lockReducer,
  window: windowReducer,
};

const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
