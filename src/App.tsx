import { ChakraProvider } from "@chakra-ui/react";
import { createContext, useState } from "react";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import { type LocalStorageData } from "./Components/Table";
import FavouriteTable from "./Components/Table/FavouriteTable";
import UniversityTable from "./Components/Table/UniversityTable";
import { useFavourite } from "./lib/hooks/useFavourite";
import { useFetch, type Response } from "./lib/hooks/useFetch";
import { type TableData } from "./lib/hooks/useSort";
import { useUrl } from "./lib/hooks/useUrl";
import { theme } from "./utils/theme";

export type View = "universities" | "favourites";

interface Storage {
  addItem: (uni: TableData) => boolean;
  country: string | undefined;
  deleteItem: (uni: LocalStorageData) => void;
  editItem: (uni: TableData, remarks: string) => void;
  items: LocalStorageData[];
  setCountry: (country: string | undefined) => void;
  setOffset: (uni: number) => void;
  setView: (uni: View) => void;
  view: View;
}

export const StorageContext = createContext({} as Storage);

const App = () => {
  const [view, setView] = useState<View>("universities");
  const { offset, setOffset, country, setCountry, url } = useUrl();
  const { data: data_ } = useFetch<Response.University>(url);
  const { items, addItem, editItem, deleteItem } = useFavourite();

  return (
    <ChakraProvider theme={theme}>
      <StorageContext.Provider
        value={{
          country,
          setCountry,
          deleteItem,
          editItem,
          view,
          setOffset,
          items,
          addItem,
          setView,
        }}
      >
        <Layout setView={setView}>
          {view === "universities" ? (
            <UniversityTable offset={offset} onLoad={setOffset} data={data_} />
          ) : (
            <FavouriteTable data={items} />
          )}
        </Layout>
      </StorageContext.Provider>
    </ChakraProvider>
  );
};

export default App;
