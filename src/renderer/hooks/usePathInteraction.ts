import { useDispatch } from 'react-redux';
import * as TextEditor from '../store/reducers/apps/texteditor';
import * as VideoView from '../store/reducers/videoview';

export default function usePathInteraction() {
  const dispatch = useDispatch();

  function executeCommandWithPath(path: string, location: string) {
    if (path === 'txt') {
      dispatch(TextEditor.setLocation(location));
      dispatch(TextEditor.setActive(true));
    } else if (path === 'mp4') {
      dispatch(VideoView.setLocation(location));
    }
  }

  return { executeCommandWithPath };
}
