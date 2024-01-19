import { setActive, setDirectory } from '../store/reducers/apps/files';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import ActMenu, { ActMenuSelector, ActMenuSeparator } from './utils/menu';
import { setLocation } from '../store/reducers/apps/texteditor';
import { useEffect, useRef, useState } from 'react';
import usePathInteraction from '../hooks/usePathInteraction';
import { ipcRenderer } from 'electron';

interface DesktopIconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  thumbnail?: string;
  isLn?: boolean;
  isPermissionDenied?: boolean;
}

export default function DesktopIcon({
  name,
  thumbnail,
  isLn,
  isPermissionDenied,
  ...props
}: DesktopIconProps) {
  const dispatch = useAppDispatch();
  const icon = useAppSelector((state) => state.appearance.iconTheme);
  const nameLine = name.split('.');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isRename, setIsRename] = useState<boolean>(false);
  const [contextMenuDisplayed, setContextMenuDisplayed] =
    useState<boolean>(false);

  function useOutsideFilesItem(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsActive(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const filesItemRef = useRef(null);
  useOutsideFilesItem(filesItemRef);

  function useOutsideContextMenu(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setContextMenuDisplayed(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const contextMenuRef = useRef(null);
  useOutsideContextMenu(contextMenuRef);

  function switchIcon() {
    switch (nameLine[nameLine.length - 1]) {
      case 'txt':
        return icon === 'WhiteSur-icon-theme'
          ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg'
          : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg';
      case 'gitignore':
        return icon === 'WhiteSur-icon-theme'
          ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg'
          : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg';
      case 'conf':
        return icon === 'WhiteSur-icon-theme'
          ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg'
          : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg';
      case 'png':
        return icon === 'WhiteSur-icon-theme'
          ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/image-x-generic.svg'
          : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/image-x-generic.svg';
      case 'jpg':
        return icon === 'WhiteSur-icon-theme'
          ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/image-x-generic.svg'
          : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/image-x-generic.svg';
      case 'ico':
        return icon === 'WhiteSur-icon-theme'
          ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/image-x-generic.svg'
          : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/image-x-generic.svg';
      case 'pptx':
        return icon === 'WhiteSur-icon-theme'
          ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/x-office-presentation.svg'
          : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/x-office-presentation.svg';
      case 'mp4':
        return icon === 'WhiteSur-icon-theme'
          ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/video-x-generic.svg'
          : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/video-x-generic.svg';
      case 'cpp':
        return icon === 'WhiteSur-icon-theme'
          ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/text-x-cpp.svg'
          : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-cpp.svg';
      case 'html':
        return icon === 'WhiteSur-icon-theme'
          ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/text-html.svg'
          : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-html.svg';
      default:
        return icon === 'WhiteSur-icon-theme'
          ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/text-x-preview.svg'
          : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-preview.svg';
    }
  }

  const { executeCommandWithPath } = usePathInteraction();

  const [isDir, setIsDir] = useState<boolean>(false);

  async function checkDir() {
    const isDir = await ipcRenderer.invoke(
      'pathIsDir',
      `/home/Desktop/${name}`,
    );

    setIsDir(isDir);
  }

  async function moveToTrash() {
    await ipcRenderer.invoke(
      'renamePath',
      `/home/Desktop/${name}`,
      `/.Bin/${name}`,
    );
  }

  useEffect(() => {
    checkDir();
  }, []);

  function runAction() {
    if (!isDir) {
      executeCommandWithPath(nameLine[nameLine.length - 1], `/home/Desktop/${name}`)
    } else {
      dispatch(setActive(true));
      dispatch(setDirectory(`/home/Desktop/${name}`));
    }
  }

  return (
    <div
      className={`DesktopIconWrapper ${isActive && 'active'}`}
      onMouseDown={() => setIsActive(true)}
      onDoubleClick={runAction}
      onContextMenu={() => setContextMenuDisplayed(true)}
      ref={filesItemRef}
      {...props}
    >
      <ActMenu
        style={{
          position: 'absolute',
          top: "95px",
          zIndex: '1',
          width: '200px',
        }}
        className={contextMenuDisplayed ? 'active' : ''}
        ref={contextMenuRef}
      >
        <ActMenuSelector
          title="Open"
          delay={130}
          onClick={runAction}
          onClose={() => setContextMenuDisplayed(false)}
        />
        {!isDir && (
          <ActMenuSelector
            title="Open with..."
            onClose={() => setContextMenuDisplayed(false)}
          />
        )}
        <ActMenuSeparator />
        <ActMenuSelector
          title="Get Info"
          onClose={() => setContextMenuDisplayed(false)}
        />
        <ActMenuSelector
          title="Copy"
          onClose={() => setContextMenuDisplayed(false)}
        />
        <ActMenuSelector
          title="Duplicate"
          onClose={() => setContextMenuDisplayed(false)}
        />
        <ActMenuSelector
          title={`Compress "${name}"`}
          onClose={() => setContextMenuDisplayed(false)}
        />
        <ActMenuSeparator />
        <ActMenuSelector
          title="Rename"
          onClose={() => setContextMenuDisplayed(false)}
        />
        <ActMenuSelector
          title="Move to Trash"
          onClick={moveToTrash}
          onClose={() => setContextMenuDisplayed(false)}
        />
      </ActMenu>
      <div className="DesktopIcon">
        <img
          src={
            isDir
              ? icon === 'WhiteSur-icon-theme'
                ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg'
                : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'
              : switchIcon()
          }
          width={60}
          height={60}
        />
      </div>
      <div className="DesktopIconName">
        <p>{name}</p>
      </div>
    </div>
  );
};
