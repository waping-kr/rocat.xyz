function href(uri) {
    location.href = uri;
}

function form_submit(id, msg = "") {
    if (confirm("정말로 " + msg + " 하시겠습니까?")) {
        if (!isValid()) {
            alert("입력 값을 확인해주세요.");
            return;
        }
        document.getElementById(id).submit();
    }
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

function showMenu() {
    var x = document.getElementById("wrap");
    var y = document.getElementById("mobile-menu");
    var z = document.getElementById("header");

    if (!x.classList.contains("menu")) {
        x.classList.add("menu");
        y.classList.add("show");
        z.classList.add("responsive");
    } else {
        x.classList.remove("menu");
        y.classList.remove("show");
        z.classList.remove("responsive");
    }
}

function isValid() {
    var invl = document.querySelectorAll(":invalid");
    return invl.length === 0;
}

function showCategory() {
    var x = document.getElementById("category");

    if (x.className === "content") { 
        x.className += " responsive";
    } else { 
    x.className = "content";
    }
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

function start() {
    document.getElementById("l").setAttribute("min", getInputValue("f"));
}

function end() {
    document.getElementById("f").setAttribute("max", getInputValue("l"));
}

function getInputValue(id) {
    return document.getElementById(id).value;
}

function getInputValueN(name) {
    return document.querySelector("input[name=" + name + "]").value;
}

function getSelectValue(id) {
    var obj = document.getElementById(id);
    return obj.options[obj.selectedIndex].value;
}

function preview() {
    document.documentElement.style.setProperty("--font-color", getInputValueN("fontcolor"));
    document.documentElement.style.setProperty("--main-background", getInputValueN("mainbackground"));
    document.documentElement.style.setProperty("--category-item", getInputValueN("categoryitem"));
    document.documentElement.style.setProperty("--category-split", getInputValueN("categorysplit"));
    document.documentElement.style.setProperty("--highlight", getInputValueN("highlight"));
    document.documentElement.style.setProperty("--highlight-font-color", getInputValueN("highlightfontcolor"));
    document.documentElement.style.setProperty("--item-border", getInputValueN("itemborder"));
    document.documentElement.style.setProperty("--item-background", getInputValueN("itembackground"));
    document.documentElement.style.setProperty("--item-left", getInputValueN("itemleft"));
    document.documentElement.style.setProperty("--item-split", getInputValueN("itemsplit"));
    document.documentElement.style.setProperty("--item-hover-background", getInputValueN("itemhoverbackground"));
    document.documentElement.style.setProperty("--grad-one", getInputValueN("gradone"));
    document.documentElement.style.setProperty("--grad-two", getInputValueN("gradtwo"));
    document.documentElement.style.setProperty("--card-split", getInputValueN("cardsplit"));
    document.documentElement.style.setProperty("--card-background", getInputValueN("cardbackground"));
    document.documentElement.style.setProperty("--card-shop-background", getInputValueN("cardshopbackground"));
    document.documentElement.style.setProperty("--table-top", getInputValueN("tabletop"));
    document.documentElement.style.setProperty("--table-bottom", getInputValueN("tablebottom"));
    document.documentElement.style.setProperty("--red", getInputValueN("red"));
    document.documentElement.style.setProperty("--green", getInputValueN("green"));
    document.documentElement.style.setProperty("--default", getInputValueN("default"));
    document.documentElement.style.setProperty("--red-active", getInputValueN("redactive"));
    document.documentElement.style.setProperty("--green-active", getInputValueN("greenactive"));
    document.documentElement.style.setProperty("--default-active", getInputValueN("defaultactive"));
}

function post(path, params, msg = "", check = true) {
    let alert = true;
    if (check) alert = confirm("정말로 " + msg + " 하시겠습니까?");
    if (alert) {
        const form = document.createElement("form");
        form.method = "post";
        form.action = path;

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const hiddenField = document.createElement("input");
                hiddenField.type = "hidden";
                hiddenField.name = key;
                hiddenField.value = params[key];

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
    }
}

function count_post(id, unit, name, out_unit, price, stock) {
    item_id = id;
    item_unit = unit;
    document.getElementById("info").style.display = "block";
    document.getElementById("item-name").innerHTML = name;
    document.getElementById("item-unit").innerHTML = out_unit;
    document.getElementById("item-price").innerHTML = price;
    document.getElementById("item-stock").innerHTML = stock;
}

function purchase() {
    if (confirm("정말로 구매 하시겠습니까?")) {
    if (!isValid()) { alert("입력 값을 확인해주세요."); return; }
    var obj = new Object();
    obj.id = item_id;
    obj.amount = Number(document.getElementById("item-amount").value);
    obj.type = item_unit
    var jsonData = JSON.stringify(obj);

    $.ajax({
        url: "../product_buy",
        data: jsonData,
        contentType: "application/json",
        type: 'POST',
    }).done(function (data) {
        if (data == "ok") {
            window.location.href = "/history/purchase";
        } else {
            alert(
                data
            );
        }
    })

        ;
}}

function closePopup(id, bool) {
    document.getElementById(id).remove();
    if (bool) setCookie(id, "no-longer-see");
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

function logout_button() {
    Swal.fire({
        title: "로그아웃",
        text: "정말로 로그아웃하시겠습니까?",
        icon: "success",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#009900",
        confirmButtonText: "확인",
        cancelButtonText: "취소"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "../logout";
        }
    })
}