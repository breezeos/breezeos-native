import { useEffect, useState } from "react";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBody from "../../components/utils/window/WindowBody";
import "./assets/videoview.scss";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ipcRenderer } from "electron";
import { closeApp } from "../../store/reducers/apps";

export default function VideoView({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const appIsActive = useAppSelector((state) => state.apps.appIsActive);
  const isActive = appIsActive[id].status === "active";
  const location = useAppSelector((state) => state.videoview.location);
  const [src, setSrc] = useState<string>("");

  async function getFileContent() {
    const content = await ipcRenderer.invoke(
      "getFileContent",
      location,
      "base64",
    );

    setSrc(content);
  }

  useEffect(() => {
    if (location) {
      getFileContent();
    } else {
      setSrc("");
    }
  }, [location]);

  return (
    <div className="VideoViewWindow">
      <Draggable handle="#TopBar">
        <div className={`Window videoview ${isActive && "active"}`}>
          <TopBar
            title={`${t(`apps.${id}.name`)}${location && ` – ${location}`}`}
          >
            <TopBarInteraction
              action="close"
              onClose={() => dispatch(closeApp(id))}
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
