import * as TextEditor from "../store/reducers/texteditor";
import * as VideoView from "../store/reducers/videoview";
import * as ImgView from "../store/reducers/imgview";
import { openApp } from "../store/reducers/apps";
import { useAppDispatch } from "../store/hooks";

export default function usePathInteraction() {
  const dispatch = useAppDispatch();

  function executeCommandWithPath(path: string, location: string) {
    if (path === "txt") {
      dispatch(TextEditor.setLocation(location));
      dispatch(openApp("texteditor"));
    } else if (path === "mp4") {
      dispatch(VideoView.setLocation(location));
      dispatch(openApp("videoview"));
    } else if (path === "png" || path === "jpg" || path === "jpeg") {
      dispatch(ImgView.setLocation(location));
      dispatch(openApp("imgview"));
    }
  }

  return { executeCommandWithPath };
}
