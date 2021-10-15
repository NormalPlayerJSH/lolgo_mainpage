import React from 'react';
import styles from './Header.module.css';
import { logoInline } from '../../Meta/logo';

export default function Header() {
  return (
    <div id={styles.headerDiv}>
      <div id={styles.headerInner}>
        <img src={logoInline} alt="" id={styles.headerLogo} onClick={()=>{window.location.href='/'}}/>
        <div className={styles.navLinks}>
          <a
            href='https://banpick.lolgo.gg'
            className={`${styles.navLink} ${styles.navText}`}
          >
            Banpick Tool
          </a>
          <a
            href='https://cdn.lolgo.gg/desktop/win/LOLGO_install_0.3.0.exe'
            className={`${styles.navLink} ${styles.navText}`}
          >
            데스크탑 앱 다운로드
          </a>
        </div>
      </div>
    </div>
  );
}
