import { LitElement, html, css } from 'lit-element';

/**
 * Conamore UI Button Component
 * @element prinssen-ui-button

 * @cssprop --prinssen-ui-button-text-align - Text Align
 * 
 * @cssprop --prinssen-ui-button-border-color - Border Color
 * @cssprop --prinssen-ui-button-text-color - Text Color
 * @cssprop --prinssen-ui-button-fill - Background Color
 * 
 * @cssprop --prinssen-ui-button-border-color--active - Border Color for active State
 * @cssprop --prinssen-ui-button-text-color--active - Text Color for active State
 * @cssprop --prinssen-ui-button-fill--active - Background Color for active State
 * 
 * @cssprop --prinssen-ui-button-border-color--disabled - Border Color for disabled State
 * @cssprop --prinssen-ui-button-text-color--disabled - Text Color for disabled State
 * @cssprop --prinssen-ui-button-fill--disabled - Background Color for disabled State
 */
class Main extends LitElement {

  static get properties() {
    return { 
      
      label: {
        type: String,
      },
      
      disabled: {
        type: Boolean,
        reflect: true
      },

      small: {
        type: Boolean,
        reflect: true
      },

      raised: {
        type: Boolean,
        reflect: true
      },

      icon: {
        type: String
      },

      value: {
        type: String
      }

    };
  }

  constructor() {
    super();

    /**
     * Text label
     * @type {String}
     */
    this.label = 'My Button';

    /**
     * When `true`, button is not clickable
     * @type {Boolean}
     */
    this.disabled = false;

    /**
     * When `true`, button is smaller in size
     * @type {Boolean}
     */
    this.small = false;

    /**
     * When true, the button has a drop-shadow
     */
    this.raised = false;

    /**
     * Display an icon (one of `prinssen-ui-icon`)
     */
    this.icon = '';

    /**
     * Button value
     */
    this.value = '';


  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      :host button, :host([small]) button {
        display: flex;
        text-align: var(--prinssen-ui-button-text-align, center);
        --prinssen-ui-icon-color: var(--prinssen-ui-button-text-color, white);
        padding: 8px 15px;
        background-color: var(--prinssen-ui-button-fill);
        color: var(--prinssen-ui-button-text-color);
        border-radius: 12px;
      }
        
      span {
        flex: 1;
        line-height: 2;
        padding-right: 8px;
      }

      prinssen-ui-icon {
        --prinssen-ui-icon-size: 16px;
        margin: auto;
      }
    `;
  }

  render() {
    return html`
      <style>

      </style>
      <button>
        <span>${this.label}</span>
        ${this.icon ? html`<prinssen-ui-icon .icon="${this.icon}"></prinssen-ui-icon>` : html`` }
    </button>
    `;
  }

  updated(props) {
    if(props.has('icon') && !!this.icon) import('./prinssen-ui-icon');
    this.noLabel = !this.label;
  }

  set noLabel(noLabel) {
    this._noLabel = noLabel;
    if(noLabel) this.setAttribute('no-label', '');
    else this.removeAttribute('no-label');
  }

  get noLabel() {
    return this._noLabel;
  }

}

export const PrinssenUIButton = Main;
window.customElements.define('prinssen-ui-button', PrinssenUIButton);