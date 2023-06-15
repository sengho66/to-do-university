import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Link, List, ListItem, useColorMode } from "@chakra-ui/react";
import { useContext, type ReactNode } from "react";
import { StorageContext, type View } from "../../App";

const NAV_LINKS = [
  { title: "universities" as View, path: "universities" },
  { title: "favourites" as View, path: "favourites" },
];

const UNDERLINE_STYLE = {
  textDecoration: "underline",
  textDecorationColor: "rgb(0, 174, 211)",
  textUnderlineOffset: "5px",
  textDecorationThickness: "1.5px",
};

const getStyle = (view: View, link: View) => {
  return view === link ? UNDERLINE_STYLE : {};
};

export const Navbar = () => {
  const { view, setView } = useContext(StorageContext);

  return (
    <Box as="nav">
      <List
        padding={{ base: "2rem 1.2rem", lg: "2rem 85px" }}
        display="flex"
        justifyContent={"start"}
        gap={5}
      >
        {NAV_LINKS.map((link) => (
          <ListItem key={link.path}>
            <CustomLink title={link.title} view={view} setView={setView} />
          </ListItem>
        ))}
        <ToggleMode />
      </List>
    </Box>
  );
};

const CustomLink = ({
  title,
  view,
  setView,
}: {
  view: View;
  setView: (view: View) => void;
  title: View;
}) => {
  return (
    <Link
      onClick={() => setView(title)}
      fontWeight={500}
      {...getStyle(view, title)}
      _hover={{
        textDecoration: "underline",
        textDecorationColor: "rgb(0, 174, 211)",
        textUnderlineOffset: "5px",
        textDecorationThickness: "1.5px",
      }}
      textTransform={"capitalize"}
    >
      {title}
    </Link>
  );
};

export const ToggleMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <button onClick={toggleColorMode}>
      {colorMode === "dark" ? <SunIcon mb="2px" /> : <MoonIcon mb="2px" />}
    </button>
  );
};

export const Links = ({ children }: { children: ReactNode }) => {
  return (
    <Box as="nav" padding="2rem 0">
      {children}
    </Box>
  );
};
