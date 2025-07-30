import axios from "axios";
const API_Url = "http://localhost:3000/users";

const signinForm = document.querySelector("form");

signinForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = Object.fromEntries(new FormData(signinForm).entries());

  const { data } = await axios.get(`${API_Url}?email=${user.email}`);
  console.log("data:", data);

  if (data.length === 0) 
    {
        const res = await axios.post(API_Url, user);

        const stay=confirm("Signin Successfully! Do you want to stay?");
        console.log("stay:",stay)

            if(!stay)
            {
                setTimeout(() => {
                    window.location.href = "login.html";
                    }, 200);
            }
            else{
                setTimeout(() => {
                    window.location.href = "home.html";
                    }, 200);
            }

  } else 
    {
            alert("User Already Exist");
            setTimeout(() => {
            window.location.href = "login.html";
            }, 200);
    }
});
