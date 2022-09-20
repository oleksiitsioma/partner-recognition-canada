'use strict'

// HEADER

const menuOpener = document.getElementById('menu-opener');

const header = document.querySelector('header');

const body = document.querySelector('body');

menuOpener.addEventListener("click", function(){
    if(header.classList.contains("header_mobile_open")){
        header.classList.remove("header_mobile_open");
        body.classList.remove('menu-opened');
    } else {
        body.classList.add('menu-opened');
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

const tabLabels = document.querySelectorAll('.fmc-tabs');

function tabsObject(labelArea) {
    let tabs = labelArea.querySelector('.fmc-tabs__tablist');
    tabs = tabs.getAttribute('aria-label');
    tabs = document.querySelector(`*[aria-tabs="${tabs}"]`);

    const object = {
        labels: labelArea,
        tabs: tabs
    }

    return object;
}

function tabsReset(obj) {
    let tabControls = obj.labels;
    let tabs = obj.tabs;
    console.log(tabControls);
    console.log(tabs);

    // tabControls[0].setAttribute("aria-selected", "true");
    // tabs[0].classList.add('fmc-tabs__tabpanel--active');
    // tabControls[0].classList.remove('fds-color__text--gray2');
    // tabControls[0].classList.add('fds-color__text--secondary');
}

for(let i=0; i<tabLabels.length; i++){
    tabsReset(tabsObject(tabLabels[i]));
}