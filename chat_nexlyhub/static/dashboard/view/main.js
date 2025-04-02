/*
 * Matchering WEB - Handy Matchering 2.0 Containerized Web Application
 * Copyright (C) 2016-2022 Sergree
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


function crossfade(from, to) {
    $(from).fadeOut(1000).promise().done(
        function () {
            $(to).fadeIn(1000);
        }
    );
}

function scrollto(from, to) {
    $('body, html').animate({
        scrollTop: $(to).offset().top
    },1000);
}

function disableElements() {
    $('input[name="audio_files"]:not(:checked)').attr('disabled', true);
    $('#stage-process, #stage-result').css('pointer-events', 'None');
    // $('#stage-process, #stage-result').click(function(e){
    //     if(!$('#result16').val() || !$('#result24').val()){
    //         // alert("No media to play yet! Make sure the audio files are uploaded and processed!");
    //         e.preventDefault();
    //         return false;
    //     }
    // });
}

function enableElements() {
    $('#range').attr('disabled', true);
    $('input[name="audio_files"]:not(:checked)').attr('disabled', false);
    $('input[name="audio_files"]').attr('disabled', false);
    $('#stage-process, #stage-result').css('pointer-events', '');
    // $('#stage-process, #stage-result').click(function(e){
    //     if(!$('#result16').val() || !$('#result24').val()){
    //         alert("No media to play yet! Make sure the audio files are uploaded and processed!");
    //         e.preventDefault();
    //         return false;
    //     }
    // });
}

function redrawProcess() {
    $("#stage-process").removeClass("process-error");
}

function redrawResults(){
    $('#preview-matchered').removeClass('active');
    $('#preview-original').removeClass('active');
    $("#track-target").text("...");
    $("#track-reference").text("...");
    $("#result16").attr("value", "");
    $("#result24").attr("value", "");
    $("#player-original").attr("src", "");
    $("#player-matchered").attr("src", "");
    $("#result16").prop('checked', 'false');
    $("#result24").prop('checked', 'false');
}

function redrawUpload(file_type) {
    $(`#upload-${file_type}`)
        .removeClass("upload-cell-uploading upload-cell-uploaded")
        .addClass("upload-cell-active");
    $(`#upload-${file_type} .hwe__progress-line`).css('width', '0%');
    $(`#upload-${file_type} p.fs-5`).text("Upload " + file_type + " file");
    $(`#upload-${file_type} .py-2`).text("...");
}

function redrawAll(keep_target = false, keep_reference = false) {
    if (!keep_target) { redrawUpload("target"); }
    if (!keep_reference) { redrawUpload("reference"); }

    redrawProcess();
    redrawResults();

    let from;
    if ($("#stage-process").is(":visible")) {
        from = "#stage-process";
    } else {
        from = "#stage-result";
    }

    audioPause();

    // crossfade(from, "#stage-upload");
    $('#upload-target').css('pointer-events', '');
    $('#upload-reference').css('pointer-events', '');
    scrollto(from, "#stage-upload");
    disableElements();
}

const warning = $("#warning");
let warningText = "";

function updateWarningText(warningCodes) {
    let warnings = ["Warning!"];
    warningCodes.forEach(
        function (entry) {
            warnings.push(`${codes[entry]}.`);
        }
    );
    warningText = warnings.join("<br><br>");
}

function showStageResult(json) {
    console.log("show stage result json", json);
    $("#track-target").html(json.target);
    $("#track-reference").html(json.reference);
    $("#result16").attr("value", json.result16);
    $("#result24").attr("value", json.result24);
    $("#resultmp3").attr("value", json.resultmp3);
    $("#player-original").attr("src", json.preview_target);
    $("#player-matchered").attr("src", json.preview_result);
    if (json.warnings.length > 0) {
        updateWarningText(json.warnings);
        warning.addClass("warning-visible");
    } else {
        warning.removeClass("warning-visible");
    }
    // scrollto("#stage-process", "#stage-result");
    // crossfade("#stage-process", "#stage-result");
    $('#process-text').css('display', 'none');
    $('#preview-matchered').addClass('active');
    enableElements();
}

function showError() {
    $("#stage-process").addClass("process-error");
}

function updateStatus(code) {
    $("#process-text").html(codes[code]);
}

function showStageProcess() {
    $('#upload-target').css('pointer-events', 'None');
    $('#upload-reference').css('pointer-events', 'None');
    $('#process-text').css('display', 'block');
    // crossfade("#stage-upload", "#stage-process");
    scrollto("#stage-upload", "#stage-process");
}

function success(file_type) {
    $(`#upload-${file_type}`)
        .removeClass("upload-cell-uploading")
        .addClass("upload-cell-uploaded");
    $(`#upload-${file_type}-text`).html("OK");
}

function uploadFunc(file_type) {
    return function (uploadProgress, totalBytes, totalBytesSent) {
        $(`#upload-${file_type}-text`).html(`${uploadProgress.toFixed(0)}%`);
    };
}

const upload = {
    target: uploadFunc("target"),
    reference: uploadFunc("reference")
};

function addedFunc(file_type) {
    return function () {
        $(`#upload-${file_type}`)
            .removeClass("upload-cell-active")
            .addClass("upload-cell-uploading");
    };
}

const added = {
    target: addedFunc("target"),
    reference: addedFunc("reference")
};

function showPage() {
    $("#page-preloader .spinner").fadeOut();
    $("#page-preloader").delay(150).fadeOut("slow");
}

function myAlert(text) {
    $("#main-modal-text").html(text);
    const mainModal = $("#main-modal");
    if (mainModal.css("display") === "none") {
        mainModal.modal({
            fadeDuration: 250
        });
    }
}

function showWarning() {
    myAlert(warningText);
}

function genHandler(where, from, to) {
    return function () {
        $(where).stop().css("opacity", "0").html(function (_, oldText) {
            return (
                oldText === to ? from : to
            );
        }).animate({
            opacity: 1
        }, 500);
    };
}

const uploadTipText = $("#upload-tip").html();

$("#upload-target").hover(
    genHandler(
        "#upload-tip",
        uploadTipText,
        "The Track You Want to Master"
    )
);
$("#upload-reference").hover(
    genHandler(
        "#upload-tip",
        uploadTipText,
        "Some <span class=\"accent\">Wet</span> Reference Track"
    )
);

warning.click(showWarning);

$(document).ready(function(){
    seekSlider1 = $('#seek_slider')[0];
    current_time = $('#audio_current_time')[0];
    duration = $('#audio_duration')[0];

    isAutoUpdate1 = true;
    isManualUpdate1 = false;

    audioElements1 = [
        $("#player-original")[0],
        $("#player-matchered")[0]
    ];

    audioElements1.forEach((audio, index) => {
        audio.addEventListener("timeupdate", handleTimeUpdate1(index));
    });

    $('#seek_slider').on('input', function(){
        isManualUpdate1 = true;
    });

    // Format time in HH:MM:SS
    function formatTime1(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    function handleTimeUpdate1(index){
        return function() {
            if(isAutoUpdate1 && !isManualUpdate1){
                au = audioElements1[index];
                cT = au.currentTime;
                dur = au.duration;
                prog = (cT/dur) * 100;
                current_time.textContent = formatTime1(cT);
                duration.textContent = formatTime1(dur);
                seekSlider1.value = prog;
                prog_gradient = prog + 0.1;
                seekSlider1.style = "background: linear-gradient(90deg, rgb(31, 234, 200) " + prog + "%, rgb(240, 239, 241) " + prog_gradient + "%);";
            }
            if(isManualUpdate1){
                seekTime = (audioElements1[0].duration / 100) * $('#seek_slider').val();
                audioElements1.forEach(function(x,y){
                    x.currentTime = seekTime;
                });
                isManualUpdate1 = false;
                isAutoUpdate1 = true;
            }
        };
    }
});
