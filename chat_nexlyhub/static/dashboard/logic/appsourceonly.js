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

function sourceonlydropzone(file_type) {
    var progressBar = document.querySelector(`#upload-${file_type}-source-only .hwe__progress-line`);
    var uploadStatus = document.querySelector(`#music-source-only-target`);
    var uploadText = document.querySelector(`#upload-${file_type}-source-only p.fs-5`);

    return new Dropzone(
        `#upload-${file_type}-source-only>.upload-zone`, {
            url: `dummy`,
            maxFilesize: 256,
            previewTemplate: "<div style=\"display:none\"></div>",
            previewsContainer: false,
            createImageThumbnails: false,
            acceptedFiles: ".wav,.flac,.aif,.aiff,.aifc,.mp3,.m4a," +
                ".mp4,.ogg,.mp2,.aac,.3gp,.ape",
            init: function () {
                this.on("uploadprogress", function(file, progress) {
                    progressBar.style.width = progress + "%";
                    uploadText.textContent = "Uploading " + file_type + " file";
                });

                this.on("success", function (file) {
                    uploadStatus.textContent = file.name;
                    uploadText.textContent = "Uploaded " + file_type + " file";
                    successsourceonly(file_type);
                    sourceonlyconnector.uploadSuccess(file_type);
                });

                this.on("error", function (file, response) {
                    if (!file.accepted) {
                        this.removeFile(file);
                        mysourceonlyAlert("The file format is not supported or the max" +
                            "imum file size (256 MB) has been exceeded.");
                        redrawsourceonlyUpload(file_type);
                    } else {
                        mysourceonlyAlert(response);
                    }
                });
            },
            fallback: function () {
                mysourceonlyAlert("Your browser doesn't support file upload");
            },
            addedfile: addedsourceonly[file_type],
            totaluploadprogress: uploadsourceonly[file_type],
        }
    );
}
var csrfTokenInput = document.getElementById("csrf_token_id");

  // Get the value of the CSRF token
var csrfTokenValue = csrfTokenInput.value;

const sourceonlyconnector = {
    token: null,
    alreadyShown: false,
    targetUploaded: false,
    checker: null,
    targetDropzone: null,
    targetKeep: false,

    initializeDropZones: function () {
        sourceonlyconnector.targetDropzone = sourceonlydropzone("target");
    },

    updateDropZoneUrl: function (fileType) {
        console.log("Got into updateDropZoneUrl", fileType);
        let dz = sourceonlyconnector[`${fileType}Dropzone`];
        dz.removeAllFiles(true);
        console.log("Trying to update the dropzone url with api target end point", dz);
        dz.options.headers = {
            'X-CSRFToken': csrfTokenValue,
        };
        dz.options.url = `/api/uploadsourceonly/${sourceonlyconnector.token}/${fileType}/`;
        console.log("Is it really updated? ", dz);
    },

    createSession: function (targetKeep = false) {
        console.log("post call initiated for creating sessions");
        $.post({
            url: "/api/sessionsourceonly/",
            data: JSON.stringify({
                "previous": sourceonlyconnector.token,
                "keep_target": targetKeep
            }),
            headers: {
                'X-CSRFToken': csrfTokenValue,
            },
            success: function (json) {
                console.log("Session created successfully", json)
                sourceonlyconnector.token = json.token;
                if (sourceonlyconnector.token && !sourceonlyconnector.alreadyShown) {
                    console.log("token received and attempting to display the page", sourceonlyconnector.token);
                    showsourceonlyPage();
                    console.log("After sourceonly page");
                    sourceonlyconnector.alreadyShown = true;
                }
                if (sourceonlyconnector.token) {
                    console.log("checking if token is present before sending to updatedropzoneurl");
                    if (!targetKeep) {
                        console.log("Checked that targetkeep is not set, calling updatedropzone url now, fingers crossed");
                        sourceonlyconnector.updateDropZoneUrl("target");
                        sourceonlyconnector.targetUploaded = false;
                    }
                } else {
                    mysourceonlyAlert("System error! The token is not issued by the " +
                        "server side. Try restarting the container.");
                }
            }

        });
    },

    uploadSuccess: function (fileType) {
        this[`${fileType}Uploaded`] = true;
        if (this.targetUploaded) {
            console.log("target and reference both seems to be uploaded");
            showsourceonlyStageProcess();
            console.log("After showstageprocess call in upload success", sourceonlyconnector.checkSession)
            sourceonlyconnector.checker = setInterval(sourceonlyconnector.checkSession, 1000);
            console.log("check session call every second", sourceonlyconnector.checker);
        }
    },

    checkSession: function () {
        $.getJSON(`/api/sessionsourceonly/${sourceonlyconnector.token}/`, function (json) {
            updatesourceonlyStatus(json.code);
            console.log("Session check", json)
            if (json.code === 2010) {
                console.log("I got into 2010, arey you continouing?")
                showsourceonlyStageResult(json);
                console.log("Trying to clear sourceonlyconnector.checker interval");
                clearInterval(sourceonlyconnector.checker);
                console.log("sourceonly checker interval status", sourceonlyconnector.checker);
            } else if (Math.floor(json.code / 1000) === 4) {
                console.log("Inside error else if", json.code);
                showsourceonlyError();
                clearInterval(sourceonlyconnector.checker);
                console.log("Clearing interval check", sourceonlyconnector.checker);
            }
        });
    },

    restart: function (targetKeep = false) {
        redrawsourceonlyAll(targetKeep);
        sourceonlyconnector.createSession(targetKeep);
    },

    restartNoKeep: function () {
        sourceonlyconnector.restart(false);
    },

    restartKeep: function () {
        sourceonlyconnector.restart(sourceonlyconnector.targetKeep);
    }
};

$(window).on("load", function () {
    disableElementsSourceOnly();
    $.when(sourceonlyconnector.initializeDropZones()).then(function () {
        console.log("sourceonly created and dropzones initialised")
        sourceonlyconnector.createSession(false);
    });
});


$('button#o-tab-upstrm').on("click", function(e){
    if(sourceonlyconnector.targetDropzone){
        sourceonlyconnector.restartKeep();
    }else{
        $.when(sourceonlyconnector.initializeDropZones()).then(function () {
            console.log("Connector created and dropzones initialised from reference tab");
            sourceonlyconnector.createSession(false, false);
        });
    }
    disableElementsSourceOnly();
    // connector.restart(false,false,true);
});

$("#process_cancel_source_only").click(function () {
    sourceonlyconnector.restartNoKeep();
});

$("#another-sourceonly").click(function () {
    sourceonlyconnector.restartKeep();
});
