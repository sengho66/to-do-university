import { TableData } from "../../lib/hooks/useSort";

export type LocalStorageData = TableData & {
  dateAdded?: string;
  remarks?: string;
};
