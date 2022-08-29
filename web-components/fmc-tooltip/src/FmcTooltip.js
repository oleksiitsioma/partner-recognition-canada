/* eslint-disable import/extensions */
import { html, css, LitElement } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import {
  fade,
  fall,
  flipHorizontal,
  flipVertical,
  scale,
  sign,
  slide,
  superScaled,
} from '../styles/fmc-tooltip.styles.effects';
import { customTooltip, tooltip } from '../styles/fmc-tooltip.styles.tooltip';
import keyCodes from '../../../utilities/constants/keycodes.const';

export default class FmcTooltip extends LitElement {
  static get styles() {
    return [
      css`
        /* stylelint-disable */
        :host {
          display: inline-block;
          position: relative;
          z-index: unset;
        }

        ::slotted([slot='trigger']) {
          position: relative;
          z-index: 2;
        }

        ::slotted([slot='content']) {
          color: var(--fds-color--gray3);
          display: block;
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 1rem;
          cursor: default;
          border-radius: 0.3rem;
          box-sizing: border-box;
          background-color: var(--fds-color--white);
          border: 1px solid var(--fds-color--gray3);
          box-shadow: var(--fmc-elevation__box-shadow--layer3);
          transform: translate(var(--fmc-tooltip-content-offset-x, 0), var(--fmc-tooltip-content-offset-y, 0));
        }

        :host([mobile]) ::slotted([slot='content']) {
          height: 100%;
        }

        :host([position='top']) ::slotted([slot='content']) {
          position: relative;
          top: 1px;
        }

        :host([position='bottom']) ::slotted([slot='content']) {
          position: relative;
          top: -1px;
        }

        :host([brand='lincoln']) ::slotted([slot='content']) {
          color: var(--fds-color--white);
          font-size: 1.3rem;
          padding: 1rem 1.3rem;
          border: 1px solid var(--fds-color--primary);
          background-color: var(--fds-color--primary);
        }

        #trigger {
          display: inline-block;
          cursor: pointer;
        }

        #content {
          visibility: hidden;
          pointer-events: none;
          width: var(--fmc-tooltip-width, 100%);
          height: var(--fmc-tooltip-height, auto);
          position: absolute;
          z-index: -1;
        }

        :host([opened]) #content {
          visibility: visible;
          z-index: 9;
          pointer-events: auto;
        }

        :host([position='top']) #content {
          bottom: calc(100% + var(--fmc-tooltip-gap, 2rem));
          left: 50%;
          transform: translateX(-50%);
        }

        :host([position='right']) #content {
          left: calc(100% + var(--fmc-tooltip-gap, 2rem));
          top: 50%;
          transform: translateY(-50%);
        }

        :host([position='bottom']) #content {
          top: calc(100% + var(--fmc-tooltip-gap, 2rem));
          left: 50%;
          transform: translateX(-50%);
        }

        :host([position='left']) #content {
          right: calc(100% + var(--fmc-tooltip-gap, 2rem));
          top: 50%;
          transform: translateY(-50%);
        }

        :host([mobile]) #content {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translate(0, 0);
          width: 100%;
          min-height: 100vh;
        }

        #overlay {
          display: none;
        }

        :host([opened]) #overlay {
          display: block;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          height: 100vh;
        }

        #measurement {
          visibility: hidden;
          position: fixed;
          z-index: -1;
          overflow: hidden;
        }
      `,
      tooltip,
      customTooltip,
      fade,
      scale,
      slide,
      fall,
      flipHorizontal,
      flipVertical,
      sign,
      superScaled,
    ];
  }

  static get properties() {
    return {
      opened: {
        type: Boolean,
        reflect: true,
      },
      effect: {
        string: String,
        reflect: true,
      },
      position: {
        type: String,
        reflect: true,
      },
      hideTooltip: {
        type: Boolean,
        reflect: true,
        attribute: 'hide-tooltip',
      },
      customTooltip: {
        type: Boolean,
        attribute: 'custom-tooltip',
      },
      fireOn: {
        type: String,
        attribute: 'fire-on',
      },
      clickOutside: {
        type: Boolean,
        attribute: 'click-outside',
      },
      mobile: {
        type: Boolean,
        reflect: true,
      },
      breakpoint: {
        type: String,
      },
      smart: {
        type: Boolean,
      },
      label: {
        type: String,
      },
      brand: {
        type: String,
        reflect: true,
      },
    };
  }

  constructor() {
    super();

    // managed properties
    this.opened = false;
    this.effect = 'fade';
    this.position = 'top';
    this.hideTooltip = false;
    this.customTooltip = false;
    this.fireOn = 'hover';
    this.clickOutside = false;
    this.mobile = null;
    this.breakpoint = '600px';
    this.smart = true;

    // standard properties
    this.focusableSelector =
      'body, a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

    // bindings
    this.addEventListener('fmc-tooltip-close-btn', this.close.bind(this));
  }

  firstUpdated() {
    // elements
    this.measurementElement = this.shadowRoot.getElementById('measurement');

    this.contentElement = this.shadowRoot.querySelector('slot[name="content"]').assignedNodes({ flatten: true })[0];

    // events
    window.addEventListener('resize', () => {
      this.isMobile();
      this.smartContent();
    });
  }

  updated(prevProps) {
    if (!prevProps.get('opened') && this.opened === true) {
      this.makeEvent('open');
      this.trapFocus();

      if (this.fireOn === 'click') {
        this.focusCloseBtn();
      }
    }

    if (prevProps.get('opened') && this.opened === false) {
      this.makeEvent('close');
      this.unTrapFocus();
    }

    this.isMobile();
    this.smartContent();
    this.autoWidth();

    this.focusableElements = this.shadowRoot
      .querySelector('slot[name="content"]')
      .assignedNodes({ flatten: true })[0]
      .querySelectorAll(this.focusableSelector);

    this.focusableElements.forEach((element) => {
      element.addEventListener('keydown', (event) => this.handleFocusableDown(event));
    });
  }

  render() {
    return html`
      <div
        id="trigger"
        part="trigger"
        tabindex="0"
        aria-describedby="content"
        @click=${this.fireOn === 'click' ? (event) => this.toggle(event) : null}
        @keyup=${this.fireOn === 'click' ? (event) => this.handleTriggerUp(event) : null}
        @mouseenter=${this.fireOn !== 'click' ? () => this.open() : null}
        @mouseleave=${this.fireOn !== 'click' ? () => this.close() : null}
        @focus=${this.fireOn !== 'click' ? () => this.open() : null}
        @blur=${this.fireOn !== 'click' ? () => this.close() : null}
      >
        <slot name="trigger"></slot>
        <div
          id="content"
          part="content"
          role="${this.fireOn === 'click' ? 'dialog' : 'tooltip'}"
          aria-modal="${this.fireOn === 'click' ? 'true' : 'false'}"
          aria-label="${ifDefined(this.label ? this.label : undefined)}"
        >
          <slot name="content"></slot>
          ${this.makeTooltip()}
        </div>
      </div>
      <div id="measurement" aria-hidden="true"></div>
      ${this.makeOverlay()}
    `;
  }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }

  toggle(event) {
    const isSlotTrigger = event.target.getAttribute('slot') === 'trigger';
    const isPartTrigger = event.target.getAttribute('part') === 'trigger';
    const isSelf = event.target === this;

    if (isSlotTrigger || isPartTrigger || isSelf) {
      if (this.opened) {
        this.opened = false;
      } else {
        this.opened = true;
      }
    }
  }

  handleFocusableDown(event) {
    const firstFocusable = this.focusableElements[0];
    const lastFocusable = this.focusableElements[this.focusableElements.length - 1];

    if (event.keyCode === keyCodes.TAB) {
      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  handleTriggerUp(event) {
    if (event.keyCode === keyCodes.ESC) {
      this.close();
    }

    if (event.keyCode === keyCodes.ENTER || event.keyCode === keyCodes.SPACE) {
      this.toggle(event);
    }
  }

  isMobile() {
    const mediaQuery = window.matchMedia(`(max-width: ${this.breakpoint})`);
    this.mobile = mediaQuery.matches;
  }

  makeEvent(type) {
    this.dispatchEvent(
      new CustomEvent(`fmc-tooltip-${type}`, {
        bubbles: true,
        composed: true,
        detail: this,
      })
    );
  }

  makeTooltip() {
    if (this.customTooltip) {
      return html`
        <div id="custom-tooltip" part="custom-tooltip">
          <slot name="custom-tooltip"></slot>
        </div>
      `;
    }

    if (!this.hideTooltip) {
      return html`
        <div id="tooltip" part="tooltip">
          <svg width="32" height="18" viewBox="0 0 1366.99 767.67">
            <polyline
              points="0.74 0.67 685.25 766.17 1366.24 0.67"
              style="fill:#ffffff; stroke:rgba(36,49,56,1); stroke-width:50px"
            />
          </svg>
        </div>
      `;
    }

    return null;
  }

  makeOverlay() {
    if (this.clickOutside) {
      return html` <div id="overlay" @click=${() => this.close()}></div> `;
    }

    return null;
  }

  smartContent() {
    if (!this.mobile && this.smart) {
      // order here is important. to properly detect an offscreen tooltip,
      // we must remove the direction properties before getting contentRect
      this.contentElement.style.removeProperty('left');
      this.contentElement.style.removeProperty('right');
      this.contentElement.style.removeProperty('top');
      this.contentElement.style.removeProperty('bottom');

      const contentRect = this.contentElement.getBoundingClientRect();

      const padding = 20;
      const isOffScreenLeft = contentRect.left < 0;
      const isOffScreenRight = window.innerWidth - contentRect.right < 0;
      const isOffScreenTop = contentRect.top < 0;
      const isOffScreenBottom = contentRect.bottom > window.innerHeight;

      // adjust positioning
      if (this.position === 'top' && isOffScreenTop) {
        this.setPosition(contentRect);
      }

      if (this.position === 'right' && isOffScreenRight) {
        this.setPosition(contentRect);
      }

      if (this.position === 'bottom' && isOffScreenBottom) {
        this.setPosition(contentRect);
      }

      if (this.position === 'left' && isOffScreenLeft) {
        this.setPosition(contentRect);
      }

      // adjust content
      if (isOffScreenLeft) {
        this.contentElement.style.left = `${Math.abs(contentRect.left - padding)}px`;
      } else {
        this.contentElement.style.removeProperty('left');
      }

      if (isOffScreenRight) {
        this.contentElement.style.right = `${Math.abs(window.innerWidth - contentRect.right - padding)}px`;
      } else {
        this.contentElement.style.removeProperty('right');
      }

      if (isOffScreenTop) {
        this.contentElement.style.top = `${Math.abs(contentRect.top - padding)}px`;
      } else {
        this.contentElement.style.removeProperty('top');
      }

      if (isOffScreenBottom) {
        this.contentElement.style.bottom = `${Math.abs(contentRect.bottom - window.innerHeight - padding)}px`;
      } else {
        this.contentElement.style.removeProperty('bottom');
      }
    }
  }

  setPosition(contentRect) {
    if (contentRect.top > 0) {
      this.position = 'top';
    } else if (contentRect.right < window.innerWidth) {
      this.position = 'right';
    } else if (contentRect.bottom < window.innerHeight) {
      this.position = 'bottom';
    }
  }

  focusCloseBtn() {
    const closeBtn = this.shadowRoot
      .querySelector('slot[name="content"]')
      .assignedNodes({ flatten: true })[0]
      .querySelector('fmc-tooltip-close');

    setTimeout(() => {
      closeBtn.focus();
    }, 100);
  }

  trapFocus() {
    const focusableDocElements = document.querySelectorAll(this.focusableSelector);
    const triggerElements = document.querySelectorAll('fmc-tooltip');

    focusableDocElements.forEach((element) => {
      if (element.closest('fmc-tooltip') === null && !element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1');
        element.setAttribute('data-fmc-tooltip-trapped', true);
      }
    });

    triggerElements.forEach((trigger) => {
      trigger.shadowRoot.getElementById('trigger').setAttribute('tabindex', '-1');
    });
  }

  unTrapFocus() {
    const trappedElements = document.querySelectorAll('[data-fmc-tooltip-trapped]');
    const triggerElements = document.querySelectorAll('fmc-tooltip');

    trappedElements.forEach((element) => {
      element.removeAttribute('tabindex');
      element.removeAttribute('data-fmc-tooltip-trapped');
    });

    triggerElements.forEach((trigger) => {
      trigger.shadowRoot.getElementById('trigger').setAttribute('tabindex', '0');
    });
  }

  autoWidth() {
    const shadowContent = this.shadowRoot.getElementById('content');
    this.measurementElement.innerHTML = this.contentElement.innerHTML;

    if (this.fireOn !== 'click') {
      shadowContent.style.width = `${this.measurementElement.offsetWidth}px`;
    } else {
      shadowContent.style.removeProperty('width');
    }
  }
}
