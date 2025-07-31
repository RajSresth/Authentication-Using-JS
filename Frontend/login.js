import axios from "axios";
import 'animate.css';

const API_Url="http://localhost:3000/users";

const loginForm=document.querySelector("form");
const displayCaptcha=document.querySelector(".displayCaptcha");
const refreshCaptcha= document.querySelector(".refreshCaptcha")
let captcha="";

// generate captcha
const generateCaptcha=()=>{
    const char="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    captcha="";

    for(let i=0; i<6;i++)
    {
        captcha += char[Math.floor(Math.random() * char.length)]
    }
   displayCaptcha.textContent=captcha;
}

generateCaptcha()

// refreshCaptcha using animate.css library 
refreshCaptcha.addEventListener("click",()=>{
    generateCaptcha();
    refreshCaptcha.className+=" animate__rotateOut";
})

refreshCaptcha.addEventListener("animationend",()=>{
    // Remove old animation
  refreshCaptcha.classList.remove("animate__rotateOut");
})






loginForm.addEventListener("submit",async (e)=>{
    
    e.preventDefault();
    const rawData=Object.fromEntries(new FormData(loginForm).entries());

    
    const user=Object.fromEntries(
        Object.entries(rawData).map(([key,value])=> [key,value.trim()])
    )

  

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