import React from 'react'
import styles from "./Welcome.module.css";
import common from "./common.module.css";
import Button from "../../Common/Button/Button";
import useTextInput from "../../Common/TextInput/TextInput";
import { logoFull } from '../../Meta/logo';

function Welcome() {
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
                입장하기
              </Button>
            </div>
          </div>
        </div>
    )
}

export default Welcome
