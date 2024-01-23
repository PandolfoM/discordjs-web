import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context/appContext";
import styles from "./drawer.module.scss";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

type LinkProps = {
  title: string;
};

const DrawerLink = ({ title }: LinkProps) => {
  const { setDrawerOpen } = useContext(AppContext);
  const { id } = useParams();

  return (
    <Link
      to={`/dashboard/${id}/` + title.replace(/\s/g, "").toLowerCase()}
      className={styles.link}
      onClick={() => setDrawerOpen(false)}>
      {title}
    </Link>
  );
};

const DrawerTitle = ({ title }: LinkProps) => {
  return <h4 className={styles.title}>{title}</h4>;
};

function Drawer() {
  const { drawerOpen, setDrawerOpen } = useContext(AppContext);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const targetNode = event.target as Node;

      if (drawerRef.current && !drawerRef.current?.contains(targetNode)) {
        setDrawerOpen(false);
      }
    };

    if (drawerOpen) {
      document.body.classList.add(styles.pointer);
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.body.classList.remove(styles.pointer);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [drawerOpen, setDrawerOpen]);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <motion.div
          ref={drawerRef}
          className={styles.drawer}
          initial={{
            left: "-200px",
          }}
          animate={{
            position: "fixed",
            left: "0",
          }}
          exit={{
            left: "-200px",
          }}>
          <div className={styles.content}>
            <DrawerTitle title="SETTINGS" />
            <DrawerLink title="Server Settings" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Drawer;
