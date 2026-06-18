console.log("Signup frontend javascript file");

$(function () {
  $(".member-nick").click(function () {
    alert(
      $(".member-phone").val(),
    ); /*member-phone berib alerda nomerni chiqardik */
  });
}); // agar javascriptni o'zida yozganimizda 4ta satr bolarfi lekinn (vanillajs => jquery) orqali ozgina cod orqalik ishga tushursak bo;ladi  https://www.w3schools.com/jquery/jquery_selectors.asp //

function validateSignupForm() {
  const memberNick = $(".member-nick").val();
  const memberPhone = $(".member-phone").val();
  const memberPassword = $(".member-password").val();
  const confirmPassword = $(".confirm-password").val();

  if (
    memberNick === "" ||
    memberPhone === "" ||
    memberPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Please insert all required inputs");
    return false;
  }
  if (memberPassword !== confirmPassword) {
    alert("Password differs, please check!");
    return false;
  }
}
