import { BaseElement, html} from './base-element.js';

/**
 * @customElement
 */
class PrinssenAbout extends BaseElement {
  static get properties() {
    return {
      
    }
  }

  constructor() {
    super();
    this.template = () => html`
    <link rel="stylesheet" href="../styles/prinssen-about.css">
    
    
    About
    `;
  }


}
window.customElements.define('prinssen-about', PrinssenAbout);
