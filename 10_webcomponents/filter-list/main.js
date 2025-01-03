'use strict';

(function () {
  class FilterList extends HTMLElement {
    constructor() {
      // à compléter
    }

    get items() {
      // à compléter
    }

    filterItems() {
      // à compléter
    }

    // fires after the element has been attached to the DOM
    connectedCallback() {
      // à compléter
    }
  }
  // let the browser know about the custom element
  customElements.define('filter-list', FilterList);
})();