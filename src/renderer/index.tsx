import { createRoot } from 'react-dom/client';
import Desktop from './Desktop';
import { Provider } from 'react-redux';
import i18n from './translation/i18n';
import { I18nextProvider } from 'react-i18next';
import store from './store';
import { ipcRenderer } from 'electron';
import {
  Button,
  Group,
  Label,
  Popover,
  Scrubber,
  SegmentedControl,
  Slider,
  Spacer,
  TouchBar,
} from '../touchbar';
import {
  setBatterySaver,
  setBrightness,
  setVolume,
  toggleBluetooth,
  toggleWifi,
} from './store/reducers/settings';
import { setActive, setSettings } from './store/reducers/apps/settings';
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  setFontWeight,
  setForegroundColor,
  setFontFamily,
  setFontSize,
} from './store/reducers/lock';
import { useEffect, useState } from 'react';
import { insertPasswordFor } from './store/reducers/wifipassword';
import { toggleActive } from './store/reducers/newwifi';

function Body() {
  const dispatch = useAppDispatch();
  const system = useAppSelector((state) => state.system);
  const settings = useAppSelector((state) => state.settings);
  const isActive = useAppSelector((state) => state.touchbar.active);
  const lockScreen = useAppSelector((state) => state.lock);
  const lockScreenIsEditable = useAppSelector((state) => state.lock.isEditable);
  const [hist, setHist] = useState([, 'default']);

  const brightnessElem = document.getElementById(
    'brightness',
  ) as HTMLDivElement;

  function setBrightnessLevel(e: any) {
    dispatch(setBrightness(e));
    brightnessElem.style.opacity = `${(100 - e) / 100}`;
  }

  function connectWifi(e: string) {
    dispatch(setActive(true));
    dispatch(insertPasswordFor(e));
  }

  function SplashScreenWidget({ type }: { type: string }) {
    const [curDate, setCurDate] = useState(
      new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
      }),
    );

    useEffect(() => {
      setInterval(() => {
        setCurDate(
          new Date().toLocaleString('en-US', {
            dateStyle: 'medium',
          }),
        );
      }, 1000);
    }, []);

    switch (type) {
      case 'date':
        return <Button label={curDate} />;
      case 'battery':
        return (
          <Button
            icon={`../../assets/images/battery/${system.battery.level}.png`}
            iconPosition="left"
            label={`${system.battery.level}%`}
          />
        );
    }
  }

  return (
    <>
      {isActive &&
        (lockScreenIsEditable ? (
          <TouchBar>
            <Popover icon="../../assets/images/font.png" showCloseButton={true}>
              <Spacer size="flexible" />
              <Scrubber
                items={lockScreen.style.map((i) => ({
                  label: i.family,
                }))}
                selectedStyle="background"
                showArrowButtons
                onClick={(index) =>
                  dispatch(setFontFamily(lockScreen.style[index].family))
                }
              />
              <Spacer size="flexible" />
            </Popover>
            <Popover
              icon="../../assets/images/fontsize.png"
              showCloseButton={true}
            >
              <Spacer size="flexible" />
              <Scrubber
                items={[
                  {
                    label: 'Medium',
                  },
                  {
                    label: 'Large',
                  },
                ]}
                selectedStyle="background"
                onClick={(index) =>
                  dispatch(setFontSize(index === 1 ? 'large' : 'medium'))
                }
                showArrowButtons
              />
              <Spacer size="flexible" />
            </Popover>
            <Spacer size="large" />
            {lockScreen.style.map(
              (i) =>
                lockScreen.fontFamily === i.family && (
                  <Group>
                    {i.weight.light && (
                      <Button
                        icon="../../assets/images/12-light.png"
                        backgroundColor={
                          lockScreen.fontWeight === i.weight.light
                            ? '#a0a0a0'
                            : ''
                        }
                        onClick={() => dispatch(setFontWeight(i.weight.light!))}
                      />
                    )}
                    {i.weight.medium && (
                      <Button
                        icon="../../assets/images/12-medium.png"
                        backgroundColor={
                          lockScreen.fontWeight === i.weight.medium
                            ? '#a0a0a0'
                            : ''
                        }
                        onClick={() =>
                          dispatch(setFontWeight(i.weight.medium!))
                        }
                      />
                    )}
                    {i.weight.bold && (
                      <Button
                        icon="../../assets/images/12-bold.png"
                        backgroundColor={
                          lockScreen.fontWeight === i.weight.bold
                            ? '#a0a0a0'
                            : ''
                        }
                        onClick={() => dispatch(setFontWeight(i.weight.bold!))}
                      />
                    )}
                  </Group>
                ),
            )}
            <Spacer size="small" />
            <Spacer size="large" />
            <Popover icon="../../assets/images/widgets.png" showCloseButton>
              <Spacer size="flexible" />
              <Group>
                {lockScreen.widgets.map((i) => (
                  <SplashScreenWidget type={i} />
                ))}
              </Group>
              <Spacer size="flexible" />
            </Popover>
            <Spacer size="small" />
            <Popover
              icon={`../../assets/images/color/${lockScreen.foregroundColor.replace(
                '#',
                '',
              )}.png`}
              label={
                lockScreen.foregroundColor === '#7dd3fc'
                  ? 'Blue'
                  : lockScreen.foregroundColor === '#86efac'
                  ? 'Green'
                  : lockScreen.foregroundColor === '#e2e2e2'
                  ? 'White'
                  : lockScreen.foregroundColor === '#f0abfc'
                  ? 'Purple'
                  : lockScreen.foregroundColor === '#f87171'
                  ? 'Red'
                  : lockScreen.foregroundColor === '#fef08a'
                  ? 'Yellow'
                  : ''
              }
              showCloseButton
            >
              <Spacer size="flexible" />
              <Button
                backgroundColor="#e2e2e2"
                icon={
                  lockScreen.foregroundColor === '#e2e2e2'
                    ? '../../assets/images/checkmark-d.png'
                    : ''
                }
                onClick={() => dispatch(setForegroundColor('#e2e2e2'))}
              />
              <Button
                backgroundColor="#fef08a"
                icon={
                  lockScreen.foregroundColor === '#fef08a'
                    ? '../../assets/images/checkmark-d.png'
                    : ''
                }
                onClick={() => dispatch(setForegroundColor('#fef08a'))}
              />
              <Button
                backgroundColor="#7dd3fc"
                icon={
                  lockScreen.foregroundColor === '#7dd3fc'
                    ? '../../assets/images/checkmark-d.png'
                    : ''
                }
                onClick={() => dispatch(setForegroundColor('#7dd3fc'))}
              />
              <Button
                backgroundColor="#f0abfc"
                icon={
                  lockScreen.foregroundColor === '#f0abfc'
                    ? '../../assets/images/checkmark-d.png'
                    : ''
                }
                onClick={() => dispatch(setForegroundColor('#f0abfc'))}
              />
              <Button
                backgroundColor="#86efac"
                icon={
                  lockScreen.foregroundColor === '#86efac'
                    ? '../../assets/images/checkmark-d.png'
                    : ''
                }
                onClick={() => dispatch(setForegroundColor('#86efac'))}
              />
              <Button
                backgroundColor="#f87171"
                icon={
                  lockScreen.foregroundColor === '#f87171'
                    ? '../../assets/images/checkmark-d.png'
                    : ''
                }
                onClick={() => dispatch(setForegroundColor('#f87171'))}
              />
              <Spacer size="flexible" />
            </Popover>
          </TouchBar>
        ) : (
          <TouchBar>
            <Spacer size="flexible" />
            <Popover
              icon={`../../assets/images/bluetooth${
                !settings.bluetooth ? '-disabled' : ''
              }.png`}
              showCloseButton={true}
            >
              <SegmentedControl
                segments={[
                  {
                    icon: '../../assets/images/o-switch.png',
                  },
                  {
                    icon: '../../assets/images/i-switch.png',
                  },
                ]}
                selectedIndex={settings.bluetooth ? 1 : 0}
                onChange={(index) =>
                  dispatch(toggleBluetooth(index === 1 ? true : false))
                }
              />
              <Spacer size="small" />
              {settings.bluetooth &&
                (settings.isLocked ? (
                  <Label label="Unlock to find devices with Bluetooth" />
                ) : (
                  <Label
                    label={`Now discoverable as "${settings.deviceName}"`}
                  />
                ))}
              <Spacer size="flexible" />
              <Button
                icon="../../assets/images/dots-horizontal.png"
                onClick={() => {
                  dispatch(setActive(true));
                  dispatch(setSettings('Bluetooth'));
                }}
                enabled={!settings.isLocked}
              />
            </Popover>
            <Popover
              icon={`../../assets/images/battery/${system.battery.level}.png`}
              label={`${system.battery.level}%`}
              showCloseButton={true}
            >
              {settings.batterySaver ? (
                <Button
                  icon="../../assets/images/battery-saver.png"
                  onClick={() =>
                    dispatch(setBatterySaver(!settings.batterySaver))
                  }
                />
              ) : (
                <Button
                  icon="../../assets/images/battery-saver-disabled.png"
                  onClick={() =>
                    dispatch(setBatterySaver(!settings.batterySaver))
                  }
                />
              )}
              <Spacer size="large" />
              <Spacer size="large" />
              <Spacer size="large" />
              <Spacer size="large" />
              <Label
                label={`${system.battery.charging ? 'Charging' : 'Battery'}`}
                textColor="#f2f2f2"
              />
              <Spacer size="flexible" />
              <Label
                label={`${system.battery.level}%`}
                textColor={system.battery.level <= 10 ? '#e46a6a' : '#6ae4a9'}
              />
              <Spacer size="large" />
              <Spacer size="large" />
              <Spacer size="large" />
              <Spacer size="large" />
            </Popover>
            <Popover
              icon={`../../assets/images/wifi${
                !settings.wifi ? '-disabled' : ''
              }.png`}
              showCloseButton={true}
            >
              <SegmentedControl
                segments={[
                  {
                    icon: '../../assets/images/o-switch.png',
                  },
                  {
                    icon: '../../assets/images/i-switch.png',
                  },
                ]}
                selectedIndex={settings.wifi ? 1 : 0}
                onChange={(index) =>
                  dispatch(toggleWifi(index === 1 ? true : false))
                }
              />
              <Spacer size="flexible" />
              {settings.wifi && (
                <Scrubber
                  items={settings.wifiList.map((i) => ({
                    label: i.name,
                  }))}
                  selectedStyle="background"
                  onClick={(index) =>
                    !settings.wifiList[index].connected &&
                    connectWifi(settings.wifiList[index].name)
                  }
                />
              )}
              <Spacer size="flexible" />
              <Button
                icon="../../assets/images/dots-horizontal.png"
                onClick={() => {
                  dispatch(setActive(true));
                  dispatch(setSettings('Wi-Fi'));
                }}
                enabled={!settings.isLocked}
              />
            </Popover>
            <Popover
              icon="../../assets/images/brightness.png"
              showCloseButton={true}
            >
              <Spacer size="large" />
              <Spacer size="large" />
              <Spacer size="large" />
              <Spacer size="large" />
              <Label label="Brightness" textColor="#f2f2f2" />
              <Spacer size="large" />
              <Slider
                value={settings.brightness}
                minValue={15}
                maxValue={100}
                onChange={(e) => setBrightnessLevel(e)}
              />
              <Spacer size="large" />
              <Spacer size="large" />
              <Spacer size="large" />
              <Spacer size="large" />
            </Popover>
            <Popover
              icon="../../assets/images/volume.png"
              showCloseButton={true}
            >
              <Spacer size="large" />
              <Spacer size="large" />
              <Spacer size="large" />
              <Spacer size="large" />
              <Label label="Volume" textColor="#f2f2f2" />
              <Spacer size="large" />
              <Slider
                value={settings.volume}
                minValue={15}
                maxValue={100}
                onChange={(e) => dispatch(setVolume(e))}
              />
              <Spacer size="large" />
              <Spacer size="large" />
              <Spacer size="large" />
              <Spacer size="large" />
            </Popover>
          </TouchBar>
        ))}
      <Desktop />
    </>
  );
}

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Body />
    </Provider>
  </I18nextProvider>,
);

// calling IPC exposed from preload script
ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
ipcRenderer.postMessage('ipc-example', ['ping']);
