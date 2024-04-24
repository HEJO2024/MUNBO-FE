import { Link } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

const ContentSelect=()=>{
    return(
<div className="AdminEntire">
    <AdminHeader/>
    <div className="ContentAll">
    <div className="ContentBox">
        <div className="ContentMain1">키워드 관리</div>
        <div className="ContentDetail">문제의 키워드를 관리할 수 있다.</div>
        <Link to="" className="ContentLink">관리하러가기</Link>
    </div>
    <div className="ContentBox">
    <div className="ContentMain2">과목 관리</div>
    <div className="ContentDetail">문제들의 과목들을 관리할 수 있다.</div>
    <Link to="/admin/subject/view" className="ContentLink">관리하러가기</Link>
    </div>
    <div className="ContentBox">
    <div className="ContentMain3">회차 관리</div>
    <div className="ContentDetail">문제들의 회차들을 관리할 수 있다.</div>
    <Link to="/admin/round/view" className="ContentLink">관리하러가기</Link>
    </div>
    </div>
</div>
    )
};
export default ContentSelect;