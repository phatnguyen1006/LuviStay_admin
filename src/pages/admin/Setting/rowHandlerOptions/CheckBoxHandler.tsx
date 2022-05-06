import React from "react";
import { Checkbox } from "antd";
import { IHandlerProps } from "./types";

export function CheckBoxHandler({
  handler,
  options,
  disabled,
}: IHandlerProps): JSX.Element {
  return (
    <Checkbox onChange={handler} disabled={disabled}>
      {options?.title ?? "Thực thi"}
    </Checkbox>
  );
}
