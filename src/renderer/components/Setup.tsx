import { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import './Setup.scss';
import Draggable from 'react-draggable';
import TopBar from './utils/window/TopBar';
import WindowBodyDefault from './utils/window/WindowBodyDefault';
import WindowBodyButton from './utils/window/WindowBodyButton';
import TopBarInteraction from './utils/window/TopBarInteraction';
import { useTranslation } from 'react-i18next';

export default function Setup() {
  const wallpaperImg = useAppSelector((state) => state.wallpaper.img);
  const [installationStarted, setInstallationStart] = useState<boolean>(false);
  const [quitInstallation, setQuitInstallation] = useState<boolean>(false);
  const [t, i18n] = useTranslation();

  const QuitInstallation = () => {
    return (
      <Draggable handle=".TopBar">
        <div
          className={`Window ${quitInstallation && 'active'}`}
          style={{ width: '420px', zIndex: 2 }}
          key={Math.random()}
        >
          <TopBar>
            <TopBarInteraction
              action="close"
              onClose={() => setQuitInstallation(false)}
            />
          </TopBar>
          <WindowBodyDefault
            type="question"
            content="Discard all changes and quit installation?"
          >
            <WindowBodyButton>
              <button
                className="Button"
                onClick={() => setQuitInstallation(false)}
              >
                No
              </button>
              <button
                className="Button"
                onClick={() => {
                  setQuitInstallation(false);
                  setInstallationStart(false);
                }}
              >
                Yes
              </button>
            </WindowBodyButton>
          </WindowBodyDefault>
        </div>
      </Draggable>
    );
  };

  const section = ['language', 'location'];
  const [currentSection, setCurrentSection] = useState<string>(section[0]);

  function switchSection() {
    switch (currentSection) {
      case 'language':
        return (
          <>
            <div
              className={`SelectionBlock ${
                i18n.language === 'Deutsch' && 'active'
              }`}
              onClick={() => i18n.changeLanguage('Deutsch')}
            >
              <p>Deutsch</p>
            </div>
            <div
              className={`SelectionBlock ${
                i18n.language === 'English (US)' && 'active'
              }`}
              onClick={() => i18n.changeLanguage('English (US)')}
            >
              <p>English (US)</p>
            </div>
            <div
              className={`SelectionBlock ${
                i18n.language === 'Español' && 'active'
              }`}
              onClick={() => i18n.changeLanguage('Español')}
            >
              <p>Español</p>
            </div>
            <div
              className={`SelectionBlock ${
                i18n.language === 'Français' && 'active'
              }`}
              onClick={() => i18n.changeLanguage('Français')}
            >
              <p>Français</p>
            </div>
            <div
              className={`SelectionBlock ${
                i18n.language === 'Bahasa Indonesia' && 'active'
              }`}
              onClick={() => i18n.changeLanguage('Bahasa Indonesia')}
            >
              <p>Bahasa Indonesia</p>
            </div>
            <div
              className={`SelectionBlock ${
                i18n.language === 'Italiano' && 'active'
              }`}
              onClick={() => i18n.changeLanguage('Italiano')}
            >
              <p>Italiano</p>
            </div>
            <div
              className={`SelectionBlock ${
                i18n.language === '日本語' && 'active'
              }`}
              onClick={() => i18n.changeLanguage('日本語')}
            >
              <p>日本語</p>
            </div>
            <div
              className={`SelectionBlock ${
                i18n.language === '한국어' && 'active'
              }`}
              onClick={() => i18n.changeLanguage('한국어')}
            >
              <p>한국어</p>
            </div>
            <div
              className={`SelectionBlock ${
                i18n.language === 'Русский' && 'active'
              }`}
              onClick={() => i18n.changeLanguage('Русский')}
            >
              <p>Русский</p>
            </div>
            <div
              className={`SelectionBlock ${
                i18n.language === 'แบบไทย' && 'active'
              }`}
              onClick={() => i18n.changeLanguage('แบบไทย')}
            >
              <p>แบบไทย</p>
            </div>
            <div
              className={`SelectionBlock ${
                i18n.language === 'Український' && 'active'
              }`}
              onClick={() => i18n.changeLanguage('Український')}
            >
              <p>Український</p>
            </div>
            <div
              className={`SelectionBlock ${
                i18n.language === 'Tiếng Việt' && 'active'
              }`}
              onClick={() => i18n.changeLanguage('Tiếng Việt')}
            >
              <p>Tiếng Việt</p>
            </div>
            <div
              className={`SelectionBlock ${
                i18n.language === '中文 (简体)' && 'active'
              }`}
              onClick={() => i18n.changeLanguage('中文 (简体)')}
            >
              <p>中文 (简体)</p>
            </div>
            <div
              className={`SelectionBlock ${
                i18n.language === '中文 (繁體)' && 'active'
              }`}
              onClick={() => i18n.changeLanguage('中文 (繁體)')}
            >
              <p>中文 (繁體)</p>
            </div>
          </>
        );
      case 'location':
        return (
          <>
            <p>ewr</p>
          </>
        );
    }
  }

  return (
    <div className="Setup" style={{ backgroundImage: `url(${wallpaperImg})` }}>
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
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <p
                  style={{
                    fontWeight: 200,
                    fontSize: '106px',
                    letterSpacing: '-2px',
                  }}
                >
                  Welcome
                </p>
              </div>
              <div style={{ position: 'absolute', bottom: 0 }}>
                <p className="Description" style={{ marginBottom: '25px' }}>
                  To start setup installation, click Continue.
                </p>
                <div className="InteractionButtonWrapper">
                  <div
                    className="InteractionButton"
                    onClick={() => setInstallationStart(true)}
                  >
                    <i className="fa-regular fa-arrow-right" />
                  </div>
                  <p className="Label">Continue</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            pointerEvents:
              installationStarted && !quitInstallation ? 'auto' : 'none',
          }}
        >
          <QuitInstallation />
          <div className={`Dialog ${installationStarted && 'active'}`}>
            {installationStarted && (
              <>
                <div
                  className="CloseButton"
                  onClick={() => setQuitInstallation(true)}
                >
                  <i className="fa-solid fa-xmark" />
                </div>
                <p className="Title">
                  {currentSection === 'language'
                    ? 'Choose a Language'
                    : currentSection === 'location'
                    ? 'Choose your Location'
                    : ''}
                </p>
                <div
                  style={{
                    position: 'relative',
                    margin: '30px 0 20px 0',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      maxHeight: '100%',
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
                    <div className="InteractionButton">
                      <i className="fa-regular fa-arrow-left" />
                    </div>
                    <p className="Label">Back</p>
                  </div>
                  <div
                    className="InteractionButtonWrapper"
                    style={{
                      opacity:
                        currentSection === section[section.length - 1]
                          ? '0'
                          : '1',
                      pointerEvents:
                        currentSection === section[section.length - 1]
                          ? 'none'
                          : 'auto',
                    }}
                  >
                    <div className="InteractionButton">
                      <i className="fa-regular fa-arrow-right" />
                    </div>
                    <p className="Label">Next</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
