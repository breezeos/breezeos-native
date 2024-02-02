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
  const searchEngine = useAppSelector((state) => state.surface.searchEngine);
  const wifi = useAppSelector((state) => state.settings.wifi);
  const dispatch = useAppDispatch();
  const [splashScreen, setSplashScreen] = useState(true);
  const [histDir, setHistDir] = useState(["", ""]);
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [supportOpened, setSupportOpened] = useState(false);
  const [searchEngineMenu, showSearchEngineMenu] = useState(false);
  isActive && setTimeout(() => setSplashScreen(false), 5000);
  const [tabsOpened, setTabsOpened] = useState<boolean>(false);
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  type Tabs = {
    url: string;
    urlSearch: string;
    title?: string;
    favicon?: string;
    isLoading?: boolean;
  }[];

  const [tabs, setTabs] = useState<Tabs>([]);
  const [privateTabs, setPrivateTabs] = useState<Tabs>([]);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [privateTabIndex, setPrivateTabIndex] = useState<number>(0);

  useEffect(() => {
    if (isActive && tabs.length === 0) {
      setTabs([
        ...tabs,
        {
          url: "",
          urlSearch: "",
          isLoading: false,
        },
      ]);
    }
  }, [isActive]);

  useEffect(() => {
    webviewRef.current?.addEventListener("did-start-loading", () => {
      setTabs(
        tabs.map((e, i) =>
          i === tabIndex
            ? {
                ...e,
                isLoading: true,
              }
            : e,
        ),
      );
    });

    webviewRef.current?.addEventListener("did-stop-loading", () => {
      setTabs(
        tabs.map((e, i) =>
          i === tabIndex
            ? {
                ...e,
                isLoading: false,
              }
            : e,
        ),
      );
    });

    webviewRef.current?.addEventListener("did-navigate-in-page", (event) => {
      setTabs(
        tabs.map((e, i) =>
          i === tabIndex
            ? {
                ...e,
                urlSearch: event.url,
                title: e.title,
              }
            : e,
        ),
      );
    });

    webviewRef.current?.addEventListener("dom-ready", () => {
      setTabs(
        tabs.map((e, i) =>
          i === tabIndex
            ? {
                ...e,
                urlSearch: webviewRef.current?.getURL()!,
                title: webviewRef.current?.getTitle()!,
              }
            : e,
        ),
      );
    });

    webviewRef.current?.addEventListener("page-favicon-updated", (event) => {
      setTabs(
        tabs.map((e, i) =>
          i === tabIndex
            ? {
                ...e,
                favicon: event.favicons[0],
              }
            : e,
        ),
      );
    });
  }, [tabs]);

  type History = {
    title: string;
    url: string;
  }[];

  const [hist, setHist] = useState<History>([]);

  const isValidURL = (string: string) => {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    return res !== null;
  };

  console.log(tabs);

  const action = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      var qry = tabs[tabIndex]?.urlSearch;

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

      setTabs(
        tabs.map((e, i) =>
          i === tabIndex
            ? {
                ...e,
                url: qry,
                urlSearch: qry,
              }
            : e,
        ),
      );

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
    setTabs([]);
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
                <div
                  className={`TabBarItem SwitchTab ${isPrivate && "private"} ${
                    tabsOpened && "active"
                  }`}
                  onMouseDown={() => setTabsOpened(!tabsOpened)}
                >
                  <div className="TabBarInteraction">
                    {isPrivate ? (
                      <p style={{ margin: "0 1px" }}>Private</p>
                    ) : (
                      <i className="fa-regular fa-rectangle-history" />
                    )}
                  </div>
                  {tabsOpened ? (
                    <div className="TabBarInteraction">
                      <i className="fa-regular fa-xmark" />
                    </div>
                  ) : (
                    <div className="TabBarInteraction">
                      <i className="fa-regular fa-chevron-right" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                width: "100%",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: tabsOpened ? "0" : "-20px",
                  opacity: !tabsOpened ? "0" : "1",
                  scale: !tabsOpened ? "0.9" : "1",
                  visibility: !tabsOpened ? "hidden" : "visible",
                  transition: "all ease 0.2s",
                  margin: "0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {!isPrivate
                  ? tabs.map((i, index) => (
                      <div
                        className={`TabBarWrapper Tabs ${
                          tabIndex === index && "active"
                        }`}
                        style={{ width: "200px" }}
                        onClick={() => {
                          setTabIndex(index);
                          setTabsOpened(false);
                        }}
                      >
                        <div className="TabBar" style={{ height: "28px" }}>
                          <div
                            className="TabBarItem TabSearchItem"
                            style={{
                              justifyContent: "space-between",
                              width: "100%",
                              margin: "0",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {i.favicon ? (
                                <img src={i.favicon} width={16} height={16} />
                              ) : (
                                <i className="fa-regular fa-rectangle-history" />
                              )}
                              <p style={{ marginLeft: "7px" }}>
                                {i.title ? i.title : "New Tab"}
                              </p>
                            </div>
                            <div
                              className="CloseButton"
                              onClick={() =>
                                setTabs(tabs.filter((_e, i) => i !== index))
                              }
                            >
                              <i className="fa-regular fa-xmark" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : privateTabs.map((i, index) => (
                      <div
                        className={`TabBarWrapper Tabs ${
                          privateTabIndex === index && "active"
                        }`}
                        style={{ width: "200px" }}
                        onClick={() => {
                          setPrivateTabIndex(index);
                          setTabsOpened(false);
                        }}
                      >
                        <div className="TabBar" style={{ height: "28px" }}>
                          <div
                            className="TabBarItem TabSearchItem"
                            style={{
                              justifyContent: "space-between",
                              width: "100%",
                              margin: "0",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {i.favicon ? (
                                <img src={i.favicon} width={16} height={16} />
                              ) : (
                                <i className="fa-regular fa-rectangle-history" />
                              )}
                              <p style={{ marginLeft: "7px" }}>
                                {i.title ? i.title : "New Tab"}
                              </p>
                            </div>
                            <div
                              className="CloseButton"
                              onClick={() =>
                                setPrivateTabs(
                                  privateTabs.filter((_e, i) => i !== index),
                                )
                              }
                            >
                              <i className="fa-regular fa-xmark" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                <div className="TabBar">
                  <div
                    className="TabBarItem"
                    style={{ margin: 0, padding: "4px" }}
                  >
                    <div className="TabBarInteraction">
                      <i
                        className={`fa-regular fa-plus ${
                          menuOpened && "active"
                        }`}
                        onClick={() => {
                          if (isPrivate) {
                            setPrivateTabs([
                              ...privateTabs,
                              {
                                url: "",
                                urlSearch: "",
                                isLoading: false,
                              },
                            ]);
                            setPrivateTabIndex(privateTabIndex + 1);
                            setTabsOpened(false);
                          } else {
                            setTabs([
                              ...tabs,
                              {
                                url: "",
                                urlSearch: "",
                                isLoading: false,
                              },
                            ]);
                            setTabIndex(tabIndex + 1);
                            setTabsOpened(false);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="TabBar"
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  width: "100%",
                  left: tabsOpened ? "40px" : "0",
                  opacity: tabsOpened ? "0" : "1",
                  scale: tabsOpened ? "0.9" : "1",
                  visibility: tabsOpened ? "hidden" : "visible",
                  transition: "all ease 0.2s",
                  pointerEvents: "none",
                }}
              >
                <div
                  className={`TabBarItem TabSearchItem ${
                    tabs[tabIndex]?.isLoading && "loading"
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
                    onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setTabs(
                        tabs.map((e, i) =>
                          i === tabIndex
                            ? {
                                ...e,
                                urlSearch: event.target.value,
                              }
                            : e,
                        ),
                      )
                    }
                    value={tabs[tabIndex]?.urlSearch}
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
                    <div className="TabBarWrapper">
                      <div className="TabBar">
                        <div
                          className={`TabBarItem SwitchTab ${
                            isPrivate && "private"
                          } ${tabsOpened && "active"}`}
                          onMouseDown={() => setTabsOpened(!tabsOpened)}
                        >
                          <div className="TabBarInteraction">
                            {isPrivate ? (
                              <p style={{ margin: "0 1px" }}>Private</p>
                            ) : (
                              <i className="fa-regular fa-rectangle-history" />
                            )}
                          </div>
                          {tabsOpened ? (
                            <div className="TabBarInteraction">
                              <i className="fa-regular fa-xmark" />
                            </div>
                          ) : (
                            <div className="TabBarInteraction">
                              <i className="fa-regular fa-chevron-right" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: tabsOpened ? "0" : "-20px",
                          opacity: !tabsOpened ? "0" : "1",
                          scale: !tabsOpened ? "0.9" : "1",
                          visibility: !tabsOpened ? "hidden" : "visible",
                          transition: "all ease 0.2s",
                          margin: "0",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {!isPrivate
                          ? tabs.map((i, index) => (
                              <div
                                className={`TabBarWrapper Tabs ${
                                  tabIndex === index && "active"
                                }`}
                                style={{ width: "200px" }}
                                onClick={() => {
                                  setTabIndex(index);
                                  setTabsOpened(false);
                                }}
                              >
                                <div
                                  className="TabBar"
                                  style={{ height: "28px" }}
                                >
                                  <div
                                    className="TabBarItem TabSearchItem"
                                    style={{
                                      justifyContent: "space-between",
                                      width: "100%",
                                      margin: "0",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      {i.favicon ? (
                                        <img
                                          src={i.favicon}
                                          width={16}
                                          height={16}
                                        />
                                      ) : (
                                        <i className="fa-regular fa-rectangle-history" />
                                      )}
                                      <p style={{ marginLeft: "7px" }}>
                                        {i.title ? i.title : "New Tab"}
                                      </p>
                                    </div>
                                    <div
                                      className="CloseButton"
                                      onClick={() =>
                                        setTabs(
                                          tabs.filter((_e, i) => i !== index),
                                        )
                                      }
                                    >
                                      <i className="fa-regular fa-xmark" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          : privateTabs.map((i, index) => (
                              <div
                                className={`TabBarWrapper Tabs ${
                                  privateTabIndex === index && "active"
                                }`}
                                style={{ width: "200px" }}
                                onClick={() => {
                                  setPrivateTabIndex(index);
                                  setTabsOpened(false);
                                }}
                              >
                                <div
                                  className="TabBar"
                                  style={{ height: "28px" }}
                                >
                                  <div
                                    className="TabBarItem TabSearchItem"
                                    style={{
                                      justifyContent: "space-between",
                                      width: "100%",
                                      margin: "0",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      {i.favicon ? (
                                        <img
                                          src={i.favicon}
                                          width={16}
                                          height={16}
                                        />
                                      ) : (
                                        <i className="fa-regular fa-rectangle-history" />
                                      )}
                                      <p style={{ marginLeft: "7px" }}>
                                        {i.title ? i.title : "New Tab"}
                                      </p>
                                    </div>
                                    <div
                                      className="CloseButton"
                                      onClick={() =>
                                        setPrivateTabs(
                                          privateTabs.filter(
                                            (_e, i) => i !== index,
                                          ),
                                        )
                                      }
                                    >
                                      <i className="fa-regular fa-xmark" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        <div className="TabBar">
                          <div
                            className="TabBarItem"
                            style={{ margin: 0, padding: "4px" }}
                          >
                            <div className="TabBarInteraction">
                              <i
                                className={`fa-regular fa-plus ${
                                  menuOpened && "active"
                                }`}
                                onClick={() => {
                                  if (isPrivate) {
                                    setPrivateTabs([
                                      ...privateTabs,
                                      {
                                        url: "",
                                        urlSearch: "",
                                        isLoading: false,
                                      },
                                    ]);
                                    setPrivateTabIndex(privateTabIndex + 1);
                                    setTabsOpened(false);
                                  } else {
                                    setTabs([
                                      ...tabs,
                                      {
                                        url: "",
                                        urlSearch: "",
                                        isLoading: false,
                                      },
                                    ]);
                                    setTabIndex(tabIndex + 1);
                                    setTabsOpened(false);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="TabBar"
                        style={{
                          position: "absolute",
                          justifyContent: "center",
                          width: "100%",
                          left: tabsOpened ? "40px" : "0",
                          opacity: tabsOpened ? "0" : "1",
                          scale: tabsOpened ? "0.9" : "1",
                          visibility: tabsOpened ? "hidden" : "visible",
                          transition: "all ease 0.2s",
                          pointerEvents: "none",
                        }}
                      >
                        <div
                          className={`TabBarItem TabSearchItem ${
                            tabs[tabIndex]?.isLoading && "loading"
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
                            onInput={(
                              event: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                              setTabs(
                                tabs.map((e, i) =>
                                  i === tabIndex
                                    ? {
                                        ...e,
                                        urlSearch: event.target.value,
                                      }
                                    : e,
                                ),
                              )
                            }
                            value={tabs[tabIndex]?.urlSearch}
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
                {wifi ? (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {isPrivate ? (
                      <webview
                        ref={webviewRef}
                        className={`iFrame ${
                          privateTabs[privateTabIndex]?.url && "active"
                        }`}
                        src={privateTabs[privateTabIndex]?.url}
                        title={privateTabs[privateTabIndex]?.title}
                        allowFullScreen={true}
                      />
                    ) : (
                      <webview
                        ref={webviewRef}
                        className={`iFrame ${tabs[tabIndex]?.url && "active"}`}
                        src={tabs[tabIndex]?.url}
                        title={tabs[tabIndex]?.title}
                        allowFullScreen={true}
                      />
                    )}
                  </div>
                ) : (
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
                {isPrivate
                  ? !privateTabs[privateTabIndex]?.url && (
                      <>
                        <div
                          className={`SplashScreen private ${
                            !splashScreen && "disabled"
                          }`}
                        >
                          <img
                            className="SplashScreenIcon"
                            src={SurfacePrivateIcon}
                          />
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
                    )
                  : !tabs[tabIndex]?.url && (
                      <>
                        <div
                          className={`SplashScreen ${
                            !splashScreen && "disabled"
                          }`}
                        >
                          <img className="SplashScreenIcon" src={SurfaceIcon} />
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
              </div>
            </div>
          </WindowBody>
        </div>
      </Draggable>
    </div>
  );
}
