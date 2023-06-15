import { useCallback, useMemo, useState } from "react";
import { type LocalStorageData } from "../../Components/Table";
import type { Universities } from "./useFetch";

// const sortHelper = (a: string, b: string, type: "asc" | "desc") => {
//   if (a < b) {
//     return type === "asc" ? 1 : -1;
//   }
//   if (a > b) {
//     return type === "desc" ? 1 : -1;
//   }
//   return 0;
// };

const sortHelper = (key: string, type: "asc" | "desc") => {
  let sortOrder = 1;
  if (type === "desc") {
    sortOrder = -1;
  }
  return function (a: any, b: any) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
    return result * sortOrder;
  };
};

interface SortData {
  column: string;
  type: "desc" | "asc";
}

export interface TableData {
  index: number;
  name: string;
  country: string;
  state: string;
  website: string[];
}

interface DataType {
  data_?: Universities | undefined;
  savedItems?: LocalStorageData[];
}

interface SortResponse<View> {
  sortColumn: (column: string) => void;
  data: ObjectType<View> | undefined;
}

export const useSort = <View>(data_: DataType): SortResponse<View> => {
  const [sort, setSort] = useState<SortData | undefined>();

  const sortColumn = useCallback(
    (column: string) => {
      let type = sort?.type;
      if (sort?.column === column) {
        type = sort.type === "asc" ? "desc" : "asc";
      }
      setSort({ column, type: type ?? "asc" });
    },
    [sort]
  );

  const data = useMemo(() => {
    // if (data_.data_) {
    //   return sortItems<"universities">(
    //     data_,
    //     sort
    //   ) as ObjectType<"universities">;
    // }
    // if (data_.savedItems) {
    //   return sortItems<"favourites">(data_, sort) as ObjectType<"favourites">;
    // }
    if (data_?.data_) {
      if (sort) {
        const key = getKey(sort, false);
        data_.data_.sort(sortHelper(key, sort.type));
      }

      return data_.data_.map((i, index) => ({
        index: index,
        name: i.name,
        country: i.country,
        state: i["state-province"] ?? "-",
        website: i.web_pages,
      })) as ObjectType<View>;
    }
    if (data_?.savedItems) {
      if (sort) {
        const key = getKey(sort, true);
        data_.savedItems.sort(sortHelper(key, sort.type));
      }
      return data_.savedItems as ObjectType<View>;
    }
    // return data_;
    // return undefined;
  }, [sort, data_]);

  return { sortColumn, data };
};

type ObjectType<T> = T extends "universities"
  ? TableData[]
  : T extends "favourites"
  ? LocalStorageData[]
  : undefined;

const getKey = (sort: SortData, isLocalstorage: boolean) => {
  let key = "";
  switch (sort.column) {
    case "name":
      key = sort.column;
      break;
    case "country":
      key = sort.column;
      break;
    case "state":
      if (isLocalstorage) {
        key = "state";
        break;
      }
      key = "state-province";
      break;
    case "website":
      if (isLocalstorage) {
        key = "website";
        break;
      }
      key = "web_pages";
      break;
    case "dateAdded":
      key = "dateAdded";
      break;
  }
  return key;
};
