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

const logoutBtn= document.querySelector(".logoutBtn");

logoutBtn.addEventListener("click",()=>{
    localStorage.removeItem("user");
    window.location.href="login.html";
})