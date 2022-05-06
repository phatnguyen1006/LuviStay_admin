import React from "react";
import { Select, Switch } from "antd";
import { IHandlerProps } from "./types";

export function SwitchHandler({ handler, disabled }: IHandlerProps): JSX.Element {

  return (
    <Switch onChange={handler} checkedChildren="开启" unCheckedChildren="关闭" defaultChecked disabled={disabled} />
  );
}
