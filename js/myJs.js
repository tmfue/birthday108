const textConfig = {
    text1: "Em bé chào mình, em bé có câu hỏi nè",
    text2: "Nhớ bật nhạc lên mà nghe cho chill, em bé chọn bài mình thíc á, nhạc ở góc bên trái",
    text3: "Mình có iu em bé Huệ hong?",
    text4: "Anh thử không trả lời xem?",
    text5: "Cũng tạm",
    text6: "Yêu vãi, yêu vcl",
    text7: "Vì sao mình thích em bé á?",
    text8: "Gửi cho em bé",
    text9: "Vì em bé quá đẹp, too hot, might burn if I touch, my Aphrodite <333333",
    text10: "Câu trả lời rất chính xác, xứng đáng được đi date với em bé",
    text11: "Hôm nay chúng ta đi date nhé",
    text12: "Bấm vào đây để phần quà tiếp theo",
    text13: "Quay lại để nghe thêm tiếng rắm lofi chill"
};

$(document).ready(function () {
    // process bar
    setTimeout(function () {
        firstQuestion();
        $(".spinner").fadeOut();
        $("#preloader").delay(250).fadeOut("slow");
        $("body").delay(350).css({
            overflow: "visible",
        });
    }, 600);

    $("#text3").html(textConfig.text3);
    $("#text4").html(textConfig.text4);
    $("#no").html(textConfig.text5);
    $("#yes").html(textConfig.text6);

    function firstQuestion() {
        $(".content").hide();
        Swal.fire({
            title: textConfig.text1,
            text: textConfig.text2,
            imageUrl: "img/img.png",
            imageWidth: 300,
            imageHeight: 300,
            background: '#fff url("img/iput-bg.jpg")',
            imageAlt: "Custom image",
        }).then(function () {
            $(".content").show(200);
        });
    }

    // switch button position
    function switchButton() {
        var audio = new Audio("sound/fartsound.mp3");
        audio.play();
        var leftNo = $("#no").css("left");
        var topNO = $("#no").css("top");
        var leftY = $("#yes").css("left");
        var topY = $("#yes").css("top");
        $("#no").css("left", leftY);
        $("#no").css("top", topY);
        $("#yes").css("left", leftNo);
        $("#yes").css("top", topNO);
    }
    // move random button position
    function moveButton() {
        var audio = new Audio("sound/fartsound.mp3");
        audio.play();
        if (screen.width <= 600) {
            var x = Math.random() * 300;
            var y = Math.random() * 500;
        } else {
            var x = Math.random() * 500;
            var y = Math.random() * 500;
        }
        var left = x + "px";
        var top = y + "px";
        $("#no").css("left", left);
        $("#no").css("top", top);
    }

    var n = 0;
    $("#no").mousemove(function () {
        if (n < 1) switchButton();
        if (n > 1) moveButton();
        n++;
    });
    $("#no").click(() => {
        if (screen.width >= 900) switchButton();
    });

    // generate text in input
    function textGenerate() {
        var n = "";
        var text = " " + textConfig.text9;
        var a = Array.from(text);
        var textVal = $("#txtReason").val() ? $("#txtReason").val() : "";
        var count = textVal.length;
        if (count > 0) {
            for (let i = 1; i <= count; i++) {
                n = n + a[i];
                if (i == text.length + 1) {
                    $("#txtReason").val("");
                    n = "";
                    break;
                }
            }
        }
        $("#txtReason").val(n);
    }

    // show popup
    $("#yes").click(function () {
        var audio = new Audio("sound/ting.mp3");
        audio.play();
        Swal.fire({
            title: textConfig.text7,
            html: true,
            width: 900,
            padding: "3em",
            html: "<input type='text' class='form-control' id='txtReason'  placeholder='Đố biết'>",
            background: '#fff url("img/iput-bg.jpg")',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#dd3333",
            confirmButtonColor: "#fe8a71",
            cancelButtonColor: "#f6cd61",
            confirmButtonText: textConfig.text8,
            cancelButtonText: textConfig.text13,
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    width: 900,
                    confirmButtonText: textConfig.text12,
                    background: '#fff url("img/iput-bg.jpg")',
                    title: textConfig.text10,
                    text: textConfig.text11,
                    confirmButtonColor: "#83d0c9",
                    onClose: () => {
                        window.location = "https://docs.google.com/forms/d/e/1FAIpQLScTbLOm0AV7yJTxp899d5FozRwwdb8BjPgAZ_XeKFbIey9X8Q/viewform?usp=pp_url";
                    },
                });
            }
        });

        $("#txtReason").focus(function () {
            var handleWriteText = setInterval(function () {
                textGenerate();
            }, 10);
            $("#txtReason").blur(function () {
                clearInterval(handleWriteText);
            });
        });
    });
});