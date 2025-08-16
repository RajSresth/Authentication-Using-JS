import axios from "axios";
import emailjs from "@emailjs/browser";
const API_Url = "http://localhost:3000/users";

// Initialize public key
emailjs.init("GT03x6FWyzIwPMEzw");

const serviceId = "service_68z835w";
const templateId = "template_316ymmh";

const emailVerificationForm = document.querySelector("#emailVerificationForm");
const email = document.querySelector("#email");
const sendOtp = document.querySelector("#sendOtp");
const sendVerification = document.querySelector("#sendVerification");
const otpVerificationForm = document.querySelector("#otpVerificationForm");
const otpInput = document.querySelector("#otpInput");
const timer = document.querySelector("#timer");
const confirmOtpBtn = document.querySelector("#confirmOtpBtn");
const resendOtpBtn = document.querySelector("#resendOtpBtn");
const resetPasswordForm = document.querySelector("#resetPasswordForm");

const resetPasswordBtn = document.querySelector("#resetPasswordBtn");

// Global Declaration
let userId = null;
let getOtp = "";
let otpExpiryTime;
let intervalId;

emailVerificationForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // stop reload
  const emailValue = email.value;

  try {
    const { data } = await axios.get(`${API_Url}?email=${emailValue}`);

    if (data.lenth === 0) {
      alert("Email not found!");
      return;
    }

    userId = data[0].id;
    sendOtp.style.display = "block";
    email.disabled = true;
    email.style.cursor = "not-allowed";
    sendVerification.disabled = true;
    alert("Email Verification Successfull..!");
  } catch (error) {
    console.error("Error verifying email:", err);
    alert("Something went wrong.");
  }
});

function startTimer(duration) {
  let time = duration;
  intervalId = setInterval(() => {
    let minute = String(Math.floor(time / 60));
    let second = String(time % 60);
    timer.textContent = `${minute.padStart(2, "0")}:${second.padStart(2, "0")}`;
    -1;
    if (--time < 0) {
      timer.textContent = `OTP Expired`;
      clearInterval(intervalId);
    }
  }, 1000);
}

sendOtp.addEventListener("click", () => {
  emailVerificationForm.style.display = "none";

  // Generate 6 digit otp;
  getOtp = Math.floor(100000 + Math.random() * 900000);

  // Otp expiry time
  otpExpiryTime = Date.now() + 2 * 60 * 1000;

  emailjs
    .send(serviceId, templateId, {
      email: email.value,
      passcode: getOtp,
      time: "2 minutes",
    })
    .then(() => {
      alert("OTP Sent successfull to your verified email");
      sendOtp.style.display = "none";
      otpVerificationForm.style.display = "block";
      // start timer function
      startTimer(120);
    })
    .catch((error) => {
      console.error("EmailJS send error:", err);
      alert("Failed to send OTP. Please try again.");
    });
});

// Resend otp button
resendOtpBtn.addEventListener("click", () => {
  sendOtp.click(); // Here we are re-use send OTP
});

confirmOtpBtn.addEventListener("click", () => {
  // time comparison
  if (Date.now() > otpExpiryTime) {
    alert("Otp is Expired");
    return;
  }

  const enteredOtp = otpInput.value;
  console.log("Entered OTP", enteredOtp, typeof enteredOtp);
  console.log("Get OTP", getOtp, typeof getOtp);

  // Otp value comparison
  if (getOtp == enteredOtp) {
    alert("OTP Verified..");
    otpVerificationForm.style.display = "none";
    resetPasswordForm.style.display = "flex";
  } else {
    alert("Please enter correct OTP");
    resendOtpBtn.disabled = "false";
  }
});

//otpVerificationForm
otpVerificationForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

// resetPasswordForm
resetPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newPassword = document.querySelector("#newPassword").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;

  if (newPassword !== confirmPassword) {
    alert("Password does not match");
    return;
  }

  try {
    axios.patch(`${API_Url}/${userId}`, {
      password: newPassword,
    });

    alert("Password reset successfully");
    window.location.href = "login.html";
  } catch (err) {
    alert("Something went Wrong...");
  }
});
