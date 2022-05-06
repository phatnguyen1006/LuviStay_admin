import React from "react";
import {
  CheckBoxHandler,
  InputHandler,
  SelectHandler,
  SwitchHandler,
} from "./rowHandlerOptions";
import { IOptions } from "./rowHandlerOptions/types";
import { Divider } from "antd";
import "./styles.scss";

interface RowLayoutProps {
  name: string;
  subName?: string;
  type: RowHandlerOptionType | string;
  handler: () => void;
  options?: IOptions;
  disabled?: boolean;
}

enum RowHandlerOptionType {
  select = "select",
  switch = "switch",
  input = "input",
  checkbox = "checkbox",
}

export default function RowLayout({
  name,
  subName,
  type,
  handler,
  options,
  disabled = false,
}: RowLayoutProps): JSX.Element {
  return (
    <>
      <div className="row-layout-container">
        <section className="name-layout-container">
          <h5 className="row-layout-name">{name}</h5>
          <p className="row-layout-sub-name">{subName}</p>
        </section>
        {type === RowHandlerOptionType.select && (
          <SelectHandler
            handler={handler}
            options={options}
            disabled={disabled}
          />
        )}
        {type === RowHandlerOptionType.switch && (
          <SwitchHandler
            handler={handler}
            options={options}
            disabled={disabled}
          />
        )}
        {type === RowHandlerOptionType.input && (
          <InputHandler
            handler={handler}
            options={options}
            disabled={disabled}
          />
        )}
        {type === RowHandlerOptionType.checkbox && (
          <CheckBoxHandler
            handler={handler}
            options={options}
            disabled={disabled}
          />
        )}
      </div>
      <Divider />
    </>
  );
}
