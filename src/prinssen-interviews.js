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
    <link rel="stylesheet" href="../styles/prinssen-interviews.css">
    
    <main>
      <section>
        <div class="page-content-container">
          Interviews
        </div>
      </section>
    </main>
    
    `;
  }


}
window.customElements.define('prinssen-interviews', PrinssenInterviews);
