import { v4 as uuidv4 } from 'uuid';

export enum PortName {
  MARTIAN_UI_BACKGROUND = 'MARTIAN_UI_BACKGROUND',
  MARTIAN_CONTENT_BACKGROUND = 'MARTIAN_CONTENT_BACKGROUND',
}

export interface WindowMsg<T = any> {
  target: WindowMsgTarget;
  payload: T;
}

export interface WindowMsgDataBase {
  id: string;
}

export type WindowMsgReqData<T = any> = WindowMsgDataBase & {
  funcName: string;
  payload: T;
};

export interface ResData<T = any> {
  id: string;
  error: null | {
    code: string;
    msg: string;
  };
  data: null | T;
}

export interface BackgroundResData<T = any> {
  id: string;
  error: null | { code: number; msg: string };
  data: null | T;
}

export enum WindowMsgTarget {
  DAPP = 'DAPP',
  MARTIAN_CONTENT = 'MARTIAN_CONTENT',
}

export function reqData<T = any>(
  funcName: string,
  payload: T
): WindowMsgReqData<T> {
  return {
    id: uuidv4(),
    funcName,
    payload,
  };
}

export function resData<T = any>(
  id: string,
  error: null | { code: number; msg: string },
  data: null | any
): BackgroundResData<T> {
  return {
    id,
    error,
    data,
  };
}
