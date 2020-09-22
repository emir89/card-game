import React, { useState, useEffect, useRef, useCallback } from 'react';
import style from './notificationBar.module.css';
import PropTypes from 'prop-types';

function NotificationBar({children, isVisible, timeout}) {
    let [showNotification, setShowNotification] = useState(false);
    let timer = useRef(0);

    const handleShowNotification = useCallback(isVisible => {
        setShowNotification(isVisible);
    }, [
        setShowNotification
    ]);

    useEffect(() => {
        if (timer.current === 0)
            handleShowNotification(isVisible)
    }, [
        isVisible,
        handleShowNotification
    ]);

    useEffect(() => {
        if (showNotification === true && timeout) {
            timer.current = setTimeout(() => {
                setShowNotification(false);
            }, timeout);
        }

        return () => {
            clearTimeout(timer.current);
            timer.current = 0;
        }
    }, [
        showNotification,
        timeout
    ]);

    return (
        showNotification && (
            <div className={style.Wrapper}>
                {children}
            </div>
        )
    );
}

NotificationBar.propTypes = {
  children: PropTypes.object,
  isVisible: PropTypes.bool.isRequired,
  timeout: PropTypes.number
};

export default NotificationBar;
