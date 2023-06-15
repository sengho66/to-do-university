import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Link,
  TableCaption,
  Tbody,
  Textarea,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import {
  createRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StorageContext } from "../../App";
import { useSort, type TableData } from "../../lib/hooks/useSort";
import Skeleton from "../Skeleton";
import { CustomTable } from "./table";
import { CustomTd } from "./td";
import { CustomTh } from "./th";
import { CustomTr } from "./tr";
import type { LocalStorageData } from "./types";

const TABLE_HEADERS = [
  "",
  "name",
  "country",
  "state",
  "website",
  "date added",
  "remarks",
];

interface FavouriteProps {
  data?: LocalStorageData[];
}

const FavouriteTable = ({ data: data_ }: FavouriteProps) => {
  const { editItem, deleteItem } = useContext(StorageContext);

  const headers = useMemo(() => TABLE_HEADERS, []);
  const { sortColumn, data } = useSort<"favourites">({ savedItems: data_ });
  const bg = useColorModeValue("rgb(251, 250, 253)", "rgb(31, 39, 51)");

  return (
    <Box bg={bg} padding="40px 20px">
      <CustomTable isLocalstorage noData={(data && data.length < 1) ?? false}>
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
        {!data ? (
          <Tbody>
            {Array.from(Array(10).keys()).map((i) => (
              <Skeleton key={i} />
            ))}{" "}
          </Tbody>
        ) : data.length < 1 ? (
          <TableCaption w="auto">
            Nothing is here, starting adding university to your favourite list!
          </TableCaption>
        ) : (
          <Tbody>
            {data.map((university, index) => (
              <CustomTr key={university.name} type="data">
                <CustomToolTip deleteItem={deleteItem} uni={university} />
                <CustomTd type="name">{university.name}</CustomTd>
                <CustomTd type="country">{university.country}</CustomTd>
                <CustomTd type="state">{university.state}</CustomTd>
                <Websites websites={university.website} />
                <CustomTd type="date">{university.dateAdded}</CustomTd>
                <Remarks editItem={editItem} uni={university} />
              </CustomTr>
            ))}
          </Tbody>
        )}
      </CustomTable>
    </Box>
  );
};

const Remarks = ({
  editItem,
  uni,
}: {
  uni: LocalStorageData;
  editItem: (uni: TableData, remarks: string) => void;
}) => {
  const ref = createRef<HTMLTextAreaElement>();
  const boxRef = createRef<HTMLDivElement>();
  const tooltipRef = createRef<HTMLDivElement>();

  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState(uni?.remarks ?? "");
  const handleChange = (value_: string) => {
    setValue(value_);
  };

  const handleEdit = () => {
    if (ref.current) {
      setDisabled(false);
      ref.current?.focus();
      ref.current.toggleAttribute("focus", true);
    }
  };
  useEffect(() => {
    ref?.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  useOutsideClick({
    ref: boxRef,
    handler: () => onCancel(),
  });

  const onCancel = () => {
    setValue(uni?.remarks ?? "");
    setDisabled(true);
  };

  const onSave = () => {
    editItem(uni, value);
    setDisabled(true);
  };

  const mouseOver = useCallback(() => {
    if (disabled) {
      window.onmousemove = function (e) {
        if (tooltipRef?.current && ref?.current) {
          const x = e.pageY - ref.current.offsetTop - 110 + "px";
          const y = e.pageX - ref.current.offsetLeft - 100 + "px";
          tooltipRef.current.style.top = x;
          tooltipRef.current.style.left = y;
          tooltipRef.current.style.display = "inline-block";
        }
      };
    }
  }, [tooltipRef, ref, disabled]);

  return (
    <CustomTd>
      <Box
        ref={boxRef}
        display="flex"
        alignItems={"end"}
        flexDirection={"column"}
      >
        <Tooltip
          position="fixed"
          display={"none"}
          // display="inline-block"
          // overflow={"hidden"}
          label="Click to edit"
          ref={tooltipRef}
        >
          <Textarea
            minW="250px"
            onMouseOver={mouseOver}
            ref={ref}
            value={value}
            cols={value.length > 1 ? 1 : 1}
            _disabled={{ cursor: "not-allowed" }}
            disabled={disabled}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="-"
            size="sm"
          />
        </Tooltip>

        {disabled ? (
          <Tooltip label="Click to edit">
            <EditIcon mt="7px" onClick={handleEdit} />
          </Tooltip>
        ) : (
          <Box mt="7px" display="flex" gap="1.5" alignItems={"center"}>
            <Button
              onClick={onCancel}
              fontSize={"0.8rem"}
              p="3px 13px"
              h="25px"
            >
              Cancel
            </Button>
            <Button onClick={onSave} fontSize={"0.8rem"} p="3px 13px" h="25px">
              Save
            </Button>
          </Box>
        )}
      </Box>
    </CustomTd>
  );
};

const CustomToolTip = ({
  uni,
  deleteItem,
}: {
  uni: TableData;
  deleteItem: (uni: LocalStorageData) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = createRef<HTMLButtonElement>();

  return (
    <CustomTd type="favourite">
      <Tooltip label="Save to favourite list">
        <DeleteIcon
          strokeWidth="2"
          cursor={"grab"}
          color={"#dd3434"}
          onClick={onOpen}
          h={{ base: "11px", md: "13px" }}
          w="auto"
        >
          Tag Here
        </DeleteIcon>
      </Tooltip>
      <AlertDialog
        isOpen={isOpen}
        motionPreset="slideInBottom"
        isCentered
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              textAlign={"center"}
              fontSize="lg"
              fontWeight="bold"
            >
              Confirm Delete
            </AlertDialogHeader>

            <AlertDialogBody
              display="flex"
              justifyContent={"center"}
              pb="1rem"
              pt="0"
            >
              <Button h="2rem" ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                h="2rem"
                colorScheme="red"
                onClick={() => {
                  deleteItem(uni);
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </CustomTd>
  );
};

export const Delete = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = createRef<HTMLButtonElement>();

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Delete Customer
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
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

export default FavouriteTable;
