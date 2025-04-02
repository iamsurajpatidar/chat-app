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

function disableElementsSourceOnly() {
    $('#range').attr('disabled', 'disabled');
    $('input[name="audio_files_source_only"]:not(:checked)').attr('disabled', true);
    // $('#stage-process-source-only').css('pointer-events', 'None');
    // $('#stage-result-source-only').css('pointer-events', 'None');
    $('#stage-process-source-only, #stage-result-source-only').css('pointer-events', 'None');
    // $('#stage-process-source-only, #stage-result-source-only').click(function(e){
    //     if(!$('#result16_v1').val() || !$('#result24_v1').val()){
    //         // alert("Source Only: No media to play yet! Make sure the audio files are uploaded and processed!");
    //         e.preventDefault();
    //         return false;
    //     }
    // });
}

function enableElementsSourceOnly() {
    $('#range').attr('disabled', false);
    $('input[name="audio_files_source_only"]:not(:checked)').attr('disabled', false);
    $('input[name="audio_files_source_only"]').attr('disabled', false);
    // $('#stage-process-source-only').css('pointer-events', 'None');
    // $('#stage-result-source-only').css('pointer-events', 'None');
    $('#stage-process-source-only, #stage-result-source-only').css('pointer-events', '');
    // $('#stage-process-source-only, #stage-result-source-only').click(function(e){
    //     if(!$('#result16_v1').val() || !$('#result24_v1').val()){
    //         alert("No media to play yet! Make sure the audio files are uploaded and processed!");
    //         e.preventDefault();
    //         return false;
    //     }
    // });
}

function redrawsourceonlyProcess() {
    $("#stage-process-source-only").removeClass("process-error");
}

function redrawsourceonlyResults(){
    $(`#upload-target-source-only p.fs-5`).text("Upload target file");
    $('#music-source-only-target').text('...');
    $("#result16").prop('checked', 'false');
    $("#result24").prop('checked', 'false');
    $("#mp3").prop('checked', 'false');
    $('#player-original_source_only').attr('src', '');
    $('#player-matchered_source_only_v1').attr('src', '');
    $('#player-matchered_source_only_v2').attr('src', '');
    $('#player-matchered_source_only_v3').attr('src', '');
    $('#player-matchered_source_only_v4').attr('src', '');
    $('#player-matchered_source_only_v5').attr('src', '');
    $('#result16_v1').attr('value', '');
    $('#result16_v2').attr('value', '');
    $('#result16_v3').attr('value', '');
    $('#result16_v4').attr('value', '');
    $('#result16_v5').attr('value', '');
    $('#result24_v1').attr('value', '');
    $('#result24_v2').attr('value', '');
    $('#result24_v3').attr('value', '');
    $('#result24_v4').attr('value', '');
    $('#result24_v5').attr('value', '');
    $('#resultmp3_v1').attr('value', '');
    $('#resultmp3_v2').attr('value', '');
    $('#resultmp3_v3').attr('value', '');
    $('#resultmp3_v4').attr('value', '');
    $('#resultmp3_v5').attr('value', '');
}

function redrawsourceonlyUpload(file_type) {
    $(`#upload-${file_type}-source-only`)
        .removeClass("upload-cell-uploading upload-cell-uploaded")
        .addClass("upload-cell-active");
    $(`#upload-${file_type}-source-only .hwe__progress-line`).css('width', '0%');
    $(`#upload-${file_type}-source-only p.fs-5`).text("Upload " + file_type + " file");
    $(`#upload-${file_type}-source-only .py-2`).text("...");
}

function redrawsourceonlyAll(keep_target = false, keep_reference = false) {
    if (!keep_target) { redrawsourceonlyUpload("target"); }

    redrawsourceonlyProcess();
    redrawsourceonlyResults();

    let from;
    if ($("#stage-process-source-only").is(":visible")) {
        from = "#stage-process-source-only";
    } else {
        from = "#stage-result-source-only";
    }

    audioPauseSourceOnly();

    $('#range').attr('value',0.0);
    $('#range').css('background', 'linear-gradient(90deg, rgb(31, 234, 200) 0%, rgb(240, 239, 241) 0.1%)');
    $('#range').attr('min', 0.0);
    $('#range').attr('max', 100);
    $('#range').attr('step', 20);

    // crossfade(from, "#stage-upload");
    $('#upload-target-source-only').css('pointer-events', '');
    scrollto(from, "#stage-upload-source-only");
    disableElementsSourceOnly();
}

// const warning = $("#warning");
// let warningText = "";

// function updateWarningText(warningCodes) {
//     let warnings = ["Warning!"];
//     warningCodes.forEach(
//         function (entry) {
//             warnings.push(`${codes[entry]}.`);
//         }
//     );
//     warningText = warnings.join("<br><br>");
// }

function showsourceonlyStageResult(json) {
    $("#player-original_source_only").attr("src", json.preview_target);
    $("#result16_v1").attr("value", json.result16_v1);
    $("#result24_v1").attr("value", json.result24_v1);
    $("#resultmp3_v1").attr("value", json.resultmp3_v1);
    $("#player-matchered_source_only_v1").attr("src", json.preview_result_v1);
    $("#result16_v2").attr("value", json.result16_v2);
    $("#result24_v2").attr("value", json.result24_v2);
    $("#resultmp3_v2").attr("value", json.resultmp3_v2);
    $("#player-matchered_source_only_v2").attr("src", json.preview_result_v2);
    $("#result16_v3").attr("value", json.result16_v3);
    $("#result24_v3").attr("value", json.result24_v3);
    $("#resultmp3_v3").attr("value", json.resultmp3_v3);
    $("#player-matchered_source_only_v3").attr("src", json.preview_result_v3);
    $("#result16_v4").attr("value", json.result16_v4);
    $("#result24_v4").attr("value", json.result24_v4);
    $("#resultmp3_v4").attr("value", json.resultmp3_v4);
    $("#player-matchered_source_only_v4").attr("src", json.preview_result_v4);
    $("#result16_v5").attr("value", json.result16_v5);
    $("#result24_v5").attr("value", json.result24_v5);
    $("#resultmp3_v5").attr("value", json.resultmp3_v5);
    $("#player-matchered_source_only_v5").attr("src", json.preview_result_v5);
    // $("#track-target").html(json.target);
    // $("#track-reference").html(json.reference);
    // $("#result16").attr("value", json.result16);
    // $("#result24").attr("value", json.result24);
    // $("#player-original").attr("src", json.preview_target);
    // $("#player-matchered").attr("src", json.preview_result);
    // if (json.warnings.length > 0) {
    //     updateWarningText(json.warnings);
    //     warning.addClass("warning-visible");
    // } else {
    //     warning.removeClass("warning-visible");
    // }
    scrollto("#stage-process-source-only", "#stage-result-source-only");
    // // crossfade("#stage-process", "#stage-result");
    $('#process-text-source-only').css('display', 'none');
    enableElementsSourceOnly();
    // $('#preview-matchered').addClass('active');
}

function showsourceonlyError() {
    $("#stage-process-source-only").addClass("process-error");
}

function updatesourceonlyStatus(code) {
    $("#process-text-source-only").html(codes[code]);
}

function showsourceonlyStageProcess() {
    $('#upload-target-source-only').css('pointer-events', 'None');
    $('#process-text-source-only').css('display', 'block');
    // crossfade("#stage-upload", "#stage-process");
    scrollto("#stage-upload-source-only", "#stage-process-source-only");
}

function successsourceonly(file_type) {
    $(`#upload-${file_type}-source-only`)
        .removeClass("upload-cell-uploading")
        .addClass("upload-cell-uploaded");
    $(`#upload-${file_type}-source-only-text`).html("OK");
}

function uploadsourceonlyFunc(file_type) {
    return function (uploadProgress, totalBytes, totalBytesSent) {
        $(`#upload-${file_type}-source-only-text`).html(`${uploadProgress.toFixed(0)}%`);
    };
}

const uploadsourceonly = {
    target: uploadsourceonlyFunc("target"),
};

function addedsourceonlyFunc(file_type) {
    return function () {
        $(`#upload-${file_type}-source-only`)
            .removeClass("upload-cell-active")
            .addClass("upload-cell-uploading");
    };
}

const addedsourceonly = {
    target: addedsourceonlyFunc("target"),
};

function showsourceonlyPage() {
    // $("#page-preloader-source-only .spinner").fadeOut();
    // $("#page-preloader-source-only").delay(150).fadeOut("slow");
}

function mysourceonlyAlert(text) {
    $("#main-modal-source-only-text").html(text);
    const mainModal = $("#main-modal-source-only");
    if (mainModal.css("display") === "none") {
        mainModal.modal({
            fadeDuration: 250
        });
    }
}

const warningsourceonly = $("#warning-source-only");
let warningTextSourceOnly = "";

function updateWarningTextSourceOnly(warningCodes) {
    let warnings = ["Warning!"];
    warningCodes.forEach(
        function (entry) {
            warnings.push(`${codes[entry]}.`);
        }
    );
    warningTextSourceOnly = warnings.join("<br><br>");
}

function showsourceonlyWarning() {
    mysourceonlyAlert(warningTextSourceOnly);
}

function gensourceonlyHandler(where, from, to) {
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

const uploadSourceOnlyTipText = $("#upload-tip-source-only").html();

$("#upload-target-source-only").hover(
    gensourceonlyHandler(
        "#upload-tip-source-only",
        uploadSourceOnlyTipText,
        "The Track You Want to Master"
    )
);

warningsourceonly.click(showsourceonlyWarning);

$(document).ready(function(){
    seekSlider = $('#source_only_seek_slider')[0];
    source_only_current_time = $('#source_only_audio_current_time')[0];
    source_only_duration = $('#source_only_audio_duration')[0];
    source_only_preview_range = $('#range').val();

    isAutoUpdate = true;
    isManualUpdate = false;

    audioElements = [
        $("#player-original_source_only")[0],
        $("#player-matchered_source_only_v1")[0],
        $("#player-matchered_source_only_v2")[0],
        $("#player-matchered_source_only_v3")[0],
        $("#player-matchered_source_only_v4")[0],
        $("#player-matchered_source_only_v5")[0]
    ];

    audioElements.forEach((audio, index) => {
        audio.addEventListener("timeupdate", handleTimeUpdateSourceOnly(index));
    });

    $('#source_only_seek_slider').on('input', function(){
        isManualUpdate = true;
    });

    // Format time in HH:MM:SS
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    function handleTimeUpdateSourceOnly(index){
        return function() {
            if(isAutoUpdate && !isManualUpdate){
                au = audioElements[index];
                currTime = au.currentTime;
                duration = au.duration;
                progress = (currTime/duration) * 100;
                source_only_current_time.textContent = formatTime(currTime);
                source_only_duration.textContent = formatTime(duration);
                seekSlider.value = progress;
                progress_gradient = progress + 0.1;
                seekSlider.style = "background: linear-gradient(90deg, rgb(31, 234, 200) " + progress + "%, rgb(240, 239, 241) " + progress_gradient + "%);";
            }
            if(isManualUpdate){
                seekTime = (audioElements[0].duration / 100) * $('#source_only_seek_slider').val();
                audioElements.forEach(function(x,y){
                    x.currentTime = seekTime;
                });
                isManualUpdate = false;
                isAutoUpdate = true;
            }
        };
    }
});
