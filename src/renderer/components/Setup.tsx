import { ReactElement, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import './Setup.scss';
import { useTranslation } from 'react-i18next';
import Checkbox from './utils/checkbox';
import ActMenu, { ActMenuSelector } from './utils/menu';
import si from 'systeminformation';
import Avatar from './Avatar';
import {
  setDeviceName,
  setTouchID,
  setName,
  setPassword,
  toggleLightMode,
} from '../store/reducers/settings';
import Light from '../../../assets/images/light.png';
import Dark from '../../../assets/images/dark.png';
import {
  encryptDisk,
  setBootScreen,
  setPasswordDisk,
} from '../store/reducers/system';
import InstallImage from '../../../assets/images/install.png';
import InstallMacImage from '../../../assets/images/install-mac.png';
import useProcess from '../hooks/useProcess';
import CryptoJS from 'crypto-js';
import { clearBlocks, setBlocks } from '../store/reducers/msgbox';
import TouchID from '../../../assets/images/touchid.png';
import FrameD from '../../../assets/images/frame-d.jpg';
import FrameL from '../../../assets/images/frame-l.jpg';
import Frame1D from '../../../assets/images/setup/dark/frame1.jpg';
import Frame2D from '../../../assets/images/setup/dark/frame2.jpg';
import Frame3D from '../../../assets/images/setup/dark/frame3.jpg';
import Frame4D from '../../../assets/images/setup/dark/frame4.jpg';
import Frame5D from '../../../assets/images/setup/dark/frame5.jpg';
import Frame6D from '../../../assets/images/setup/dark/frame6.jpg';
import Frame7D from '../../../assets/images/setup/dark/frame7.jpg';
import Frame8D from '../../../assets/images/setup/dark/frame8.jpg';
import Frame9D from '../../../assets/images/setup/dark/frame9.jpg';
import Frame10D from '../../../assets/images/setup/dark/frame10.jpg';
import Frame11D from '../../../assets/images/setup/dark/frame11.jpg';
import Frame12D from '../../../assets/images/setup/dark/frame12.jpg';
import Frame13D from '../../../assets/images/setup/dark/frame13.jpg';
import Frame1L from '../../../assets/images/setup/light/frame1.jpg';
import Frame2L from '../../../assets/images/setup/light/frame2.jpg';
import Frame3L from '../../../assets/images/setup/light/frame3.jpg';
import Frame4L from '../../../assets/images/setup/light/frame4.jpg';
import Frame5L from '../../../assets/images/setup/light/frame5.jpg';
import Frame6L from '../../../assets/images/setup/light/frame6.jpg';
import Frame7L from '../../../assets/images/setup/light/frame7.jpg';
import Frame8L from '../../../assets/images/setup/light/frame8.jpg';
import Frame9L from '../../../assets/images/setup/light/frame9.jpg';
import Frame10L from '../../../assets/images/setup/light/frame10.jpg';
import Frame11L from '../../../assets/images/setup/light/frame11.jpg';
import Frame12L from '../../../assets/images/setup/light/frame12.jpg';
import Frame13L from '../../../assets/images/setup/light/frame13.jpg';

export default function Setup() {
  const dispatch = useAppDispatch();
  const [isInstalling, setIsInstalling] = useState<boolean>(false);
  const [installPercent, setInstallPercent] = useState<number>(0);
  const [installationStarted, setInstallationStart] = useState<boolean>(false);
  const settings = useAppSelector((state) => state.settings);
  const system = useAppSelector((state) => state.system);
  const [subDialog, setSubDialog] = useState<ReactElement>();
  const { restart } = useProcess();
  const [t, i18n] = useTranslation();

  const lang = [
    {
      lang: 'Deutsch',
      active: i18n.language === 'Deutsch',
    },
    {
      lang: 'English (US)',
      active: i18n.language === 'English (US)',
    },
    {
      lang: 'Español',
      active: i18n.language === 'Español',
    },
    {
      lang: 'Français',
      active: i18n.language === 'Français',
    },
    {
      lang: 'Bahasa Indonesia',
      active: i18n.language === 'Bahasa Indonesia',
    },
    {
      lang: 'Italiano',
      active: i18n.language === 'Italiano',
    },
    {
      lang: '日本語',
      active: i18n.language === '日本語',
    },
    {
      lang: '한국어',
      active: i18n.language === '한국어',
    },
    {
      lang: 'Русский',
      active: i18n.language === 'Русский',
    },
    {
      lang: 'แบบไทย',
      active: i18n.language === 'แบบไทย',
    },
    {
      lang: 'Український',
      active: i18n.language === 'Український',
    },
    {
      lang: 'Tiếng Việt',
      active: i18n.language === 'Tiếng Việt',
    },
    {
      lang: '中文 (简体)',
      active: i18n.language === '中文 (简体)',
    },
    {
      lang: '中文 (繁體)',
      active: i18n.language === '中文 (繁體)',
    },
  ];
  const [currentCountry, setCurrentCountry] = useState<string>('Argentina');
  const countries = [
    {
      country: 'Argentina',
      active: currentCountry === 'Argentina',
    },
    {
      country: 'Algeria',
      active: currentCountry === 'Algeria',
    },
    {
      country: 'Afghanistan',
      active: currentCountry === 'Afghanistan',
    },
    {
      country: 'Angola',
      active: currentCountry === 'Angola',
    },
    {
      country: 'Australia',
      active: currentCountry === 'Australia',
    },
    {
      country: 'Azerbaijan',
      active: currentCountry === 'Azerbaijan',
    },
    {
      country: 'Austria',
      active: currentCountry === 'Austria',
    },
    {
      country: 'Albania',
      active: currentCountry === 'Albania',
    },
    {
      country: 'Armenia',
      active: currentCountry === 'Armenia',
    },
    {
      country: 'Antigua and Barbuda',
      active: currentCountry === 'Antigua and Barbuda',
    },
    {
      country: 'Brazil',
      active: currentCountry === 'Brazil',
    },
    {
      country: 'Bangladesh',
      active: currentCountry === 'Bangladesh',
    },
    {
      country: 'Burkina Faso',
      active: currentCountry === 'Burkina Faso',
    },
    {
      country: 'Benin',
      active: currentCountry === 'Benin',
    },
    {
      country: 'Burundi',
      active: currentCountry === 'Burundi',
    },
    {
      country: 'Bolivia',
      active: currentCountry === 'Bolivia',
    },
    {
      country: 'Belgium',
      active: currentCountry === 'Belgium',
    },
    {
      country: 'Belarus',
      active: currentCountry === 'Belarus',
    },
    {
      country: 'Bulgaria',
      active: currentCountry === 'Bulgaria',
    },
    {
      country: 'Bosnia and Herzegovina',
      active: currentCountry === 'Bosnia and Herzegovina',
    },
    {
      country: 'Botswana',
      active: currentCountry === 'Botswana',
    },
    {
      country: 'Bahrain',
      active: currentCountry === 'Bahrain',
    },
    {
      country: 'Bhutan',
      active: currentCountry === 'Bhutan',
    },
    {
      country: 'Brunei',
      active: currentCountry === 'Brunei',
    },
    {
      country: 'Bahamas',
      active: currentCountry === 'Bahamas',
    },
    {
      country: 'Belize',
      active: currentCountry === 'Belize',
    },
    {
      country: 'Barbados',
      active: currentCountry === 'Barbados',
    },
    {
      country: 'China',
      active: currentCountry === 'China',
    },
    {
      country: 'Colombia',
      active: currentCountry === 'Colombia',
    },
    {
      country: 'Canada',
      active: currentCountry === 'Canada',
    },
    {
      country: "Côte d'Ivoire",
      active: currentCountry === "Côte d'Ivoire",
    },
    {
      country: 'Cameroon',
      active: currentCountry === 'Cameroon',
    },
    {
      country: 'Chile',
      active: currentCountry === 'Chile',
    },
    {
      country: 'Chad',
      active: currentCountry === 'Chad',
    },
    {
      country: 'Cambodia',
      active: currentCountry === 'Cambodia',
    },
    {
      country: 'Cuba',
      active: currentCountry === 'Cuba',
    },
    {
      country: 'Czech Republic',
      active: currentCountry === 'Czech Republic',
    },
    {
      country: 'Congo-Brazzaville',
      active: currentCountry === 'Congo-Brazzaville',
    },
    {
      country: 'Central African Republic',
      active: currentCountry === 'Central African Republic',
    },
    {
      country: 'Costa Rica',
      active: currentCountry === 'Costa Rica',
    },
    {
      country: 'Croatia',
      active: currentCountry === 'Croatia',
    },
    {
      country: 'Cyprus',
      active: currentCountry === 'Cyprus',
    },
    {
      country: 'Comoros',
      active: currentCountry === 'Comoros',
    },
    {
      country: 'Cabo Verde',
      active: currentCountry === 'Cabo Verde',
    },
    {
      country: 'Democratic Republic of the Congo',
      active: currentCountry === 'Democratic Republic of the Congo',
    },
    {
      country: 'Dominican Republic',
      active: currentCountry === 'Dominican Republic',
    },
    {
      country: 'Denmark',
      active: currentCountry === 'Denmark',
    },
    {
      country: 'Djibouti',
      active: currentCountry === 'Djibouti',
    },
    {
      country: 'Dominica',
      active: currentCountry === 'Dominica',
    },
    {
      country: 'Ethiopia',
      active: currentCountry === 'Ethiopia',
    },
    {
      country: 'Egypt',
      active: currentCountry === 'Egypt',
    },
    {
      country: 'Ecuador',
      active: currentCountry === 'Ecuador',
    },
    {
      country: 'El Salvador',
      active: currentCountry === 'El Salvador',
    },
    {
      country: 'England',
      active: currentCountry === 'England',
    },
    {
      country: 'Eritrea',
      active: currentCountry === 'Eritrea',
    },
    {
      country: 'Equatorial Guinea',
      active: currentCountry === 'Equatorial Guinea',
    },
    {
      country: 'Estonia',
      active: currentCountry === 'Estonia',
    },
    {
      country: 'Eswatini',
      active: currentCountry === 'Eswatini',
    },
    {
      country: 'France',
      active: currentCountry === 'France',
    },
    {
      country: 'Finland',
      active: currentCountry === 'Finland',
    },
    {
      country: 'Fiji',
      active: currentCountry === 'Fiji',
    },
    {
      country: 'Germany',
      active: currentCountry === 'Germany',
    },
    {
      country: 'Ghana',
      active: currentCountry === 'Ghana',
    },
    {
      country: 'Guatemala',
      active: currentCountry === 'Guatemala',
    },
    {
      country: 'Guinea',
      active: currentCountry === 'Guinea',
    },
    {
      country: 'Greece',
      active: currentCountry === 'Greece',
    },
    {
      country: 'Georgia',
      active: currentCountry === 'Georgia',
    },
    {
      country: 'Gambia',
      active: currentCountry === 'Gambia',
    },
    {
      country: 'Gabon',
      active: currentCountry === 'Gabon',
    },
    {
      country: 'Guinea-Bissau',
      active: currentCountry === 'Guinea-Bissau',
    },
    {
      country: 'Guyana',
      active: currentCountry === 'Guyana',
    },
    {
      country: 'Grenada',
      active: currentCountry === 'Grenada',
    },
    {
      country: 'Haiti',
      active: currentCountry === 'Haiti',
    },
    {
      country: 'Honduras',
      active: currentCountry === 'Honduras',
    },
    {
      country: 'Hungary',
      active: currentCountry === 'Hungary',
    },
    {
      country: 'Holy See',
      active: currentCountry === 'Holy See',
    },
    {
      country: 'India',
      active: currentCountry === 'India',
    },
    {
      country: 'Indonesia',
      active: currentCountry === 'Indonesia',
    },
    {
      country: 'Iran',
      active: currentCountry === 'Iran',
    },
    {
      country: 'Italy',
      active: currentCountry === 'Italy',
    },
    {
      country: 'Iraq',
      active: currentCountry === 'Iraq',
    },
    {
      country: 'Israel',
      active: currentCountry === 'Israel',
    },
    {
      country: 'Ireland',
      active: currentCountry === 'Ireland',
    },
    {
      country: 'Iceland',
      active: currentCountry === 'Iceland',
    },
    {
      country: 'Japan',
      active: currentCountry === 'Japan',
    },
    {
      country: 'Jordan',
      active: currentCountry === 'Jordan',
    },
    {
      country: 'Jamaica',
      active: currentCountry === 'Jamaica',
    },
    {
      country: 'Kenya',
      active: currentCountry === 'Kenya',
    },
    {
      country: 'Kazakhstan',
      active: currentCountry === 'Kazakhstan',
    },
    {
      country: 'Kyrgyzstan',
      active: currentCountry === 'Kyrgyzstan',
    },
    {
      country: 'Kuwait',
      active: currentCountry === 'Kuwait',
    },
    {
      country: 'Kiribati',
      active: currentCountry === 'Kiribati',
    },
    {
      country: 'Laos',
      active: currentCountry === 'Laos',
    },
    {
      country: 'Libya',
      active: currentCountry === 'Libya',
    },
    {
      country: 'Liberia',
      active: currentCountry === 'Liberia',
    },
    {
      country: 'Lebanon',
      active: currentCountry === 'Lebanon',
    },
    {
      country: 'Lithuania',
      active: currentCountry === 'Lithuania',
    },
    {
      country: 'Lesotho',
      active: currentCountry === 'Lesotho',
    },
    {
      country: 'Latvia',
      active: currentCountry === 'Latvia',
    },
    {
      country: 'Luxembourg',
      active: currentCountry === 'Luxembourg',
    },
    {
      country: 'Liechtenstein',
      active: currentCountry === 'Liechtenstein',
    },
    {
      country: 'Mexico',
      active: currentCountry === 'Mexico',
    },
    {
      country: 'Myanmar',
      active: currentCountry === 'Myanmar',
    },
    {
      country: 'Morocco',
      active: currentCountry === 'Morocco',
    },
    {
      country: 'Malaysia',
      active: currentCountry === 'Malaysia',
    },
    {
      country: 'Mozambique',
      active: currentCountry === 'Mozambique',
    },
    {
      country: 'Madagascar',
      active: currentCountry === 'Madagascar',
    },
    {
      country: 'Mali',
      active: currentCountry === 'Mali',
    },
    {
      country: 'Malawi',
      active: currentCountry === 'Malawi',
    },
    {
      country: 'Mauritania',
      active: currentCountry === 'Mauritania',
    },
    {
      country: 'Mongolia',
      active: currentCountry === 'Mongolia',
    },
    {
      country: 'Moldova',
      active: currentCountry === 'Moldova',
    },
    {
      country: 'Mauritius',
      active: currentCountry === 'Mauritius',
    },
    {
      country: 'Montenegro',
      active: currentCountry === 'Montenegro',
    },
    {
      country: 'Micronesia',
      active: currentCountry === 'Micronesia',
    },
    {
      country: 'Malta',
      active: currentCountry === 'Malta',
    },
    {
      country: 'Maldives',
      active: currentCountry === 'Maldives',
    },
    {
      country: 'Marshall Islands',
      active: currentCountry === 'Marshall Islands',
    },
    {
      country: 'Monaco',
      active: currentCountry === 'Monaco',
    },
    {
      country: 'Nigeria',
      active: currentCountry === 'Nigeria',
    },
    {
      country: 'Nepal',
      active: currentCountry === 'Nepal',
    },
    {
      country: 'Niger',
      active: currentCountry === 'Niger',
    },
    {
      country: 'North Korea',
      active: currentCountry === 'North Korea',
    },
    {
      country: 'Netherlands',
      active: currentCountry === 'Netherlands',
    },
    {
      country: 'Nicaragua',
      active: currentCountry === 'Nicaragua',
    },
    {
      country: 'Norway',
      active: currentCountry === 'Norway',
    },
    {
      country: 'New Zealand',
      active: currentCountry === 'New Zealand',
    },
    {
      country: 'Namibia',
      active: currentCountry === 'Namibia',
    },
    {
      country: 'North Macedonia',
      active: currentCountry === 'North Macedonia',
    },
    {
      country: 'Nauru',
      active: currentCountry === 'Nauru',
    },
    {
      country: 'Oman',
      active: currentCountry === 'Oman',
    },
    {
      country: 'Pakistan',
      active: currentCountry === 'Pakistan',
    },
    {
      country: 'Philippines',
      active: currentCountry === 'Philippines',
    },
    {
      country: 'Poland',
      active: currentCountry === 'Poland',
    },
    {
      country: 'Peru',
      active: currentCountry === 'Peru',
    },
    {
      country: 'Papua New Guinea',
      active: currentCountry === 'Papua New Guinea',
    },
    {
      country: 'Portugal',
      active: currentCountry === 'Portugal',
    },
    {
      country: 'Paraguay',
      active: currentCountry === 'Paraguay',
    },
    {
      country: 'Palestine',
      active: currentCountry === 'Palestine',
    },
    {
      country: 'Panama',
      active: currentCountry === 'Panama',
    },
    {
      country: 'Palau',
      active: currentCountry === 'Palau',
    },
    {
      country: 'Qatar',
      active: currentCountry === 'Qatar',
    },
    {
      country: 'Russia',
      active: currentCountry === 'Russia',
    },
    {
      country: 'Romania',
      active: currentCountry === 'Romania',
    },
    {
      country: 'Rwanda',
      active: currentCountry === 'Rwanda',
    },
    {
      country: 'Scotland',
      active: currentCountry === 'Scotland',
    },
    {
      country: 'South Africa',
      active: currentCountry === 'South Africa',
    },
    {
      country: 'South Korea',
      active: currentCountry === 'South Korea',
    },
    {
      country: 'Sudan',
      active: currentCountry === 'Sudan',
    },
    {
      country: 'Spain',
      active: currentCountry === 'Spain',
    },
    {
      country: 'Saudi Arabia',
      active: currentCountry === 'Saudi Arabia',
    },
    {
      country: 'Syria',
      active: currentCountry === 'Syria',
    },
    {
      country: 'Sri Lanka',
      active: currentCountry === 'Sri Lanka',
    },
    {
      country: 'Somalia',
      active: currentCountry === 'Somalia',
    },
    {
      country: 'Senegal',
      active: currentCountry === 'Senegal',
    },
    {
      country: 'South Sudan',
      active: currentCountry === 'South Sudan',
    },
    {
      country: 'Sweden',
      active: currentCountry === 'Sweden',
    },
    {
      country: 'Switzerland',
      active: currentCountry === 'Switzerland',
    },
    {
      country: 'Sierra Leone',
      active: currentCountry === 'Sierra Leone',
    },
    {
      country: 'Serbia',
      active: currentCountry === 'Serbia',
    },
    {
      country: 'Singapore',
      active: currentCountry === 'Singapore',
    },
    {
      country: 'Slovakia',
      active: currentCountry === 'Slovakia',
    },
    {
      country: 'Solomon Islands',
      active: currentCountry === 'Solomon Islands',
    },
    {
      country: 'Suriname',
      active: currentCountry === 'Suriname',
    },
    {
      country: 'Sao Tome and Principe',
      active: currentCountry === 'Sao Tome and Principe',
    },
    {
      country: 'Samoa',
      active: currentCountry === 'Samoa',
    },
    {
      country: 'Saint Lucia',
      active: currentCountry === 'Saint Lucia',
    },
    {
      country: 'Seychelles',
      active: currentCountry === 'Seychelles',
    },
    {
      country: 'Saint Vincent and the Grenadines',
      active: currentCountry === 'Saint Vincent and the Grenadines',
    },
    {
      country: 'Saint Kitts and Nevis',
      active: currentCountry === 'Saint Kitts and Nevis',
    },
    {
      country: 'San Marino',
      active: currentCountry === 'San Marino',
    },
    {
      country: 'Turkey',
      active: currentCountry === 'Turkey',
    },
    {
      country: 'Thailand',
      active: currentCountry === 'Thailand',
    },
    {
      country: 'Tanzania',
      active: currentCountry === 'Tanzania',
    },
    {
      country: 'Tunisia',
      active: currentCountry === 'Tunisia',
    },
    {
      country: 'Tajikistan',
      active: currentCountry === 'Tajikistan',
    },
    {
      country: 'Togo',
      active: currentCountry === 'Togo',
    },
    {
      country: 'Turkmenistan',
      active: currentCountry === 'Turkmenistan',
    },
    {
      country: 'Trinidad and Tobago',
      active: currentCountry === 'Trinidad and Tobago',
    },
    {
      country: 'Timor-Leste',
      active: currentCountry === 'Timor-Leste',
    },
    {
      country: 'Tonga',
      active: currentCountry === 'Tonga',
    },
    {
      country: 'Tuvalu',
      active: currentCountry === 'Tuvalu',
    },
    {
      country: 'United States',
      active: currentCountry === 'United States',
    },
    {
      country: 'United Kingdom',
      active: currentCountry === 'United Kingdom',
    },
    {
      country: 'Uganda',
      active: currentCountry === 'Uganda',
    },
    {
      country: 'Ukraine',
      active: currentCountry === 'Ukraine',
    },
    {
      country: 'Uzbekistan',
      active: currentCountry === 'Uzbekistan',
    },
    {
      country: 'United Arab Emirates',
      active: currentCountry === 'United Arab Emirates',
    },
    {
      country: 'Urugray',
      active: currentCountry === 'Urugray',
    },
    {
      country: 'Vietnam',
      active: currentCountry === 'Vietnam',
    },
    {
      country: 'Venezuela',
      active: currentCountry === 'Venezuela',
    },
    {
      country: 'Vanuatu',
      active: currentCountry === 'Vanuatu',
    },
    {
      country: 'Wales',
      active: currentCountry === 'Wales',
    },
    {
      country: 'Yemen',
      active: currentCountry === 'Yemen',
    },
    {
      country: 'Zambia',
      active: currentCountry === 'Zambia',
    },
    {
      country: 'Zimbabwe',
      active: currentCountry === 'Zimbabwe',
    },
  ];
  const [keyboardLayout, setKeyboardLayout] =
    useState<string>('American English');
  const keyboard = [
    {
      layout: 'American English',
      active: keyboardLayout === 'American English',
    },
  ];

  const section =
    system.platform === 'darwin'
      ? [
          'language',
          'country',
          'keyboard',
          // 'wifi',
          'disks',
          'encryptDisk',
          'location',
          'users',
          'touchid',
          'appearances',
          'bootscreen',
        ]
      : [
          'language',
          'country',
          'keyboard',
          'wifi',
          'disks',
          'encryptDisk',
          'location',
          'users',
          'appearances',
          'bootscreen',
        ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentSection = section[currentIndex];
  const [selectedNetwork, setSelectedNetwork] = useState<string>();
  const [selectedDisk, setSelectedDisk] =
    useState<si.Systeminformation.BlockDevicesData>();
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [passwordDiskValue, setPasswordDiskValue] = useState<string>('');
  const [passwordDisabled, setPasswordDisabled] = useState<boolean>(false);

  function setDefault() {
    setCurrentIndex(0);
    setInstallationStart(false);
    i18n.changeLanguage('English (US)');
    setCurrentCountry('Argentina');
    setKeyboardLayout('American English');
    dispatch(clearBlocks());
  }

  function install() {
    setIsInstalling(true);
    window.electron.ipcRenderer.invoke('installFs');
  }

  useEffect(() => {
    if (isInstalling) {
      if (passwordValue) {
        dispatch(
          setPassword(CryptoJS.MD5(passwordValue).toString(CryptoJS.enc.Hex)),
        );
      }
      if (installPercent === 101) return;

      const interval = setInterval(
        () => setInstallPercent(installPercent + 1),
        50,
      );

      return () => clearInterval(interval);
    }
  }, [isInstalling, passwordValue, installPercent]);

  function ConnectWifi() {
    const [inputPassword, setInputPassword] = useState<string>('');
    const [passwordIsDisabled, setPasswordDisable] = useState<boolean>(false);
    const [passwordIsShow, setPasswordShow] = useState<boolean>(false);
    const [passwordIsWrong, setPasswordWrong] = useState<boolean>(false);

    function submitPassword() {
      setPasswordDisable(true);
      setPasswordWrong(false);
      setTimeout(() => {
        setPasswordDisable(false);
        setPasswordWrong(true);
      }, 4000);
    }

    return (
      <>
        <div style={{ margin: '30px 20px' }}>
          <p style={{ fontSize: '17px', fontWeight: 700 }}>
            {t('setup.subdialog.connectWifi.titleLeftHand')} "{selectedNetwork}"{' '}
            {t('setup.subdialog.connectWifi.titleRightHand')}
          </p>
          <div style={{ marginTop: '30px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <p style={{ fontSize: '14.7px', marginRight: '10px' }}>
                {t('setup.subdialog.connectWifi.passwordLabel')}
              </p>
              <input
                type={passwordIsShow ? 'text' : 'password'}
                id="password"
                autoComplete="false"
                spellCheck={false}
                value={inputPassword}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputPassword(e.target.value)
                }
                className={`Input ${passwordIsDisabled && 'disabled'} ${
                  passwordIsWrong && 'wrongPassword'
                }`}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <p style={{ fontSize: '14.7px', marginRight: '10px' }}>
                {t('setup.subdialog.connectWifi.showPasswordLabel')}
              </p>
              <Checkbox
                active={passwordIsShow}
                onToggle={() => setPasswordShow(!passwordIsShow)}
                disabled={passwordIsDisabled}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            width: '100%',
          }}
        >
          <div
            className={`Button ${inputPassword.length < 8 && 'disabled'} ${
              passwordIsDisabled && 'disabled'
            }`}
            onClick={submitPassword}
          >
            <p>{t('setup.subdialog.connectWifi.connectButtonLabel')}</p>
          </div>
        </div>
      </>
    );
  }

  function ConnectOtherWifi() {
    const [inputName, setInputName] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');
    const [passwordIsDisabled, setPasswordDisable] = useState<boolean>(false);
    const [passwordIsShow, setPasswordShow] = useState<boolean>(false);
    const [passwordIsWrong, setPasswordWrong] = useState<boolean>(false);
    const [securityMenu, showSecurityMenu] = useState<boolean>(false);
    const [security, setSecurity] = useState<string>('WPA2');

    function useOutsideSecurityMenu(ref: React.RefObject<HTMLElement>) {
      useEffect(() => {
        function handleClickOutside(event: any) {
          if (ref.current && !ref.current.contains(event.target)) {
            showSecurityMenu(false);
          }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [ref]);
    }

    const securityMenuRef = useRef(null);
    useOutsideSecurityMenu(securityMenuRef);

    function submitPassword() {
      setPasswordDisable(true);
      setPasswordWrong(false);
      setTimeout(() => {
        setPasswordDisable(false);
        setPasswordWrong(true);
      }, 4000);
    }

    return (
      <>
        <div
          style={{
            width: '100%',
          }}
        >
          <p className="Title">{t('setup.subdialog.connectOtherWifi.title')}</p>
          <div style={{ margin: '30px 20px 0 20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <p
                style={{
                  fontSize: '14.7px',
                  marginRight: '10px',
                  width: '132px',
                }}
              >
                {t('setup.subdialog.connectOtherWifi.nameLabel')}
              </p>
              <input
                type="text"
                autoComplete="false"
                spellCheck={false}
                value={inputName}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputName(e.target.value)
                }
                className={`Input ${passwordIsDisabled && 'disabled'} ${
                  passwordIsWrong && 'wrongPassword'
                }`}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <p style={{ fontSize: '14.7px', marginRight: '10px' }}>
                {t('setup.subdialog.connectOtherWifi.passwordLabel')}
              </p>
              <input
                type={passwordIsShow ? 'text' : 'password'}
                id="password"
                autoComplete="false"
                spellCheck={false}
                value={inputPassword}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputPassword(e.target.value)
                }
                className={`Input ${passwordIsDisabled && 'disabled'} ${
                  passwordIsWrong && 'wrongPassword'
                }`}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <p style={{ fontSize: '14.7px', marginRight: '10px' }}>
                {t('setup.subdialog.connectOtherWifi.showPasswordLabel')}
              </p>
              <Checkbox
                active={passwordIsShow}
                onToggle={() => setPasswordShow(!passwordIsShow)}
                disabled={passwordIsDisabled}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <p style={{ fontSize: '14.7px', marginRight: '10px' }}>
                {t('setup.subdialog.connectOtherWifi.securityLabel')}
              </p>
              <div
                className={`MenuSection ${passwordIsDisabled && 'disabled'} ${
                  passwordIsWrong && 'wrongInfo'
                }`}
                onClick={() => showSecurityMenu(true)}
              >
                <p>{security}</p>
                <i className="fa-regular fa-chevron-down" />
              </div>
              <ActMenu
                style={{
                  zIndex: '1',
                  width: '200px',
                  transform: 'translate(67.5px, 86px)',
                }}
                className={securityMenu ? 'active' : ''}
                ref={securityMenuRef}
              >
                <ActMenuSelector
                  onClose={() => showSecurityMenu(false)}
                  title="None"
                  active={security === 'None'}
                  onClick={() => setSecurity('None')}
                />
                <ActMenuSelector
                  onClose={() => showSecurityMenu(false)}
                  title="WEP"
                  active={security === 'WEP'}
                  onClick={() => setSecurity('WEP')}
                />
                <ActMenuSelector
                  onClose={() => showSecurityMenu(false)}
                  title="WPA"
                  active={security === 'WPA'}
                  onClick={() => setSecurity('WPA')}
                />
                <ActMenuSelector
                  onClose={() => showSecurityMenu(false)}
                  title="WPA2"
                  active={security === 'WPA2'}
                  onClick={() => setSecurity('WPA2')}
                />
                <ActMenuSelector
                  onClose={() => showSecurityMenu(false)}
                  title="WPA Enterprise"
                  active={security === 'WPA Enterprise'}
                  onClick={() => setSecurity('WPA Enterprise')}
                />
                <ActMenuSelector
                  onClose={() => showSecurityMenu(false)}
                  title="WPA2 Enterprise"
                  active={security === 'WPA2 Enterprise'}
                  onClick={() => setSecurity('WPA2 Enterprise')}
                />
                <ActMenuSelector
                  onClose={() => showSecurityMenu(false)}
                  title="WPA3 Enterprise"
                  active={security === 'WPA3 Enterprise'}
                  onClick={() => setSecurity('WPA3 Enterprise')}
                />
              </ActMenu>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            width: '100%',
          }}
        >
          <div
            className={`Button ${inputPassword.length < 8 && 'disabled'} ${
              passwordIsDisabled && 'disabled'
            }`}
            onClick={submitPassword}
          >
            <p>{t('setup.subdialog.connectOtherWifi.connectButtonLabel')}</p>
          </div>
        </div>
      </>
    );
  }

  function Overview() {
    return (
      <div style={{ width: '100%' }}>
        <div
          style={{
            textAlign: 'start',
            marginBottom: '25px',
          }}
        >
          <p className="Title" style={{ marginBottom: '15px' }}>
            {t('setup.subdialog.overview.language')}
          </p>
          <p className="Description">{i18n.language}</p>
        </div>
        <div
          style={{
            textAlign: 'start',
            marginBottom: '25px',
          }}
        >
          <p className="Title" style={{ marginBottom: '15px' }}>
            {t('setup.subdialog.overview.country')}
          </p>
          <p className="Description">{currentCountry}</p>
        </div>
        <div
          style={{
            textAlign: 'start',
            marginBottom: '25px',
          }}
        >
          <p className="Title" style={{ marginBottom: '15px' }}>
            {t('setup.subdialog.overview.keyboardLayout')}
          </p>
          <p className="Description">{keyboardLayout}</p>
        </div>
        <div
          style={{
            textAlign: 'start',
            marginBottom: '25px',
          }}
        >
          <p className="Title" style={{ marginBottom: '15px' }}>
            {t('setup.subdialog.overview.disks')}
          </p>
          <p className="Description">
            {selectedDisk?.model} –{' '}
            {(selectedDisk?.size! / Math.pow(1024, 3)).toFixed()} GB
          </p>
        </div>
        <div
          style={{
            textAlign: 'start',
            marginBottom: '25px',
          }}
        >
          <p className="Title" style={{ marginBottom: '15px' }}>
            {t('setup.subdialog.overview.encryptDisk')}
          </p>
          <p className="Description">
            {system.disks.isEncrypted ? 'On' : 'Off'}
          </p>
        </div>
        <div
          style={{
            textAlign: 'start',
            marginBottom: '25px',
          }}
        >
          <p className="Title" style={{ marginBottom: '15px' }}>
            {t('setup.subdialog.overview.bootscreen')}
          </p>
          <p className="Description">{system.bootscreen ? 'On' : 'Off'}</p>
        </div>
        <div style={{ display: 'flex' }}>
          <div
            className="Button"
            onClick={() => {
              setSubDialog(undefined);
              setTimeout(install, 500);
            }}
          >
            <p>{t('setup.installLabel')}</p>
          </div>
        </div>
      </div>
    );
  }

  function PromptTouchId() {
    const [isSucceeded, setIsSucceeded] = useState<boolean | null>(null);
    const [canPromptTouchID, setCanPromptTouchID] = useState<boolean>(false);

    async function setUpTouchID() {
      const canPromptTouchID =
        await window.electron.ipcRenderer.invoke('canPromptTouchID');

      setCanPromptTouchID(canPromptTouchID);

      if (canPromptTouchID && settings.user.password && isSucceeded === null) {
        window.electron.ipcRenderer
          .invoke('promptTouchID', 'add a fingerprint')
          .then(() => {
            setIsSucceeded(true);
            dispatch(setTouchID(true));
          })
          .catch(() => setIsSucceeded(false));
      }
    }

    useEffect(() => {
      setUpTouchID();
    }, [isSucceeded]);

    return (
      <>
        <div style={{ width: '100%', height: '100%' }}>
          {!settings.user.password ? (
            <p
              style={{
                fontSize: '17px',
                fontWeight: 'bold',
                margin: '0 30px',
              }}
            >
              {t('setup.subdialog.promptTouchID.requirePassword')}
            </p>
          ) : canPromptTouchID ? (
            isSucceeded === true ? (
              <>
                <p className="Title">
                  {t('setup.subdialog.promptTouchID.success.title')}
                </p>
                <p className="Description" style={{ margin: '14px 0 5px 0' }}>
                  {t('setup.subdialog.promptTouchID.success.description')}
                </p>
              </>
            ) : isSucceeded === false ? (
              <>
                <p className="Title" style={{ marginBottom: '20px' }}>
                  {t('setup.subdialog.promptTouchID.failed.title')}
                </p>
                <div style={{ width: '100%' }}>
                  <div
                    className="Button"
                    style={{ width: 'fit-content', margin: '0 auto' }}
                    onClick={() => setIsSucceeded(null)}
                  >
                    {t('setup.subdialog.promptTouchID.failed.buttonLabel')}
                  </div>
                </div>
              </>
            ) : (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column-reverse',
                }}
              >
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    margin: '0 30px',
                  }}
                >
                  {t('setup.subdialog.promptTouchID.waiting')}
                </p>
              </div>
            )
          ) : (
            <>
              <p className="Title">
                {t('setup.subdialog.promptTouchID.failed.title')}
              </p>
              <p className="Description" style={{ margin: '14px 0 5px 0' }}>
                {t('setup.subdialog.promptTouchID.touchIDIssue')}
              </p>
            </>
          )}
        </div>
      </>
    );
  }

  function switchSection() {
    switch (currentSection) {
      case 'language':
        return lang.map((i) => (
          <div
            className={`SelectionBlock ${i.active && 'active'}`}
            onClick={() => i18n.changeLanguage(i.lang)}
          >
            <p>{i.lang}</p>
          </div>
        ));
      case 'country':
        return countries.map((i) => (
          <div
            className={`SelectionBlock ${i.active && 'active'}`}
            onClick={() => setCurrentCountry(i.country)}
          >
            <p>{i.country}</p>
          </div>
        ));
      case 'keyboard':
        return keyboard.map((i) => (
          <div
            className={`SelectionBlock ${i.active && 'active'}`}
            onClick={() => setKeyboardLayout(i.layout)}
          >
            <p>{i.layout}</p>
          </div>
        ));
      case 'wifi':
        return (
          <>
            {settings.wifiList.map((i) => (
              <div
                className={`SelectionBlock ${
                  selectedNetwork === i.ssid && 'active'
                }`}
                onClick={() => setSelectedNetwork(i.ssid)}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <p>{i.ssid}</p>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {i.ssid === settings.connectedWifi?.ssid && (
                      <i
                        className="fa-regular fa-check"
                        style={{ marginLeft: '12px', fontSize: '13.5px' }}
                      />
                    )}
                    {i.security.length ? (
                      <i
                        className="fa-regular fa-lock"
                        style={{ marginLeft: '12px', fontSize: '13.5px' }}
                      />
                    ) : (
                      ''
                    )}
                    {i.quality >= 70 ? (
                      <i
                        className="fa-solid fa-wifi"
                        style={{ marginLeft: '12px', fontSize: '13.5px' }}
                      />
                    ) : i.quality >= 30 ? (
                      <i
                        className="fa-duotone fa-wifi-fair"
                        style={{ marginLeft: '12px', fontSize: '13.5px' }}
                      />
                    ) : i.quality >= 0 ? (
                      <i
                        className="fa-duotone fa-wifi-weak"
                        style={{ marginLeft: '12px', fontSize: '13.5px' }}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div
              className="SelectionBlock"
              style={{ textAlign: 'start' }}
              onClick={() => setSubDialog(<ConnectOtherWifi />)}
            >
              <p>{t('setup.wifi.otherButtonLabel')}</p>
            </div>
          </>
        );
      case 'disks':
        return (
          <>
            {system.disks.data.map(
              (i) =>
                i.type === 'disk' && (
                  <div
                    className={`SelectionBlock ${
                      selectedDisk?.model === i.model && 'active'
                    }`}
                    onClick={() => setSelectedDisk(i)}
                  >
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p>
                        {i.model} –{' '}
                        {(i.size / Math.pow(1024, 3)).toFixed() === '0'
                          ? (i.size / Math.pow(1024, 2)).toFixed()
                          : (i.size / Math.pow(1024, 3)).toFixed()}{' '}
                        {(i.size / Math.pow(1024, 3)).toFixed() === '0'
                          ? 'MB'
                          : 'GB'}
                      </p>
                      <p>{i.name}</p>
                    </div>
                  </div>
                ),
            )}
          </>
        );
      case 'encryptDisk':
        return (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '10px 50px 35px 50px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '0 30px',
                }}
              >
                <p style={{ fontSize: '14px', marginRight: '10px' }}>
                  {t('setup.checkbox.yes')}
                </p>
                <Checkbox
                  size={0.94}
                  active={system.disks.isEncrypted}
                  onToggle={() => dispatch(encryptDisk(true))}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '0 30px',
                }}
              >
                <p style={{ fontSize: '14px', marginRight: '10px' }}>
                  {t('setup.checkbox.no')}
                </p>
                <Checkbox
                  size={0.94}
                  active={!system.disks.isEncrypted}
                  onToggle={() => {
                    dispatch(encryptDisk(false));
                    dispatch(setPasswordDisk(''));
                    setPasswordDiskValue('');
                  }}
                />
              </div>
            </div>
            {system.disks.isEncrypted && (
              <div>
                <input
                  type="password"
                  autoComplete="false"
                  spellCheck={false}
                  value={system.disks.password}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(setPasswordDisk(e.target.value))
                  }
                  placeholder={t('setup.encryptDisk.passwordLabel')}
                  className="Input"
                  style={{
                    padding: '8px 13px',
                    marginBottom: '17px',
                  }}
                />
                <input
                  type="password"
                  autoComplete="false"
                  spellCheck={false}
                  value={passwordDiskValue}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPasswordDiskValue(e.target.value)
                  }
                  placeholder={t('setup.encryptDisk.confirmPasswordLabel')}
                  className="Input"
                  style={{
                    padding: '8px 13px',
                  }}
                />
              </div>
            )}
          </>
        );
      case 'location':
        return (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '10px 50px 35px 50px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '0 30px',
                }}
              >
                <p style={{ fontSize: '14px', marginRight: '10px' }}>
                  {t('setup.checkbox.yes')}
                </p>
                <Checkbox
                  size={0.94}
                  active={system.disks.isEncrypted}
                  onToggle={() => dispatch(encryptDisk(true))}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '0 30px',
                }}
              >
                <p style={{ fontSize: '14px', marginRight: '10px' }}>
                  {t('setup.checkbox.no')}
                </p>
                <Checkbox
                  size={0.94}
                  active={!system.disks.isEncrypted}
                  onToggle={() => {
                    dispatch(encryptDisk(false));
                    dispatch(setPasswordDisk(''));
                    setPasswordDiskValue('');
                  }}
                />
              </div>
            </div>
            {system.disks.isEncrypted && (
              <div>
                <input
                  type="password"
                  autoComplete="false"
                  spellCheck={false}
                  value={system.disks.password}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(setPasswordDisk(e.target.value))
                  }
                  placeholder="Password"
                  className="Input"
                  style={{
                    padding: '8px 13px',
                    marginBottom: '17px',
                  }}
                />
                <input
                  type="password"
                  autoComplete="false"
                  spellCheck={false}
                  value={passwordDiskValue}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPasswordDiskValue(e.target.value)
                  }
                  placeholder="Confirm Password"
                  className="Input"
                  style={{
                    padding: '8px 13px',
                  }}
                />
              </div>
            )}
          </>
        );
      case 'users':
        return (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '25px',
                height: '120px',
              }}
            >
              <Avatar size={3} editable />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <input
                type="text"
                autoComplete="false"
                spellCheck={false}
                value={settings.user.name}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(setName(e.target.value));
                  e.target.value &&
                    dispatch(
                      setDeviceName(
                        `${e.target.value.split(' ').join('-')}-PC`,
                      ),
                    );
                }}
                placeholder={t('setup.users.username')}
                className="Input"
                style={{
                  padding: '8px 13px',
                }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <input
                type="text"
                autoComplete="false"
                spellCheck={false}
                value={settings.deviceName}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(setDeviceName(e.target.value))
                }
                placeholder={t('setup.users.computerName')}
                className="Input"
                style={{
                  padding: '8px 13px',
                }}
              />
            </div>
            <div
              style={{
                marginBottom: '16px',
                opacity: passwordDisabled ? '0.3' : '1',
                pointerEvents: passwordDisabled ? 'none' : 'auto',
              }}
            >
              <input
                type="password"
                autoComplete="false"
                spellCheck={false}
                value={settings.user.password}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(setPassword(e.target.value))
                }
                placeholder={t('setup.users.passwordLabel')}
                className="Input"
                style={{
                  padding: '8px 13px',
                }}
              />
            </div>
            <div
              style={{
                marginBottom: '16px',
                opacity: passwordDisabled ? '0.3' : '1',
                pointerEvents: passwordDisabled ? 'none' : 'auto',
              }}
            >
              <input
                type="password"
                autoComplete="false"
                spellCheck={false}
                value={passwordValue}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPasswordValue(e.target.value)
                }
                placeholder={t('setup.users.confirmPasswordLabel')}
                className="Input"
                style={{
                  padding: '8px 13px',
                }}
              />
            </div>
            <div style={{ marginBottom: '16px', textAlign: 'start' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <p style={{ fontSize: '14px', marginRight: '10px' }}>
                  {t('setup.users.enablePasswordLabel')}
                </p>
                <Checkbox
                  active={!passwordDisabled}
                  size={0.92}
                  onToggle={() => {
                    setPasswordDisabled(!passwordDisabled);
                    dispatch(setPassword(''));
                    setPasswordValue('');
                  }}
                />
              </div>
              {passwordDisabled && (
                <p style={{ fontSize: '11px', marginTop: '6px' }}>
                  {t('setup.users.passwordDisabled')}
                </p>
              )}
            </div>
          </div>
        );
      case 'touchid':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {settings.user.touchid ? (
              <>
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                  }}
                >
                  {t('setup.touchid.enabled')}
                </p>
                <div style={{ width: '100%' }}>
                  <div
                    className="Button"
                    style={{ width: 'fit-content', margin: '0 auto' }}
                    onClick={() =>
                      dispatch(
                        setBlocks([
                          ...blocks,
                          {
                            type: 'question',
                            content: t('setup.msgbox.touchid'),
                            buttons: [
                              {
                                label: t('setup.msgbox.yesLabel'),
                                action: () => dispatch(setTouchID(false)),
                              },
                              {
                                label: t('setup.msgbox.noLabel'),
                              },
                            ],
                          },
                        ]),
                      )
                    }
                  >
                    {t("setup.touchid.disableLabel")}
                  </div>
                </div>
              </>
            ) : (
              <>
                <p
                  className="TextInteraction"
                  style={{ fontSize: '14.5px', marginBottom: '20px' }}
                  onClick={() => setSubDialog(<PromptTouchId />)}
                >
                  {t('setup.touchid.setup')}
                </p>
              </>
            )}
            <img
              src={TouchID}
              style={{ width: '100%', height: '100%', margin: '10px 0' }}
            />
          </div>
        );
      case 'appearances':
        return (
          <div
            style={{
              margin: '10px 0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ margin: '0 10px' }}>
              <div
                className={`AppearanceBlock ${
                  !settings.themeLight && 'active'
                }`}
                onClick={() => dispatch(toggleLightMode(false))}
              >
                <img src={Dark} />
              </div>
              <p style={{ fontSize: '14px', marginTop: '10px' }}>
                {t('setup.appearances.dark')}
              </p>
            </div>
            <div style={{ margin: '0 10px' }}>
              <div
                className={`AppearanceBlock ${settings.themeLight && 'active'}`}
                onClick={() => dispatch(toggleLightMode(true))}
              >
                <img src={Light} />
              </div>
              <p style={{ fontSize: '14px', marginTop: '10px' }}>
                {t('setup.appearances.light')}
              </p>
            </div>
          </div>
        );
      case 'bootscreen':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '0 50px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 30px',
              }}
            >
              <p style={{ fontSize: '14px', marginRight: '10px' }}>
                {t('setup.bootscreen.enableLabel')}
              </p>
              <Checkbox
                size={0.94}
                active={system.bootscreen}
                onToggle={() => dispatch(setBootScreen(true))}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 30px',
              }}
            >
              <p style={{ fontSize: '14px', marginRight: '10px' }}>
                {t('setup.bootscreen.disableLabel')}
              </p>
              <Checkbox
                size={0.94}
                active={!system.bootscreen}
                onToggle={() => dispatch(setBootScreen(false))}
              />
            </div>
          </div>
        );
    }
  }

  const lightTheme = useAppSelector((state) => state.settings.themeLight);
  const blocks = useAppSelector((state) => state.msgbox.blocks);

  const welcomeText = [
    'To start setup installation, click Continue.',
    'Um die Setup-Installation zu starten, klicken Sie auf „Weiter“.',
    'Para iniciar la instalación, haga clic en Continuar.',
    "Pour démarrer l'installation du programme d'installation, cliquez sur Continuer.",
    'Untuk memulai instalasi pengaturan, klik Lanjutkan.',
    "Per avviare l'installazione della configurazione, fare clic su Continua.",
    'セットアップのインストールを開始するには、「続行」をクリックします。',
    '설치 설치를 시작하려면 계속을 클릭하세요.',
    'Чтобы начать установку программы установки, нажмите «Продолжить».',
    'หากต้องการเริ่มการติดตั้งการตั้งค่า คลิกดำเนินการต่อ',
    'Щоб почати інсталяцію, натисніть «Продовжити».',
    'Để bắt đầu cài đặt thiết lập, hãy nhấp vào Tiếp tục.',
    '要开始安装，请单击继续。',
  ];
  const continueText = [
    'Continue',
    'Weiter',
    'Continuar',
    'Continuer',
    'Lanjutkan',
    'Continua',
    '続行',
    '계속을',
    'Продолжить',
    'ดำเนินการต่อ',
    'Продовжити',
    'Tiếp tục',
    '继续',
  ];
  const [textIndex, setTextIndex] = useState<number>(0);

  useEffect(() => {
    if (installationStarted) {
      setTextIndex(0);
      return;
    }

    const timeout = setTimeout(() => {
      setTextIndex(textIndex === welcomeText.length - 1 ? 0 : textIndex + 1);
    }, 5500);

    return () => clearTimeout(timeout);
  }, [textIndex, installationStarted]);

  return (
    <div
      className="Setup"
      style={{ backgroundImage: `url(${lightTheme ? FrameL : FrameD})` }}
    >
      {!installationStarted &&
        welcomeText.map((_text, i) =>
          lightTheme ? (
            <div
              className={`Image ${textIndex === i && 'active'}`}
              style={{
                backgroundImage: `url(${
                  i === 0
                    ? Frame1L
                    : i === 1
                    ? Frame2L
                    : i === 2
                    ? Frame3L
                    : i === 3
                    ? Frame4L
                    : i === 4
                    ? Frame5L
                    : i === 5
                    ? Frame6L
                    : i === 6
                    ? Frame7L
                    : i === 7
                    ? Frame8L
                    : i === 8
                    ? Frame9L
                    : i === 9
                    ? Frame10L
                    : i === 10
                    ? Frame11L
                    : i === 11
                    ? Frame12L
                    : i === 12
                    ? Frame13L
                    : ''
                })`,
              }}
            />
          ) : (
            <div
              className={`Image ${textIndex === i && 'active'}`}
              style={{
                backgroundImage: `url(${
                  i === 0
                    ? Frame1D
                    : i === 1
                    ? Frame2D
                    : i === 2
                    ? Frame3D
                    : i === 3
                    ? Frame4D
                    : i === 4
                    ? Frame5D
                    : i === 5
                    ? Frame6D
                    : i === 6
                    ? Frame7D
                    : i === 7
                    ? Frame8D
                    : i === 8
                    ? Frame9D
                    : i === 9
                    ? Frame10D
                    : i === 10
                    ? Frame11D
                    : i === 11
                    ? Frame12D
                    : i === 12
                    ? Frame13D
                    : ''
                })`,
              }}
            />
          ),
        )}
      <div className="SetupWrapper">
        {!installationStarted && (
          <div style={{ padding: '50px 0', height: '100%' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                height: '100%',
              }}
            >
              <div style={{ position: 'absolute', bottom: 0 }}>
                <div
                  style={{
                    position: 'relative',
                    width: '800px',
                    height: '23px',
                    marginBottom: '25px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {welcomeText.map((text, i) => (
                    <p
                      className={`Description BlinkText ${
                        textIndex === i && 'active'
                      }`}
                    >
                      {text}
                    </p>
                  ))}
                </div>
                <div className="InteractionButtonWrapper">
                  <div
                    className="InteractionButton"
                    onClick={() => setInstallationStart(true)}
                  >
                    <i className="fa-regular fa-arrow-right" />
                  </div>
                  <div
                    style={{
                      position: 'relative',
                      width: '800px',
                      height: '18px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {continueText.map((text, i) => (
                      <p
                        className={`Label BlinkText ${
                          textIndex === i && 'active'
                        }`}
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          className={`Dialog ${installationStarted && 'active'} ${
            subDialog && 'minimize'
          } ${isInstalling && 'minimize'}`}
        >
          {installationStarted && (
            <>
              <div
                className="CloseButton"
                onClick={() =>
                  dispatch(
                    setBlocks([
                      ...blocks,
                      {
                        type: 'question',
                        content: t('setup.msgbox.discard'),
                        buttons: [
                          {
                            label: t('setup.msgbox.yesLabel'),
                            action: setDefault,
                          },
                          { label: t('setup.msgbox.noLabel') },
                        ],
                      },
                    ]),
                  )
                }
              >
                <i className="fa-solid fa-xmark" />
              </div>
              <p className="Title">
                {currentSection === 'language'
                  ? t('setup.title.language')
                  : currentSection === 'country'
                  ? t('setup.title.country')
                  : currentSection === 'keyboard'
                  ? t('setup.title.keyboard')
                  : currentSection === 'wifi'
                  ? t('setup.title.wifi')
                  : currentSection === 'disks'
                  ? t('setup.title.disks')
                  : currentSection === 'encryptDisk'
                  ? t('setup.title.encryptDisk')
                  : currentSection === 'location'
                  ? t('setup.title.location')
                  : currentSection === 'users'
                  ? t('setup.title.users')
                  : currentSection === 'touchid'
                  ? t('setup.title.touchid')
                  : currentSection === 'appearances'
                  ? t('setup.title.appearances')
                  : currentSection === 'bootscreen'
                  ? t('setup.title.bootscreen')
                  : ''}
              </p>
              <p className="Description" style={{ margin: '14px 0 5px 0' }}>
                {currentSection === 'disks'
                  ? t('setup.description.disks')
                  : currentSection === 'encryptDisk'
                  ? `${t(
                      'setup.description.encryptDisk.leftHand',
                    )} "${selectedDisk?.model}" ${t(
                      'setup.description.encryptDisk.rightHand',
                    )}?`
                  : currentSection === 'location'
                  ? 'Select an appearance that you prefer, it can be changed later in the system settings.'
                  : currentSection === 'touchid'
                  ? t('setup.description.touchid')
                  : currentSection === 'appearances'
                  ? t('setup.description.appearances')
                  : currentSection === 'bootscreen'
                  ? t('setup.description.bootscreen')
                  : ''}
              </p>
              <div
                style={{
                  position: 'relative',
                  margin: '15px 0 25px 0',
                  width: '100%',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                  }}
                >
                  {switchSection()}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <div
                  className="InteractionButtonWrapper"
                  style={{
                    opacity: currentSection === section[0] ? '0' : '1',
                    pointerEvents:
                      currentSection === section[0] ? 'none' : 'auto',
                  }}
                >
                  <div
                    className="InteractionButton"
                    onClick={() => setCurrentIndex(currentIndex - 1)}
                  >
                    <i className="fa-regular fa-arrow-left" />
                  </div>
                  <p className="Label">{t('setup.backLabel')}</p>
                </div>
                {currentSection === 'wifi' &&
                selectedNetwork !== settings.connectedWifi?.ssid ? (
                  <div
                    className="Button"
                    onClick={() => setSubDialog(<ConnectWifi />)}
                  >
                    <p>{t('setup.wifi.connectButtonLabel')}</p>
                  </div>
                ) : currentSection === 'disks' ? (
                  <div
                    className="InteractionButtonWrapper"
                    style={{
                      opacity: !selectedDisk ? '0.2' : '1',
                      pointerEvents: !selectedDisk ? 'none' : 'auto',
                    }}
                  >
                    <div
                      className="InteractionButton"
                      onClick={() =>
                        selectedDisk?.size! / Math.pow(1024, 3) < 50
                          ? dispatch(
                              setBlocks([
                                ...blocks,
                                {
                                  type: 'critical',
                                  content: t('setup.msgbox.disks'),
                                  buttons: [{ label: 'OK' }],
                                },
                              ]),
                            )
                          : setCurrentIndex(currentIndex + 1)
                      }
                    >
                      <i className="fa-regular fa-arrow-right" />
                    </div>
                    <p className="Label">{t('setup.nextLabel')}</p>
                  </div>
                ) : currentSection === 'encryptDisk' ? (
                  <div
                    className="InteractionButtonWrapper"
                    style={{
                      opacity:
                        system.disks.password !== passwordDiskValue ||
                        (system.disks.password.length === 0 &&
                          system.disks.isEncrypted)
                          ? '0.2'
                          : '1',
                      pointerEvents:
                        system.disks.password !== passwordDiskValue ||
                        (system.disks.password.length === 0 &&
                          system.disks.isEncrypted)
                          ? 'none'
                          : 'auto',
                    }}
                  >
                    <div
                      className="InteractionButton"
                      onClick={() => setCurrentIndex(currentIndex + 1)}
                    >
                      <i className="fa-regular fa-arrow-right" />
                    </div>
                    <p className="Label">{t('setup.nextLabel')}</p>
                  </div>
                ) : currentSection === 'users' ? (
                  <div
                    className="InteractionButtonWrapper"
                    style={{
                      opacity:
                        settings.user.password !== passwordValue ||
                        (settings.user.password.length === 0 &&
                          !passwordDisabled) ||
                        !settings.user.name
                          ? '0.2'
                          : '1',
                      pointerEvents:
                        settings.user.password !== passwordValue ||
                        (settings.user.password.length === 0 &&
                          !passwordDisabled) ||
                        !settings.user.name
                          ? 'none'
                          : 'auto',
                    }}
                  >
                    <div
                      className="InteractionButton"
                      onClick={() => setCurrentIndex(currentIndex + 1)}
                    >
                      <i className="fa-regular fa-arrow-right" />
                    </div>
                    <p className="Label">{t('setup.nextLabel')}</p>
                  </div>
                ) : currentSection === 'touchid' ? (
                  settings.user.touchid ? (
                    <div className="InteractionButtonWrapper">
                      <div
                        className="InteractionButton"
                        onClick={() => setCurrentIndex(currentIndex + 1)}
                      >
                        <i className="fa-regular fa-arrow-right" />
                      </div>
                      <p className="Label">{t('setup.nextLabel')}</p>
                    </div>
                  ) : (
                    <div
                      className="Button"
                      onClick={() => setCurrentIndex(currentIndex + 1)}
                    >
                      <p>{t('setup.touchid.skipLabel')}</p>
                    </div>
                  )
                ) : currentSection === section[section.length - 1] ? (
                  <div
                    className="Button"
                    onClick={() =>
                      dispatch(
                        setBlocks([
                          ...blocks,
                          {
                            type: 'question',
                            title: t('setup.msgbox.continue.title'),
                            content: t('setup.msgbox.continue.content'),
                            buttons: [
                              {
                                label: t('setup.msgbox.continue.overviewLabel'),
                                action: () => setSubDialog(<Overview />),
                              },
                              {
                                label: t('setup.msgbox.yesLabel'),
                                action: install,
                              },
                              { label: t('setup.msgbox.noLabel') },
                            ],
                          },
                        ]),
                      )
                    }
                  >
                    <p>{t('setup.installLabel')}</p>
                  </div>
                ) : (
                  <div className="InteractionButtonWrapper">
                    <div
                      className="InteractionButton"
                      onClick={() => setCurrentIndex(currentIndex + 1)}
                    >
                      <i className="fa-regular fa-arrow-right" />
                    </div>
                    <p className="Label">{t('setup.nextLabel')}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className={`SubDialog ${subDialog && 'active'}`}>
          {subDialog && (
            <>
              <div
                className="CloseButton"
                onClick={() => setSubDialog(undefined)}
              >
                <i className="fa-solid fa-xmark" />
              </div>
              <div
                style={{
                  position: 'relative',
                  margin: '15px 0 25px 0',
                  width: '100%',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                  }}
                >
                  {subDialog}
                </div>
              </div>
            </>
          )}
        </div>
        <div className={`SubDialog installer ${isInstalling && 'active'}`}>
          {installPercent === 101 ? (
            <>
              <div style={{ margin: '0 40px' }}>
                <p className="Title" style={{ marginBottom: '20px' }}>
                  {t('setup.subdialog.installation.success.title')}
                </p>
                <p className="Description">
                  {t('setup.subdialog.installation.success.description')}
                </p>
              </div>
              <div
                className="Button"
                onClick={() => {
                  restart();
                  setTimeout(
                    () => localStorage.setItem('setupDisabled', 'true'),
                    3000,
                  );
                }}
              >
                <p>
                  {t('setup.subdialog.installation.success.restartButtonLabel')}
                </p>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={
                    system.platform === 'darwin'
                      ? InstallMacImage
                      : InstallImage
                  }
                  style={{ width: 'auto', height: '220px' }}
                />
              </div>
              <div style={{ width: '100%', padding: '0 20px' }}>
                <div className="Range">
                  <div
                    className="Value"
                    style={{ width: `${installPercent}%` }}
                  />
                </div>
                <p className="Description" style={{ marginTop: '18px' }}>
                  {t('setup.subdialog.installation.waiting')}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
