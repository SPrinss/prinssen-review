import { BaseElement, html} from './base-element.js';
import './prinssen-ui-button.js';

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
      <header class="hero-header">
        <div class="hero-overlay">
          <div>
            <h1>Theater journalistiek</h1>
            <h3>Recensies, interviews & tips</h3>
          </div>
        </div>
      </header>

      <section>
        <div class="page-content-container">
          <div>
            <h3>Recensies</h3>
            <p>
              
            </p>            
            <a href="/recensies">Bekijk archief</a>

          </div>
          <div>
            <h3>Interviews</h3>
            <p>
            </p>

            <a href="/interviews">Bekijk archief</a>
          </div>
        </div>
      </section>
    </main>
    `;
  }
  
}
window.customElements.define('prinssen-homepage', PrinssenHomepage);
