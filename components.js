const classes$3 = {
  BOOTSTRAPPED: 'bootstrapped',
};

// eslint-disable-next-line no-unused-vars

/**
 *
 * @param {HTMLElement} element The element that will be bootstrapped.
 */
class FDSComponent {
  /**
   * Check if an element is bootstrapped.
   * @param {HTMLElement} element The element to test if its already be bootstrapped.
   * @returns {boolean} Returns true if element is already bootstrapped
   */
  static isElementBootstrapped(element) {
    return element.classList.contains(classes$3.BOOTSTRAPPED);
  }

  /**
   * Constructor
   * @constructor
   * @param {HTMLElement} element The element of the FDS component.
   * @param {String} namespace The namespace of the FDS component, like `FDSComponent`.
   */
  constructor(element, namespace) {
    this.fdsElement = element;

    this.isIE11 = this.isIE11();

    if (this.fdsElement) {
      if (namespace) {
        this.fdsElement[namespace] = this;
      }
      this.init();
    }
  }

  /**
   * Initialize component
   */
  init() {
    this.fdsElement.classList.add(classes$3.BOOTSTRAPPED);
  }

  /**
   * Check if browser is IE11
   */
  isIE11() {
    const ua = window.navigator.userAgent;
    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      const rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    return false;
  }

  /**
   * Remove a child element from its parent.
   * @param {HTMLElement} childNode The element to remove.
   */

  removeChild(childNode) {
    if (childNode && childNode.parentNode) {
      childNode.remove();
    }
  }

  /**
   * Creates an HTML element and sets the given CSS classes and attributes.
   * @param {string} elTagName is a string that specifies the type of element to be created.
   * @param {Array} elClasses is an array of class names to set, e.g. ['fds-class-1', 'fds-class-2'].
   * @param {Object} elAttributes is an object with attributes to set, e.g. {width: 100}.
   * @returns {HTMLElement} The created element.
   */

  createElement(elTagName, elClasses, elAttributes) {
    const element = document.createElement(elTagName);
    if (elClasses && elClasses.length) {
      if (Array.isArray(elClasses)) {
        elClasses.forEach((elClass) => {
          element.classList.add(elClass);
        });
      } else {
        element.classList.add(elClasses);
      }
    }
    if (elAttributes) {
      Object.entries(elAttributes).forEach((attribute) => {
        element.setAttribute(attribute[0], attribute[1]);
      });
    }
    return element;
  }

  /**
   * Creates an HTML element and sets the given CSS classes and attributes.
   * @param {string} selector is a string that specifies the selector of the requested element.
   * @returns {HTMLElement} The fetched element.
   */
  getElement(selector) {
    return this.element.querySelector(selector);
  }

  /**
   * Creates an HTML element and sets the given CSS classes and attributes.
   * @param {string} selector is a string that specifies the selector of the requested element.
   * @returns {[HTMLElement]} The fetched elements.
   */
  getElements(selector) {
    return this.element.querySelectorAll(selector);
  }

  /**
   * Returns the HTMLElement of component.
   */
  get element() {
    return this.fdsElement;
  }
}

const classes$2 = {
  COMPONENT: 'js-fmc-accordion',
  PANEL: 'fmc-accordion__panel',
  BUTTON: 'fmc-accordion__button',
  BUTTON_TEXT: 'fmc-accordion__button-text',
  BODY: 'fmc-accordion__body',
  CONTENT: 'fmc-accordion__content',
  ACTIVE: 'fmc-accordion--active',
  EXPANDED: 'fmc-accordion--expanded',
};

const attributes$2 = {
  ID: 'id',
  ARIA_LABELLEDBY: 'aria-labelledby',
  ARIA_HIDDEN: 'aria-hidden',
  ARIA_EXPANDED: 'aria-expanded',
  ARIA_CONTROLS: 'aria-controls',
};

const strings = {
  HOME: 'home',
  END: 'end',
  PREV: 'prev',
  NEXT: 'next',
};

const states = {
  CLOSING: 'closing',
  OPENING: 'opening',
  OPEN: 'open',
  CLOSED: 'closed',
};

const keyCodes$1 = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  TAB: 9,
  ENTER: 13,
  HOME: 36,
  END: 35,
  SPACE: 32,
  ESC: 27,
};

function forceCssReflow(element) {
  // Reading an element's offset height forces its CSS to reflow.
  return element.offsetHeight;
}

/**
 * Class constructor for FMCAccordion FDS component.
 *
 * @param {HTMLElement} element The element that will be bootstrapped.
 */
class FMCAccordion extends FDSComponent {
  static bootstrapComponents() {
    const components = [];

    Array.prototype.forEach.call(document.querySelectorAll(`.${classes$2.COMPONENT}`), (element) => {
      if (!FDSComponent.isElementBootstrapped(element)) {
        components.push(new FMCAccordion(element));
      }
    });

    return components;
  }

  init() {
    super.init();

    this.accordionPanels = this.getElements(`.${classes$2.PANEL}`);

    this.currentPanelFocus = 0;

    this.accordionPanels.forEach((panel, index) => {
      panel.buttonElement = panel.querySelector(`.${classes$2.BUTTON}`);
      panel.bodyElement = panel.querySelector(`.${classes$2.BODY}`);
      panel.contentElement = panel.querySelector(`.${classes$2.CONTENT}`);
      this.setPanelState(panel, panel.classList.contains(classes$2.EXPANDED) ? states.OPEN : states.CLOSED);

      panel.buttonElement.addEventListener('click', () => this.onClick(panel, index));
      panel.buttonElement.addEventListener('keyup', (event) => this.onKeyup(event));
      panel.buttonElement.addEventListener('keydown', (event) => this.onKeydown(event));
      panel.buttonElement.addEventListener('blur', () => this.onBlur(panel));
      panel.bodyElement.addEventListener('transitionend', (event) => this.onTransitionEnd(panel, event));

      if (panel.classList.contains(classes$2.ACTIVE)) {
        this.currentPanelFocus = index;
        panel.buttonElement.focus();
      }
    });
  }

  setPanelState(panel, state) {
    panel.state = state;

    switch (state) {
      case states.CLOSED:
        panel.bodyElement.style.height = 0;
        // Hidden visibility makes focusable elements not focusable, so it is used instead of aria-hidden.
        panel.contentElement.style.visibility = 'hidden';
        panel.buttonElement.setAttribute(attributes$2.ARIA_EXPANDED, 'false');
        panel.buttonElement.setAttribute(attributes$2.ARIA_HIDDEN, 'true');
        break;
      case states.CLOSING:
        // Set the height to the content height before closing. This is necessary because the CSS
        // transition will not run when the height changes from "auto" to "0".
        panel.bodyElement.style.height = `${panel.contentElement.offsetHeight}px`;
        forceCssReflow(panel.bodyElement);
        panel.bodyElement.style.height = 0;
        panel.contentElement.style.visibility = 'visible';
        panel.buttonElement.setAttribute(attributes$2.ARIA_EXPANDED, 'false');
        panel.buttonElement.setAttribute(attributes$2.ARIA_HIDDEN, 'true');
        break;
      case states.OPENING:
        panel.bodyElement.style.height = `${panel.contentElement.offsetHeight}px`;
        panel.contentElement.style.visibility = 'visible';
        panel.buttonElement.setAttribute(attributes$2.ARIA_EXPANDED, 'true');
        panel.buttonElement.setAttribute(attributes$2.ARIA_HIDDEN, 'false');
        break;
      case states.OPEN:
        panel.bodyElement.style.height = `auto`; // Let the body's height change freely with its content.
        panel.contentElement.style.visibility = 'visible';
        panel.buttonElement.setAttribute(attributes$2.ARIA_EXPANDED, 'true');
        panel.buttonElement.setAttribute(attributes$2.ARIA_HIDDEN, 'false');
        break;
    }
  }

  expandPanel(panel) {
    panel.classList.add(classes$2.EXPANDED);
    if (panel.state !== states.OPEN) {
      this.setPanelState(panel, states.OPENING);
    }
  }

  collapsePanel(panel) {
    panel.classList.remove(classes$2.EXPANDED);
    if (panel.state !== states.CLOSED) {
      this.setPanelState(panel, states.CLOSING);
    }
  }

  navigatePanels(direction) {
    this.accordionPanels[this.currentPanelFocus].focused = false;
    this.accordionPanels[this.currentPanelFocus].classList.remove(classes$2.ACTIVE);

    switch (direction) {
      case strings.HOME:
        this.currentPanelFocus = 0;
        break;
      case strings.END:
        this.currentPanelFocus = this.accordionPanels.length - 1;
        break;
      case strings.NEXT:
        this.currentPanelFocus += 1;
        break;
      case strings.PREV:
        this.currentPanelFocus -= 1;
        break;
      default:
        this.currentPanelFocus = 0;
        break;
    }

    if (this.currentPanelFocus > this.accordionPanels.length - 1) this.currentPanelFocus = 0;
    if (this.currentPanelFocus < 0) this.currentPanelFocus = this.accordionPanels.length - 1;

    this.focus(this.accordionPanels[this.currentPanelFocus].querySelector(`.${classes$2.BUTTON}`));
  }

  focus(buttonElement) {
    const panelElement = buttonElement.closest(`.${classes$2.PANEL}`);
    panelElement.focused = true;
    panelElement.classList.add(classes$2.ACTIVE);
    buttonElement.focus();
  }

  onLoad(panel) {
    if (panel.classList.contains(classes$2.EXPANDED)) {
      this.expandPanel(panel);
    } else {
      this.collapsePanel(panel);
    }
  }

  onClick(panel, index) {
    this.currentPanelFocus = index;
    panel.classList.add(classes$2.ACTIVE);

    if (panel.classList.contains(classes$2.EXPANDED)) {
      this.collapsePanel(panel);
    } else {
      this.expandPanel(panel);
    }
  }

  onBlur(panel) {
    panel.classList.remove(classes$2.ACTIVE);
    panel.focused = false;
  }

  onKeyup(event) {
    switch (event.keyCode) {
      case keyCodes$1.TAB:
        this.focus(event.target);
        break;
      case keyCodes$1.SPACE:
        event.preventDefault();
        break;
    }
  }

  onKeydown(event) {
    switch (event.keyCode) {
      case keyCodes$1.ENTER:
      case keyCodes$1.SPACE:
        event.preventDefault();
        event.target.click();
        break;
      case keyCodes$1.LEFT:
      case keyCodes$1.UP:
        event.preventDefault();
        this.navigatePanels(strings.PREV);
        break;
      case keyCodes$1.RIGHT:
      case keyCodes$1.DOWN:
        event.preventDefault();
        this.navigatePanels(strings.NEXT);
        break;
      case keyCodes$1.END:
        event.preventDefault();
        this.navigatePanels(strings.END);
        break;
      case keyCodes$1.HOME:
        event.preventDefault();
        this.navigatePanels(strings.HOME);
        break;
    }
  }

  onTransitionEnd(panel, event) {
    if (event.target === panel.bodyElement) {
      if (panel.state === states.CLOSING) {
        this.setPanelState(panel, states.CLOSED);
      } else {
        this.setPanelState(panel, states.OPEN);
      }
    }
  }

  expandAll() {
    this.accordionPanels.forEach((panel) => {
      if (panel.state === states.CLOSED) this.expandPanel(panel);
    });
  }

  collapseAll() {
    this.accordionPanels.forEach((panel) => {
      if (panel.state === states.OPEN) this.collapsePanel(panel);
    });
  }
}

const classes$1 = {
  COMPONENT: 'js-fmc-tabs',
  HORIZONTAL: 'fmc-tabs--horizontal',
  VERTICAL: 'fmc-tabs--vertical',
  TAB_LIST_WRAPPER: 'fmc-tabs__tablist-wrapper',
  TAB_LIST: 'fmc-tabs__tablist',
  TAB: 'fmc-tabs__tab',
  TAB_BORDER: 'fmc-tabs__tab-border',
  TAB_PANELS: 'fmc-tabs__tabpanels',
  TAB_PANEL: 'fmc-tabs__tabpanel',
  HOVER: 'fmc-tabs__tab--hover',
  ACTIVE: 'fmc-tabs__tab--active',
  ACTIVE_PANEL: 'fmc-tabs__tabpanel--active',
  FOCUSED_PANEL: 'fmc-tabs__tabpanel--focus',
  FOCUSED: 'fmc-tabs__tab--focused',
};

const attributes$1 = {
  ARIA_SELECTED: 'aria-selected',
  ARIA_CONTROLS: 'aria-controls',
  TABINDEX: 'tabindex',
};

const keyCodes = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  TAB: 9,
  ENTER: 13,
  HOME: 36,
  END: 35,
};

/**
 * Class constructor for FDSTabs FDS component.
 *
 * @param {HTMLElement} element The element that will be bootstrapped.
 */
class FMCTabs extends FDSComponent {
  /**
   * Bootstraps all FDSTabs components.
   * @returns {Array} Returns an array of all newly upgraded components.
   */
  static bootstrapComponents() {
    const components = [];

    Array.prototype.forEach.call(document.querySelectorAll(`.${classes$1.COMPONENT}`), (element) => {
      if (!FDSComponent.isElementBootstrapped(element)) {
        components.push(new FMCTabs(element));
      }
    });

    return components;
  }

  init() {
    super.init();

    // Initialize selectors
    this.tabListWrapperElement = this.fdsElement.querySelector(`.${classes$1.TAB_LIST_WRAPPER}`);
    this.tabListElement = this.fdsElement.querySelector(`.${classes$1.TAB_LIST}`);
    this.tabElements = this.fdsElement.querySelectorAll(`.${classes$1.TAB}`);
    this.tabBorderElement = this.fdsElement.querySelector(`.${classes$1.TAB_BORDER}`);
    this.tabPanelsElement = this.fdsElement.querySelector(`.${classes$1.TAB_PANELS}`);
    this.tabPanelElements = this.fdsElement.querySelectorAll(`.${classes$1.TAB_PANEL}`);

    if (this.tabElements.length > 0) {
      this.horizontal = true;
      this.vertical = this.fdsElement.classList.contains(classes$1.VERTICAL);

      [...this.tabElements].forEach((tab) => {
        tab.addEventListener('click', (this.tabClickHandler = (event) => this.onTabClick(event)));
        tab.addEventListener('keydown', (this.tabKeydownHandler = (event) => this.onTabKeydown(event)));
      });

      [...this.tabPanelElements].forEach((tabPanel) => {
        tabPanel.addEventListener('keydown', (this.tabPanelKeydownHandler = (event) => this.onTabPanelKeydown(event)));
        tabPanel.addEventListener('blur', (this.tabPanelBlurHandler = (event) => this.onTabPanelBlur(event)));
      });

      this.tabSelectedElement = [...this.tabElements].find(
        (tab) => tab.getAttribute(attributes$1.ARIA_SELECTED).toLowerCase() === 'true'
      );

      this.activateTab(this.tabSelectedElement);
      document.fonts.ready.then(() => {
        this.setSelectedTabBorder(this.tabSelectedElement);
      });
    }
  }

  findSelectedIndex(event) {
    this.selectedTabIndex = [...this.tabElements].findIndex((tab) => tab === event.target);
  }

  focusTab(tab) {
    tab.focus();
    tab.click();
    tab.scrollIntoView();
  }

  setSelectedTabBorder(tab) {
    const newWidth = `${tab.getBoundingClientRect().width}px`;
    this.tabBorderElementPos = this.tabBorderElement.offsetLeft;
    let newBorderPos;

    if (tab.offsetLeft === 0) {
      newBorderPos = '0px';
    } else {
      newBorderPos = `${this.tabBorderElementPos + tab.offsetLeft}px`;
    }

    this.tabListWrapperElement.style.setProperty('--tab-selected-border-transform', `translateX(${newBorderPos})`);
    this.tabListWrapperElement.style.setProperty('--tab-selected-border-width', newWidth);
    this.tabListWrapperElement.style.setProperty('--tab-selected-border-display', 'block');
  }

  activateTab(tab) {
    // Deactivate all other tabs
    this.deactivateTabs();

    // Set the tab as selected
    tab.setAttribute(attributes$1.ARIA_SELECTED, 'true');
    tab.setAttribute(attributes$1.TABINDEX, 0);
    tab.classList.add(classes$1.ACTIVE);

    // Get the value of aria-controls (which is an ID) to set the panel correctly
    const panelControl = tab.getAttribute(attributes$1.ARIA_CONTROLS);
    this.panelSelectedElement = this.fdsElement.querySelector(`#${panelControl}`);
    this.panelSelectedElement.classList.add(classes$1.ACTIVE_PANEL);
  }

  deactivateTabs() {
    [...this.tabElements].forEach((tab) => {
      tab.setAttribute(attributes$1.ARIA_SELECTED, 'false');
      tab.setAttribute(attributes$1.TABINDEX, -1);
      tab.classList.remove(classes$1.ACTIVE);
    });
    [...this.tabPanelElements].forEach((tabPanel) => {
      tabPanel.classList.remove(classes$1.ACTIVE_PANEL);
    });
  }

  onTabClick(event) {
    this.findSelectedIndex(event);
    this.activateTab(event.target, false);
    this.setSelectedTabBorder(event.target);
  }

  onTabPanelBlur(event) {
    event.target.classList.remove(classes$1.FOCUSED_PANEL);
  }

  onTabKeydown(event) {
    switch (event.keyCode) {
      case keyCodes.TAB:
        event.preventDefault();
        this.findSelectedIndex(event);
        break;
      case keyCodes.END:
        event.preventDefault();
        this.selectedTabIndex = this.tabElements.length - 1;
        break;
      case keyCodes.HOME:
        event.preventDefault();
        this.selectedTabIndex = 0;
        break;
      case keyCodes.RIGHT:
        event.preventDefault();
        if (this.selectedTabIndex === this.tabElements.length - 1) {
          this.selectedTabIndex = 0;
        } else {
          this.selectedTabIndex += 1;
        }
        break;
      case keyCodes.LEFT:
        event.preventDefault();
        if (this.selectedTabIndex === 0) {
          this.selectedTabIndex = this.tabElements.length - 1;
        } else {
          this.selectedTabIndex -= 1;
        }
        break;
      default:
        return;
    }

    this.focusTab(this.tabElements[this.selectedTabIndex]);
  }

  onTabPanelKeydown(event) {
    switch (event.keyCode) {
      case keyCodes.TAB:
        event.preventDefault();
        event.target.classList.add(classes$1.FOCUSED_PANEL);
        break;
    }
  }
}

const classes = {
  COMPONENT: 'js-fmc-tooltip',
  TOOLTIP: 'fmc-tooltip',
  POPUP_TOOLTIP: 'fmc-tooltip--popup',
  TRIGGER: 'fmc-tooltip__trigger',
  CONTENT: 'fmc-tooltip__content',
  WRAPPER: 'fmc-tooltip__wrapper',
  POINTER: 'fmc-tooltip__pointer',
  POINTER_FIX: 'fmc-tooltip__pointer-fix',
  OPENED: 'fmc-tooltip--opened',
  FOCUSED: 'fmc-tooltip--focused',
  TOP: 'fmc-tooltip--top',
  RIGHT: 'fmc-tooltip--right',
  BOTTOM: 'fmc-tooltip--bottom',
  LEFT: 'fmc-tooltip--left',
  MEASURE: 'fmc-tooltip__content--measure',
  CLOSE_BTN: 'fmc-tooltip__close',
  CLEAR_ICON: 'fds-font--ford-icons__clear',
  FDS_ICON: 'fds-icon',
  HEADER: 'fmc-tooltip__header',
  BODY: 'fmc-tooltip__body',
  MOBILE: 'fmc-tooltip--mobile',
};

const attributes = {
  ID: 'id',
  DATA_POSITION: 'data-position',
  DATA_SLUG: 'data-slug',
  DATA_POPUP_TIP: 'data-popup-tip',
};

/**
 * Class constructor for FMCTooltip FDS component.
 *
 * @param {HTMLElement} element The element that will be bootstrapped.
 */
class FMCTooltip extends FDSComponent {
  static bootstrapComponents() {
    const components = [];

    Array.prototype.forEach.call(document.querySelectorAll(`.${classes.COMPONENT}`), (element) => {
      if (!FDSComponent.isElementBootstrapped(element)) {
        components.push(new FMCTooltip(element));
      }
    });

    return components;
  }

  init() {
    super.init();

    this.focusableSelector =
      'body, a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

    this.slug = this.fdsElement.getAttribute(attributes.DATA_SLUG);
    this.position = this.fdsElement.getAttribute(attributes.DATA_POSITION);
    this.isPopupTip = this.fdsElement.hasAttribute(attributes.DATA_POPUP_TIP);
    this.opened = false;

    this.mq = {
      small: '(max-width: 600px)',
    };

    this.triggerElement = this.getElement(`.${classes.TRIGGER}`);
    this.wrapperElement = this.getElement(`.${classes.WRAPPER}`);
    this.contentElement = this.getElement(`.${classes.CONTENT}`);

    if (this.isPopupTip) {
      this.headerElement = this.getElement(`.${classes.HEADER}`);
      this.bodyElement = this.getElement(`.${classes.BODY}`);
    }

    this.appendPointer();

    if (this.position === 'auto') {
      setTimeout(() => {
        // allow a paint before calculating position
        this.autoPosition();
      }, 1);
    } else {
      this.setPosition(this.position);
    }

    // TODO: figure out why this needs to be in a setTimeout to calculate correctly
    setTimeout(() => {
      this.shiftOffScreenContent();
    }, 500);

    if (this.isPopupTip) {
      this.fdsElement.classList.add(classes.POPUP_TOOLTIP);
      this.addCloseBtn();
      this.determineMobile();
    }

    this.addA11yAttributes();

    this.focusableElements = this.contentElement.querySelectorAll(this.focusableSelector);

    this.onKeyUp = (event) => this.handleKeyUp(event);
    this.onTriggerUp = (event) => this.handleTriggerUp(event);
    this.onClick = () => this.handleClick();
    this.onBlur = () => this.handleBlur();
    this.onMouseover = () => this.handleMouseover();
    this.onMouseout = () => this.handleMouseout();
    this.onResize = () => this.determineMobile();

    if (this.isPopupTip) {
      window.addEventListener('resize', this.onResize);
    }

    this.initEventListeners();
  }

  initEventListeners() {
    this.fdsElement.addEventListener('keyup', this.onKeyUp);
    this.triggerElement.addEventListener('keyup', this.onTriggerUp);

    if (this.isPopupTip) {
      this.triggerElement.addEventListener('click', this.onClick);
    } else {
      this.triggerElement.addEventListener('mouseover', this.onMouseover);
      this.triggerElement.addEventListener('mouseout', this.onMouseout);
      this.triggerElement.addEventListener('blur', this.onBlur);
    }
  }

  destroyEventListeners() {
    this.fdsElement.removeEventListener('keyup', this.onKeyUp);
    this.triggerElement.removeEventListener('keyup', this.onTriggerUp);
    this.triggerElement.removeEventListener('blur', this.onBlur);
    window.removeEventListener('resize', this.onResize);

    if (this.isPopupTip) {
      this.triggerElement.removeEventListener('click', this.onClick);
    } else {
      this.triggerElement.removeEventListener('mouseover', this.onMouseover);
      this.triggerElement.removeEventListener('mouseout', this.onMouseout);
    }
  }

  measureWidth() {
    // this creates a temporary content element to measure the width of then destroys it

    const text = this.contentElement.innerText;
    const measure = document.createElement('div');

    measure.innerText = text;
    measure.classList.add(classes.CONTENT);
    measure.classList.add(classes.MEASURE);

    this.fdsElement.appendChild(measure);

    const measureElement = window.getComputedStyle(this.fdsElement.querySelector(`.${classes.MEASURE}`));

    this.wrapperElement.style.width = measureElement.width;
    measure.remove();
  }

  autoPosition() {
    // try to position at top initially
    this.removePositions();
    this.setPosition('top');
    let wrapperRect = this.wrapperElement.getBoundingClientRect();

    // if top is off-screen, set right
    if (wrapperRect.top < 0) {
      wrapperRect = this.wrapperElement.getBoundingClientRect();
      this.removePositions();
      this.setPosition('right');
    }

    // if right is off-screen, set bottom
    if (wrapperRect.right > window.innerWidth) {
      wrapperRect = this.wrapperElement.getBoundingClientRect();
      this.removePositions();
      this.setPosition('bottom');
    }

    // if bottom and right is off-screen, set left
    if (wrapperRect.bottom > window.innerHeight && wrapperRect.right > window.innerWidth) {
      wrapperRect = this.wrapperElement.getBoundingClientRect();
      this.removePositions();
      this.setPosition('left');
    }
  }

  setPosition(position) {
    this.fdsElement.classList.add(classes[position.toUpperCase()]);
  }

  removePositions() {
    this.fdsElement.classList.remove(classes.TOP);
    this.fdsElement.classList.remove(classes.RIGHT);
    this.fdsElement.classList.remove(classes.BOTTOM);
    this.fdsElement.classList.remove(classes.LEFT);
  }

  shiftOffScreenContent() {
    // order here is important. to properly detect an offscreen tooltip
    // we must remove the direction properties before getting contentRect
    this.contentElement.style.removeProperty('top');
    this.contentElement.style.removeProperty('right');
    this.contentElement.style.removeProperty('bottom');
    this.contentElement.style.removeProperty('left');

    const contentRect = this.contentElement.getBoundingClientRect();

    if (!window.matchMedia(this.mq.small).matches) {
      if (contentRect.top < 0) {
        this.contentElement.style.top = `${Math.abs(contentRect.top)}px`;
      } else {
        this.contentElement.style.removeProperty('top');
      }

      if (window.innerWidth - contentRect.right < 0) {
        this.contentElement.style.right = `${Math.abs(window.innerWidth - contentRect.right)}px`;
      } else {
        this.contentElement.style.removeProperty('right');
      }

      if (contentRect.bottom > window.innerHeight) {
        this.contentElement.style.bottom = `${Math.abs(contentRect.bottom - window.innerHeight)}px`;
      } else {
        this.contentElement.style.removeProperty('bottom');
      }

      if (contentRect.left < 0) {
        this.contentElement.style.left = `${Math.abs(contentRect.left)}px`;
      } else {
        this.contentElement.style.removeProperty('left');
      }
    }
  }

  handleKeyUp(event) {
    if (event && event.keyCode === keyCodes$1.ESC) {
      this.close();
      this.triggerElement.focus();
    }

    if (event && !this.opened && event.keyCode === keyCodes$1.ENTER) {
      this.triggerElement.focus();
    }
  }

  handleTriggerUp(event) {
    if (event && event.keyCode === keyCodes$1.TAB) {
      if (!this.isPopupTip) {
        this.open();
      }
    }

    if (event && event.keyCode === keyCodes$1.ENTER) {
      this.closeBTN.focus();
    }

    if (event && event.keyCode === keyCodes$1.SPACE) {
      this.closeBTN.focus();
    }
  }

  handleFocusableDown(event) {
    const firstFocusable = this.focusableElements[0];
    const lastFocusable = this.focusableElements[this.focusableElements.length - 1];

    if (event.keyCode === keyCodes$1.TAB) {
      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  addA11yAttributes() {
    this.wrapperElement.setAttribute('id', this.slug);
    this.wrapperElement.setAttribute('aria-hidden', 'true');

    this.contentElement.querySelectorAll(this.focusableSelector).forEach((element) => {
      element.setAttribute('tabindex', '-1');
    });

    if (this.isPopupTip) {
      this.wrapperElement.setAttribute('role', 'dialog');
      this.headerElement.setAttribute('id', `${this.slug}-header`);
      this.bodyElement.setAttribute('id', `${this.slug}-body`);
      this.wrapperElement.setAttribute('aria-modal', 'true');
      this.wrapperElement.setAttribute('aria-labelledby', `${this.slug}-header`);
      this.wrapperElement.setAttribute('aria-describedby', `${this.slug}-body`);
    } else {
      this.wrapperElement.setAttribute('role', 'tooltip');
      this.triggerElement.setAttribute('aria-describedby', this.slug);
    }
  }

  appendPointer() {
    const pointerElement = document.createElement('span');
    const pointerFixElement = document.createElement('span');

    pointerElement.classList.add(classes.POINTER);
    pointerFixElement.classList.add(classes.POINTER_FIX);

    this.wrapperElement.appendChild(pointerElement);
    this.fdsElement.querySelector(`.${classes.POINTER}`).appendChild(pointerFixElement);
  }

  addCloseBtn() {
    const button = document.createElement('button');

    button.classList.add(classes.CLOSE_BTN);
    button.classList.add(classes.CLEAR_ICON);
    button.classList.add(classes.FDS_ICON);
    button.setAttribute('aria-label', 'close tooltip');

    this.contentElement.appendChild(button);
    this.closeBTN = this.fdsElement.querySelector(`.${classes.CLOSE_BTN}`);

    this.closeBTN.addEventListener('click', () => {
      this.close();
      this.triggerElement.focus();
    });
  }

  determineMobile() {
    if (this.isPopupTip && window.matchMedia(this.mq.small).matches) {
      this.fdsElement.classList.add(classes.MOBILE);
      this.shiftOffScreenContent();
    } else {
      this.fdsElement.classList.remove(classes.MOBILE);
      this.shiftOffScreenContent();
    }
  }

  open() {
    this.opened = true;
    this.fdsElement.classList.add(classes.OPENED);
    this.wrapperElement.setAttribute('aria-hidden', 'false');

    this.contentElement.querySelectorAll(this.focusableSelector).forEach((element) => {
      element.setAttribute('tabindex', '0');
    });
  }

  close() {
    this.opened = false;
    this.fdsElement.classList.remove(classes.OPENED);
    this.wrapperElement.setAttribute('aria-hidden', 'true');

    this.contentElement.querySelectorAll(this.focusableSelector).forEach((element) => {
      element.setAttribute('tabindex', '-1');
    });
  }

  handleClick() {
    if (this.fdsElement.classList.contains(classes.OPENED)) {
      this.close();
      this.triggerElement.focus();
    } else {
      if (this.position === 'auto') {
        this.autoPosition();
      }

      this.shiftOffScreenContent();
      this.open();
    }

    this.focusableElements.forEach((element) => {
      element.addEventListener('keydown', (event) => this.handleFocusableDown(event));
    });
  }

  handleBlur() {
    this.close();
  }

  handleMouseover() {
    this.measureWidth();
    this.open();
  }

  handleMouseout() {
    this.close();
  }
}

export { FMCAccordion, FMCTabs, FMCTooltip };
//# sourceMappingURL=components.js.map
