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
    <link rel="stylesheet" href="../styles/prinssen-homepage.css">
    

    <main>
      <header>
        <div id="overlay">
          <div>
            <h1>Theater recensies, interviews & tips.</h1>
          </div>
          <div>
          </div>
        </div>
      </header>
    </main>
    `;
  }


}
window.customElements.define('prinssen-homepage', PrinssenHomepage);
