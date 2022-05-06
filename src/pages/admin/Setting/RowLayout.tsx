import React from "react";
import { CheckBoxHandler, InputHandler, SelectHandler, SwitchHandler } from "./rowHandlerOptions";
import { IOptions } from "./rowHandlerOptions/types";
import "./styles.scss";

interface RowLayoutProps {
  name: string;
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
  type,
  handler,
  options,
  disabled = false,
}: RowLayoutProps): JSX.Element {
  return (
    <div className="row-layout-container">
      <p className="row-layout-name">{name}</p>
      {type === RowHandlerOptionType.select && <SelectHandler handler={handler} options={options} disabled={disabled} />}
      {type === RowHandlerOptionType.switch && <SwitchHandler handler={handler} options={options} disabled={disabled} />}
      {type === RowHandlerOptionType.input && <InputHandler handler={handler} options={options} disabled={disabled} />}
      {type === RowHandlerOptionType.checkbox && <CheckBoxHandler handler={handler} options={options} disabled={disabled} />}
    </div>
  );
}
