function togglePassword(id) {
  var passwordInput = document.getElementById(id);
  
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}
  
function id_Length(value) {
  return value.length >= 8 && value.length <= 32
}

function pw_Length(value) {
  return value.length >= 8
}

function id_check(str) {
  return /^[A-Za-z0-9._]+$/.test(str);
}

function isMatch (password1, password2) {
  return password1 === password2;

}

let InputUsername = document.querySelector('#username');
let Id_FailureMessage = document.querySelector('.id_error');
let Id_FailureMessageTwo = document.querySelector('.id_error2');

let InputPassword = document.querySelector('#password');
let InputPasswordRetype = document.querySelector('#password-retype');
let Pw_FailureMessage = document.querySelector('.password_error');
let MismatchMessage = document.querySelector('.retype-pw');

InputUsername.onkeyup = function () {
  if (InputUsername.value.length !== 0) {
    if(id_Length(InputUsername.value) === false) {
      Id_FailureMessage.classList.remove('hide');
      Id_FailureMessageTwo.classList.add('hide');
    }
    else if(id_check(InputUsername.value) === false) {
      Id_FailureMessage.classList.add('hide');
      Id_FailureMessageTwo.classList.remove('hide');
    }
    else if(id_Length(InputUsername.value) || id_check(InputUsername.value)) {
      Id_FailureMessage.classList.add('hide');
      Id_FailureMessageTwo.classList.add('hide');
    }
  }
  else {
    Id_FailureMessage.classList.add('hide');
    Id_FailureMessageTwo.classList.add('hide');
  }
}

InputPassword.onkeyup = function () {
  if (InputPassword.value.length !== 0) {
    if(pw_Length(InputPassword.value) === false) {
      Pw_FailureMessage.classList.remove('hide');
    }
    else if(pw_Length(InputPassword.value) || pw_check(InputPassword.value)) {
      Pw_FailureMessage.classList.add('hide');
    }
  }
  else {
    Pw_FailureMessage.classList.add('hide');
  }
}

InputPasswordRetype.onkeyup = function () {
  if (InputPasswordRetype.value.length !== 0) {
    if(isMatch(InputPassword.value, InputPasswordRetype.value)) {
      MismatchMessage.classList.add('hide');
    }
    else {
      MismatchMessage.classList.remove('hide');
    }
  }
  else {
    MismatchMessage.classList.add('hide');
  }
};

function href(uri) {
  location.href = uri;
}

function submit(id, msg = "") {
  if (confirm("정말로 " + msg + " 하시겠습니까?")) {
      if (!isValid()) {
          alert("입력 값을 확인해주세요.");
          return;
      }
      document.getElementById(id).submit();
  }
}

function showMenu(id) {
  var x = document.getElementById(id);

  if (!x.classList.contains("hide")) {
      x.classList.add("hide");
  } else {
      x.classList.remove("hide");
  }
}

function showMenu2(open_id, close_id) {
  var x = document.getElementById(open_id);
  var y = document.getElementById(close_id);
  x.classList.remove("hide");
  y.classList.add("hide");
}

function close_modal(modal_id, store_id) {
  const url = `https://${store_id}.rocat.xyz/update/close/modal`;
  var obj = new Object();
  obj.modal_id = modal_id;
  var json_data = JSON.stringify(obj);
  $.ajax({url : url, data : json_data, contentType:"application/json", type : "post",})
  document.getElementById(modal_id).remove();
}

function setCookie(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "="; var decodedCookie = decodeURIComponent(document.cookie); var ca = decodedCookie.split(";"); for (var i = 0; i < ca.length; i++) {
      var c = ca[i]; while (c.charAt(0) == " ") { c = c.substring(1); }
      if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
  }
  return "";
}

function closePopup(id, bool) {
  document.getElementById(id).remove();
  if (bool) setCookie(id, "no-longer-see");
}

function copy(val) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = val;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);

  alert(`복사 되었습니다. (${val})`);
}

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}