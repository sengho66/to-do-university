import { useCallback, useEffect, useState } from "react";
import { type LocalStorageData } from "../../Components/Table/types";
import { addLocalStorage, getAddedItems } from "../../utils";
import { type TableData } from "./useSort";

export const useFavourite = () => {
  const [items, setItems] = useState<LocalStorageData[]>([]);

  const addItem = useCallback((uni: TableData) => {
    const exists = addLocalStorage(uni);
    const addedItems = getAddedItems("favourite_uni");

    if (addedItems) {
      const parsedItems: LocalStorageData[] = JSON.parse(addedItems);
      setItems(parsedItems);
    }

    return exists ?? false;
  }, []);

  const editItem = useCallback(
    (uni: LocalStorageData, remarks: string) => {
      const copied = items;
      const index = copied.findIndex((i) => i.name === uni.name);
      copied[index].remarks = remarks;
      setItems(copied);
      localStorage.setItem("favourite_uni", JSON.stringify(copied));
    },
    [items]
  );

  const deleteItem = useCallback(
    (uni: LocalStorageData) => {
      const copied = items.filter((i) => i.name !== uni.name);
      setItems(copied);
      localStorage.setItem("favourite_uni", JSON.stringify(copied));
    },
    [items]
  );

  useEffect(() => {
    const addedItems = getAddedItems("favourite_uni");

    if (addedItems) {
      const parsedItems: LocalStorageData[] = JSON.parse(addedItems);
      setItems(parsedItems);
    }
  }, [addItem]);

  return { items, addItem, editItem, deleteItem };
};
