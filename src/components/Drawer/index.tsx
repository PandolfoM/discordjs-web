import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context/appContext";
import styles from "./drawer.module.scss";
import { Link, useParams } from "react-router-dom";

type LinkProps = {
  title: string;
};

const DrawerLink = ({ title }: LinkProps) => {
  const { id } = useParams();

  return (
    <Link
      to={`/dashboard/${id}/` + title.replace(/\s/g, "").toLowerCase()}
      className={styles.link}>
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
    <>
      {drawerOpen && (
        <div className={styles.drawer} ref={drawerRef}>
          <div className={styles.content}>
            <DrawerTitle title="SETTINGS" />
            <DrawerLink title="Server Settings" />
          </div>
        </div>
      )}
    </>
  );
}

export default Drawer;
