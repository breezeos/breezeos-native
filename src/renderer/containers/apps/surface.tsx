import React, { useState, useEffect, useRef } from "react";
import { setPrivate } from "../../store/reducers/surface";
import { setSearchEngine } from "../../store/reducers/surface";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBody from "../../components/utils/window/WindowBody";
import "./assets/surface.scss";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import SurfaceIcon from "../../../../assets/icons/surface.svg";
import SurfacePrivateIcon from "../../../../assets/icons/surface-private.svg";
import Toggle from "../../components/utils/toggle";
import ActMenu, {
  ActMenuSelector,
  ActMenuSeparator,
} from "../../components/utils/menu/index";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { WebviewTag } from "electron";
import {
  closeApp,
  enterFullScreen,
  hideApp,
  maximizeApp,
  minimizeApp,
} from "../../store/reducers/apps";

export default function Surface({ id }: { id: string }) {
  const appIsActive = useAppSelector((state) => state.apps.appIsActive);
  const fullscreen = useAppSelector((state) => state.apps.fullscreen);
  const isActive = appIsActive[id].status === "active";
  const isHide = appIsActive[id].status === "hide";
  const isMinimized = appIsActive[id].minimized;
  const isFullScreen = fullscreen === id;
  const isPrivate = useAppSelector((state) => state.surface.private);
  const { t } = useTranslation();
  const webviewRef = useRef<WebviewTag>(null);
  const [url, setUrl] = useState<string>("");
  const searchEngine = useAppSelector((state) => state.surface.searchEngine);
  const wifi = useAppSelector((state) => state.settings.wifi);
  const dispatch = useAppDispatch();
  const [splashScreen, setSplashScreen] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [histDir, setHistDir] = useState(["", ""]);
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [supportOpened, setSupportOpened] = useState(false);
  const [searchEngineMenu, showSearchEngineMenu] = useState(false);
  isActive && setTimeout(() => setSplashScreen(false), 5000);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  useEffect(() => {
    webviewRef.current?.addEventListener("did-start-loading", () => {
      setIsLoading(true);
    });

    webviewRef.current?.addEventListener("did-stop-loading", () => {
      setIsLoading(false);
    });

    webviewRef.current?.addEventListener("did-navigate-in-page", (e) => {
      setSearchValue(e.url);
    });

    webviewRef.current?.addEventListener("dom-ready", () => {
      setSearchValue(webviewRef.current?.getURL()!);
    });
  }, []);

  type History = {
    title: string;
    url: string;
  }[];

  const [hist, setHist] = useState<History>([]);

  type Tabs = {
    url: string;
  }[];

  const [tabs, setTabs] = useState<Tabs>([]);

  const isValidURL = (string: string) => {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    return res !== null;
  };

  const action = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      var qry = searchValue;

      if (isValidURL(qry)) {
        if (!qry.startsWith("http")) {
          qry = "https://" + qry;
        }
      } else if (qry === "") {
        qry = "https://breezeos.github.io";
      } else {
        qry =
          searchEngine === "Bing"
            ? `https://www.bing.com/search?q=${encodeURIComponent(qry)}`
            : searchEngine === "Google"
            ? `https://www.google.com/search?q=${encodeURIComponent(qry)}`
            : searchEngine === "DuckDuckGo"
            ? `https://duckduckgo.com/?q=${encodeURIComponent(qry)}`
            : searchEngine === "Yahoo Search"
            ? `https://search.yahoo.com/search?p=${encodeURIComponent(qry)}`
            : "";
      }

      setSearchValue(qry);
      setUrl(qry);
      setHistDir([histDir[0], qry]);
      setHist([{ title: qry, url: qry }, ...hist]);
    }
  };

  function useOutsideSearchEngineMenu(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showSearchEngineMenu(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const searchEngineMenuRef = useRef(null);
  useOutsideSearchEngineMenu(searchEngineMenuRef);

  function useOutsideMenu(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setMenuOpened(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const menuRef = useRef(null);
  useOutsideMenu(menuRef);

  function close() {
    dispatch(closeApp(id));
    setUrl("");
  }

  return (
    <div className="SurfaceWindow">
      <Draggable handle="#TopBar">
        <div
          className={`Window surface ${isActive && "active"} ${
            isHide && "hide"
          } ${isMinimized && "minimize"} ${isFullScreen && "fullscreen"}`}
        >
          <ActMenu
            style={{ zIndex: "1", top: "30px", right: "300px", width: "200px" }}
            className={menuOpened ? "active" : ""}
            ref={menuRef}
          >
            <ActMenuSelector
              icon="fa-regular fa-clock-rotate-left"
              title="History"
              onClose={() => setMenuOpened(false)}
            />
            <ActMenuSeparator />
            <ActMenuSelector
              icon="fa-regular fa-gear"
              title="Settings"
              onClick={() => setSettingsOpened(true)}
              onClose={() => setMenuOpened(false)}
            />
          </ActMenu>
          <TopBar
            title={t(`apps.${id}.name`)}
            onDblClick={() =>
              isMinimized
                ? dispatch(maximizeApp(id))
                : dispatch(minimizeApp(id))
            }
          >
            <div className="TabBarWrapper">
              <div className="TabBar">
                <div className="TabBarItem">
                  <div className="TabBarInteraction">
                    <i className="fa-regular fa-rectangle-history" />
                  </div>
                </div>
              </div>
            </div>
            <div className="TabBar">
              <div
                className={`TabBarItem TabSearchItem ${isLoading && "loading"}`}
                style={{ width: isMinimized ? "610px" : "700px" }}
              >
                <div className="TabBarInteraction">
                  <i
                    className="fa-regular fa-chevron-left"
                    onClick={() => webviewRef.current?.goBack()}
                  />
                  <i
                    className="fa-regular fa-chevron-right"
                    onClick={() => webviewRef.current?.goForward()}
                  />
                  <i
                    className="fa-regular fa-rotate-right"
                    onClick={() => webviewRef.current?.reload()}
                  />
                </div>
                <input
                  className={`TabSearch ${splashScreen && "disabled"}`}
                  type="text"
                  spellCheck="false"
                  autoComplete="0"
                  placeholder={
                    searchEngine === "Bing"
                      ? t("apps.surface.searchPlaceholder.bing")
                      : searchEngine === "Google"
                      ? t("apps.surface.searchPlaceholder.google")
                      : searchEngine === "DuckDuckGo"
                      ? t("apps.surface.searchPlaceholder.duckduckgo")
                      : searchEngine === "Yahoo Search"
                      ? t("apps.surface.searchPlaceholder.yahooSearch")
                      : ""
                  }
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchValue(e.target.value)
                  }
                  value={searchValue}
                  onKeyDown={action}
                />
              </div>
              <div className="TabBarItem TabSettingsItem">
                <div className="TabBarInteraction">
                  <i
                    className={`fa-regular fa-ellipsis ${
                      menuOpened && "active"
                    }`}
                    onClick={() => setMenuOpened(!menuOpened)}
                  />
                </div>
                <div className="TabBarInteraction">
                  <i
                    className={`fa-regular fa-circle-question ${
                      supportOpened && "active"
                    }`}
                    onMouseDown={() => setSupportOpened(!supportOpened)}
                  />
                </div>
              </div>
            </div>
            <div
              className="TopBarInteractionWrapper"
              style={{ display: "flex" }}
            >
              <TopBarInteraction
                action="hide"
                onHide={() => dispatch(hideApp(id))}
              />
              <TopBarInteraction
                action={isMinimized ? "max" : "min"}
                onMinMax={() =>
                  isMinimized
                    ? dispatch(maximizeApp(id))
                    : dispatch(minimizeApp(id))
                }
                onPress={() => dispatch(enterFullScreen(id))}
              />
              <TopBarInteraction action="close" onClose={close} />
            </div>
          </TopBar>
          <WindowBody>
            <div className="Surface">
              {isFullScreen && (
                <div className="TopBar">
                  <div className="TopBarInteractionContainer">
                    <div className="TabBarWrapper" style={{ marginLeft: "0" }}>
                      <div className="TabBar">
                        <div className="TabBarItem">
                          <div className="TabBarInteraction">
                            <i className="fa-regular fa-rectangle-history" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="TabBar" style={{ width: "100%" }}>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          className={`TabBarItem TabSearchItem ${
                            isLoading && "loading"
                          }`}
                          style={{ width: isMinimized ? "610px" : "700px" }}
                        >
                          <div className="TabBarInteraction">
                            <i
                              className="fa-regular fa-chevron-left"
                              onClick={() => webviewRef.current?.goBack()}
                            />
                            <i
                              className="fa-regular fa-chevron-right"
                              onClick={() => webviewRef.current?.goForward()}
                            />
                            <i
                              className="fa-regular fa-rotate-right"
                              onClick={() => webviewRef.current?.reload()}
                            />
                          </div>
                          <input
                            className={`TabSearch ${
                              splashScreen && "disabled"
                            }`}
                            type="text"
                            spellCheck="false"
                            autoComplete="0"
                            placeholder={
                              searchEngine === "Bing"
                                ? t("apps.surface.searchPlaceholder.bing")
                                : searchEngine === "Google"
                                ? t("apps.surface.searchPlaceholder.google")
                                : searchEngine === "DuckDuckGo"
                                ? t("apps.surface.searchPlaceholder.duckduckgo")
                                : searchEngine === "Yahoo Search"
                                ? t(
                                    "apps.surface.searchPlaceholder.yahooSearch",
                                  )
                                : ""
                            }
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setSearchValue(e.target.value)
                            }
                            value={searchValue}
                            onKeyDown={action}
                          />
                        </div>
                        <div className="TabBarItem TabSettingsItem">
                          <div className="TabBarInteraction">
                            <i
                              className={`fa-regular fa-ellipsis ${
                                menuOpened && "active"
                              }`}
                              onClick={() => setMenuOpened(!menuOpened)}
                            />
                          </div>
                          <div className="TabBarInteraction">
                            <i
                              className={`fa-regular fa-circle-question ${
                                supportOpened && "active"
                              }`}
                              onMouseDown={() =>
                                setSupportOpened(!supportOpened)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="SurfaceContentContainer">
                <div className={`Settings ${settingsOpened && "active"}`}>
                  <div
                    style={{
                      maxWidth: "840px",
                      margin: "0 auto",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                      }}
                    >
                      <div
                        className="CloseButton"
                        onClick={() => setSettingsOpened(false)}
                      >
                        <i className="fa-light fa-xmark" />
                      </div>
                    </div>
                    <div
                      style={{
                        maxWidth: "600px",
                        margin: "0 auto",
                      }}
                    >
                      <div className="SettingsItem">
                        <p className="SettingsName">
                          {t("apps.surface.settings.privateMode")}
                        </p>
                        <Toggle
                          active={isPrivate}
                          onToggle={() => dispatch(setPrivate(!isPrivate))}
                        />
                      </div>
                      <div className="SettingsItem">
                        <p className="SettingsName">
                          {t("apps.surface.settings.searchEngine")}
                        </p>
                        <div
                          className="SettingsMenuSection"
                          onClick={() => showSearchEngineMenu(true)}
                        >
                          <p style={{ marginRight: "7px" }}>{searchEngine}</p>
                          <i className="fa-regular fa-chevron-down" />
                        </div>
                        <ActMenu
                          style={{
                            zIndex: "1",
                            width: "200px",
                            transform: "translate(340px, 44px)",
                          }}
                          className={searchEngineMenu ? "active" : ""}
                          ref={searchEngineMenuRef}
                        >
                          <ActMenuSelector
                            onClose={() => showSearchEngineMenu(false)}
                            title="Bing"
                            onClick={() => dispatch(setSearchEngine("Bing"))}
                            active={searchEngine === "Bing"}
                          />
                          <ActMenuSelector
                            onClose={() => showSearchEngineMenu(false)}
                            title="Google"
                            onClick={() => dispatch(setSearchEngine("Google"))}
                            active={searchEngine === "Google"}
                          />
                          <ActMenuSelector
                            onClose={() => showSearchEngineMenu(false)}
                            title="DuckDuckGo"
                            onClick={() =>
                              dispatch(setSearchEngine("DuckDuckGo"))
                            }
                            active={searchEngine === "DuckDuckGo"}
                          />
                          <ActMenuSelector
                            onClose={() => showSearchEngineMenu(false)}
                            title="Yahoo Search"
                            onClick={() =>
                              dispatch(setSearchEngine("Yahoo Search"))
                            }
                            active={searchEngine === "Yahoo Search"}
                          />
                        </ActMenu>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`Support ${supportOpened && "active"}`}>
                  <div
                    style={{
                      maxWidth: "840px",
                      margin: "0 auto",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                      }}
                    >
                      <div
                        className="CloseButton"
                        onClick={() => setSupportOpened(false)}
                      >
                        <i className="fa-light fa-xmark" />
                      </div>
                    </div>
                  </div>
                  {/* <iframe
                  className="SupportFrame"
                  src="https://breezeos.github.io"
                /> */}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p>iFrame is not available for this dialog.</p>
                  </div>
                </div>
                <webview
                  ref={webviewRef}
                  className={`iFrame ${!wifi || (!url && "hide")}`}
                  src={url}
                  title={t("apps.surface.newTab")}
                  allowFullScreen={true}
                />
                {!url && (
                  <>
                    <div
                      className={`SplashScreen ${isPrivate && "private"} ${
                        !splashScreen && "disabled"
                      }`}
                    >
                      {isPrivate ? (
                        <img
                          className="SplashScreenIcon"
                          src={SurfacePrivateIcon}
                        />
                      ) : (
                        <img className="SplashScreenIcon" src={SurfaceIcon} />
                      )}
                    </div>
                    <div className="MainScreen">
                      <div className="Main">
                        <div className="NonCollapsibleSection">
                          <div className="SearchWrapper">
                            <p className="Text">
                              {searchEngine === "Bing"
                                ? t("apps.surface.startupTitle.bing")
                                : searchEngine === "Google"
                                ? t("apps.surface.startupTitle.google")
                                : searchEngine === "DuckDuckGo"
                                ? t("apps.surface.startupTitle.duckduckgo")
                                : searchEngine === "Yahoo Search"
                                ? t("apps.surface.startupTitle.yahooSearch")
                                : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {!wifi && (
                  <div className="CantBeReached">
                    <p className="CantBeReachedText">
                      {t("apps.surface.internetUnabled")}
                    </p>
                    <div className="Description">
                      <p>{t("apps.surface.internetUnabledDesc")}</p>
                      <div className="ButtonContainer">
                        <button className="Button">
                          {t("apps.surface.internetUnabledReload")}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </WindowBody>
        </div>
      </Draggable>
    </div>
  );
}
