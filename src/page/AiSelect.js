import { Link } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

const AiSelect=()=>{
return(
    <div className="AdminEntire">
        <AdminHeader/>
        <div className="AnalyticsAll">
    <div className="AnalyticsBox">
        <div className="AiSelectMain1">Aiprompt 관리</div>
        <div className="ContentDetail">Aiprompt를 보내 Ai모델에서 원하는 결과가 나오도록 관리할 수 있다. </div>
        <Link to="/admin/ai/aiprompt" className="ContentLink">관리하러가기</Link>
    </div>
    <div className="AnalyticsBox">
    <div className="AiSelectMain2">?</div>
    <div className="ContentDetail">?</div>
    <Link to="" className="ContentLink">관리하러가기</Link>
    </div>
    </div>
    </div>
)
};
export default AiSelect;