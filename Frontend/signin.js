import axios from "axios";
import "animate.css";
const API_Url = "http://localhost:3000/users";

const signinForm = document.querySelector("form");
const displayCaptcha = document.querySelector(".displayCaptcha");
const refreshCaptcha = document.querySelector(".refreshCaptcha");
let captcha = "";

// generate captcha in singin form
const generateCaptcha = () => {
  const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  captcha = "";

  for (let i = 0; i < 6; i++) {
    captcha += char[Math.floor(Math.random() * char.length)];
  }
  displayCaptcha.textContent = captcha;
};

generateCaptcha();

// refreshCaptcha using animate.css library
refreshCaptcha.addEventListener("click", () => {
  generateCaptcha();
  refreshCaptcha.className += " animate__rotateOut";
});

refreshCaptcha.addEventListener("animationend", () => {
  // Remove old animation
  refreshCaptcha.classList.remove("animate__rotateOut");
});




signinForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const rawData = Object.fromEntries(new FormData(signinForm).entries());
        const user=Object.fromEntries( Object.entries(rawData).map(([k,v]) => [k,v.trim()]))

        // validate captcha code in sinin form
            if (captcha !== user.captchaCode) {
                alert("Captcha doesn't match");
                signinForm.reset()
                return;
            }

            // If user exist or not
            const { data } = await axios.get(`${API_Url}?email=${user.email}`);
          

            if (data.length === 0) 
                {
                    const res = await axios.post(API_Url, user);

                  

                        if(!confirm("Signin Successfully! Do you want to stay?"))
                        {
                            setTimeout(() => {
                                window.location.href = "login.html";
                                }, 200);
                        }
                        else{
                            localStorage.setItem("user",JSON.stringify(user));
                            setTimeout(() => {
                                window.location.href = "home.html";
                                }, 200);
                        }

            } 
            else 
            {
                    alert("User Already Exist");
                    setTimeout(() => {
                    window.location.href = "login.html";
                    }, 200);
            }
});
