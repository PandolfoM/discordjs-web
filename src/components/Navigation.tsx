import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Flex, IconButton } from "@radix-ui/themes";

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
          <a href="/">
            <FontAwesomeIcon icon={faHouse} size="xl" />
          </a>
        </IconButton>
      </Flex>
      <Box>
        <Button size="3" variant="outline" radius="full">
          Login
        </Button>
      </Box>
    </Flex>
  );
}

export default Navigation;
