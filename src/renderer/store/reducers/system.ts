import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import si from 'systeminformation';

type DiskData = si.Systeminformation.BlockDevicesData[];

interface StateType {
  hostname: string;
  kernel: string;
  version: string;
  platform: 'linux' | 'darwin' | 'Windows';
  memory: {
    total: string;
    used: string;
    space: string;
  };
  processor: string;
  graphics: string;
  disks: {
    data: DiskData;
    total: string;
    used: string;
    space: string;
    isEncrypted: boolean;
    password: string;
  };
  battery: {
    level: string;
    charging: boolean;
  };
  bootscreen: boolean;
}

const initialState: StateType = {
  hostname: 'BreezeOS',
  kernel: '',
  version: '',
  platform: 'linux',
  memory: {
    total: '',
    used: '',
    space: '',
  },
  processor: '',
  graphics: '',
  disks: {
    data: [],
    total: '',
    used: '',
    space: '',
    isEncrypted: false,
    password: '',
  },
  battery: {
    level: '',
    charging: false,
  },
  bootscreen: true,
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setHostname: (state, action: PayloadAction<string>) => {
      state.hostname = action.payload;
    },
    setKernel: (state, action: PayloadAction<string>) => {
      state.kernel = action.payload;
    },
    setVersion: (state, action: PayloadAction<string>) => {
      state.version = action.payload;
    },
    setPlatform: (state, action: PayloadAction<string>) => {
      state.platform = action.payload;
    },
    setTotalMemory: (state, action: PayloadAction<string>) => {
      state.memory.total = action.payload;
    },
    setUsedMemory: (state, action: PayloadAction<string>) => {
      state.memory.used = action.payload;
    },
    setSpaceMemory: (state, action: PayloadAction<string>) => {
      state.memory.space = action.payload;
    },
    setProcessor: (state, action: PayloadAction<string>) => {
      state.processor = action.payload;
    },
    setGraphics: (state, action: PayloadAction<string>) => {
      state.graphics = action.payload;
    },
    setDataDisk: (state, action: PayloadAction<DiskData>) => {
      state.disks.data = action.payload;
    },
    setTotalDisk: (state, action: PayloadAction<string>) => {
      state.disks.total = action.payload;
    },
    setUsedDisk: (state, action: PayloadAction<string>) => {
      state.disks.used = action.payload;
    },
    setSpaceDisk: (state, action: PayloadAction<string>) => {
      state.disks.space = action.payload;
    },
    encryptDisk: (state, action: PayloadAction<boolean>) => {
      state.disks.isEncrypted = action.payload;
    },
    setPasswordDisk: (state, action: PayloadAction<string>) => {
      state.disks.password = action.payload;
    },
    setBatteryLevel: (state, action: PayloadAction<string>) => {
      state.battery.level = action.payload;
    },
    setBatteryCharging: (state, action: PayloadAction<boolean>) => {
      state.battery.charging = action.payload;
    },
    setBootScreen: (state, action: PayloadAction<boolean>) => {
      state.bootscreen = action.payload;
    },
  },
});

export const {
  setHostname,
  setKernel,
  setVersion,
  setPlatform,
  setTotalMemory,
  setUsedMemory,
  setSpaceMemory,
  setProcessor,
  setGraphics,
  setDataDisk,
  setTotalDisk,
  setUsedDisk,
  setSpaceDisk,
  encryptDisk,
  setPasswordDisk,
  setBatteryLevel,
  setBatteryCharging,
  setBootScreen,
} = systemSlice.actions;

export default systemSlice.reducer;
