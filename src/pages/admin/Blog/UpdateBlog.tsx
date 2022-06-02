import { ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Upload, Input, Modal, message } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { DB_URI } from "app/constants";
import { ADMIN_ENDPOINT } from "app/api/endpoint";
import { Blog, BlogPayload } from "app/model";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import { getOneBlogQuery } from "app/query";
import { RcFile, UploadFile, UploadProps } from "antd/lib/upload/interface";
import { useMutation } from "react-query";
import { updateOneBLog } from "app/mutation";
import "./styles.scss";

interface ICustomizedUploadFile extends UploadFile {
  url: string;
}

interface IBrowsingBlog extends Omit<BlogPayload, "pictures"> {
  pictures: Array<ICustomizedUploadFile>;
}

interface IOnChangeUploadProps {
  file: ICustomizedUploadFile;
  fileList: ICustomizedUploadFile[];
}

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
  // console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

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

  const { mutate, isLoading } = useMutation(updateOneBLog, {
    onSuccess: (data) => {
      message.success("Update blog successfully");
      navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.BLOG}`);
    },
    onError: () => {
      message.error("There was an error");
    },
  });

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [state, setState] = useState<Blog>((location.state as Blog) || null);
  const [loading, setLoading] = useState<boolean>(false);

  const [fileList, setFileList] = useState<ICustomizedUploadFile[]>([]);

  const onFinish = (values: IBrowsingBlog) => {
    console.log("Received values of form: ", values);
    const payload: BlogPayload = {
      _id: postID,
      content: values.content,
      pictures: values.pictures && values.pictures.map((p) => p.url),
    };

    // console.log(payload);
    mutate(payload);
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

  const handleChange: UploadProps["onChange"] = ({
    file: newFile,
    fileList: newFileList,
  }: IOnChangeUploadProps) => {
    // convert File type to UploadFile Customized Type
    // console.log("new: ", newFile.response && newFile.response?.data[0]);
    if (newFile && newFile.response && newFileList.length >= 1) {
      newFileList.pop();
      newFileList.push({
        uid: newFileList.length.toString(),
        name: `pic-${newFileList.length}`,
        url: newFile.response && newFile.response?.data[0],
      });
      setFileList([...newFileList]);
    }
  };

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
            name="update-blog"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={{
              content: state.content,
            }}
          >
            <Form.Item name="content" label="Content">
              <Input.TextArea rows={8} />
            </Form.Item>

            <Form.Item
              name="pictures"
              label="Pictures"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="Choose photos"
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
                defaultFileList={
                  state.pictures &&
                  state.pictures?.map((url, index) => {
                    return {
                      uid: index.toString(),
                      name: `pic-${index}`,
                      url: url,
                    };
                  })
                }
              >
                {uploadButton}
              </Upload>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button loading={isLoading} type="primary" htmlType="submit">
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
