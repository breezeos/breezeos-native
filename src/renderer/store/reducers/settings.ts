import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import si from 'systeminformation';

interface StateType {
  settings: string;
  user: {
    name: string;
    role?: 'user' | 'superuser';
    password: string;
    touchid: boolean;
    image: string | null;
  };
  deviceName: string;
  airplaneMode: boolean;
  wifi: boolean;
  wifiList: si.Systeminformation.WifiNetworkData[];
  connectedWifi?: si.Systeminformation.WifiConnectionData;
  bluetooth: boolean;
  bluetoothList: si.Systeminformation.BluetoothDeviceData[];
  isLocked: boolean;
  isSleeping: boolean;
  volume: any;
  brightness: any;
  notifications: boolean;
  boldText: boolean;
  batterySaver: boolean;
  animationsReduced: boolean;
  colorInverted: boolean;
  transparencyReduced: boolean;
  fontFamily: string;
}

const initialState: StateType = {
  settings: "Wi-Fi",
  user: {
    name: '',
    role: undefined,
    password: '',
    touchid: false,
    image: null,
  },
  deviceName: '',
  airplaneMode: false,
  wifi: true,
  wifiList: [],
  connectedWifi: undefined,
  bluetooth: false,
  bluetoothList: [],
  isLocked: true,
  isSleeping: false,
  volume: 100,
  brightness: 100,
  notifications: true,
  boldText: false,
  batterySaver: false,
  animationsReduced: false,
  colorInverted: false,
  transparencyReduced: false,
  fontFamily: 'OptimisticDisplay',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<string>) => {
      state.settings = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
    setUserImage: (state, action: PayloadAction<string>) => {
      state.user.image = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.user.password = action.payload;
      if(!state.user.password) state.user.touchid = false;
    },
    setTouchID: (state, action: PayloadAction<boolean>) => {
      state.user.touchid = action.payload;
    },
    setDeviceName: (state, action: PayloadAction<string>) => {
      state.deviceName = action.payload;
    },
    toggleAirplaneMode: (state, action: PayloadAction<boolean>) => {
      state.airplaneMode = action.payload;
      if (action.payload) {
        state.wifi = false;
        state.bluetooth = false;
      } else {
        state.wifi = true;
      }
    },
    toggleWifi: (state, action) => {
      state.wifi = action.payload;
    },
    setLocked: (state, action: PayloadAction<boolean>) => {
      state.isLocked = action.payload;
    },
    setSleeping: (state, action: PayloadAction<boolean>) => {
      state.isSleeping = action.payload;
      if (action.payload === true) {
        document.getElementsByClassName('Desktop')[0].classList.add('blackscr');
      } else {
        document
          .getElementsByClassName('Desktop')[0]
          .classList.remove('blackscr');
      }
    },
    setVolume: (state, action: PayloadAction<any>) => {
      state.volume = action.payload;
    },
    setBrightness: (state, action: PayloadAction<any>) => {
      state.brightness = action.payload;
    },
    toggleNotifications: (state, action: PayloadAction<boolean>) => {
      state.notifications = action.payload;
    },
    toggleBluetooth: (state, action: PayloadAction<boolean>) => {
      state.bluetooth = action.payload;
    },
    setWifiList: (state, action) => {
      state.wifiList = action.payload;
    },
    setConnectedWifi: (state, action) => {
      state.connectedWifi = action.payload;
    },
    setBluetoothList: (state, action) => {
      state.bluetoothList = action.payload;
    },
    setBoldText: (state, action: PayloadAction<boolean>) => {
      state.boldText = action.payload;
    },
    setBatterySaver: (state, action: PayloadAction<boolean>) => {
      state.batterySaver = action.payload;
    },
    setAnimationsReduced: (state, action: PayloadAction<boolean>) => {
      state.animationsReduced = action.payload;
    },
    setColorInverted: (state, action: PayloadAction<boolean>) => {
      state.colorInverted = action.payload;
    },
    setTransparencyReduced: (state, action: PayloadAction<boolean>) => {
      state.transparencyReduced = action.payload;
    },
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload;
    },
  },
});

export const {
  setSettings,
  setName,
  setUserImage,
  setPassword,
  setTouchID,
  setDeviceName,
  toggleAirplaneMode,
  toggleWifi,
  setLocked,
  setSleeping,
  setVolume,
  setBrightness,
  toggleNotifications,
  toggleBluetooth,
  setWifiList,
  setConnectedWifi,
  setBluetoothList,
  setBoldText,
  setBatterySaver,
  setAnimationsReduced,
  setColorInverted,
  setTransparencyReduced,
  setFontFamily,
} = settingsSlice.actions;

export default settingsSlice.reducer;
