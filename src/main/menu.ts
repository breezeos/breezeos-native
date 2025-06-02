// only used in macOS

import {
  app,
  Menu,
  BrowserWindow,
  MenuItemConstructorOptions,
  shell,
} from "electron";

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export default class MenuBuilder {
  readonly #browserWindow: BrowserWindow;

  constructor(browserWindow: BrowserWindow) {
    this.#browserWindow = browserWindow;
  }

  buildMenu(): Menu {
    const menu = Menu.buildFromTemplate(this.#buildDefaultTemplate());
    Menu.setApplicationMenu(menu);

    return menu;
  }

  #buildDefaultTemplate(): MenuItemConstructorOptions[] {
    const subMenuAbout: DarwinMenuItemConstructorOptions = {
      label: "BreezeOS",
      submenu: [
        {
          label: "About",
          // click: () => {
          //   if (this.data.settings.isLocked) {
          //     dialog.showMessageBox(this.#browserWindow, {
          //       message: `
          //         Device Name: ${this.data.settings.deviceName}
          //         Hostname: ${this.data.system.hostname}
          //         Platform: ${this.data.system.platform}
          //         Version: ${this.data.system.version}
          //         Shell:
          //         Kernel: ${this.data.system.kernel}
          //         Memory: ${this.data.system.memory.total} GB
          //         Processor: ${this.data.system.processor}
          //         Graphics: ${this.data.system.graphics}
          //         Disk Capacity: ${this.data.system.disks.total}
          //         `,
          //       icon: nativeImage.createFromPath(this.appIcon).toDataURL(),
          //     });
          //   } else {
          //     this.#browserWindow.webContents.send("app:active", "settings");
          //     this.#browserWindow.webContents.send("settings:settings", "About");
          //   }
          // },
        },
        { type: "separator" },
        {
          label: "Settings",
          accelerator: "Command+,",
          // enabled:
          //   !this.data.settings.isLocked && !this.data.terminalwindow.active,
          click: () =>
            this.#browserWindow.webContents.send("app:active", "settings"),
        },
        { type: "separator" },
        { label: "Services", role: "services" },
        { type: "separator" },
        {
          label: "Sleep",
          // enabled: !this.data.terminalwindow.active,
          click: () => this.#browserWindow.webContents.send("activity", "sleep"),
        },
        {
          label: "Shutdown",
          // enabled: !this.data.terminalwindow.active,
          click: () =>
            this.#browserWindow.webContents.send("activity", "shutdown"),
        },
        {
          label: "Restart",
          // enabled: !this.data.terminalwindow.active,
          click: () =>
            this.#browserWindow.webContents.send("activity", "restart"),
        },
        { type: "separator" },
        {
          label: "Hide",
          accelerator: "Command+H",
          selector: "hide:",
        },
        {
          label: "Hide Others",
          accelerator: "Command+Shift+H",
          selector: "hideOtherApplications:",
        },
        {
          label: "Show All",
          selector: "unhideAllApplications:",
        },
        { type: "separator" },
        {
          label: "Quit",
          // enabled: !this.data.terminalwindow.active,
          accelerator: "Command+Q",
          click: () => {
            app.quit();
          },
        },
      ],
    };
    const subMenuEdit: DarwinMenuItemConstructorOptions = {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "Command+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+Command+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "Command+X", selector: "cut:" },
        { label: "Copy", accelerator: "Command+C", selector: "copy:" },
        { label: "Paste", accelerator: "Command+V", selector: "paste:" },
        {
          label: "Select All",
          accelerator: "Command+A",
          selector: "selectAll:",
        },
      ],
    };
    const subMenuViewDev: MenuItemConstructorOptions = {
      label: "View",
      submenu: [
        {
          label: "Reload",
          accelerator: "Command+R",
          click: () => {
            this.#browserWindow.webContents.reload();
          },
        },
        { type: "separator" },
        {
          label: "Scale Up",
          accelerator: "Command+Shift+=",
        },
        {
          label: "Scale Down",
          accelerator: "Command+Shift+-",
        },
        {
          label: "Toggle Full Screen",
          accelerator: "Control+Command+F",
          click: () => {
            this.#browserWindow.setFullScreen(
              !this.#browserWindow.isFullScreen(),
            );
          },
        },
        {
          label: "Toggle Developer Tools",
          accelerator: "Alt+Command+I",
          click: () => {
            this.#browserWindow.webContents.toggleDevTools();
          },
        },
        { type: "separator" },
        {
          label: "Take Screenshot",
          accelerator: "Command+Shift+S",
          click: () => {
            this.#browserWindow.webContents.send("screenshot", true);
          },
        },
      ],
    };
    const subMenuViewProd: MenuItemConstructorOptions = {
      label: "View",
      submenu: [
        { type: "separator" },
        {
          label: "Scale Up",
          // enabled: !this.data.terminalwindow.active,
          accelerator: "Command+Shift+Plus",
        },
        {
          label: "Scale Down",
          // enabled: !this.data.terminalwindow.active,
          accelerator: "Command+Shift+-",
        },
        {
          label: "Toggle Full Screen",
          accelerator: "Control+Command+F",
          click: () => {
            this.#browserWindow.setFullScreen(
              !this.#browserWindow.isFullScreen(),
            );
          },
        },
        { type: "separator" },
        {
          label: "Take Screenshot",
          accelerator: "Command+Shift+S",
          click: () => {
            this.#browserWindow.webContents.send("screenshot", true);
          },
        },
      ],
    };
    const subMenuWindow: DarwinMenuItemConstructorOptions = {
      label: "Window",
      submenu: [
        {
          label: "Minimize",
          accelerator: "Command+M",
          selector: "performMiniaturize:",
        },
        {
          label: "Close Simulator",
          // enabled: !this.data.terminalwindow.active,
          accelerator: "Command+W",
          selector: "performClose:",
        },
        { type: "separator" },
        { label: "Bring All to Front", selector: "arrangeInFront:" },
      ],
    };
    const subMenuHelp: MenuItemConstructorOptions = {
      label: "Help",
      role: "help",
      submenu: [
        {
          label: "BreezeOS Support",
          click: () => {
            shell.openExternal("https://breezeos.github.io");
          },
        },
        {
          label: "Keyboard Shortcuts",
          accelerator: "Command+K+S",
        },
      ],
    };

    const subMenuView =
      process.env.NODE_ENV === "development" ||
      process.env.DEBUG_PROD === "true"
        ? subMenuViewDev
        : subMenuViewProd;

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
  }

  // #buildSetupTemplate(): MenuItemConstructorOptions[] {
  //   const subMenuAbout: DarwinMenuItemConstructorOptions = {
  //     label: "BreezeOS",
  //     submenu: [
  //       {
  //         label: "About",
  //         click: () => {
  //           dialog.showMessageBox(this.#browserWindow, {
  //             message: `
  //               Device Name: ${this.data.settings.deviceName}
  //               Hostname: ${this.data.system.hostname}
  //               Platform: ${this.data.system.platform}
  //               Version: ${this.data.system.version}
  //               Shell:
  //               Kernel: ${this.data.system.kernel}
  //               Memory: ${this.data.system.memory.total} GB
  //               Processor: ${this.data.system.processor}
  //               Graphics: ${this.data.system.graphics}
  //               Disk Capacity: ${this.data.system.disks.total}
  //               `,
  //             icon: nativeImage.createFromPath(this.appIcon).toDataURL(),
  //           });
  //         },
  //       },
  //       { type: "separator" },
  //       { label: "Services", role: "services" },
  //       { type: "separator" },
  //       {
  //         label: "Hide",
  //         accelerator: "Command+H",
  //         selector: "hide:",
  //       },
  //       {
  //         label: "Hide Others",
  //         accelerator: "Command+Shift+H",
  //         selector: "hideOtherApplications:",
  //       },
  //       {
  //         label: "Show All",
  //         selector: "unhideAllApplications:",
  //       },
  //       { type: "separator" },
  //       {
  //         label: "Quit Simulator",
  //         accelerator: "Command+Q",
  //         click: () => {
  //           app.quit();
  //         },
  //       },
  //     ],
  //   };

  //   return [subMenuAbout];
  // }
}
