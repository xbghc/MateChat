import type { IMessage } from "./type-chat-view";
import type { ModelOption } from "@/models/types";

export interface IHistoryItem {
  messages: IMessage[];
  updateDate: string;
  updateTime: string;
  chatId: string;
  chatModel?: ModelOption;
}

export type HistoryList = IHistoryItem[];

export interface CategorizedHistoryItem {
  title: string;
  expand: boolean;
  updateDate: string;
  updateTime: string;
  list: HistoryList;
}
