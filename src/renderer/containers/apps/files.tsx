import React, { useState, useEffect, useRef } from 'react';
import {
  setActive,
  setDirectory,
  setHide,
  setIconSize,
} from '../../store/reducers/apps/files';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/dock/DockItem';
import './assets/files.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';
import ActMenu, { ActMenuSelector } from '../../components/utils/menu/index';
import { setHeaderHide } from '../../store/reducers/header';
import { useTranslation } from 'react-i18next';
import { setDesktopBodyActive } from '../../store/reducers/desktopbody';
import { setStartMenuActive } from '../../store/reducers/startmenu';
import Draggable from 'react-draggable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import FilesItem from './assets/FilesItem';

export const FilesApp = () => {
  const { t } = useTranslation();
  const isActive = useAppSelector((state) => state.appsFiles.active);
  const isHide = useAppSelector((state) => state.appsFiles.hide);
  const dispatch = useAppDispatch();
  const icon = useAppSelector((state) => state.appearance.iconTheme);

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.keyCode === 54) {
      dispatch(setActive(true));
    }
  });

  return (
    <DockItem
      id="files"
      className={`FilesApp ${isActive && 'clicked'} ${isHide && 'hide'}`}
      title={t('apps.files.name')}
      icon={
        icon === 'WhiteSur-icon-theme'
          ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/file-manager.svg'
          : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'
      }
      menu={[
        [
          {
            label: 'Recent',
            action: () => setDirectory('Recent'),
          },
          {
            label: 'Favorites',
            action: () => setDirectory('Favorites'),
          },
          {
            label: 'Home',
            action: () => setDirectory('/home'),
          },
          {
            label: 'Desktop',
            action: () => setDirectory('/home/Desktop'),
          },
          {
            label: 'Documents',
            action: () => setDirectory('/home/Documents'),
          },
          {
            label: 'Downloads',
            action: () => setDirectory('/home/Downloads'),
          },
          {
            label: 'Music',
            action: () => setDirectory('/home/Music'),
          },
          {
            label: 'Pictures',
            action: () => setDirectory('/home/Pictures'),
          },
          {
            label: 'Videos',
            action: () => setDirectory('/home/Videos'),
          },
          {
            label: 'Trash',
            action: () => setDirectory('/.Bin'),
          },
        ],
        [
          {
            label: isHide ? t('apps.unhide') : t('apps.hide'),
            disabled: isActive ? false : true,
            action: () =>
              isHide ? dispatch(setHide(false)) : dispatch(setHide(true)),
          },
          {
            label: isActive ? t('apps.quit') : t('apps.open'),
            action: () =>
              isActive ? dispatch(setActive(false)) : dispatch(setActive(true)),
          },
        ],
      ]}
      onClick={() =>
        isHide ? dispatch(setHide(false)) : dispatch(setActive(true))
      }
    />
  );
};

export const FilesStartApp = () => {
  const { t } = useTranslation();
  const isHide = useAppSelector((state) => state.appsFiles.hide);
  const dispatch = useAppDispatch();
  const icon = useAppSelector((state) => state.appearance.iconTheme);

  const toggle = () => {
    dispatch(setStartMenuActive(false));
    dispatch(setHeaderHide(false));
    dispatch(setDesktopBodyActive(true));
    if (isHide) {
      dispatch(setHide(false));
    } else {
      dispatch(setActive(true));
    }
  };

  return (
    <StartApp
      key="files"
      icon={
        icon === 'WhiteSur-icon-theme'
          ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/file-manager.svg'
          : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'
      }
      name={t('apps.files.name')}
      onClick={toggle}
    />
  );
};

export default function Files() {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((state) => state.appsFiles.active);
  const isHide = useAppSelector((state) => state.appsFiles.hide);
  const { t } = useTranslation();
  const shellTheme = useAppSelector((state) => state.shell.theme);
  const iconSize = useAppSelector((state) => state.appsFiles.iconSize);
  const directory = useAppSelector((state) => state.appsFiles.directory);
  const [settingsMenu, showSettingsMenu] = useState<boolean>(false);
  const icon = useAppSelector((state) => state.appearance.iconTheme);
  const system = useAppSelector((state) => state.system);
  const items = [
    [
      {
        icon: 'clock-rotate-left',
        title: 'Recent',
        active: directory === 'Recent',
        onClick: () => dispatch(setDirectory('Recent')),
      },
      {
        icon: 'star',
        title: 'Favorites',
        active: directory === 'Favorites',
        onClick: () => dispatch(setDirectory('Favorites')),
      },
      {
        icon: 'house',
        title: 'Home',
        active: directory === '/home',
        onClick: () => dispatch(setDirectory('/home')),
      },
      {
        icon: 'desktop',
        title: 'Desktop',
        active: directory === '/home/Desktop',
        onClick: () => dispatch(setDirectory('/home/Desktop')),
      },
      {
        icon: 'file',
        title: 'Documents',
        active: directory === '/home/Documents',
        onClick: () => dispatch(setDirectory('/home/Documents')),
      },
      {
        icon: 'download',
        title: 'Downloads',
        active: directory === '/home/Downloads',
        onClick: () => dispatch(setDirectory('/home/Downloads')),
      },
      {
        icon: 'music',
        title: 'Music',
        active: directory === '/home/Music',
        onClick: () => dispatch(setDirectory('/home/Music')),
      },
      {
        icon: 'image',
        title: 'Pictures',
        active: directory === '/home/Pictures',
        onClick: () => dispatch(setDirectory('/home/Pictures')),
      },
      {
        icon: 'film',
        title: 'Videos',
        active: directory === '/home/Videos',
        onClick: () => dispatch(setDirectory('/home/Videos')),
      },
      {
        icon: 'trash',
        title: 'Trash',
        active: directory === '/.Bin',
        onClick: () => dispatch(setDirectory('/.Bin')),
      },
    ],
    [
      {
        icon: 'plus',
        title: 'Other Locations',
        active: directory === 'Other Locations',
        onClick: () => dispatch(setDirectory('Other Locations')),
      },
    ],
  ];

  const [tree, setTree] = useState<string[]>(['']);
  const blocks = useAppSelector((state) => state.msgbox.blocks);

  async function getDirContent() {
    const content = await window.electron.ipcRenderer.invoke(
      'getDirContent',
      directory === 'Recent'
        ? ''
        : directory === 'Favorites'
        ? ''
        : directory === 'Other Locations'
        ? ''
        : directory,
    );
    setTree(content);
  }

  useEffect(() => {
    getDirContent();
  }, [directory]);

  function useOutsideSettingsMenu(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          showSettingsMenu(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const settingsMenuRef = useRef(null);
  useOutsideSettingsMenu(settingsMenuRef);

  const [min, isMin] = useState(false);

  function close() {
    dispatch(setActive(false));
    setTimeout(() => dispatch(setDirectory('/home')), 300);
  }[]

  function switchTab() {
    switch (directory) {
      case 'Recent':
        return <p>we</p>;
      case 'Favorites':
        return <p>we</p>;
      case 'Other Locations':
        return (
          <div className="OtherLocations">
            <div className="HeaderBar">
              <p className="font-bold">On this computer</p>
              <p className="font-bold">Partitions</p>
            </div>
            <div>
              <div
                className="OtherLocationsItem"
                onClick={() => dispatch(setDirectory(''))}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    className="FilesIcon"
                    src={
                      icon === 'WhiteSur-icon-theme'
                        ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/devices/scalable/drive-harddisk.svg'
                        : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/devices/drive-harddisk.svg'
                    }
                    width={30}
                    height={30}
                    style={{ marginRight: '18px' }}
                  />
                  <p>BreezeOS</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ margin: '0 20px' }}>
                    {system.disks.used} GB / {system.disks.total} GB left
                  </p>
                  <p style={{ margin: '0 20px' }}>/</p>
                </div>
              </div>
              <div
                className="OtherLocationsItem"
                onClick={() => dispatch(setDirectory('500MB Partition'))}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    className="FilesIcon"
                    src={
                      icon === 'WhiteSur-icon-theme'
                        ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/devices/scalable/drive-harddisk.svg'
                        : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/devices/drive-harddisk.svg'
                    }
                    width={30}
                    height={30}
                    style={{ marginRight: '18px' }}
                  />
                  <p>500MB Partition</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ margin: '0 20px' }}>/dev/sda1</p>
                </div>
              </div>
            </div>
            <div className="HeaderBar">
              <p className="font-bold">Networks</p>
            </div>
            <div>
              <div className="OtherLocationsItem">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    className="FilesIcon"
                    src={
                      icon === 'WhiteSur-icon-theme'
                        ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/devices/scalable/network_fs.svg'
                        : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/network-workgroup.svg'
                    }
                    width={30}
                    height={30}
                    style={{ marginRight: '18px' }}
                  />
                  <p>Windows Network</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return tree.length !== 0 ? (
          <div className="FilesSection2">
            {tree.map((i) => (
              <FilesItem name={i} location={`${directory}/${i}`} />
            ))}
          </div>
        ) : (
          <div className="NoFiles">
            <p>Empty Folder</p>
          </div>
        );
    }
  }

  return (
    <div className="FilesWindow">
      <Draggable handle=".TopBar">
        <div
          className={`Window files ${isActive && 'active'} ${
            isHide && 'hide'
          } ${min && 'minimize'}`}
        >
          <ActMenu
            style={{ zIndex: '1', top: '30px', right: '100px' }}
            className={settingsMenu ? 'active' : ''}
            ref={settingsMenuRef}
          >
            <div className="iconSize">
              <ActMenuSelector title="Icon size">
                <div style={{ marginLeft: '15px', display: 'flex' }}>
                  <i
                    className={`fa-regular fa-plus ActMenuInteraction ${
                      iconSize === 145 ? 'disabled' : ''
                    }`}
                    onClick={() => dispatch(setIconSize(iconSize + 25))}
                  />
                  <i
                    className={`fa-regular fa-minus ActMenuInteraction ${
                      iconSize === 20 ? 'disabled' : ''
                    }`}
                    onClick={() => dispatch(setIconSize(iconSize - 25))}
                  />
                </div>
              </ActMenuSelector>
            </div>
          </ActMenu>
          <TopBar title={t('apps.files.name')} onDblClick={() => isMin(!min)}>
            <div className="TabBarWrapper" style={{ width: '100%' }}>
              <div
                className="TabBar"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div className="TabBarItem" style={{ paddingLeft: 0 }}>
                  <div className="TabBarInteraction">
                    <i className="fa-regular fa-chevron-left" />
                    <i className="fa-regular fa-chevron-right" />
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div className="TabBarItem TabBarFileSystem">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <i
                        className={`fa-regular ${
                          directory === 'Recent'
                            ? 'fa-clock-rotate-left'
                            : directory === 'Favorites'
                            ? 'fa-star'
                            : directory === '/home'
                            ? 'fa-house'
                            : directory === '/.Bin'
                            ? 'fa-trash'
                            : directory === '500MB Partition'
                            ? 'fa-hard-drive'
                            : directory === 'Other Locations'
                            ? 'fa-plus'
                            : 'fa-folder'
                        }`}
                        style={{ marginRight: '5px' }}
                      />
                      <p>
                        {directory === ''
                          ? 'Filesystem'
                          : directory.split('/')[1] === '.Bin'
                          ? directory.replace('/.Bin', 'Trash')
                          : directory}
                      </p>
                    </div>
                    <div className="TabBarInteraction">
                      <i className="fa-regular fa-ellipsis-vertical" />
                    </div>
                  </div>
                  <div className="TabBarItem">
                    <div className="TabBarInteraction">
                      <i className="fa-regular fa-magnifying-glass" />
                    </div>
                  </div>
                </div>
                <div className="TabBarItem" style={{ margin: '0' }}>
                  <div
                    className="TabBarInteraction"
                    style={{ marginRight: '20px' }}
                  >
                    <i className="fa-regular fa-grid-2" />
                    <div className="TabSeparator"></div>
                    <i
                      className="fa-regular fa-chevron-down"
                      style={{ marginLeft: '3px' }}
                    />
                  </div>
                  <div
                    className="TabBarInteraction"
                    onClick={() => showSettingsMenu(!settingsMenu)}
                  >
                    <i className="fa-regular fa-bars" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="TopBarInteractionWrapper"
              style={{ display: 'flex' }}
            >
              <TopBarInteraction
                action="hide"
                onHide={() => dispatch(setHide(true))}
              />
              <TopBarInteraction
                action={min ? 'max' : 'min'}
                onMinMax={() => isMin(!min)}
              />
              <TopBarInteraction action="close" onClose={close} />
            </div>
          </TopBar>
          <WindowBody>
            <div
              className={`Files ${shellTheme === 'WhiteSur' ? 'whitesur' : ''}`}
            >
              <div className="FilesSection">
                <div className="NavPanel">
                  {items.map((e) => (
                    <div>
                      {e.map((i) => (
                        <div
                          className={`DropdownMenu ${i.active && 'active'}`}
                          onMouseDown={i.onClick}
                        >
                          <i className={`fa-regular fa-${i.icon}`} />
                          <p className="DropdownTitle">{i.title}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="FilesContainer">
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        overflowY: 'auto',
                      }}
                    >
                      {switchTab()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </WindowBody>
        </div>
      </Draggable>
    </div>
  );
}
