const userInfo=document.querySelector(".userInfo");

const user=JSON.parse(localStorage.getItem("user"));
console.log(user)
if(!user)
{
    userInfo.textContent="User"
}
else{
     userInfo.textContent=user.username;
}