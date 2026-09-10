/* Amie's Logistics LLC — shared site behavior */
(function(){
  "use strict";

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.querySelector('.mobile-panel');
  var closeBtn = document.querySelector('.mobile-close');

  function openPanel(){
    if(panel){ panel.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  }
  function closePanel(){
    if(panel){ panel.classList.remove('is-open'); document.body.style.overflow = ''; }
  }
  if(toggle){ toggle.addEventListener('click', openPanel); }
  if(closeBtn){ closeBtn.addEventListener('click', closePanel); }
  if(panel){
    panel.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closePanel); });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el, i){
      el.style.transitionDelay = (Math.min(i % 4, 4) * 90) + 'ms';
      io.observe(el);
    });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* Contact / application forms: no backend is connected yet, so this only
     validates and shows an on-page confirmation rather than pretending to send. */
  document.querySelectorAll('form[data-placeholder-form]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!form.checkValidity()){ form.reportValidity(); return; }
      var success = form.parentElement.querySelector('.form-success') || form.querySelector('.form-success');
      if(success){ success.classList.add('is-shown'); }
      form.reset();
      if(success){ success.scrollIntoView({ behavior:'smooth', block:'nearest' }); }
    });
  });
})();
