import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Link,
  TableCaption,
  Tbody,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StorageContext } from "../../App";
import { type Universities } from "../../lib/hooks/useFetch";
import { TableData, useSort } from "../../lib/hooks/useSort";
import { checkExists, getAddedItems } from "../../utils";
import Skeleton from "../Skeleton";
import Filter from "./Filter";
import { CustomTable } from "./table";
import { CustomTd } from "./td";
import { CustomTh } from "./th";
import { CustomTr } from "./tr";
import { LocalStorageData } from "./types";

const TABLE_HEADERS = [
  "",
  "name",
  "country",
  "state",
  "website",
  "date added",
  "date deleted",
  "remarks",
];

interface UniProps {
  data?: Universities | undefined;
  savedItems?: LocalStorageData[];
  onLoad: Dispatch<SetStateAction<number>>;
  offset: number;
}

const UniversityTable = ({ data: data_, offset, onLoad }: UniProps) => {
  const headers = useMemo(() => TABLE_HEADERS.slice(0, 5), []);
  const { sortColumn, data } = useSort<"universities">({ data_ });
  const bg = useColorModeValue("rgb(251, 250, 253)", "rgb(31, 39, 51)");
  return (
    <Box bg={bg} padding="40px 20px">
      <Filter />

      <CustomTable noData={(data && data.length < 1) ?? false}>
        <Thead>
          <Tr color={"#A0AEC0"}>
            {headers.map((header) => (
              <CustomTh
                key={header}
                onClick={() => sortColumn(header)}
                clickAble
              >
                {header}
              </CustomTh>
            ))}
          </Tr>
        </Thead>
        {data && data.length < 1 ? (
          <TableCaption w="auto">No universities found!</TableCaption>
        ) : (
          <Tbody>
            {!data
              ? Array.from(Array(10).keys()).map((i) => <Skeleton key={i} />)
              : data.map((university, index) => (
                  <CustomTr key={index} type="data">
                    <CustomToolTip uni={university} />
                    <CustomTd type="name">{university.name}</CustomTd>
                    <CustomTd type="country">{university.country}</CustomTd>
                    <CustomTd type="state">{university.state}</CustomTd>
                    <Websites websites={university.website} />
                  </CustomTr>
                ))}
          </Tbody>
        )}
      </CustomTable>
      {data && data.length > 1 && (
        <Box mt="15px" display={"flex"} justifyContent={"end"} gap="3">
          {data && data.length > 1 && offset > 0 && (
            <Box>
              <Button
                h="2rem"
                onClick={() => offset > 0 && onLoad(offset - 10)}
                isDisabled={!data || offset < 1}
                _focus={{ border: "" }}
                _active={{ border: "" }}
              >
                Previous
              </Button>
            </Box>
          )}
          <Button
            onClick={() => data && data.length >= 10 && onLoad(offset + 10)}
            isDisabled={!data || (data && data.length < 10)}
            _focus={{ border: "" }}
            _active={{ border: "" }}
            h="2rem"
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

const CustomToolTip = ({ uni }: { uni: TableData }) => {
  const stroke = useColorModeValue("#747474", "");
  const [color, setColor] = useState("white");
  const { items, addItem } = useContext(StorageContext);
  const add = useCallback(() => {
    const exists = addItem(uni);

    setColor(exists ? "white" : "yellow");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uni, items]);

  useEffect(() => {
    const addedItems = getAddedItems("favourite_uni");
    if (addedItems) {
      if (checkExists(JSON.parse(addedItems), uni)) {
        setColor("yellow");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomTd type="favourite">
      <Tooltip label="Save to favourite list">
        <StarIcon
          strokeWidth="2"
          stroke={stroke}
          cursor={"grab"}
          color={color}
          onClick={add}
          h={{ base: "11px", md: "13px" }}
          w="auto"
        >
          Tag Here
        </StarIcon>
      </Tooltip>
    </CustomTd>
  );
};

export const Websites = ({ websites }: { websites: string[] }) => {
  return (
    <CustomTd>
      <Box display={"flex"} flexDirection={"column"}>
        {websites.map((web, index) => (
          <Link target="_blank" href={web} title={web} key={index}>
            <>{web}</>
          </Link>
        ))}
      </Box>
    </CustomTd>
  );
};

export default UniversityTable;
