const AdminButton=({text,onClick,className})=>{
 return(
    <div onClick={onClick} className={className}>{text}</div>
 )
};
export default AdminButton