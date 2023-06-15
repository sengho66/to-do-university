import { Skeleton as ChakraSkeleton } from "@chakra-ui/react";
import { CustomTd, CustomTr } from "./Table";

const Skeleton = () => {
  return (
    <CustomTr type="skeleton">
      <CustomTd>
        <ChakraSkeleton w="15px" h="15px" borderRadius={"10px"} />
      </CustomTd>
      <CustomTd>
        <ChakraSkeleton
          padding="0 2.5rem"
          w="200px"
          h="15px"
          borderRadius={"10px"}
        />
      </CustomTd>
      <CustomTd>
        <ChakraSkeleton w="130px" h="15px" borderRadius={"10px"} />
      </CustomTd>
      <CustomTd>
        <ChakraSkeleton w="75px" h="15px" borderRadius={"10px"} />
      </CustomTd>
      <CustomTd>
        <ChakraSkeleton w="100px" h="15px" borderRadius={"10px"} />
      </CustomTd>
    </CustomTr>
  );
};

export default Skeleton;
