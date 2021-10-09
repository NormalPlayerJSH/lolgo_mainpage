import { AxiosInstance } from 'axios';
import React from 'react';
import { Rank } from './enum';

export interface UserInfoI {
  name: string;
  summonerId: number;
  accountId: number;
  puuid: string;
  tier: Rank;
  division: 0 | 1 | 2 | 3 | 4;
}

export interface ChampSelectPlayerInfoI {
  myTeam: number[];
  theirTeam: number[];
  myTeamInfo: {
    [x: number]: UserInfoI;
  };
  myCellId: number;
}

export interface PickInfoI {
  actorCellId: number;
  championId: number;
  completed: boolean;
  isInProgress: boolean;
  isAllyAction: boolean;
  id: number;
  pickTurn: number;
}

export interface BanPickInfoI {
  ourBan:number[];
  theirBan: number[];
  [x: number]: PickInfoI;
  endTime:number;
}

export interface ChampPickedProps {
  pickInfo: PickInfoI;
  userInfo?: UserInfoI;
}

export interface ChampRequestInfoI {
  bans: number[];
  ally: number[];
  enemy: number[];
  position: string
}

export interface ChampRecommendInfoI {
  good: number[];
  bad: number[];
}

export interface MatchInfoI {
  isWin: boolean;
  kill: number;
  death: number;
  assist: number;
  championId: number;
  gameMode: string;
  gameType: string;
  queueId: number;
  spell1: number;
  spell2: number;
  perk1: number;
  perk2: number;
  level: number;
  creepScore: number;
  playDate: number;
  duration: number;
  gameId: number;
}

export interface RootProps {
  LCUInstance: AxiosInstance;
}

export interface MainProps {
  userInfo: UserInfoI;
  profileIconId: number;
  matchInfo: [MatchInfoI];
  totalKill: number;
  totalDeath: number;
  totalAssist: number;
  totalWin: number;
  totalLose: number;
  setHistoryId: React.Dispatch<React.SetStateAction<number>>;
}

export interface BanPickPlayerInfoI {
  myTeam: {
    ban: number[],
    pick: {
      pickInfo: PickInfoI
      playerInfo: UserInfoI
      isMe: boolean
    }[]
  },
  theirTeam: {
    ban: number[],
    pick: {
      pickInfo: PickInfoI
    }[]
  }
}

export interface ChampSelectProps {
  BanPickPlayerInfo: BanPickPlayerInfoI
  ChampRecommendInfo: ChampRecommendInfoI
  Me: PickInfoI
  selectChampion: (championId:number) => void,
  lockIn: () => void,
  endTime: number
}
