import { useEffect, useState } from 'react';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import './assets/videoview.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import { useTranslation } from 'react-i18next';
import { setLocation } from '../../store/reducers/videoview';
import Draggable from 'react-draggable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function VideoView() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState<boolean>(false);
  const location = useAppSelector((state) => state.videoview.location);
  const [src, setSrc] = useState<string>('');

  async function getFileContent() {
    const content = await window.electron.ipcRenderer.invoke(
      'getFileContent',
      location,
      'base64'
    );

    setSrc(content);
  }

  useEffect(() => {
    if (location) {
      getFileContent();
      setTimeout(() => setIsActive(true), 100);
    } else {
      setIsActive(false);
      setSrc('');
    }
  }, [location]);

  return (
    <div className="VideoViewWindow">
      <Draggable handle=".TopBar">
        <div className={`Window videoview ${isActive && 'active'}`}>
          <TopBar
            title={`${t('apps.videoview.name')}${location && ` – ${location}`}`}
          >
            <TopBarInteraction
              action="close"
              onClose={() => dispatch(setLocation(''))}
            />
          </TopBar>
          <WindowBody>
            <div className="VideoView">
              <video controls>
                <source src={`data:video/mp4;base64,${src}`} type="video/mp4" />
              </video>
            </div>
          </WindowBody>
        </div>
      </Draggable>
    </div>
  );
}
