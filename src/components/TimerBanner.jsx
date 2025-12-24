import React from 'react';
import BannerTimer from './BannerTimer';
import styles from './TimerBanner.module.css';

export default function TimerBanner() {
    return (
        <div className={styles.bannerContainer}>
            <div className={styles.bannerContent}>
                <span className={styles.urgencyIcon}>⚡</span>
                <span className={styles.timerWrapper}>
                    LIMITED TIME OFFER ENDS IN: <BannerTimer hours={48} />
                </span>
            </div>
        </div>
    );
}
