import { BaseElement, html} from './base-element.js';

/**
 * @customElement
 */
class PrinssenHomepage extends BaseElement {
  static get properties() {
    return {
      
    }
  }

  constructor() {
    super();
    this.template = () => html`
    <link rel="stylesheet" href="../src/styles/prinssen-homepage.css">
    
    
    Home
    `;
  }


}
window.customElements.define('prinssen-homepage', PrinssenHomepage);
