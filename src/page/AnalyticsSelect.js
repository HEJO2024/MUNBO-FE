import { Link } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

const AnalyticsSelect=()=>{
return(
    <div className="AdminEntire">
        <AdminHeader/>
        <div className="AnalyticsAll">
    <div className="AnalyticsBox">
        <div className="AnalyticsMain1">과목별 오답률 통계</div>
        <div className="ContentDetail">전체 사용자의 과목별 오답률 평균 통계를 조회 할 수 있다.</div>
        <Link to="/admin/viewrate" className="ContentLink">조회하러가기</Link>
    </div>
    <div className="AnalyticsBox">
    <div className="AnalyticsMain2">사용자 평가 조회</div>
    <div className="ContentDetail">생성문제에 대한 사용자의 평가를 조회 할 수 있다.</div>
    <Link to="/admin/userassessment" className="ContentLink">조회하러가기</Link>
    </div>
    </div>
    </div>
)
};
export default AnalyticsSelect;