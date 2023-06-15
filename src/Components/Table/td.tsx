import { Td, type  StyleProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

type TdType = "favourite" | "name" | "country" | "state" | "website" | "date";

const getStyles = (type?: TdType): StyleProps => {
  const styleProps: StyleProps = {};
  
  switch (type) {
    case "favourite":
      styleProps.userSelect = "none";
      break;

    case "name":
      styleProps.w = "auto";
      styleProps.fontWeight = 500;
      styleProps.minW = "200px";
      break;

    case "country":
      styleProps.minW = "145px";
      break;

    case "date":
      styleProps.minW = "150px";
      break;

    default:
      return styleProps;
  }
  return styleProps;
};

export const CustomTd = ({
  children,
  type,
}: {
  children: ReactNode;
  type?: TdType;
}) => {
  if (!type) return <Td>{children}</Td>;

  const style = getStyles(type);

  return <Td {...style}>{children}</Td>;
};
