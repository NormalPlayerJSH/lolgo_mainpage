import React, { useEffect, useState } from 'react'
import styles from "./Welcome.module.css";
import common from "./common.module.css";
import Button from "../../Common/Button/Button";
import useTextInput from "../../Common/TextInput/TextInput";
import { logoFull } from '../../Meta/logo';
import { storageKey } from '../../types/enum';

function FindMatchId() {
  const [recentNick, setRecentNick] = useState<string[]>([]);
  const getRecentNick = () => {
    const recent = window.localStorage.getItem(storageKey.lolgoNickname);
    if(recent){
      const recentList:string[] = JSON.parse(recent);
      setRecentNick(recentList);
    } else setRecentNick([]);
  }
  const deleteRecentNick = (nickname:string) => {
    const recent = window.localStorage.getItem(storageKey.lolgoNickname);
    if(recent) {
      let recentList:string[] = JSON.parse(recent);
      const nickIndex = recentList.indexOf(nickname);
      if(nickIndex!==-1) {
        recentList = recentList.slice(0,nickIndex).concat(recentList.slice(nickIndex+1));
        window.localStorage.setItem(storageKey.lolgoNickname,JSON.stringify(recentList));
      }
    }
    getRecentNick();
  }
  useEffect(() => {
    getRecentNick();
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
    const [TextInput, inputValue] = useTextInput({
      className: styles.joinInput,
      innerText: "리그 오브 레전드 닉네임을 입력해주세요",
      onEnter: (event) => {
        if (inputValue.trim().length !== 0) join();
      },
    });
    const join = () => {
      window.location.href = `/findmatchid/${inputValue.trim()}`;
      //RCProps.history.push(`/banpick/${inputValue.trim()}`);
    };
    return (
        <div className={common.div}>
          <div className={common.inner}>
              <img src={logoFull} alt=""  className={styles.logoImg}/>
            <div className={common.mainTitle}>내 매치 ID 찾기</div>
            <div className={styles.inputNBtn}>
              {TextInput}
              <Button className={styles.joinBtn} onClick={join}>
                검색하기
              </Button>
            </div>
            {
              recentNick.length>0?
              <><div className={styles.recommendText}>
                최근 검색 소환사명 (최근 20개)
              </div>
            <div className={styles.recommendListDiv}>
              {
                recentNick.map((gameNum)=>(
                  <div className={styles.recentDiv}>
                    <a href={`/findmatchid/${gameNum}`} className={styles.recommendLink}>{gameNum}</a>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={()=>{deleteRecentNick(gameNum)}}><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                  </div>
                  ))
              }
            </div></>:
            <></>
            }
            <div className={styles.adWideDiv} id='mainWideAd'>
            </div>
            <div className={styles.adMobileDiv} id='mainMobileAd'>
            </div>
          </div>
        </div>
    )
}

export default FindMatchId;
