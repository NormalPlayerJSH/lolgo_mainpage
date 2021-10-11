import React, { useEffect } from 'react'
import styles from "./Welcome.module.css";
import common from "./common.module.css";
import Button from "../../Common/Button/Button";
import useTextInput from "../../Common/TextInput/TextInput";
import { logoFull } from '../../Meta/logo';

function Welcome() {
  useEffect(() => {
    (document.getElementById('mainAd') as Element).innerHTML=`
    <ins class="kakao_ad_area" style="display:none;" 
    data-ad-unit    = "DAN-sgqN0cmPrUaAQrC6" 
    data-ad-width   = "728" 
    data-ad-height  = "90"
    data-ad-onfail   = "noad"></ins>
    `;
    let scr = document.createElement('script');
    scr.type='text/javascript';
    scr.async=true;
    scr.src="//t1.daumcdn.net/kas/static/ba.min.js";
    (document.getElementById('mainAd') as Element).appendChild(scr)
  }, [])
    const [TextInput, inputValue] = useTextInput({
      className: styles.joinInput,
      innerText: "리그 오브 레전드 매치 ID (10자리 숫자)를 입력해주세요",
      onEnter: (event) => {
        if (inputValue.trim().length !== 0) join();
      },
    });
    const join = () => {
      window.location.href = `/analyze/${inputValue.trim()}`;
      //RCProps.history.push(`/banpick/${inputValue.trim()}`);
    };
    return (
        <div className={common.div}>
          <div className={common.inner}>
              <img src={logoFull} alt=""  className={styles.logoImg}/>
            <div className={common.mainTitle}>내 게임 분석하기</div>
            <div className={styles.inputNBtn}>
              {TextInput}
              <Button className={styles.joinBtn} onClick={join}>
                분석하기
              </Button>
            </div>
            <div className={styles.recommendText}>추천 게임 리스트</div>
            <div className={styles.recommendListDiv}>
              {
                [5474173397,
                  5471517684,
                  5469698542,
                  5469633680,
                  5469538725].map((gameNum)=>(
                    <a href={`/analyze/${gameNum}`} className={styles.recommendLink}>{gameNum}</a>
                  ))
              }
            </div>
            <div className={styles.adDiv} id='mainAd'>
            </div>
          </div>
        </div>
    )
}

export default Welcome
