import { Divider } from "antd";
import { useState } from "react";
import RowLayout from "./RowLayout";

/**
 * Usage:
 * <RowLayout name="Haha" handler={() => null} type="select" options={{ selectList: [{value: "Nguyen Trong Phat", title: "Nguyen Trong Phat"}, {value: "Testing", title: "Testing"}] }} />
 * <RowLayout name="Haha" handler={() => null} type="switch" options={{ onTitle: "开启", offTitle: "关闭" }} />
 * <RowLayout name="Haha" handler={() => null} type="input" options={{ extraInformation: "Extra Information" }} />
 * <RowLayout name="Haha" handler={() => null} type="checkbox" options={{ title: "Yêu cầu người dùng" }} />
 * @returns {JSX.Element}
 */

const Setting = (): JSX.Element => {
  return (
    <div>
      <h2>Cài đặt</h2>
      <Divider />
      <Divider orientation="left" orientationMargin={0}>
        Something
      </Divider>
      <RowLayout
        name="Haha"
        handler={() => null}
        type="select"
        options={{
          selectList: [
            { value: "Nguyen Trong Phat", title: "Nguyen Trong Phat" },
            { value: "Testing", title: "Testing" },
          ],
        }}
      />
      <RowLayout
        name="Haha"
        handler={() => null}
        type="switch"
        options={{ onTitle: "开启", offTitle: "关闭" }}
      />
      <RowLayout
        name="Haha"
        handler={() => null}
        type="input"
        options={{ extraInformation: "Extra Information" }}
      />
      <RowLayout
        name="Haha"
        handler={() => null}
        type="checkbox"
        options={{ title: "Yêu cầu người dùng" }}
      />
    </div>
  );
};

export default Setting;
