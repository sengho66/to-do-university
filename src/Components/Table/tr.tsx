import { Tr, useColorModeValue, type StyleProps } from "@chakra-ui/react";
import type { AriaAttributes, HTMLAttributes, ReactNode } from "react";

type TrType = "data" | "headers" | "skeleton";

interface TrProps {
  styleProps: StyleProps;
  ariaAttr: HTMLAttributes<AriaAttributes>;
}
const getStyles = (type?: TrType): TrProps => {
  const styleProps: StyleProps = {};
  const ariaAttr: HTMLAttributes<AriaAttributes> = {};
  switch (type) {
    case "data":
      styleProps.fontSize = { base: "0.85rem", md: "0.9rem", xl: "0.92rem" };
      break;

    case "skeleton":
      ariaAttr.role = "status";
      break;

    default:
      return { styleProps, ariaAttr };
  }
  return { styleProps, ariaAttr };
};

export const CustomTr = ({
  children,
  type,
}: {
  children: ReactNode;
  type?: TrType;
}) => {
  const color = useColorModeValue("RGBA(0, 0, 0, 0.85)", "rgb(179, 186, 193)");

  if (!type) return <Tr className="text-s">{children}</Tr>;

  const { styleProps, ariaAttr } = getStyles(type);

  styleProps.color = color;
  return (
    <Tr role={ariaAttr?.role} {...styleProps}>
      {children}
    </Tr>
  );
};
