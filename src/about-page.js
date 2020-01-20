import { LitElement, html, css } from 'lit-element';

/**
 * @customElement
 */
class AboutPage extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
  render() {
    return html`

    <main>
    Abuut
    </main>
`
  }
  
  static get properties() {
    return {
      
    }
  }

  constructor() {
    super();
  }

  updated(props) {
  }


}
window.customElements.define('about-page', AboutPage);
