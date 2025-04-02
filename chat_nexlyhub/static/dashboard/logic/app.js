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

function dropzone(file_type) {
    var progressBar = document.querySelector(`#upload-${file_type} .hwe__progress-line`);
    var uploadStatus = document.querySelector(`#upload-${file_type} .py-2`);
    var uploadText = document.querySelector(`#upload-${file_type} p.fs-5`);

    return new Dropzone(
        `#upload-${file_type}>.upload-zone`, {
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
                    success(file_type);
                    connector.uploadSuccess(file_type);
                });

                this.on("error", function (file, response) {
                    if (!file.accepted) {
                        this.removeFile(file);
                        myAlert("The file format is not supported or the max" +
                            "imum file size (256 MB) has been exceeded.");
                        redrawUpload(file_type);
                    } else {
                        myAlert(response);
                    }
                });
            },
            fallback: function () {
                myAlert("Your browser doesn't support file upload");
            },
            addedfile: added[file_type],
            totaluploadprogress: upload[file_type],
        }
    );
}
var csrfTokenInput = document.getElementById("csrf_token_id");

  // Get the value of the CSRF token
var csrfTokenValue = csrfTokenInput.value;
const connector = {
    token: null,
    alreadyShown: false,
    targetUploaded: false,
    referenceUploaded: false,
    checker: null,
    targetDropzone: null,
    referenceDropzone: null,
    targetKeep: false,
    referenceKeep: false,

    initializeDropZones: function () {
        connector.targetDropzone = dropzone("target");
        connector.referenceDropzone = dropzone("reference");
    },

    updateDropZoneUrl: function (fileType) {
        let dz = connector[`${fileType}Dropzone`];
        dz.removeAllFiles(true);
         dz.options.headers = {
            'X-CSRFToken': csrfTokenValue,
        };
        dz.options.url = `/api/upload/${connector.token}/${fileType}/`;
    },

    createSession: function (targetKeep = false, referenceKeep = false) {
        console.log("post call initiated for creating sessions")
        $.post({
            url: "/api/session/",
            data: JSON.stringify({
                "previous": connector.token,
                "keep_target": targetKeep,
                "keep_reference": referenceKeep
            }),
            headers: {
                'X-CSRFToken': csrfTokenValue,
            },
            success: function (json) {
                console.log("Session created successfully", json)
                connector.token = json.token;
                if (connector.token && !connector.alreadyShown) {
                    console.log("token received and attempting to display the page")
                    showPage();
                    connector.alreadyShown = true;
                }
                if (connector.token) {
                    if (!targetKeep) {
                        connector.updateDropZoneUrl("target");
                        connector.targetUploaded = false;
                    }
                    if (!referenceKeep) {
                        connector.updateDropZoneUrl("reference");
                        connector.referenceUploaded = false;
                    }
                } else {
                    myAlert("System error! The token is not issued by the " +
                        "server side. Try restarting the container.");
                }
            }
        });
    },

    uploadSuccess: function (fileType) {
        this[`${fileType}Uploaded`] = true;
        if (this.targetUploaded && this.referenceUploaded) {
            console.log("target and reference both seems to be uploaded");
            showStageProcess();
            console.log("After showstageprocess call in upload success", connector.checkSession)
            connector.checker = setInterval(connector.checkSession, 1000);
            console.log("check session call every second", connector.checker);
        }
    },

    checkSession: function () {
        $.getJSON(`/api/session/${connector.token}/`, function (json) {
            updateStatus(json.code);
            console.log("Session check", json)
            if (json.code === 2010) {
                showStageResult(json);
                console.log("Trying to clear connector.checker interval");
                clearInterval(connector.checker);
                console.log("Connector checker interval status", connector.checker);
            } else if (Math.floor(json.code / 1000) === 4) {
                console.log("Inside error else if", json.code);
                showError();
                clearInterval(connector.checker);
                console.log("Clearing interval check", connector.checker);
            }
        });
    },

    restart: function (targetKeep = false, referenceKeep = false) {
        redrawAll(targetKeep, referenceKeep);
        connector.createSession(targetKeep, referenceKeep);
    },

    restartNoKeep: function () {
        connector.restart(false, false);
    },

    restartKeep: function () {
        connector.restart(connector.targetKeep, connector.referenceKeep);
    }
};

 $(window).on("load", function () {
     $.when(connector.initializeDropZones()).then(function () {
         console.log("Connector created and dropzones initialised")
         connector.createSession(false, false);
     });
 });


$(window).on("load", function () {
    disableElements();
});


$('button#o-tab-refernce').on("click", function(e){
    if(connector.targetDropzone && connector.referenceDropzone){
        connector.restartKeep();
    }else{
        $.when(connector.initializeDropZones()).then(function () {
            console.log("Connector created and dropzones initialised from reference tab");
            connector.createSession(false, false);
        });
    }
    disableElements();
});


$("#process_cancel").click(function () {
    connector.restartNoKeep();
});

$("#another").click(function () {
    connector.restartKeep();
});
