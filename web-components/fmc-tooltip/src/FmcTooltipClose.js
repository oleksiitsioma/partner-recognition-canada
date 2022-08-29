import { html, css, LitElement } from 'lit';
import keyCodes from '../../../utilities/constants/keycodes.const';

export default class FmcTooltipClose extends LitElement {
  static get styles() {
    return [
      css`
        /* stylelint-disable */
        :host {
          cursor: pointer;
        }

        div {
          cursor: pointer;
          color: inherit;
          font: inherit;
        }
      `,
    ];
  }

  constructor() {
    super();

    this.addEventListener('click', this.close.bind(this));
    this.addEventListener('keyup', this.handleKeyboard.bind(this));
  }

  firstUpdated() {
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
  }

  render() {
    return html` <slot></slot> `;
  }

  close() {
    this.dispatchEvent(
      new CustomEvent('fmc-tooltip-close-btn', {
        bubbles: true,
        composed: true,
        detail: this,
      })
    );
  }

  handleKeyboard(event) {
    event.preventDefault();

    if (event.keyCode === keyCodes.SPACE || event.keyCode === keyCodes.ENTER) {
      this.close();
    }
  }
}
