import { StyleProps, Th } from "@chakra-ui/react";
import { MouseEventHandler, ReactNode } from "react";

const DEFAULT_STYLE: StyleProps = {
  cursor: "pointer",
  textAlign: "left",
  textTransform: "capitalize",
};

export const CustomTh = ({
  children,
  clickAble,
  onClick,
}: {
  children: ReactNode;
  clickAble?: boolean;
  onClick?: MouseEventHandler<HTMLTableCellElement>;
}) => {
  if (!clickAble) return <Th>{children}</Th>;

  return (
    <Th userSelect={"none"} onClick={onClick} {...DEFAULT_STYLE}>
      {children}
    </Th>
  );
};
