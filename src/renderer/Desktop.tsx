import Wallpaper from './components/Wallpaper';
import './Desktop.scss';
import TerminalWindow from './components/utils/window/TerminalDesktop';
import LockScreen from './components/lockScreen/LockScreen';
import StartMenu from './components/startMenu/StartMenu';
import Header from './components/Header';
import Dock from './components/dock/Dock';
import DesktopBody from './DesktopBody';
import { useAppDispatch, useAppSelector } from './store/hooks';
import Snapshot from './components/Snapshot';
import Modal from './components/Modal';
import {
  setBatteryCharging,
  setBatteryLevel,
  setDataDisk,
  setGraphics,
  setHostname,
  setKernel,
  setPlatform,
  setProcessor,
  setSpaceDisk,
  setSpaceMemory,
  setTotalDisk,
  setTotalMemory,
  setUsedDisk,
  setUsedMemory,
  setVersion,
} from './store/reducers/system';
import { useBattery } from 'react-use';
import { useEffect } from 'react';
import { setTouchbarActive } from './store/reducers/touchbar';
import {
  setBluetoothList,
  setConnectedWifi,
  setLocked,
  setWifiList,
} from './store/reducers/settings';
import axios from 'axios';
import { initializeData } from './store/reducers/weather';
import Setup from './components/Setup';
import si from 'systeminformation';
import MsgBoxContainer from './components/utils/msgbox/container';

export default function Desktop() {
  const dispatch = useAppDispatch();
  const fontFamily = useAppSelector((state) => state.settings.fontFamily);
  const themeLight = useAppSelector((state) => state.settings.themeLight);
  const boldText = useAppSelector((state) => state.settings.boldText);
  const animationsReduced = useAppSelector(
    (state) => state.settings.animationsReduced,
  );
  const colorInverted = useAppSelector((state) => state.settings.colorInverted);
  const nightShift = useAppSelector((state) => state.desktop.nightShift);
  const hideCursor = useAppSelector((state) => state.desktop.hideCursor);
  const blackScr = useAppSelector((state) => state.desktop.blackScr);
  const poweroff = useAppSelector((state) => state.desktop.poweroff);
  const transparencyReduced = useAppSelector(
    (state) => state.settings.transparencyReduced,
  );
  const batteryState = useBattery();
  const batteryLevel = batteryState.level * 100;

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.keyCode === 76) {
      e.preventDefault();
      dispatch(setLocked(true));
    }
  });

  async function getHostname() {
    const hostname = await si.osInfo().then((data) => data.hostname);
    dispatch(setHostname(hostname));
  }

  async function getKernel() {
    const kernelType = await si.osInfo().then((data) => data.platform);
    const kernelVer = await si.osInfo().then((data) => data.kernel);
    const archName = await si.osInfo().then((data) => data.arch);
    dispatch(setKernel(`${kernelType} ${kernelVer} ${archName}`));
  }

  async function getSystemVersion() {
    const version = await si.osInfo().then((data) => data.release);
    dispatch(setVersion(version));
  }

  async function getPlatform() {
    const platformName = await si.osInfo().then((data) => data.platform);
    dispatch(setPlatform(platformName));
  }

  async function getProcessor() {
    const manufacturer = await si.cpu().then((data) => data.manufacturer);
    const brand = await si.cpu().then((data) => data.brand);
    dispatch(setProcessor(`${manufacturer} ${brand}`));
  }

  async function getGraphics() {
    const graphics = await si
      .graphics()
      .then((data) => data.displays.map((i) => i.model)[0]);
    dispatch(setGraphics(graphics));
  }

  async function getMemory() {
    const totalSize = (
      (await si.mem().then((data) => data.total)) / Math.pow(1024, 3)
    ).toFixed();
    const usedSize = (
      (await si.mem().then((data) => data.used)) / Math.pow(1024, 3)
    ).toFixed();
    const freeSize = (
      (await si.mem().then((data) => data.free)) / Math.pow(1024, 3)
    ).toFixed();
    dispatch(setTotalMemory(totalSize));
    dispatch(setUsedMemory(usedSize));
    dispatch(setSpaceMemory(freeSize));
  }

  async function getDisks() {
    const diskData = await si.blockDevices().then((data) => data);
    const totalSize = (
      (await si.fsSize().then((data) => data.map((i) => i.size)[0])) /
      Math.pow(1024, 3)
    ).toFixed();
    const usedSize = (
      (await si.fsSize().then((data) => data.map((i) => i.used)[0])) /
      Math.pow(1024, 3)
    ).toFixed();
    const freeSize = (
      (await si.fsSize().then((data) => data.map((i) => i.available)[0])) /
      Math.pow(1024, 3)
    ).toFixed();
    dispatch(setDataDisk(diskData));
    dispatch(setTotalDisk(totalSize));
    dispatch(setUsedDisk(usedSize));
    dispatch(setSpaceDisk(freeSize));
  }

  async function getBluetoothList() {
    const bluetoothDevices = await si.bluetoothDevices().then((data) => data);
    dispatch(setBluetoothList(bluetoothDevices));
  }

  async function getWifiList() {
    const wifiDevices = await si.wifiNetworks().then((data) => data);
    const connectedWifi = await si.wifiConnections().then((data) => data[0]);
    dispatch(setWifiList(wifiDevices));
    dispatch(setConnectedWifi(connectedWifi));
  }

  function getWeatherData() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${pos.coords.latitude},${pos.coords.longitude}?unitGroup=metric&key=JQQKA7B32A5DBBNY28V9RC423&contentType=json`;
      axios(url).then((response) => dispatch(initializeData(response.data)));
    });
  }

  useEffect(() => {
    getHostname();
    getKernel();
    getSystemVersion();
    getPlatform();
    getMemory();
    getProcessor();
    getGraphics();
    getDisks();
    getBluetoothList();
    getWifiList();
    dispatch(setTouchbarActive(true));
    getWeatherData();

    dispatch(
      setBatteryLevel(batteryLevel ? batteryLevel.toLocaleString() : '-'),
    );

    if (batteryState.charging) {
      dispatch(setBatteryCharging(true));
    } else {
      dispatch(setBatteryCharging(false));
    }

    // if (!batteryLevel) {
    //   dispatch(
    //     setBlocks([
    //       ...blocks,
    //       {
    //         type: 'exclamation',
    //         title: 'Unsuitable web browser',
    //         content:
    //           'For full experiences, we recommend you to switch to a different browser platform.',
    //         buttons: [
    //           {
    //             label: 'OK',
    //             closeAction: true,
    //           },
    //         ],
    //         width: '550px',
    //       },
    //     ]),
    //   );
    // }
  }, [batteryState, batteryLevel]);

  window.electron.ipcRenderer.once('err-no-exception', (arg) => {
    console.log(arg);
  });

  return (
    <>
    <div
      className={`Desktop ${fontFamily} ${boldText && 'isBold'} ${
        themeLight && 'lightMode'
      } ${nightShift && 'nightShift'} ${hideCursor && 'hideCursor'} ${
        blackScr && 'blackscr'
      } ${animationsReduced && 'animdisabled'} ${
        colorInverted && 'inverted'
      } ${poweroff && 'poweroff'} ${
        transparencyReduced && 'transdisabled'
      }`}
      onContextMenu={(e) => e.preventDefault()}
      id="Desktop"
    >
      <TerminalWindow />
      <MsgBoxContainer />
      {!localStorage.getItem('setupDisabled') ? (
        <Setup />
      ) : (
        <>
          <Snapshot />
          <LockScreen />
          <StartMenu />
          <Modal />
          <Header />
          <Wallpaper />
          <DesktopBody />
          <Dock />
        </>
      )}
    </div>
    <div id="brightness"></div>
    </>
  );
}
