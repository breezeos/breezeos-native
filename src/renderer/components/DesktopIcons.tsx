import { useEffect, useState } from 'react';
import './DesktopIcons.scss';
import DesktopIcon from './DesktopIcon';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setBlocks } from '../store/reducers/msgbox';

export default function DesktopIcons() {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector((state) => state.msgbox.blocks);
  const [tree, setTree] = useState<string[]>([]);

  async function getDirContent() {
    const content = await window.electron.ipcRenderer.invoke(
      'getDirContent',
      '/home/Desktop',
    );
    setTree(content);
  }

  useEffect(() => {
    getDirContent();
  }, []);

  return (
    <div className="DesktopIconGrid">
      {tree.map((i) => (
        <DesktopIcon name={i} />
      ))}
    </div>
  );
}
