import React from 'react';
import styles from './Header.module.css';
import { logoInline } from '../../Meta/logo';

export default function Header() {
  return (
    <div id={styles.headerDiv}>
      <div id={styles.headerInner}>
        <img src={logoInline} alt="" id={styles.headerLogo} onClick={()=>{window.location.href='/'}}/>
        <div className={styles.navLinks}>
          <div
            className={`${styles.navLink} ${styles.navText}`}
            onClick={() => {
              window.location.href='https://banpick.lolgo.gg';
            }}
          >
            Banpick Tool
          </div>
        </div>
      </div>
    </div>
  );
}
