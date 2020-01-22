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
    
    
    <main>
      <header class="hero-header">
        <div class="hero-overlay">
          <div class="page-content-container">
            <h1>Margriet Prinssen</h1>
          </div>
        </div>
      </header>
      <section>
        <div class="page-content-container">
          <h3>Mijn verhaal</h3>
          <p>
            
          </p>            
        </div>
          
      </section>
    </main>
  `;
  }


}
window.customElements.define('prinssen-about', PrinssenAbout);
