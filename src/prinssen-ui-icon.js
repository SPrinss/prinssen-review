import { UpdatingElement } from 'lit-element';

/**
 * UI Icon Component
 * @element prinssen-ui-icon
 * 
 * @cssprop --prinssen-ui-icon-color - Stroke Color
 */
class Main extends UpdatingElement {

  static get properties() {
    return {
      
      icon: {
        type: String
      }

    };
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
  }

  updated() {
    const svgIcon = this.svgIcon || '';
    const viewboxValue = (svgIcon.match(/viewbox="(.*?)"/i) || [])[1];
    if(!this.svgIcon) return this.render(null, '__empty');
    this.render(viewboxValue, svgIcon); 
  }

  render(viewboxValue, svgIcon) {
    this._shadowRoot.innerHTML = `
      <style>
      :host {
        display: inline-block;
        height: var(--prinssen-ui-icon-size, 24px);
        width: var(--prinssen-ui-icon-size, 24px);
      }

      svg {
        height: 100%;
        width: 100%;
      }

      g {
        stroke: var(--prinssen-ui-icon-color, var(--prinssen-color-black));
        fill: none;
      }

      </style>
      <svg viewBox="${viewboxValue || '0 0 24 24'}" id="prinssen-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        ${svgIcon}
      </svg>
    `;
  }

  get svgIcon() {
    const ICONS = {
      'arrow-left': `
        <g viewBox="0 0 30 30" fill="none">
        <line x1="29" y1="14.75" x2="2" y2="14.75" stroke-width="1.5"/>
        <path d="M15.9758 1L2.00001 15L15.9758 29" stroke-width="1.5"/>
        </g>      
      `,
      'arrow-down': `
        <g viewBox="0 0 30 30" fill="none">
        <line x1="14.5" y1="0.951538" x2="14.5" y2="27.9515"/>
        <path d="M1 13.9758L15 27.9515L29 13.9758"/>
        </g>      
      `,
      'arrow-right': `
        <g viewBox="0 0 30 30" fill="none" style="transform:rotate(180deg);transform-origin:center">
        <line x1="29" y1="14.75" x2="2" y2="14.75" stroke-width="1.5"/>
        <path d="M15.9758 1L2.00001 15L15.9758 29" stroke-width="1.5"/>
        </g>      
      `,
      'close': `
        <g viewBox="0 0 21 22" fill="none">
        <line y1="-0.75" x2="27" y2="-0.75" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 0 20.0919)"/>
        <line y1="-0.75" x2="27" y2="-0.75" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 19.0919 21.0919)"/>
        </g>      
      `,
      'add': `
        <g viewBox="0 0 27 27" fill="none">
        <line y1="-0.5" x2="27" y2="-0.5" transform="matrix(1 0 0 -1 0 14)"/>
        <line y1="-0.5" x2="27" y2="-0.5" transform="matrix(0 -1 -1 0 14 27)"/>
        </g>      
      `,
      'logo': `
        <g viewBox="0 0 108 78" stroke-width="2" fill="none">
          <ellipse
            cx="39"
            cy="39"
            rx="22.809"
            ry="29.517"
            transform="rotate(-45 39 39)"
            stroke-linecap="round"
          />
          <path d="M42.614 41.981c.935-6.583 4.328-13.453 9.984-19.11 11.527-11.526 28.093-13.65 37-4.743 8.908 8.908 6.784 25.473-4.743 37-5.657 5.657-12.527 9.05-19.11 9.985"
            stroke-linecap="round"
          />
        </g>
      `,
      'heart': `
      <g viewBox="0 0 43 43" fill="none" style="fill:var(--ca-ui-icon-color, var(--ca-color-black))">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.6683 12.8766C20.5883 13.4878 21.8379 13.4878 22.7579 12.8766C26.6417 10.2962 31.9312 10.718 35.3553 14.1421C39.2605 18.0474 39.2605 24.379 35.3553 28.2843L22.6273 41.0122C21.8463 41.7932 20.58 41.7932 19.7989 41.0122L7.071 28.2843C3.16576 24.379 3.16576 18.0474 7.071 14.1421C10.4951 10.718 15.7846 10.2962 19.6683 12.8766Z"/>
      </g>
      `,
      'done': `
        <g viewBox="0 0 16 16" fill="none">
        <path d="M1 9.10811L5.37863 13.881C6.32068 14.9079 7.99783 14.6807 8.63275 13.4402L15 1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      `,
      '__empty': `
        <g></g>
      `,
      'pencil': `
      <g viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="17.821" y="1.17894" width="5" height="19" transform="rotate(45 17.821 1.17894)" stroke-linejoin="round"/>
        <path d="M4.38599 14.614L7.92152 18.1495L2.61822 19.9173L4.38599 14.614Z" stroke-linejoin="round"/>
        <path d="M3.67896 16.7353L5.80028 18.8566L2.61829 19.9173L3.67896 16.7353Z" fill="black"/>
        <line x1="19.5888" y1="2.58883" x2="6.15375" y2="16.0239"/>
      </svg>      
      `,
      'city': `
        <g viewBox="0 0 23 22" fill="none" id="location-city"><path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"></path></g>
      `,
      'event': `
        <g viewBox="0 0 23 22" fill="none" id="event"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path></g>
      `,
      'local-play': `
        <g viewBox="0 0 23 22" fill="none" id="local-play"><path d="M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2zm-4.42 4.8L12 14.5l-3.58 2.3 1.08-4.12-3.29-2.69 4.24-.25L12 5.8l1.54 3.95 4.24.25-3.29 2.69 1.09 4.11z"></path></g>
      `,
      'group': `
        <g id="group"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path></g>
      `,
      'place': `
        <g id="place"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>
      `,
      'save': `
        <g id="save"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></g>
      `,
      'undo': `
        <g id="undo"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"></path></g>
      `
    };
    return ICONS[this.icon || 'empty'];
  }

}

export const PrinssenUIIcon = Main;
window.customElements.define('prinssen-ui-icon', PrinssenUIIcon);

