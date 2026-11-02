/* finesse | register=brand-contact-workflow | A=cool-mineral-carbon | B=existing-BioManrope | C=open-consultation | D=feedback-only | E=real-company-photography | scope=P28-v164 */
/* P28-only local review. No submission, persistence or network request. */
(()=>{
  'use strict';
  const form=document.querySelector('.ct-page #enquiry-form');
  if(!form)return;
  const fields=form.querySelector('[data-ct-fields]');
  const review=form.querySelector('[data-ct-review-panel]');
  const button=form.querySelector('[data-ct-review]');
  const edit=form.querySelector('[data-ct-edit]');
  const errorSummary=form.querySelector('[data-ct-errors]');
  const reviewTitle=form.querySelector('#ct-review-title');
  const summary=form.querySelector('[data-ct-summary]');
  const name=form.querySelector('#ct-name'),email=form.querySelector('#ct-email'),message=form.querySelector('#ct-message');
  const entries=[['Name',name],['Email',email],['Your enquiry',message],
    ['Company',form.querySelector('#ct-company')],['Country / region',form.querySelector('#ct-country')],
    ['Product or application',form.querySelector('#ct-product')],['Phone',form.querySelector('#ct-phone')]];
  let attempted=false;
  function validate(field){
    let text='';
    if(!field.value.trim())text=field===name?'Please enter your name.':field===email?'Please enter your email address.':'Please describe the question you want to discuss.';
    else if(field===email&&field.validity.typeMismatch)text='Check the email address, for example name@company.com.';
    const error=form.querySelector('#'+field.id+'-error');
    error.textContent=text;error.hidden=!text;
    if(text)field.setAttribute('aria-invalid','true');else field.removeAttribute('aria-invalid');
    return !text;
  }
  const required=[name,email,message];
  required.forEach(field=>{
    field.addEventListener('blur',()=>{if(attempted||field.value.trim())validate(field)});
    field.addEventListener('input',()=>{
      if(field.hasAttribute('aria-invalid'))validate(field);
      if(attempted&&!required.some(x=>x.getAttribute('aria-invalid')==='true'))errorSummary.hidden=true;
    });
  });
  const count=form.querySelector('[data-ct-count]');
  message.addEventListener('input',()=>{count.textContent=message.value.length+' / 4000'});
  function showReview(){
    attempted=true;
    const invalid=required.filter(field=>!validate(field));
    if(invalid.length){
      errorSummary.textContent=invalid.length===1?'Please check the highlighted field.':'Please check the '+invalid.length+' highlighted fields.';
      errorSummary.hidden=false;invalid[0].focus();return;
    }
    errorSummary.hidden=true;summary.replaceChildren();
    entries.forEach(([label,field])=>{
      const value=field.value.trim();if(!value)return;
      const row=document.createElement('div'),term=document.createElement('dt'),definition=document.createElement('dd');
      term.textContent=label;definition.textContent=value;row.append(term,definition);summary.append(row);
    });
    fields.hidden=true;review.hidden=false;
    form.querySelector('[data-ct-step]').textContent='Review your enquiry';
    reviewTitle.focus();
  }
  button.addEventListener('click',showReview);
  form.addEventListener('submit',event=>{event.preventDefault();if(!fields.hidden)showReview()});
  edit.addEventListener('click',()=>{
    review.hidden=true;fields.hidden=false;summary.replaceChildren();
    form.querySelector('[data-ct-step]').textContent='Write your enquiry';
    button.focus();
  });
  const source=form.querySelector('input[name="source_page"]');
  if(source?.value==='P28')form.querySelector('.enquiry-context')?.setAttribute('data-ct-self-source','');
  if(source?.value==='R01'){
    form.querySelector('#ct-message-hint').textContent='Introduce your research question with a non-confidential summary and the next step you would like to discuss.';
  }
  button.disabled=false;
  form.querySelector('[data-ct-action-note]').textContent='Next: check your message. This preview does not send or save information.';
})();
