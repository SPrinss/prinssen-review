import { UpdatingElement } from '../node_modules/lit-element/lib/updating-element.js';
import { css } from '../node_modules/lit-element/lib/css-tag.js';
import { render, html } from '../node_modules/lit-html/lit-html.js';

class BaseElement extends UpdatingElement {

  static get properties() {
    return {
      __css: {
        type: String
      }
    }
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
  }

  get template() {
    return this.__template;
  }

  set template(contents) {
    this.__template = () => html`
      ${contents()}
    `
  }

  updated(props) {
    render(this.template(), this._shadowRoot);
  }
}

export { BaseElement, html, css }