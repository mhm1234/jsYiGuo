//注册


function setCookie(key, value,days) {
    if (days) {
        var now = new Date();
        now.setTime(now.getTime() + days * 24 * 60 * 60 * 1000)
        document.cookie = key + "=" + value + ";expires=" + now;
    } else {
        document.cookie = key + "=" + value;
    }
}
//验证手机号
var flagName = null;
$("#uname").blur(function () {
    var reg = /^[1-9]\d{10}$/;
    var pwdTxt = $("#uname").val();
    if (reg.test(pwdTxt)) {
        flagName = true;
    } else {
        flagName = false;
    }
})

//验证密码
var flagPwd = null;
$("#upwd").blur(function () {
    var reg = /^.{6,}$/;
    var pwdTxt = $("#upwd").val();
    if (reg.test(pwdTxt)) {
        flagPwd = true;
    } else {
        flagPwd = false;
    }
}) 


var btn = $("#reg");
btn.click(function () {
    //取出用户输入的用户名和密码
    var username = $("#uname").val();
    var userpwd = $("#upwd").val();
    setCookie("uname", username)
    setCookie("upwd", userpwd)
   
  if (flagName && flagPwd) {
        //每一个表单项都正确  才能正确提交
      $(location).attr('href', 'login.html')
        return true;
     
    } else {
        alert("请重新填写")
        return false;
    }
})