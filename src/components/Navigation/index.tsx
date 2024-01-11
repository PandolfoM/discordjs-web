import {
  faCaretDown,
  faList,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/context";
import Cookies from "js-cookie";
import { auth } from "../../firebase";
import styles from "./navigation.module.scss";
import Button from "../Button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";

function Navigation() {
  const { currentUser } = useContext(AuthContext);

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
    <nav className={styles.nav}>
      <div className={styles.navBtns}>
        <Button variant="invisible">
          <Link to="/">
            <FontAwesomeIcon icon={faHouse} size="lg" />
          </Link>
        </Button>
      </div>
      <div>
        {currentUser ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <div className={styles.user}>
                <Avatar.Root className={styles.avatar}>
                  <Avatar.Image
                    className={styles.avatar_image}
                    src={`https://cdn.discordapp.com/avatars/${currentUser.uid}/${currentUser.avatar}.png`}
                    alt={currentUser.username}
                  />
                  <Avatar.AvatarFallback>
                    {currentUser.username.charAt(0)}
                  </Avatar.AvatarFallback>
                </Avatar.Root>
                <Button variant="invisible">
                  <FontAwesomeIcon icon={faCaretDown} size="xs" />
                </Button>
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className={styles.content} align="end">
                <DropdownMenu.Item className={styles.item} asChild>
                  <Link to={"/servers"}>
                    <FontAwesomeIcon icon={faList} size="xs" />
                    Servers
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={logOut} className={styles.item}>
                  <FontAwesomeIcon icon={faRightFromBracket} size="xs" />
                  Log out
                </DropdownMenu.Item>
                <DropdownMenu.Arrow className={styles.arrow} />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        ) : (
          <Button variant="ghost">
            <a href="/auth/login" style={{ textDecoration: "none" }}>
              Login
            </a>
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
