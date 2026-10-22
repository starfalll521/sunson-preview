/* Preview-only validation. No endpoint, browser storage, tracking or simulated send. */
(() => {
  'use strict';
  const form = document.querySelector('#home-enquiry-form');
  if (!form) return;
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('.inquiry-status');
  const fields = [...form.querySelectorAll('[required]')];
  const errors = {
    first_name: 'Please enter your first name.',
    last_name: 'Please enter your last name.',
    email: 'Enter a valid email address, such as name@company.com.'
  };
  let reviewed = false;
  function check(field) {
    const valid = Boolean(field.value.trim()) && field.validity.valid;
    const output = document.getElementById(field.id + '-error');
    field.setAttribute('aria-invalid', String(!valid));
    if (output) {
      output.textContent = valid ? '' : errors[field.name];
      output.hidden = valid;
    }
    return valid;
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    reviewed = true;
    const invalid = fields.filter(field => !check(field));
    status.hidden = false;
    if (invalid.length) {
      status.textContent = 'Please check the highlighted fields. Your enquiry has not been sent.';
      invalid[0].focus();
      return;
    }
    status.textContent = 'Required fields checked. This is a design preview, so your enquiry has not been sent. Your entries remain here for you to edit.';
  });
  fields.forEach(field => {
    field.addEventListener('blur', () => { if (field.value || reviewed) check(field); });
    field.addEventListener('input', () => { if (reviewed) check(field); });
    field.addEventListener('change', () => { if (reviewed) check(field); });
  });
  form.addEventListener('input', () => {
    if (!status.hidden) {
      status.hidden = true;
      status.textContent = '';
    }
  });
  form.noValidate = true;
  button.disabled = false;
})();
