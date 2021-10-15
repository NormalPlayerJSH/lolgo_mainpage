import React, { useEffect, useState } from 'react'
import styles from "./Download.module.css";
import common from "./common.module.css";
import Button from "../../Common/Button/Button";
import useTextInput from "../../Common/TextInput/TextInput";
import { logoFull } from '../../Meta/logo';
import axios from 'axios';

const appleSvg = <svg className={`${styles.appleSvg} ${styles.platformLogo}`} viewBox='0 0 842 1000' xmlns="http://www.w3.org/2000/svg"><path d="M702 960c-54.2 52.6-114 44.4-171 19.6-60.6-25.3-116-26.9-180 0-79.7 34.4-122 24.4-170-19.6-271-279-231-704 77-720 74.7 4 127 41.3 171 44.4 65.4-13.3 128-51.4 198-46.4 84.1 6.8 147 40 189 99.7-173 104-132 332 26.9 396-31.8 83.5-72.6 166-141 227zM423 237C414.9 113 515.4 11 631 1c15.9 143-130 250-208 236z"/></svg>

const windowsSvg = <svg className={`${styles.windowsSvg} ${styles.platformLogo}`} viewBox='0 0 88 88' xmlns="http://www.w3.org/2000/svg"><path d="m0,12.402,35.687-4.8602,0.0156,34.423-35.67,0.20313zm35.67,33.529,0.0277,34.453-35.67-4.9041-0.002-29.78zm4.3261-39.025,47.318-6.906,0,41.527-47.318,0.37565zm47.329,39.349-0.0111,41.34-47.318-6.6784-0.0663-34.739z"/></svg>

function Download() {
  const [version, setVersion] = useState('0.0.0');
  useEffect(() => {
    axios.get<any>('https://cdn.lolgo.gg/desktop/version.json').then(res=>{
      setVersion(res.data.version);
    });
    (document.getElementById('mainWideAd') as Element).innerHTML=`
    <ins class="kakao_ad_area" style="display:none;" 
    data-ad-unit    = "DAN-Idda7Hj8DNO1VZ9S" 
    data-ad-width   = "728" 
    data-ad-height  = "90"
    data-ad-onfail   = "noad"></ins>
    `;
    (document.getElementById('mainMobileAd') as Element).innerHTML=`
    <ins class="kakao_ad_area" style="display:none;" 
 data-ad-unit    = "DAN-XJINJfNMrQpkWMAl" 
 data-ad-width   = "300" 
 data-ad-height  = "250"></ins> 
    `;
    let scr = document.createElement('script');
    scr.type='text/javascript';
    scr.async=true;
    scr.src="//t1.daumcdn.net/kas/static/ba.min.js";
    (document.getElementById('mainWideAd') as Element).appendChild(scr)
  }, [])
    return (
        <div className={common.div}>
          <div className={common.inner}>
              <img src={logoFull} alt=""  className={styles.logoImg}/>
            <div className={common.mainTitle}>데스크탑 앱 다운로드</div>
            <div className={styles.buttonsDiv}>
              <a href={`https://cdn.lolgo.gg/desktop/win/LOLGO_install_${version}.exe`}>
                <Button className={styles.findMatchIdBtn}>
                  {windowsSvg}Windows
                </Button>
              </a>
              <a href={`https://cdn.lolgo.gg/desktop/mac/LOLGO-${version}-universal.dmg`}>
                <Button className={styles.findMatchIdBtn}>
                  {appleSvg}macOS
                </Button>
              </a>
            </div>
            <div className={styles.adWideDiv} id='mainWideAd'>
            </div>
            <div className={styles.adMobileDiv} id='mainMobileAd'>
            </div>
          </div>
        </div>
    )
}

export default Download
