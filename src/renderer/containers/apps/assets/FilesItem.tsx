import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setDirectory } from "../../../store/reducers/files";
import ActMenu, {
  ActMenuSelector,
  ActMenuSeparator,
} from "../../../components/utils/menu";
import usePathInteraction from "../../../hooks/usePathInteraction";
import { setBlocks } from "../../../store/reducers/msgbox";
import { ipcRenderer } from "electron";

interface FilesItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  location?: string;
  thumbnail?: string;
  content?: string;
  isPermissionDenied?: boolean;
}

export default function FilesItem({
  name,
  location = "",
  thumbnail,
  content,
  isPermissionDenied,
  ...props
}: FilesItemProps) {
  const dispatch = useAppDispatch();
  const iconSize = useAppSelector((state) => state.files.iconSize);
  const nameLine = name.split(".");
  const [isActive, setIsActive] = useState<boolean>(false);
  // const [isRename, setIsRename] = useState<boolean>(false);
  const [contextMenuDisplayed, setContextMenuDisplayed] =
    useState<boolean>(false);

  function useOutsideFilesItem(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsActive(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
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

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const contextMenuRef = useRef(null);
  useOutsideContextMenu(contextMenuRef);

  function switchIcon() {
    switch (nameLine[nameLine.length - 1]) {
      case "txt":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg";
      case "gitignore":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg";
      case "conf":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg";
      case "png":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/image-x-generic.svg";
      case "jpg":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/image-x-generic.svg";
      case "ico":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/image-x-generic.svg";
      case "pptx":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/x-office-presentation.svg";
      case "mp4":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/video-x-generic.svg";
      case "cpp":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-cpp.svg";
      case "html":
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-html.svg";
      default:
        return "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-preview.svg";
    }
  }

  const locationLine = location.split("/");

  const [isDir, setIsDir] = useState<boolean>(false);

  async function checkDir() {
    const isDir = await ipcRenderer.invoke("pathIsDir", location);

    setIsDir(isDir);
  }

  const [trashLength, setTrashLength] = useState<number>();

  async function getTrashLength() {
    const content = await ipcRenderer.invoke("getDirContent", "/.Bin");

    setTrashLength(content.length);
  }

  async function moveToTrash() {
    await ipcRenderer.invoke("renamePath", location, `/.Bin/${name}`);
  }

  function removeFile() {
    dispatch(
      setBlocks([
        ...blocks,
        {
          type: "question",
          title: "Delete this file?",
          content: "This action is irreversible!",
          buttons: [
            {
              label: "Yes",
              action: async () =>
                await ipcRenderer.invoke("removePath", location),
            },
            {
              label: "No",
            },
          ],
          width: "450px",
        },
      ]),
    );
  }

  useEffect(() => {
    checkDir();
    getTrashLength();
  }, []);

  const blocks = useAppSelector((state) => state.msgbox.blocks);

  const { executeCommandWithPath } = usePathInteraction();

  function runAction() {
    if (!isDir) {
      if (locationLine[1] !== ".Bin") {
        executeCommandWithPath(nameLine[nameLine.length - 1], location!);
      } else {
        dispatch(
          setBlocks([
            ...blocks,
            {
              type: "exclamation",
              content:
                "Cannot run actions of this file as it is in the Trash folder. Move this file out of Trash and re-run it.",
              buttons: [{ label: "OK" }],
              width: "450px",
            },
          ]),
        );
      }
    } else {
      dispatch(setDirectory(location!));
    }
  }

  return (
    <div
      className={`FilesItem ${isActive && "active"}`}
      onMouseDown={() => setIsActive(true)}
      onDoubleClick={runAction}
      onContextMenu={() => setContextMenuDisplayed(true)}
      ref={filesItemRef}
      {...props}
    >
      <ActMenu
        style={{
          position: "absolute",
          zIndex: "1",
          width: "200px",
        }}
        className={contextMenuDisplayed ? "active" : ""}
        ref={contextMenuRef}
      >
        <div
          style={{
            margin: "10px 0 16px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            className="FilesIcon"
            style={{ marginBottom: "10px" }}
            src={
              isDir
                ? "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg"
                : switchIcon()
            }
            width={iconSize + 30}
            height={iconSize + 30}
          />
          <p style={{ fontSize: "16px", margin: 0, textAlign: "center" }}>
            {name}
          </p>
        </div>
        {locationLine[1] !== ".Bin" ? (
          <>
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
              title="Add to Favorites"
              onClose={() => setContextMenuDisplayed(false)}
            />
            <ActMenuSeparator />
          </>
        ) : (
          <>
            <ActMenuSelector
              title="Restore"
              onClose={() => setContextMenuDisplayed(false)}
            />
            <ActMenuSeparator />
          </>
        )}
        <ActMenuSelector
          title="Get Info"
          onClose={() => setContextMenuDisplayed(false)}
        />
        {locationLine[1] !== ".Bin" && (
          <>
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
          </>
        )}
        <ActMenuSeparator />
        <ActMenuSelector
          title="Rename"
          onClose={() => setContextMenuDisplayed(false)}
        />
        {locationLine[1] === ".Bin" ? (
          <>
            <ActMenuSelector
              title="Delete"
              onClick={removeFile}
              onClose={() => setContextMenuDisplayed(false)}
            />
            <ActMenuSelector
              title="Empty Trash"
              onClick={() =>
                dispatch(
                  setBlocks([
                    ...blocks,
                    {
                      type: "question",
                      title: `Delete ${trashLength} ${
                        trashLength === 1 ? "file" : "files"
                      } in Trash?`,
                      content: "This action is irreversible!",
                      buttons: [
                        {
                          label: "Yes",
                          action: () => dispatch(setDirectory("/home")),
                        },
                        {
                          label: "No",
                        },
                      ],
                      width: "450px",
                    },
                  ]),
                )
              }
              onClose={() => setContextMenuDisplayed(false)}
            />
          </>
        ) : (
          <ActMenuSelector
            title="Move to Trash"
            onClick={moveToTrash}
            onClose={() => setContextMenuDisplayed(false)}
          />
        )}
      </ActMenu>
      <div className="FilesIconContainer">
        <img
          className="FilesIcon"
          src={
            isDir
              ? "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg"
              : switchIcon()
          }
          width={iconSize}
          height={iconSize}
        />
      </div>
      <div className="FilesNameContainer">
        <p className="FilesName">{name}</p>
      </div>
    </div>
  );
}
