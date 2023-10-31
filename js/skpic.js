$(function () {
    // ● logo,topBtn 최상단 
    $(".logo, .topBtn").on("click", function () {
        $("html,body").stop().animate({
            scrollTop: 0
        }, 400); // 0.4초
    });


    // ● arrow 버튼이 500px 도달시 나타남
    // 안보이던 화살표가 500px 이상으로 스크롤이 내려오면 나타나고 500px 이하일때 사라짐 
    // window => 웹브라우저 
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $(".topBtn").fadeIn();
        } else {
            $(".topBtn").fadeOut();
        }
    });

    // ● 메뉴 클릭시 스크롤 애니메이션 
    // a[href^='#'] => #으로 시작하는 a 요소 선택시 사용
    $("ul.menu li a[href^='#']").on("click", function () {
        // 클릭한 메뉴 항목의 href 속성값을 target에 넣어줌
        var target = $(this).attr("href");
        // 해당 섹션의 상단 위치를 계산하여 가져옴
        var targetPosition = $(target).offset().top;
        // 스크롤 애니메이션 설정
        $("html,body").animate({
            // 스크롤 위치를 클릭한 메뉴 항목의 연결된 섹션으로 이동
            scrollTop: targetPosition
        }, 800); // 0.8초

        // ● 클릭한 메뉴 항목에 .active 추가 
        $("ul.menu li a").removeClass("active");
        // 모든 a에 .active 제거 
        $(this).addClass("active");
        // 클릭한 메뉴만 .active 추가

    });


    //  ● 다른 영역을 클릭 시 active 제거 (★ 추가)
    $(document).on("click", function (e) {
        if (!$(e.target).closest("ul.menu li").length) {
            // 클릭한 영역이 메뉴 항목 이외의 영역이면
            $("ul.menu li a").removeClass("active"); // 모든 메뉴 항목에서 active 클래스 제거
        }
    });

    // .closest() - 가장 가까운 부모요소 찾는 메서드   


    // ● tab menu 
    'use strict'; // 엄격모드 활성화
    $(".info-list li").click(function () {
        // 현재 클릭한 li에 selected 추가하고 형제요소들의 selected 삭제
        $(this).addClass("selected").siblings("li").removeClass("selected");
        // 컨텐츠 div 요소 전체 숨김 
        $(".info-content div").hide();
        // 현재 클릭한 li 요소의 data-class 속성값을 가져와 해당 클래스명을 가진 div 나타나게 해줌 
        $("." + $(this).data("class")).fadeIn();
    });


    // ● toggle btn 
    var $menu = $(".menu");
    var $toggleBtn = $(".toggleBtn");
    var menuVisible = false;

    // 토글 클릭시 이벤트
    $toggleBtn.click(function (e) {
        e.stopPropagation();
        // 버튼 클릭시 이벤트가 상위로 전파되는 것 방지 
        menuVisible = !menuVisible;
        // 메뉴 표시 여부 반전 (켜짐 <-> 꺼짐)
        if (menuVisible) {
            $menu.show(); // 메뉴를 화면에 표시         
        } else {
            $menu.hide(); // 메뉴 숨김 
        }
    });


    // ● 창 크기가 변경될 때 메뉴 표시 상태를 업데이트 (★ 추가)
    $(window).resize(function () {
        if ($(window).width() >= 768) {
            // 창 너비가 768px 이상인 경우 (PC 구조로 변경될 때),
            // 메뉴를 다시 인라인 구조로 표시

            // .resize() - 브라우저 창의 크기가 변경될때마다 발생하는 이벤트를 감지하고 처리할때 사용 
            // 브라우저 창크기 변경에 반응 

            // 메뉴의 CSS display 속성을 초기값("")으로 설정하여
            // 이전에 JavaScript로 변경된 스타일을 제거
            $menu.css("display", "");

            // ★ 메뉴가 숨겨진 상태로 표시되도록 menuVisible 변수를 false로 설정
            menuVisible = false; // 메뉴를 보이지 않게 함 이라는 의미로 사용되었음.
            // menuVisible은 변수이며, 이 변수는 Boolean값을 저장하는데 사용
            // Boolean은, false나 true 두가지만 가질 수 있는 데이터 유형임 
            // 여기에서 menuVisible변수를 false로 설정하여 메뉴 보이지 않음, 숨김 상태를 만들었음. 
            // Boolean 이라는 것은, 참이나 거짓 상태를 나타내는 데이터유형임.
            // menuVisible 변수를 플래그(Flag) 변수 또는 상태(State) 변수라고 함. 
            // 보통 토글 메뉴 열고 닫기 할때 사용되고있음. 
            // false는 닫힌상태, true는 열린상태임. 
        }
    });

    // ● 문서 클릭시 메뉴 닫힘

    $(document).click(function (e) {
        // 메뉴가 현재 표시중이고, 클릭한 요소가 메뉴 내부 요소가 아닌 경우
        if (menuVisible && !$(e.target).closest(".menu").length) {
            $menu.hide(); // 메뉴를 화면에서 숨김 
            menuVisible = false; // 메뉴가 숨겨짐을 표시 
        }
    });


    // e.target => 클릭 이벤트가 발생한 요소를 나타냄. (=this)
    //  !$ -> NOT 연산자 
    // ! => true를 false로 false를 true로 바꾸는 역할을 함 
    // $ -> 반전시키는 역할 (부울값을!! Boolean) => 참과 거짓 형태의 데이터 유형
    // .closest() - 선택한 요소에서 가장 가까운 상위요소를 찾는데 사용 (부모, 조상 선택)
    // var menuVisible = false;  거짓 - (여기서는 menuVisible 변수에 할당되는 초기값을 의미, 
    // 메뉴의 표시 여부를 추적하는데 사용
    // 코드의 실행 초기에 메뉴가 숨겨져있음을 나타냄. 
    // 이것으로, 코드에 변수값을 변경하여 메뉴를 표시하거나 숨길 수 있음)

    // ● 모바일 아코디언

    var allDT = $("dl.accordion dt");
    var allDd = $("dl.accordion dd");
    allDd.slideUp(300);
    allDT.click(function () {
        var clickDt = $(this);
        // .next() = 동생
        var choiceDd = clickDt.next();
        // 선택한 요소 숨겨져있는지 확인
        if (choiceDd.css("display") == "none") {
            // dd 모두 닫아줌
            allDd.slideUp(300);
            // 클릭한 요소의 내용 열어줌
            choiceDd.slideDown(300);
            allDT.removeClass("selected"); // dt 요소의 선택 클래스 제거 
            allDT.css("background", ""); // dt 요소의 배경색 초기화
 
            // 선택한 dt 요소에 색상 변경 
            clickDt.addClass("selected"); // 클릭한 dt 요소에 선택 클래스 추가 
            clickDt.css("background-color", "#e0002b"); // 배경색 변경 


        } else {
            // 열려있으면 닫기
            choiceDd.slideUp(300);
            clickDt.removeClass("selected"); // 클릭한 dt 요소의 선택 클래스 제거
            clickDt.css("background-color", ""); // 배경색 초기화
        }

    });

});