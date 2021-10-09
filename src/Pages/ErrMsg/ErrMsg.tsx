import React from 'react';
import { RouteComponentProps } from 'react-router';
import styles from './ErrMsg.module.css';
import { logoFull } from '../../Meta/logo';

export default function ErrMsg(
  props: {errMsg:string} | RouteComponentProps<any>
) {
  let errMsg = '잘못된 링크입니다.';
  if('errMsg' in props) errMsg = props.errMsg;
  else if ('errMsg' in props.match.params) errMsg = props.match.params.errMsg;
  return (
    <div id={styles.needLolDiv}>
      <div id={styles.needLolInner}>
        <img src={logoFull} alt="" id={styles.needLolLogo} />
        <div id={styles.needLolEmpty} />
        <div id={styles.needLolText}>
          {errMsg}
        </div>
        <div id={styles.needLolEmpty} />
      </div>
    </div>
  );
}
