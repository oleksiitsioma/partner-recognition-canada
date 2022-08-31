'use strict'

const modalOpeners = document.querySelectorAll('.fmc-button--modalopener');

const modalClosers = document.querySelectorAll('.fmc-dialog__close');

const modals = document.querySelectorAll('.fmc-dialog');

function closeAllModals() {
    for(let i=0; i<modals.length; i++){
        modals[i].classList.remove('fmc-dialog--opened')
    }
}

closeAllModals();

for(let i=0; i<modalOpeners.length; i++){
    modalOpeners[i].addEventListener('click', function(){
        closeAllModals();
        const modalLabel = modalOpeners[i].getAttribute('data-modal-opener');
        const modal = document.querySelector(`.fmc-dialog[data-modal="${modalLabel}"]`);
        modal.classList.add('fmc-dialog--opened')
    })
}

for(let i=0; i<modalClosers.length; i++){
    modalClosers[i].addEventListener('click', function() {
        closeAllModals();
    })
}

