import { Box } from "@chakra-ui/react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { Navbar } from "./Navbar";
import { type View } from "../../App";

const Layout = ({
  children,
  setView,
}: {
  children?: ReactNode;
  setView: Dispatch<SetStateAction<View>>;
}) => {
  return (
    <>
      <Navbar />
      <Box
        margin="auto"
        as="main"
        pb="2rem !important"
        padding={{ base: "0 1.2rem", lg: "0 85px" }}
        w={{
          base: "100%",
          xl: "100%",
          "3xl": "1400px",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
