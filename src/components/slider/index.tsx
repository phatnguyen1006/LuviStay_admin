import { Carousel } from "antd";
import { ReactElement } from "react";
import { IProps } from "./types";
import "./styles.scss";

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const collectionImg = [
  "https://themes.getmotopress.com/luviana/wp-content/uploads/sites/27/2019/07/amenities-new.jpg",
  "https://themes.getmotopress.com/luviana/wp-content/uploads/sites/27/2019/06/classic-double-room-992x992.jpg",
  "https://themes.getmotopress.com/luviana/wp-content/uploads/sites/27/2019/07/People-Say-.jpg",
  "https://themes.getmotopress.com/luviana/wp-content/uploads/sites/27/2019/06/comfort-triple-room-1170x780.jpg",
];

export default function Slider(): ReactElement {
  return (
    <Carousel autoplay>
      <div>
        {/* <h3 style={contentStyle}>1</h3> */}
        <div className="image-slider-container">
          <img className="image-slider-content" src={collectionImg[0]} />
        </div>
      </div>
      <div>
        {/* <h3 style={contentStyle}>2</h3> */}
        <div className="image-slider-container">
          <img className="image-slider-content" src={collectionImg[1]} />
        </div>
      </div>
      <div>
        {/* <h3 style={contentStyle}>3</h3> */}
        <div className="image-slider-container">
          <img className="image-slider-content" src={collectionImg[2]} />
        </div>
      </div>
      <div>
        {/* <h3 style={contentStyle}>4</h3> */}
        <div className="image-slider-container">
          <img className="image-slider-content" src={collectionImg[3]} />
        </div>
      </div>
    </Carousel>
  );
}
