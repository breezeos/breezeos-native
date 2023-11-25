import { useAppSelector } from '../../../store/hooks';
import './Window.scss';
import React from 'react';
import Error from '../../../../../assets/images/dialog-error.svg';
import Information from '../../../../../assets/images/dialog-information.svg';
import Question from '../../../../../assets/images/dialog-question.svg';
import Warning from '../../../../../assets/images/dialog-warning.svg';

interface WindowBodyDefaultProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'critical' | 'exclamation' | 'question' | 'information';
  icon?: string;
  title?: string;
  content?: string;
}

export default function WindowBodyDefault({
  type,
  icon,
  title,
  content,
  children,
}: WindowBodyDefaultProps) {
  const shellTheme = useAppSelector((state) => state.shell.theme);

  function switchIcon() {
    switch (type) {
      case 'critical':
        return <img className="WindowBodyIcon" src={Error} />;
      case 'exclamation':
        return <img className="WindowBodyIcon" src={Warning} />;
      case 'question':
        return <img className="WindowBodyIcon" src={Question} />;
      case 'information':
        return <img className="WindowBodyIcon" src={Information} />;
      default:
        return <img className="WindowBodyIcon" src={icon} />;
    }
  }

  return (
    <div
      className={`WindowBodyDefault ${
        shellTheme === 'WhiteSur' ? 'whitesur' : ''
      }`}
    >
      <div style={{ display: 'flex' }}>
        {switchIcon()}
        <div className="WindowBodyRight">
          {title && <p className="WindowBodyTitle">{title}</p>}
          {content && (
            <p
              className="WindowBodyContent"
              style={{ marginTop: title ? '8px' : 0 }}
            >
              {content}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
