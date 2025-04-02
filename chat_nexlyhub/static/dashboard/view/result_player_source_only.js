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

function playerIsPlayingSourceOnly(player) {
    return !player.paused && !player.ended && 0 < player.currentTime;
}


const playerResult_v1_sourceonly = $("#player-matchered_source_only_v1")[0];
const playerResult_v2_sourceonly = $("#player-matchered_source_only_v2")[0];
const playerResult_v3_sourceonly = $("#player-matchered_source_only_v3")[0];
const playerResult_v4_sourceonly = $("#player-matchered_source_only_v4")[0];
const playerResult_v5_sourceonly = $("#player-matchered_source_only_v5")[0];

const player_original_sourceonly = $('#player-original_source_only')[0];

const previewRange = $("#range");
const waveGIF_sourceonly = $("#stage-process-source-only > div.hwe__wave.my-5");

// const previewPause_sourceonly = $("#preview-pause-source-only");
const previewPause_sourceonly = $("#source-only-play-pause-btns");
const previewPlayer_sourceonly = $("#preview-player-source-only");
const playerBtn = $('#source-only-play-pause-btns');

function toggleVolumeSourceOnly(result = null) {
    if (result === "playerResult_v2_sourceonly"){
        playerResult_v1_sourceonly.volume = 0;
        playerResult_v2_sourceonly.volume = 1;
        playerResult_v3_sourceonly.volume = 0;
        playerResult_v4_sourceonly.volume = 0;
        playerResult_v5_sourceonly.volume = 0;
        player_original_sourceonly.volume = 0;
    }else if(result === "playerResult_v3_sourceonly"){
        playerResult_v1_sourceonly.volume = 0;
        playerResult_v2_sourceonly.volume = 0;
        playerResult_v3_sourceonly.volume = 1;
        playerResult_v4_sourceonly.volume = 0;
        playerResult_v5_sourceonly.volume = 0;
        player_original_sourceonly.volume = 0;
    }else if(result === "playerResult_v4_sourceonly"){
        playerResult_v1_sourceonly.volume = 0;
        playerResult_v2_sourceonly.volume = 0;
        playerResult_v3_sourceonly.volume = 0;
        playerResult_v4_sourceonly.volume = 1;
        playerResult_v5_sourceonly.volume = 0;
        player_original_sourceonly.volume = 0;
    }else if(result === "playerResult_v5_sourceonly"){
        playerResult_v1_sourceonly.volume = 0;
        playerResult_v2_sourceonly.volume = 0;
        playerResult_v3_sourceonly.volume = 0;
        playerResult_v4_sourceonly.volume = 0;
        playerResult_v5_sourceonly.volume = 1;
        player_original_sourceonly.volume = 0;
    }else if(result === "playerResult_v1_sourceonly"){
        playerResult_v1_sourceonly.volume = 1;
        playerResult_v2_sourceonly.volume = 0;
        playerResult_v3_sourceonly.volume = 0;
        playerResult_v4_sourceonly.volume = 0;
        playerResult_v5_sourceonly.volume = 0;
        player_original_sourceonly.volume = 0;
    }else {
        player_original_sourceonly.volume = 1;
        playerResult_v1_sourceonly.volume = 0;
        playerResult_v2_sourceonly.volume = 0;
        playerResult_v3_sourceonly.volume = 0;
        playerResult_v4_sourceonly.volume = 0;
        playerResult_v5_sourceonly.volume = 0;
    }
}

function togglesWereNotTouchedSourceOnly() {
    return playerResult_v1_sourceonly.volume === 1 && playerResult_v2_sourceonly.volume === 1 && playerResult_v3_sourceonly.volume === 1 && playerResult_v4_sourceonly.volume === 1 && playerResult_v5_sourceonly.volume === 1;
}

function audioPlaySourceOnly() {
    player_original_sourceonly.play()
    playerResult_v1_sourceonly.play()
    playerResult_v2_sourceonly.play()
    playerResult_v3_sourceonly.play()
    playerResult_v4_sourceonly.play()
    playerResult_v5_sourceonly.play()
    previewPlayer_sourceonly.addClass("preview-player-playing-source-only");
    waveGIF_sourceonly.css("display", "flex");
    playerBtn.css('background-color', '#1FEAC8');

}

function audioPauseSourceOnly() {
    player_original_sourceonly.pause()
    playerResult_v1_sourceonly.pause()
    playerResult_v2_sourceonly.pause()
    playerResult_v3_sourceonly.pause()
    playerResult_v4_sourceonly.pause()
    playerResult_v5_sourceonly.pause()
    previewPlayer_sourceonly.removeClass("preview-player-playing-source-only");
    waveGIF_sourceonly.css("display", "none");
    playerBtn.css('background-color', '#F0EFF1');
}

function audioIsPlayingSourceOnly() {
    return playerIsPlayingSourceOnly(player_original_sourceonly) || playerIsPlayingSourceOnly(playerResult_v1_sourceonly) || playerIsPlayingSourceOnly(playerResult_v2_sourceonly) || playerIsPlayingSourceOnly(playerResult_v3_sourceonly) || playerIsPlayingSourceOnly(playerResult_v4_sourceonly) || playerIsPlayingSourceOnly(playerResult_v5_sourceonly);
}

function pauseHandlerSourceOnly() {
    if(!$('#result16_v1').val() || !$('#result24_v1').val()){
        alert("No media to play yet! Make sure the audio files are uploaded and processed!!");
        return false;
    }
    if (!audioIsPlayingSourceOnly()) {
        if (togglesWereNotTouchedSourceOnly()) {
            toggleVolumeSourceOnly(true);
        }
        audioPlaySourceOnly();
    } else {
        audioPauseSourceOnly();
    }
}

previewPause_sourceonly.click(pauseHandlerSourceOnly);
previewRange.on('input', function(){
    range_value = previewRange.val();
    console.log("Range value: ", range_value);
    if(range_value === '0'){
        toggleVolumeSourceOnly('player-original_source_only');
    }
    if(range_value === '20'){
        toggleVolumeSourceOnly('playerResult_v1_sourceonly');
    }
    if(range_value === '40'){
        toggleVolumeSourceOnly('playerResult_v2_sourceonly');
    }
    if(range_value === '60'){
        toggleVolumeSourceOnly('playerResult_v3_sourceonly');
    }
    if(range_value === '80'){
        toggleVolumeSourceOnly('playerResult_v4_sourceonly');
    }
    if(range_value === '100'){
        toggleVolumeSourceOnly('playerResult_v5_sourceonly');
    }
})
