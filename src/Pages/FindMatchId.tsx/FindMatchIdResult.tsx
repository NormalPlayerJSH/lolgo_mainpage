import React, { useEffect, useState } from 'react'
import styles from "./Welcome.module.css";
import common from "./common.module.css";
import Button from "../../Common/Button/Button";
import useTextInput from "../../Common/TextInput/TextInput";
import { logoFull } from '../../Meta/logo';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import { storageKey } from '../../types/enum';

const addNickname = (nickname:string) => {
  const nowItem = window.localStorage.getItem(storageKey.lolgoNickname)
  let newItem:string[] = nowItem?JSON.parse(nowItem):[];
  const nickIndex = newItem.indexOf(nickname);
  if(nickIndex!==-1){
    newItem = newItem.slice(0,nickIndex).concat(newItem.slice(nickIndex+1))
  }
  newItem = [nickname, ...newItem];
  window.localStorage.setItem(storageKey.lolgoNickname,JSON.stringify(newItem.slice(0,20)));
}

function FindMatchIdResult(RCProps: RouteComponentProps<{ nickname: string }>) {
  const {nickname} = RCProps.match.params
  const [matchList, setMatchList] = useState<string[]>([])
  const [realNickname, setRealNickname] = useState('')
  useEffect(() => {
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
    const res = axios.get<any>(`https://api.lolgo.gg/summonrequest/${nickname}`)
    res.then((data)=>{
      if(data.data===false) window.location.href = "/error/존재하지 않는 닉네임입니다.";
      const {summonerName, matches} = data.data;
      setMatchList(matches)
      setRealNickname(summonerName)
      addNickname(summonerName);
    })
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
    console.log(matchList)
    return (
        <div className={common.div}>
          <div className={common.inner}>
              <img src={logoFull} alt=""  className={styles.logoImg}/>
            <div className={common.mainTitle}>{realNickname===''?"내 매치 ID 찾기":`${realNickname}의 매치 ID`}</div>
            <div className={styles.matchListDiv}>
              {matchList.map(matchId=><a href={`/analyze/${matchId}`} className={styles.matchIdDiv}>
                {matchId}
              </a>)}
            </div>
            <div className={styles.adWideDiv} id='mainWideAd'>
            </div>
            <div className={styles.adMobileDiv} id='mainMobileAd'>
            </div>
          </div>
        </div>
    )
}

export default FindMatchIdResult;
