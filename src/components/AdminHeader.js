import {  useEffect, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";

const AdminHeader=()=>{
    const navigate=useNavigate();
    const [islogin,setIslogin]=useState(false);
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setIslogin(true); // 세션 스토리지에 토큰이 있으면 로그인 상태로 설정
        } else {
            setIslogin(false); // 세션 스토리지에 토큰이 없으면 로그아웃 상태로 설정
        }
    }, []);

    const handleLoginClick = () => {
        navigate('/admin/login');
    };

    const handleLogoutClick = () => {
        sessionStorage.removeItem("token"); // 세션 스토리지에서 토큰 삭제
        setIslogin(false); // 로그아웃 상태로 변경
        navigate('/');
        window.location.reload();
    };
 

 return(
    <div className="Header">
    <img src={process.env.PUBLIC_URL + '/MainLogo.png'} width = '50px' className="HeaderLogo" />
    <Link to="/" className="HeaderItem1">문보</Link>
    {islogin==false?
    <div className="HeaderItem2" onClick={handleLoginClick}> Login </div>
    :<div className="HeaderItem3" >
     <Link to="/admin/user/view" className="HeaderItem4">회원관리</Link> 
     <Link to="/admin/quiz/view" className="HeaderItem4">기출문제</Link> 
     <Link to="/admin/content/select" className="HeaderItem4">키워드/과목/회차</Link>
     <div className="HeaderItem4">통계/평가</div>
     <div className="HeaderItem4">토큰사용량</div>
     <div onClick={handleLogoutClick} className="HeaderItem4">로그아웃</div>
     <div className="HeaderItem5">관리자</div> </div>}
    </div>
    
 )
};
export default AdminHeader; 