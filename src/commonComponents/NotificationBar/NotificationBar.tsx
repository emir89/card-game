import React, { useEffect, useRef } from 'react';
import style from './notificationBar.module.css';

const NotificationBar = ({
  children,
  timeout,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
  timeout?: number;
}) => {
  let timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeout) {
      timer.current = setTimeout(() => {
        onClose();
      }, timeout);
    }

    return () => {
      clearTimeout(timer.current);
      timer.current = null;
    };
  }, [timeout]);

  return <div className={style.Wrapper}>{children}</div>;
};

export default NotificationBar;
