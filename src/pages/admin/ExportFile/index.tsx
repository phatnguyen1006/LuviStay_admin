import {
    UploadOutlined,
    FolderOpenOutlined
} from "@ant-design/icons";
import React, { ReactElement, useState, useRef } from "react";
import { Button } from "antd";
import { CSVLink } from "react-csv";
// import { ideasAPI } from "app/api/ideasApi";
// import { IProps } from "./types";
import "./styles.scss";

enum exportedType {
    idea = 0,
    student = 1,
}

export default function ExportFilePage(): ReactElement {
    const [ideaData, setIdeaData] = useState([]);
    const exportIdeas = useRef(null);
    const [students, setStudents] = useState([]);
    const [ideaLoading, setIdeaLoading] = useState<boolean>(false);
    const [studentLoading, setStudentLoading] = useState<boolean>(false);
    const [flag, setFlag] = useState<exportedType>(null);

    const IdeaHeaders = [
        { label: "Tên học sinh", key: "student.name" },
        { label: "Tên ý tưởng", key: "title" },
        { label: "Nội dung", key: "content" },
        { label: "MSSV", key: "student.mssv" },
        { label: "Email", key: "student.email" },
        { label: "Trường đại học", key: "student.school.name" },
        { label: "Kết quả vòng 1", key: "round_1" },
        { label: "Kết quả vòng 2", key: "round_2" },
        { label: "Kết quả vòng 3", key: "round_3" },
        { label: "Danh mục ý tưởng", key: "Category.name" },
        { label: "Thành viên sàn đấu ý tưởng", key: "student.sanDauYTuong" },
    ];
    
    const StudentHeaders = [
        { label: "Họ và tên", key: "name" },
        { label: "Email", key: "email" },
        { label: "MSSV", key: "mssv" },
        { label: "Link ảnh", key: "image" },
        { label: "Mã trường", key: "schoolId" },
        { label: "SĐT", key: "phoneNumber" },
        { label: "Trường đại học", key: "school.name" },
        { label: "Thành viên sàn đấu ý tưởng", key: "sanDauYTuong" },
        { label: "Đã hoàn thành 5 ý tưởng", key: "isCompleted" },
    ];

    const fetchIdeaToExport = async () => {
        // data
        // eslint-disable-next-line no-useless-catch
        try {
            setIdeaLoading(true);
            setFlag(exportedType.idea);
            // ideasAPI.fetchAllIdeas().then(
            //     res => {
            //         if (res) {
            //             setIdeaData(res.data);
            //             setIdeaLoading(false);
            //             exportIdeas.current.link.click();
            //             return res;
            //         }
            //     }
            // );
        } catch (e) {
            throw e;
        }
    };
    const fetchStudentToExport = async () => {
        // eslint-disable-next-line no-useless-catch
        try {
            setStudentLoading(true);
            setFlag(exportedType.student);
            // ideasAPI.fetchStudentsList().then(
            //     res => {
            //         if (res && res.students) {
            //             setStudents(res.students);
            //             setStudentLoading(false);
            //             exportIdeas.current.link.click();
            //             return res;
            //         }
            //     }
            // );
          } catch (e) {
            throw e;
          }
    };

    const csvReport = flag == 0 ? {
        data: ideaData,
        headers: IdeaHeaders,
        filename: "Ideas_Report.csv",
    } : {
        data: students,
        headers: StudentHeaders,
        filename: "Students_Report.csv",
    };

	return (
        <div className="export-file-container">
            <Button disabled={ideaLoading} onClick={() => fetchIdeaToExport()} icon={<FolderOpenOutlined />} size="large">
                {ideaLoading ? <span>Downloading...</span> : <span className="text-primary">Apartment Statistic</span>}
            </Button>
            <Button disabled={studentLoading} onClick={() => fetchStudentToExport()} icon={<FolderOpenOutlined />} size="large">
                {studentLoading ? <span>Downloading</span> : <span className="text-primary">Revenue Statistic</span>}
            </Button>
            <CSVLink {...csvReport} ref={exportIdeas}/>
            {/* <CSVLink ref={exportIdeas} data={flag == 0 ? ideaData : students} headers={flag == 0 ? IdeaHeaders : StudentHeaders} filename={flag == 0 ? "Ideas_Report.csv" : "Students_Report.csv"}/> */}
        </div>
	);
}