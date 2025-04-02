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

function playerIsPlaying(player) {
    return !player.paused && !player.ended && 0 < player.currentTime;
}

const playerTarget = $("#player-original")[0];
const playerResult = $("#player-matchered")[0];
// const previewPause = $("#preview-pause");
const previewPause = $("#play-pause-btns");
const previewOriginal = $("#preview-original");
const previewMatchered = $("#preview-matchered");
const previewPlayer = $("#preview-player");
const waveGIF = $("#stage-process-source-only").find('[class*="hwe__wave"]')[0];
const playerBtnboth = $('.hwe__play-border');

function toggleVolume(result = true) {
    playerTarget.volume = +!result;
    playerResult.volume = +result;
}

function togglesWereNotTouched() {
    return playerTarget.volume === 1 && playerResult.volume === 1;
}

function audioPlay() {
    playerTarget.play();
    playerResult.play();
    previewPlayer.addClass("preview-player-playing");
    $("#stage-process-source-only > div.hwe__wave.my-5").css("display", "flex");
    playerBtnboth.css('background', '#1FEAC8');
}

function audioPause() {
    playerTarget.pause();
    playerResult.pause();
    previewPlayer.removeClass("preview-player-playing");
    $("#stage-process-source-only > div.hwe__wave.my-5").css("display", "none");
    playerBtnboth.css('background', '#E6E6E6');
}

function audioIsPlaying() {
    return playerIsPlaying(playerTarget) || playerIsPlaying(playerResult);
}

function pauseHandler() {
    if(!$('#result16').val() || !$('#result24').val()){
        alert("No media to play yet! Make sure the audio files are uploaded and processed!!");
        return false;
    }
    if (!audioIsPlaying()) {
        if (togglesWereNotTouched()) {
            toggleVolume(true);
        }
        audioPlay();
    } else {
        audioPause();
    }
}

function originalHandler() {
    previewPlayer.addClass("preview-player-original");
    previewMatchered.removeClass("active");
    previewOriginal.addClass("active");
    toggleVolume(false);
}

function matcheredHandler() {
    previewOriginal.removeClass("active");
    previewMatchered.addClass('active');
    previewPlayer.removeClass("preview-player-original");
    toggleVolume(true);
}

previewPause.click(pauseHandler);
previewOriginal.click(originalHandler);
previewMatchered.click(matcheredHandler);
