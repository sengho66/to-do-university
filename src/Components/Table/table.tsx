import { Table, useColorModeValue } from "@chakra-ui/react";
import type { ReactNode } from "react";

export const CustomTable = ({
  children,
  isLocalstorage,
  noData,
}: {
  children: ReactNode;
  isLocalstorage?: boolean;
  noData?: boolean;
}) => {
  const background = useColorModeValue("rgb(255, 255, 255)", "rgb(36, 46, 60)");
  const scrollbarBg = useColorModeValue("rgb(226, 231, 236)", "#242e3c");
  const scrollThumbBg = useColorModeValue("#c3ccd6", "#1A202C");
  const inline: any = {};

  if (!isLocalstorage) {
    inline.lg = "inline-table";
  } else {
    inline["2xl"] = "inline-table";
  }

  return (
    <Table
      __css={{
        overflow: "auto",
        background,
        width: "100%",
        display: { base: "block", ...inline },
        "&::-webkit-scrollbar": {
          width: "4px",
          height: "10px",
          background: scrollbarBg,
        },

        "&::-webkit-scrollbar-thumb": {
          width: "4px",
          background: scrollThumbBg,
          borderRadius: "8px",
        },
      }}
    >
      {children}
    </Table>
  );
};
