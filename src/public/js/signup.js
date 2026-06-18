console.log("Signup frontend javascript file");

$(function () {
  const fileTarget = $(".file-box .upload-hidden");
  let filename;

  fileTarget.on("change", function () {
    if (window.FileReader) {
      // window.FileReader state property
      const uploadFile = $(this)[0].files[0];
      console.log("uploadFile:", uploadFile);
      const fileType = uploadFile["type"];
      const validImageType = ["image/jpg", "image/jpeg", "image/png"];
      if (!validImageType.includes(fileType)) {
        alert("Please insert only jpeg, jpg,png!");
      } else {
        if (uploadFile) {
          console.log(URL.createObjectURL(uploadFile));
          $(".upload-img-frame")
            .attr("src", URL.createObjectURL(uploadFile))
            .addClass("success");
        }
        filename = $(this)[0].files[0].name;
      }

      $(this).siblings(".upload-name").val(filename);
    }
  });
});

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

  const memberImage = $(".member-image").get(0).files[0]
    ? $(".member-image").get(0).files[0].name
    : null;
  if (!memberImage) {
    alert("Plase insert restaurant image!");
    return false;
  }
}
