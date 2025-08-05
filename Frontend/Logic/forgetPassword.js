import axios from 'axios';
import emailjs from '@emailjs/browser';
const API_Url = "http://localhost:3000/users";


// Initialize public key
emailjs.init('GT03x6FWyzIwPMEzw');

const serviceId="service_68z835w";
const templateId="template_316ymmh";


const emailVerificationForm=document.querySelector("#emailVerificationForm");
const email=document.querySelector("#email");
const sendOtp=document.querySelector("#sendOtp");
const sendVerification=document.querySelector("#sendVerification")
const otpVerificationForm=document.querySelector("#otpVerificationForm");
const otpInput=document.querySelector("#otpInput");
const timer=document.querySelector("#timer");
const confirmOtpBtn=document.querySelector("#confirmOtpBtn");
const resendOtpBtn=document.querySelector("#resendOtpBtn");




// Global Declaration
let userId=null;
let getOtp;

emailVerificationForm.addEventListener("submit",async (e)=>{
    e.preventDefault() // stop reload
    const emailValue=email.value;

    try {
        const {data}= await axios.get(`${API_Url}?email=${emailValue}`)

        if(data.lenth === 0)
        {
            alert("User doesn't Exist!");
            return 
        }

        userId=data[0].id;
        sendOtp.style.display="block"
        email.disabled=true;
        email.style.cursor="not-allowed";
        sendVerification.disabled=true;
        alert("Email Verification Successfull..!")
    } catch (error) {
        
    }
})



sendOtp.addEventListener("click",async ()=>{
        
        sendOtp.style.display="none";
        emailVerificationForm.style.display="none";
        otpVerificationForm.style.display="block";


        // Generate 6 digit otp;
        getOtp=Math.floor(100000 + Math.random() * 900000);

        emailjs.send(serviceId, templateId,{
            email:email.value,
            passcode:getOtp,
            time:"2 minutes"
        }).then(() => {
            alert("OTP Sent successfull to your verified email");
        }).catch((error) => {
            alert("Failed to send OTP. Please try again.");
        });
        
})