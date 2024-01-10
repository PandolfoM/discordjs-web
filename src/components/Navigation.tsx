import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Flex,
  IconButton,
  Text,
} from "@radix-ui/themes";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/context";
import Cookies from "js-cookie";
import { auth } from "../firebase";

function Navigation() {
  const { currentUser, userDoc } = useContext(AuthContext);

  const logOut = async () => {
    try {
      await auth.signOut();
      window.location.href = "/auth/logout";
      Cookies.remove("customToken");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <Flex
      height="9"
      px="2"
      align="center"
      justify="between"
      style={{
        borderBottom: "#0A0A0B",
        backgroundColor: "#1D1D20",
        boxShadow: "0 0px 10px #0A0A0B",
      }}>
      <Flex gap="5">
        <IconButton
          size="3"
          variant="ghost"
          style={{
            backgroundColor: "transparent",
          }}>
          <Link to="/">
            <FontAwesomeIcon icon={faHouse} size="xl" />
          </Link>
        </IconButton>
        {currentUser && (
          <IconButton
            size="3"
            variant="ghost"
            style={{
              backgroundColor: "transparent",
            }}>
            <Link to="/dashboard">
              <FontAwesomeIcon icon={faDashboard} size="xl" />
            </Link>
          </IconButton>
        )}
      </Flex>
      <Box>
        {userDoc ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Flex
                align="center"
                gap="1"
                style={{ cursor: "pointer", userSelect: "none" }}>
                <Text>Thoomin</Text>
                <Avatar
                  src={`https://cdn.discordapp.com/avatars/${userDoc.uid}/${userDoc.avatar}.png`}
                  fallback={userDoc.username.charAt(0)}
                  radius="full"
                  size="3"
                />
                <FontAwesomeIcon icon={faCaretDown} />
              </Flex>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>Servers</DropdownMenu.Item>
              <DropdownMenu.Item onClick={logOut}>Log out</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ) : (
          <Button size="3" variant="outline" radius="full">
            <a href="/auth/login" style={{ textDecoration: "none" }}>
              Login
            </a>
          </Button>
        )}
      </Box>
    </Flex>
  );
}

export default Navigation;
