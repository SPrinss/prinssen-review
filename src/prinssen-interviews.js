import { BaseElement, html} from './base-element.js';

/**
 * @customElement
 */
class PrinssenInterviews extends BaseElement {
  static get properties() {
    return {
      
    }
  }

  constructor() {
    super();
    this.template = () => html`
    <link rel="stylesheet" href="../src/styles/prinssen-interviews.css">
    
    
    Interviews
    `;
  }


}
window.customElements.define('prinssen-interviews', PrinssenInterviews);
