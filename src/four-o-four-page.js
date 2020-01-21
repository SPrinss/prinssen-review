import { BaseElement, html} from './base-element.js';

/**
 * @customElement
 */
class FourOFourPage extends BaseElement {

  static get properties() {
    return {
      
    }
  }

  constructor() {
    super();
    this.template = () => html`
    <link rel="stylesheet" href="../styles/four-o-four-page.css">
    `;
  }

  updated(props) {
  }


}
window.customElements.define('four-o-four-page', FourOFourPage);
