/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import axios, { AxiosResponse } from "axios";
import styles from "./History.module.css";
import {
  AnalyInterface,
  EachKillData,
  FramesData,
} from "../../types/analyInterface";
import Loading from "../Loading/Loading";
import TeamInfo from "./TeamInfo";
import Graph from "./Graph";
import Map from "./Map";

export default function History(
  RCProps: RouteComponentProps<{ gameId: string }>
) {
  const { gameId } = RCProps.match.params;
  const [Data, setData] = useState<AnalyInterface | null>(null);
  const [BeforeKillData, setBeforeKillData] = useState<FramesData<
    EachKillData[]
  > | null>(null);
  const [Selected, setSelected] = useState<number>(-1);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post<any, AnalyInterface>(
          "http://api.lolgo.gg/analyrequest",
          {
            matchId: gameId,
          }
        );
        // const res = await axios.post<any,AnalyInterface>('/analyrequest', {
        //   matchId: gameId,
        // });
        const data: AnalyInterface | "failed" = await (
          res as unknown as AxiosResponse<AnalyInterface | "failed">
        ).data;
        if (data === "failed") {
          window.location.href = "/error/경기 분석 중 오류가 발생했습니다.";
          return;
        }
        console.log(data);
        const beforeKillData: FramesData<EachKillData[]> = {};
        beforeKillData[-1] = [];
        let integratedKill: EachKillData[] = [];
        let i = 0;
        while (i <= data.totFrame) {
          beforeKillData[i] = [...integratedKill];
          integratedKill = [...integratedKill, ...data.killData[i]];
          i += 1;
        }
        // console.log(beforeKillData);
        data.killData[-1] = integratedKill;
        setData(data);
        setBeforeKillData(beforeKillData);
        // setSelected(data.totFrame);
      } catch {
        window.location.href = "/error/경기 분석 중 오류가 발생했습니다.";
        return;
      }
    })();
  }, []);
  if (!Data || !BeforeKillData) return <Loading />;
  // console.log(Data);
  // window.asdf = (num:number) => {
  //   setSelected(num);
  // };
  return (
    <div id={styles.historyDiv}>
      <div id={styles.topperDiv}>
        <div className={styles.teamInfoDiv}>
          <TeamInfo data={Data} frame={Selected} team={100} />
        </div>
        <div className={styles.teamInfoDiv}>
          <TeamInfo data={Data} frame={Selected} team={200} />
        </div>
        <div id={styles.mapDiv}>
          <Map
            data={Data}
            close={() => {
              window.history.back();
            }}
            frame={Selected}
            beforeKillData={BeforeKillData}
          />
        </div>
      </div>
      <div id={styles.graphDiv}>
        <Graph data={Data} frame={Selected} changeFrame={setSelected} />
      </div>
    </div>
  );
}
