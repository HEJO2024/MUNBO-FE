
import { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { Link } from "react-router-dom";
const Home=()=>{
    const [islogin,setIslogin]=useState(false);
     useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setIslogin(true); // 세션 스토리지에 토큰이 있으면 로그인 상태로 설정
        } else {
            setIslogin(false); // 세션 스토리지에 토큰이 없으면 로그아웃 상태로 설정
        }
    }, []);
     
    return(<div className="AdminEntire">
       <AdminHeader/>
       { islogin==false ?<div>
        <div className="MainTitle">
            관리자용 웹 페이지 입니다.
        </div>
        <div className="MainSub">
        <a href="/admin/login" >로그인 하러 가기</a></div></div>:
        <div className="MainMenu">
             <Link to="/admin/user/view" className="item"><img src={process.env.PUBLIC_URL + '/user.png'} width = '80px' className="itemLogo" />
            <div>회원관리</div></Link>
            <Link to="/admin/quiz/subject/view" className="item1"><img src={process.env.PUBLIC_URL + '/quiz.jpg'}    width = '80px' className="itemLogo1" />
            <div>기출문제관리</div></Link>
            <Link to="/admin/content/select" className="item"><img src={process.env.PUBLIC_URL + '/search.png'} width = '80px' className="itemLogo" />
            <div>키워드/과목/회차 관리</div></Link>
            <Link to="/admin/analytics/select" className="item"><img src={process.env.PUBLIC_URL + '/pi.png'} width = '80px' className="itemLogo" />
            <div>통계/평가</div></Link>
            <div className="item2"><img src={process.env.PUBLIC_URL + '/GptLogo.png'} width = '80px' className="itemLogo" />
            <div>Gpt4 토큰 사용량 조회</div></div>
        </div>
}
        </div>
       
    )
};
export default Home;