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
            // onClick={() => {
            //   window.location.href='https://banpick.lolgo.gg';
            // }}
          >
            Banpick Tool
          </a>
        </div>
      </div>
    </div>
  );
}
