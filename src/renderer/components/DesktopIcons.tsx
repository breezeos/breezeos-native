import { useEffect, useState } from 'react';
import './DesktopIcons.scss';
import DesktopIcon from './DesktopIcon';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setBlocks } from '../store/reducers/msgbox';
import { ipcRenderer } from 'electron';

export default function DesktopIcons() {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector((state) => state.msgbox.blocks);
  const [tree, setTree] = useState<string[]>([]);

  async function getDirContent() {
    const content = await ipcRenderer.invoke(
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
