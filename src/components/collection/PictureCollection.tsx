import { ReactElement } from "react";
import { Image } from "antd";
import "./styles.scss";

interface IProps {
  pictures?: Array<string>;
}

export default function PictureCollection({ pictures }: IProps): ReactElement {
  return pictures ? (
    <div className="picture-collection-container">
      {pictures.length > 0 &&
        pictures.map((photo, index) => <Image className="photo-content" key={index} width={200} src={photo} />)}
    </div>
  ): <div><strong style={{ color: "gray" }}>Chưa cập nhật hình ảnh cho khách sạn này</strong></div>;
}
