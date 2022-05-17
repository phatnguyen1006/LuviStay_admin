import React from "react";
import { Select } from "antd";
import { IHandlerProps } from "./types";
const { Option } = Select;

export function SelectHandler({
  handler,
  options,
  disabled,
}: IHandlerProps): JSX.Element {
  return (
    options &&
    options.selectList && (
      <Select
        labelInValue
        defaultValue={options.selectList[0]}
        style={{ width: "25%" }}
        onChange={handler}
        disabled={disabled}
      >
        {options.selectList.map((option, index) => (
          <Option key={index} value={option.value}>
            {option.title}
          </Option>
        ))}
      </Select>
    )
  );
}
