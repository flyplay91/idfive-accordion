class Accordions {
  constructor(section) {
    if (!section) return false;

    this.section = section
    this.accordions = [...this.section.querySelectorAll('[data-js-accordion]')];
    this.accordionToggles = [...this.section.querySelectorAll('[data-js-accordion-toggle]')];
    this.init();
  }

  init() {
    this.accordionToggles.forEach(accordion => {
      accordion.addEventListener('click', this.handleAccordionClick.bind(this))
    })
  }

  handleAccordionClick(event) {
    event.stopPropagation();
    const accordion = event.target.closest('[data-js-accordion]');
    if (accordion.classList.contains('active')) {
      this.closeAccordion(accordion);
    } else {
      this.collapseAllAccordions();
      this.openAccordion(accordion);
    }
  }

  openAccordion(accordion) {
    accordion.setAttribute('aria-expanded', 'true');
    accordion.setAttribute('aria-disabled', 'true');
    accordion.classList.add('active');
  }

  closeAccordion(accordion) {
    accordion.setAttribute('aria-expanded', 'false');
    accordion.removeAttribute('aria-disabled');
    accordion.classList.remove('active');
  }

  collapseAllAccordions() {
    this.accordions.forEach(accordion => {
      this.closeAccordion(accordion);
    })
  }
}

const setupAccordion = () => {
  const sections = [...document.querySelectorAll('[data-js-accordion-section]')];
  sections && sections.forEach(section => {
    new Accordions(section)
  })
}
window.addEventListener('DOMContentLoaded', (event) => {
  setupAccordion();
});
