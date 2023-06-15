import { LocalStorageData } from "../Components/Table/types";
import { TableData } from "../lib/hooks/useSort";

export const getAddedItems = (key: string): string | null =>
  localStorage.getItem(key);

/**
 * A helper function that check if a university exists in local storage.
 */
export const checkExists = (items: LocalStorageData[], uni: TableData) => {
  const exists = items.some((i: LocalStorageData) => i.name === uni.name);
  return exists;
};

/**
 * Adds the selected university to local storage.
 */
export const addLocalStorage = (uni: TableData) => {
  const addedItems = getAddedItems("favourite_uni");
  const uni_: LocalStorageData = {
    ...uni,
    dateAdded: new Date().toLocaleString("en"),
  };

  if (!addedItems) {
    localStorage.setItem("favourite_uni", JSON.stringify([uni_]));
    return;
  }

  const merge: LocalStorageData[] = JSON.parse(addedItems);
  const exists = checkExists(merge, uni);

  /*
   * If it has already been added then remove it else add it.
   */
  switch (exists) {
    case false:
      localStorage.setItem("favourite_uni", JSON.stringify([uni_, ...merge]));
      return false;

    case true:
      const merge_ = merge.filter((i) => i.name !== uni_.name);
      localStorage.setItem("favourite_uni", JSON.stringify(merge_));
      return true;
  }
};
