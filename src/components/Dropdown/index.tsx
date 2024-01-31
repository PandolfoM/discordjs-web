import {
  faCaretUp,
  faChevronDown,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./dropdown.module.scss";
import { MouseEvent, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChannelProps, SettingsProps } from "../../utils/types";
import { AppContext } from "../../context/appContext";

type Props = {
  channels: Array<ChannelProps>;
  dbItem: keyof SettingsProps;
};

function Dropdown({ channels, dbItem }: Props) {
  const { setSettings } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const getChannelName = (id: string) => {
    const foundItem = channels.find((i) => i.id === id);

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

  return (
    <>
      <button
        className={styles.trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}>
        <span>
          <FontAwesomeIcon icon={faHashtag} style={{ opacity: 0.3 }} />
          {selectedItem ? getChannelName(selectedItem) : "No channel selected"}
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
            {channels
              .filter((channel) => channel.parent_id === null)
              .map((labelChannel) => (
                <div className={styles.group} key={labelChannel.id}>
                  <div className={styles.header}>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      style={{ opacity: 0.3 }}
                    />
                    <h6 className={styles.label}>{labelChannel.name}</h6>
                  </div>
                  {channels
                    .filter(
                      (itemChannel) =>
                        itemChannel.parent_id === labelChannel.id &&
                        itemChannel.type === 0
                    )
                    .map((itemChannel) => (
                      <button
                        className={`${styles.item} ${
                          getChannelName(selectedItem) === itemChannel.name
                            ? styles.selected
                            : ""
                        }`}
                        value={itemChannel.id}
                        key={itemChannel.id}
                        onClick={handleClick}>
                        <div className={styles.item_name}>
                          <FontAwesomeIcon
                            icon={faHashtag}
                            style={{ opacity: 0.3 }}
                          />
                          {itemChannel.name}
                        </div>
                        {getChannelName(selectedItem) === itemChannel.name && (
                          <div className={styles.right}>Selected</div>
                        )}
                      </button>
                    ))}
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Dropdown;
