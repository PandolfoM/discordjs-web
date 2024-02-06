import { faAt, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./rolesdropdown.module.scss";
import { MouseEvent, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RoleProps, SettingsProps } from "../../utils/types";
import { AppContext } from "../../context/appContext";

type Props = {
  roles: Array<RoleProps>;
  dbItem: keyof SettingsProps;
};

function RolesDropdown({ roles, dbItem }: Props) {
  const { setSettings } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const getRoleName = (id: string) => {
    const foundItem = roles.find((i) => i.id === id);

    if (foundItem) {
      return foundItem.name;
    } else {
      return "Name not found";
    }
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const newItem = event.currentTarget.value;
    setDropdownOpen(false);

    setSelectedItem(selectedItem === newItem ? "" : newItem);

    // @ts-expect-error argument error
    setSettings((prev: SettingsProps) => {
      return {
        ...prev,
        [dbItem]: selectedItem === newItem ? "" : newItem,
      };
    });
  };

  const decimalToHex = (decimalColor: number) => {
    // Ensure the input is a positive integer
    const intValue = Math.floor(Math.abs(decimalColor));

    // Convert the decimal value to hex
    const hexValue = intValue.toString(16).toUpperCase();

    return `#${hexValue}`;
  };

  return (
    <>
      <button
        className={`${styles.trigger} ${dropdownOpen ? styles.open : ""}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}>
        <span>
          <FontAwesomeIcon icon={faAt} style={{ opacity: 0.3 }} />
          {selectedItem ? getRoleName(selectedItem) : "No role selected"}
        </span>
        <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }}>
          <FontAwesomeIcon icon={faCaretUp} size="sm" />
        </motion.div>
      </button>
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            className={styles.content}
            initial={{ opacity: 0 }}
            transition={{
              duration: 0.1,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}>
            {roles
              .filter(
                (role) => role.name !== "@everyone" && role.managed !== true
              )
              .map((role: RoleProps) => (
                <div className={styles.group} key={role.id}>
                  <button
                    className={`${styles.item} ${
                      getRoleName(selectedItem) === role.name
                        ? styles.selected
                        : ""
                    }`}
                    value={role.id}
                    key={role.id}
                    onClick={handleClick}>
                    <div
                      className={styles.item_name}
                      style={{ color: decimalToHex(role.color) }}>
                      {role.name}
                    </div>
                    {getRoleName(selectedItem) === role.name && (
                      <div className={styles.right}>Selected</div>
                    )}
                  </button>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default RolesDropdown;
