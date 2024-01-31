import {
  faCaretUp,
  faChevronDown,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./dropdown.module.scss";
import { MouseEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  channels: Array<object>;
};

function Dropdown({ channels }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const newItem = event.currentTarget.value;
    setDropdownOpen(false);

    if (newItem === selectedItem) {
      setSelectedItem("");
    } else {
      setSelectedItem(newItem);
    }
  };

  return (
    <>
      <button
        className={styles.trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}>
        <span>
          <FontAwesomeIcon icon={faHashtag} style={{ opacity: 0.3 }} />
          {selectedItem ? selectedItem : "No channel selected"}
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
                          selectedItem === itemChannel.name
                            ? styles.selected
                            : ""
                        }`}
                        value={itemChannel.name}
                        key={itemChannel.id}
                        onClick={handleClick}>
                        <div className={styles.item_name}>
                          <FontAwesomeIcon
                            icon={faHashtag}
                            style={{ opacity: 0.3 }}
                          />
                          {itemChannel.name}
                        </div>
                        {selectedItem === itemChannel.name && (
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
