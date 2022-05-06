import React from "react";
import { Input, Tooltip } from "antd";
import { IHandlerProps } from "./types";
import { InfoCircleOutlined } from "@ant-design/icons";

export function InputHandler({ handler, options, disabled }: IHandlerProps): JSX.Element {

  return (
    <Input
      placeholder="Nhập yêu cầu"
      prefix="$"
      style={{ width: "30%" }}
      suffix={
        <Tooltip title={options?.extraInformation ?? "Nhập thông tin cần thiết"}>
          <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
        </Tooltip>
      }
      disabled={disabled}
    />
  );
}


