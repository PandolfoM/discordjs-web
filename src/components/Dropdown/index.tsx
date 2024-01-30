import {
  faChevronDown,
  faChevronUp,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Select from "@radix-ui/react-select";
import styles from "./dropdown.module.scss";
import { useRef } from "react";

type SelectItemProps = {
  // children: React.PropsWithChildren<ReactNode>;
  value: string;
};

type Props = {
  channels?: Array<object>;
};

function Dropdown({ channels }: Props) {
  const containerRef = useRef(null);

  const SelectItem = ({ value }: SelectItemProps) => {
    return (
      <Select.Item value={value} className={styles.selectItem}>
        <FontAwesomeIcon icon={faHashtag} style={{ opacity: 0.5 }} />{" "}
        <Select.ItemText>{value}</Select.ItemText>
      </Select.Item>
    );
  };

  return (
    <Select.Root open>
      <Select.Trigger className={styles.trigger}>
        <div>
          <FontAwesomeIcon icon={faHashtag} style={{ opacity: 0.5 }} />{" "}
          <Select.Value placeholder="Select option" />
        </div>
        <Select.Icon>
          <FontAwesomeIcon icon={faChevronDown} />
        </Select.Icon>
      </Select.Trigger>
      <div id="dropdownPortal" className={styles.portal} ref={containerRef}>
        <Select.Portal container={containerRef.current}>
          <Select.Content className={styles.content}>
            <Select.ScrollUpButton className={styles.scrollBtn}>
              <FontAwesomeIcon icon={faChevronUp} />
            </Select.ScrollUpButton>

            <Select.Viewport className={styles.viewport}>
              {channels
                ?.filter((channel) => channel.parent_id === null)
                .map((labelChannel) => (
                  <Select.Group className={styles.group} key={labelChannel.id}>
                    <Select.Label className={styles.label}>
                      {labelChannel.name}
                    </Select.Label>
                    {channels
                      .filter(
                        (itemChannel) =>
                          itemChannel.parent_id === labelChannel.id &&
                          itemChannel.type === 0
                      )
                      .map((itemChannel) => (
                        <SelectItem
                          key={itemChannel.id}
                          value={itemChannel.name}
                        />
                      ))}
                  </Select.Group>
                ))}
            </Select.Viewport>

            <Select.ScrollDownButton className={styles.scrollBtn}>
              <FontAwesomeIcon icon={faChevronDown} />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </div>
    </Select.Root>
  );
}

export default Dropdown;
