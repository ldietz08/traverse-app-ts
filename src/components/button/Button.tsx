import React, { FC } from "react";
import "./Button.scss";

interface Props {
  text: string;
}

const Button: FC<Props> = (props) => {
  return <button className="button">{props.text}</button>;
};

export default Button;
