$(function () {
/*
    $(".custom-rs-multiple-select2 select").select2({
        placeholder: "Select a state"
    });
*/

    //Grade 색상 매치
    $(".custom-td div .select2-hidden-accessible option:selected").each(function () {
        var number = $(this).text();
        if (number == 1) $(this).parent().parent().find('.select2-selection__rendered').css('background', '#5a6268');
        else if (number == 2) $(this).parent().parent().find('.select2-selection__rendered').css('background', '#138496');
        else if (number == 3) $(this).parent().parent().find('.select2-selection__rendered').css('background', '#e0a800');
        else if (number == 4) $(this).parent().parent().find('.select2-selection__rendered').css('background', '#218838');
        else if (number == 5) $(this).parent().parent().find('.select2-selection__rendered').css('background', '#0069d9');
        else if (number == 6) $(this).parent().parent().find('.select2-selection__rendered').css('background', '#c82333');
    });

    //Grade 선택시 색상 매치
    $(document).on("change", ".custom-td div .select2-hidden-accessible", function () {
        var number = $(this).find('option:selected').text();
        if (number == 1) $(this).parent().find('.select2-selection__rendered').css('background', '#5a6268');
        else if (number == 2) $(this).parent().find('.select2-selection__rendered').css('background', '#138496');
        else if (number == 3) $(this).parent().find('.select2-selection__rendered').css('background', '#e0a800');
        else if (number == 4) $(this).parent().find('.select2-selection__rendered').css('background', '#218838');
        else if (number == 5) $(this).parent().find('.select2-selection__rendered').css('background', '#0069d9');
        else if (number == 6) $(this).parent().find('.select2-selection__rendered').css('background', '#c82333');

    });

    //Mutiple-select 색상 매치
    $(".custom-rs-multiple-select2 select option:selected").each(function () {
        var text = $(this).text();
        if (text == "All") $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#fb7d24');
        else if (text == 1) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#5a6268');
        else if (text == 2) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#138496');
        else if (text == 3) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#e0a800');
        else if (text == 4) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#218838');
        else if (text == 5) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#0069d9');
        else if (text == 6) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#c82333');
    });

    $(document).on("click", ".select2-results__option", function () {
        var text = $(this).text();
        if (text == "-") {
            $(this).parent().parent().parent().parent().parent().parent().find('select option:selected').each(function () {
                $(this).prop("selected", false);
            });
        };
    });

    //Mutiple-select2 : Grade 선택시 색상 매치
    $(document).on("change", ".custom-rs-multiple-select2 select", function () {

         //All이 선택되면

        //-이 선택되면



        $(this).find('option:selected').each(function () {
            var text = $(this).text();



            if (text == "All") $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#fb7d24');
            else if (text == 1) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#5a6268');
            else if (text == 2) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#138496');
            else if (text == 3) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#e0a800');
            else if (text == 4) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#218838');
            else if (text == 5) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#0069d9');
            else if (text == 6) $(this).parent().parent().find('.select2-selection__choice[title=' + text + ']').css('background-color', '#c82333');
        });


        if ($(this).find('option:selected').length <= 2) {
            $(this).parent().parent().removeClass("level2");
            $(this).parent().parent().addClass("level1");

            $(this).parent().find(".select2-selection__choice").removeClass("level2");

        } else if ($(this).find('option:selected').length == 3) {
            $(this).parent().parent().removeClass("level1");
            $(this).parent().parent().removeClass("level3");
            $(this).parent().parent().addClass("level2");

            $(this).parent().find(".select2-selection__choice").removeClass("level3");
            $(this).parent().find(".select2-selection__choice").addClass("level2");

        } else if ($(this).find('option:selected').length >= 4) {
            $(this).parent().parent().removeClass("level2");
            $(this).parent().parent().addClass("level3");

            $(this).parent().find(".select2-selection__choice").removeClass("level2");
            $(this).parent().find(".select2-selection__choice").addClass("level3");
        }

    });
    //전체 선택 해제
    $(document).on("click", ".allCheck", function () {
        if ($(this).prop('checked')) {
            $(this).parent().parent().parent().parent().parent().find('tbody tr td label input').each(function () {
                $(this).prop('checked', true);
            })
        } else {
            $(this).parent().parent().parent().parent().parent().find('tbody tr td label input').each(function () {
                $(this).prop('checked', false);
            })
        }
    });

    /*$(document).on('click','#addClass',function(){
       $("#className").focus();
    });*/
    $("#mediumModal").on("shown.bs.modal", function () {
        $("#className").focus();
    });

    $("#className").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#confirm").click();
        }
    });

    $(document).on('click',"#confirm",function(){
       alert(0);
    });
});
