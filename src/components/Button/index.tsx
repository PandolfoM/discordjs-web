import React, { CSSProperties, ReactNode } from "react";
import styles from "./button.module.scss";

type Props = {
  children: React.PropsWithChildren<ReactNode>;
  variant: "solid" | "ghost" | "invisible" | "outline";
  onClick?: () => void;
  style?: CSSProperties;
};

function Button(props: Props) {
  const buttonClass =
    props.variant === "ghost"
      ? styles.ghost
      : props.variant === "invisible"
      ? styles.invisible
      : props.variant === "outline"
      ? styles.outline
      : styles.solid;

  return (
    <button className={buttonClass} onClick={props.onClick} style={props.style}>
      {props.children}
    </button>
  );
}

export default Button;
