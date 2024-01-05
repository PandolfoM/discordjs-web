import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Flex, IconButton } from "@radix-ui/themes";
import { Link } from "react-router-dom";

function Navigation() {
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
      </Flex>
      <Box>
        <Button size="3" variant="outline" radius="full">
          <a href="/auth/login" style={{ textDecoration: "none" }}>
            Login
          </a>
        </Button>
      </Box>
    </Flex>
  );
}

export default Navigation;
