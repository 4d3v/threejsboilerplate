export default class Page {
  constructor({ classes, element, elements, isScrollable = true }) {
    this.classes = { ...classes };

    this.selectors = {
      element,
      elements: {
        ...elements,
      },
    };

    this.isScrollable = isScrollable;
  }

  create() {
    this.element = document.querySelector(this.selectors.element);
    this.elements = {};

    const elements = this.selectors.elements;

    for (const key in elements) {
      if (
        elements[key] instanceof window.HTMLElement ||
        elements[key] instanceof window.NodeList
      )
        this.elements[key] = elements[key];
      else if (Array.isArray(this.elements[key]))
        this.elements[key] = elements[key];
      else {
        this.elements[key] = this.element.querySelectorAll(elements[key]);

        if (this.elements[key].length === 0) this.elements[key] = null;
        else if (this.elements[key].length === 1)
          this.elements[key] = this.element.querySelector(elements[key]);
      }
    }

    if (this.isScrollable) {
      this.scroll = {
        ease: 0.1,
        position: 0,
        current: 0,
        target: 0,
        limit: 0,
      };
    }
  }

  show() {
    if (this.isScrollable) {
      this.scroll.position = 0;
      this.scroll.current = 0;
      this.scroll.target = 0;
    }

    this.isVisible = true;
    return Promise.resolve();
  }

  hide() {
    this.isVisible = false;
    return Promise.resolve();
  }
}
