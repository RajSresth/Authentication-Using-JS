import axios from "axios";
const API_Url="http://localhost:3000/users";


const loginForm=document.querySelector("form");

loginForm.addEventListener("submit",async (e)=>{
    e.preventDefault();

    const user=Object.fromEntries(new FormData(loginForm).entries());

    const {data}=await axios.get(`${API_Url}?email=${user.email}&password=${user.password}`);

    if(data.length === 0)
    {
        alert("User does not exist!");
        setTimeout(() => {
             window.location.href="signin.html"
        },200 );
    }
    else{
        alert("Login Successfully");
        localStorage.setItem("user",JSON.stringify(data[0]))
        setTimeout(() => {
            window.location.href="home.html"
        }, 200);
    }
})