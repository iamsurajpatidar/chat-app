function showSuccessMsg(message){
        const wrapper = document.getElementsByClassName('hwe__alert-wrapper');
            if (wrapper) {
                const html = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                     <span class="form-title-clr fs-14">${message}</span>
                                     <button type="button" class="btn-close shadow-none form-lable-clr" data-bs-dismiss="alert" aria-label="Close"><i class="bi bi-x-lg"></i></button>
                                    </div>`
                const childWrapper = document.getElementsByClassName('event-alert');
                childWrapper[0].innerHTML = html;
                 const scriptElement = document.createElement('script');
            scriptElement.innerHTML = `
                setTimeout(function () { $('.alert').alert('close') }, 9000);
            `;
            document.body.appendChild(scriptElement);
            }
        }

function showErrorMsg(message){
        const wrapper = document.getElementsByClassName('hwe__alert-wrapper');
            if (wrapper) {
                const html = `<div class="alert alert-error alert-dismissible fade show" role="alert">
                                     <span class="form-title-clr fs-14">${message}</span>
                                     <button type="button" class="btn-close shadow-none form-lable-clr" data-bs-dismiss="alert" aria-label="Close"><i class="bi bi-x-lg"></i></button>
                                    </div>`
                const childWrapper = document.getElementsByClassName('event-alert');
                childWrapper[0].innerHTML = html;
                 const scriptElement = document.createElement('script');
            scriptElement.innerHTML = `
                setTimeout(function () { $('.alert').alert('close') }, 9000);
            `;
            document.body.appendChild(scriptElement);
            }
        }
