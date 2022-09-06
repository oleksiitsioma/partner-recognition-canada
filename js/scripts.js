'use strict'

// HEADER

const menuOpener = document.getElementById('menu-opener');

const header = document.querySelector('header');

menuOpener.addEventListener("click", function(){
    if(header.classList.contains("header_mobile_open")){
        header.classList.remove("header_mobile_open");
    } else {
        header.classList.add("header_mobile_open");
    }
})

// END HEADER




// MODALS

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

// END MODALS


// TABS

const tabControls = document.querySelectorAll('.fmc-tabs__tab');
const tabs = document.querySelectorAll('.fmc-tabs__tabpanel');


tabControls[0].setAttribute("aria-selected", "true");
tabs[0].classList.add('fmc-tabs__tabpanel--active');
tabControls[0].classList.remove('fds-color__text--gray2');
tabControls[0].classList.add('fds-color__text--secondary');


function disableTabs() {
    for(let i=0; i<tabControls.length; i++){
        tabControls[i].setAttribute("aria-selected", "false");
        tabControls[i].classList.add('fds-color__text--gray2');
        tabControls[i].classList.remove('fds-color__text--secondary');
    }
    for(let i=0; i<tabs.length; i++){
        tabs[i].classList.remove("fmc-tabs__tabpanel--active");
    }
}

for(let i=0; i<tabControls.length; i++){

    tabControls[i].addEventListener('click', function(){
        disableTabs();
        this.setAttribute("aria-selected", "true");
        this.classList.remove('fds-color__text--gray2');
        this.classList.add('fds-color__text--secondary');
        const tabLabel = tabControls[i].getAttribute('aria-controls');
        const tab = document.querySelector(`.fmc-tabs__tabpanel[aria-labelledby="${tabLabel}"]`);
        tab.classList.add('fmc-tabs__tabpanel--active');
    })
}

// END TABS