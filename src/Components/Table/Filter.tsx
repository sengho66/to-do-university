import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  useColorModeValue,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { createRef, useContext } from "react";
import { StorageContext } from "../../App";
import countries from "../../lib/hooks/countries.json";

const Filter = () => {
  const { country, setCountry } = useContext(StorageContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hovered = useColorModeValue("#EDF2F7", "#3b4a5a");
  const ref = createRef<HTMLDivElement>();

  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });
  return (
    <Box ref={ref} display={"flex"} justifyContent={"end"} mb="15px">
      <Menu isOpen={isOpen}>
        <MenuButton
          fontSize={"0.85rem"}
          h="1.75rem"
          onClick={!isOpen ? onOpen : onClose}
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
          {country ?? "Country"}
        </MenuButton>
        <MenuList maxH="300px" overflow={"auto"} fontSize={"0.8rem"}>
          {country && (
            <Box
              cursor={"grab"}
              _hover={{ bg: "#EDF2F7" }}
              p="1px 5px"
              fontWeight="500"
              fontSize="0.85rem"
              onClick={() => setCountry(undefined)}
            >
              Reset
            </Box>
          )}
          {countries &&
            countries.map((i) => (
              <Box
                cursor={"grab"}
                key={i.name}
                _hover={{ bg: hovered }}
                p="1px 5px"
                onClick={() => {
                  onClose();
                  setCountry(i.name);
                }}
              >
                {i.name}
              </Box>
              // <Box cursor={"grab"} key={i.name} _hover={{ bg: "#EDF2F7"}} p="1px 5px"
              //   {i.name}
              //   </Box>
            ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Filter;
