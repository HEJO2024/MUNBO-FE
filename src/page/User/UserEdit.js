import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../../components/AdminHeader";
import AdminButton from "../../components/AdminButton";
const UserEdit=()=>{
    const [data,setData]=useState({
      userId:"",
      passwd:"",
      userName:"",
      userEmail:"",
      is_admin:"",
    });  // 수정선택한 사용자 정보
    const [user,setUser]=useState([]);  //전체 사용자 정보
    const [isCheck,setIsCheck]=useState(false); // 중복 확인됐는지 확인하는 변수
    const token=sessionStorage.getItem("token")
    const navigate=useNavigate();  
    useEffect(()=>{
     setIsCheck(false);
    },[data.userId])  //ischeck 초기화 

    const handleCancel=()=>{
      navigate(-1);
    }  //수정 취소시 함수

    const handleDuplication=()=>{
      const found = user.find(it => it.userId === data.userId);
      if(id==data.userId){
        alert("기존 아이디 입니다.");
        setIsCheck(true);
      }
     else if(found){ 
      alert("중복된 아이디입니다");
      setIsCheck(false);
     }
     else {
      alert("사용가능한 아이디 입니다");
      setIsCheck(true);
     }
    }; //중복확인 처리 함수

    const handleEdit= async ()=>{
      axios.put(`${process.env.REACT_APP_API_URL}/admin/users/update`, 
       {
        userId:data.userId,
        passwd:data.passwd,
        userName:data.userName,
        userEmail:data.userEmail,
        is_admin:data.is_admin,
        basic_userId:id 
       },
       {
       headers:{
        'Authorization':token
      }
    }
       )
     .then(response => {        
         alert("정보가 수정되었습니다.");
     })
     .catch(error => {
        if(error.response.status===500){
          alert(error.response.data.message);
        }
        else if(error.response.status===401 || error.response.status===403){
          alert(error.response.data.message);
          sessionStorage.removeItem("token");
          navigate("/admin/login");
         }
     });
     navigate("/admin/user/view");
    }  // axios 이용하여 수정처리하는 함수

    const handleSubmit=()=>{
      if(id==data.userId){
       handleEdit();
   }
      else if(isCheck==false){
        alert("중복 확인을 완료해주세요");
      }
    else {
      handleEdit();
    }
    } //아이디가 바뀌면 중복확인이 됬는지 검사하고 수정처리하기로 넘겨주는 함수 

    const {id}=useParams();


    useEffect(() => {
      fetchuserData();
   }, []); //가져온 사용자데이터 실행

   
     const fetchuserData = async () => {     
       try {
           const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/users/listView`,{
            headers:{
              'Authorization':token
            }
           });
           setUser(response.data.users);
           const userData = response.data.users.find(item => item.userId === id);
           setData({
            userId: userData.userId,
            passwd: userData.passwd,
            userName: userData.userName,
            userEmail: userData.userEmail,
            is_admin: userData.is_admin
        });
       }catch (error) {
        if(error.response.status===500){
         alert(error.response.data.message);
        }
        else if(error.response.status===401 || error.response.status===403){
          alert(error.response.data.message);
          sessionStorage.removeItem("token");
          navigate("/admin/login");
         }
       }
   };  // api로 사용자 전체 정보 받아오는 함수

   const handleChange = (event) => {
    const { name, value } = event.target;
    setData(prevState => ({
        ...prevState,
        [name]: value
    }));
}; //정보 수정 입력하면 바뀌는 함수

return (
    <div className="AdminEntire">
       <AdminHeader/>
       
        <div className="UserEditText">사용자 정보 수정</div>
        <div className="UserEdit">
          <div>아이디</div>
      <div className="UserEditId"><input name="userId" value={data.userId} onChange={handleChange}  className="UserEditInput"/>
      <AdminButton text="중복 확인" className="Duplication" onClick={handleDuplication}/></div>  
        <div>비밀번호</div>
        <input name="passwd" value={data.passwd} onChange={handleChange} className="UserEditInput" />
        <div>닉네임</div>
        <input name="userName" value={data.userName} onChange={handleChange}  className="UserEditInput"/>
        <div>이메일</div>
        <input name="userEmail" value={data.userEmail} onChange={handleChange} className="UserEditInput" /> 
        <div>식별코드(0 사용자 1 관리자)</div>
        <input name="is_admin" value={data.is_admin} onChange={handleChange} className="UserEditInput" />  </div>
       <div className="UserEditButton"> <AdminButton text="취소" onClick={handleCancel} className="UserEditButtonDetail1"/>
        <AdminButton text="제출" className="UserEditButtonDetail2" onClick={handleSubmit}/></div>
      
    </div>
);

};
export default UserEdit;