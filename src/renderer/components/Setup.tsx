import { useAppSelector } from '../store/hooks';
import './Setup.scss';

export default function Setup() {
  const wallpaperImg = useAppSelector((state) => state.wallpaper.img);

  return (
    <div className="Setup" style={{ backgroundImage: `url(${wallpaperImg})` }}>
      <div className="SetupWrapper">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
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
            <p style={{ fontWeight: 200, fontSize: '105px' }}>Welcome</p>
          </div>
          <div style={{ position: 'absolute', bottom: 0 }}>
            <p className="Description">
              To start setup installation, click Continue.
            </p>
            <div className="InteractionButtonWrapper">
              <div className="InteractionButton">
                <i className="fa-regular fa-arrow-right" />
              </div>
              <p className="Label">Continue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
