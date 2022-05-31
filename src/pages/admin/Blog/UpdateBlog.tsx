import { ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Upload, Input, Modal } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import "./styles.scss";
import { DB_URI } from "app/constants";
import { ADMIN_ENDPOINT } from "app/api/endpoint";
import { Blog } from "app/model";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import { getOneBlogQuery } from "app/query";
import { RcFile, UploadFile, UploadProps } from "antd/lib/upload/interface";

const picList = [
  {
    uid: "0",
    name: "pic-0",
    url: "https://res.cloudinary.com/decscyfze/image/upload/v1653847325/p8khtj1rzaaqjivq429a.jpg",
  },
  {
    uid: "1",
    name: "pic-1",
    url: "https://res.cloudinary.com/decscyfze/image/upload/v1653847336/xflzenddoc49ctpuepwq.jpg",
  },
  {
    uid: "2",
    name: "pic-2",
    url: "https://res.cloudinary.com/decscyfze/image/upload/v1653847340/tfhrzplk8u4fapjio8pc.jpg",
  },
  {
    uid: "3",
    name: "pic-3",
    url: "https://res.cloudinary.com/decscyfze/image/upload/v1653847344/ap1tlnytv1grljfg0bs8.jpg",
  },
  {
    uid: "4",
    name: "pic-4",
    url: "https://res.cloudinary.com/decscyfze/image/upload/v1653847348/lfwdlr1m6qfxrshu8drt.jpg",
  },
  {
    uid: "5",
    name: "pic-5",
    url: "https://res.cloudinary.com/decscyfze/image/upload/v1653847355/dnezss8damjcnrqph5gd.jpg",
  },
];

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

// const picList = [
//   {
//     uid: "1",
//     name: "blog-1",
//     url: "https://res.cloudinary.com/decscyfze/image/upload/v1653847325/p8khtj1rzaaqjivq429a.jpg",
//   },
//   {
//     uid: "2",
//     name: "blog-3",
//     url: "https://res.cloudinary.com/decscyfze/image/upload/v1653847336/xflzenddoc49ctpuepwq.jpg",
//   },
//   {
//     uid: "3",
//     name: "blog-3",
//     url: "https://res.cloudinary.com/decscyfze/image/upload/v1653847340/tfhrzplk8u4fapjio8pc.jpg",
//   },
// ];

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default function UpdateBlog(): ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: postID } = useParams();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [state, setState] = useState<Blog>((location.state as Blog) || null);
  const [loading, setLoading] = useState<boolean>(false);

  const [fileList, setFileList] = useState<UploadFile<{ url: string }>[]>([]);

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    if (!postID) {
      navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.BLOG}`);
      return;
    }

    if (!state) {
      // refetch
      console.log("✈️✈️ Refetch post data from id");

      (async () => {
        setLoading(true);
        await getOneBlogQuery(null, postID).then((res) => {
          setLoading(false);
          setState(res);
        });
      })();
    }
  }, []);

  return (
    <div className="new-blog-page-container">
      <h2 style={{ marginBottom: 50 }}>Update Blog</h2>
      {loading ? (
        <Loader />
      ) : (
        state && (
          <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={{
              content: state.content,
            }}
          >
            <Form.Item name="content" label="Content">
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              name="pictures"
              label="Pictures"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="Choose your photos"
            >
              {/* <Upload
                name="thumbnail"
                method="POST"
                action={`${DB_URI}${ADMIN_ENDPOINT.UPLOAD}`}
                listType="picture"
                defaultFileList={[...picList]}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload> */}
              <Upload
                name="thumbnail"
                method="POST"
                action={`${DB_URI}${ADMIN_ENDPOINT.UPLOAD}`}
                listType="picture-card"
                onPreview={handlePreview}
                onChange={handleChange}
                defaultFileList={state.pictures && state.pictures?.map((url, index) => {
                  return {
                    uid: index.toString(),
                    name: `pic-${index}`,
                    url: url,
                  };
                })}
              >
                {uploadButton}
              </Upload>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Form>
        )
      )}
    </div>
  );
}
