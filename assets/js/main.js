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

  /* Glass header: shrink + go more opaque once the visitor scrolls past the hero */
  var header = document.querySelector('.site-header');
  if(header){
    var onScroll = function(){
      if(window.scrollY > 40){ header.classList.add('is-scrolled'); }
      else{ header.classList.remove('is-scrolled'); }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Scroll-spy: highlight the nav link for whichever section is currently in view.
     Sections vary hugely in height (the offer section is several times taller than
     the others), so a single IntersectionObserver rootMargin band isn't reliable
     across all of them — instead, track each section's document-relative top and
     pick whichever one the scroll position has most recently passed. */
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  var spySections = [];
  navLinks.forEach(function(a){
    var id = a.getAttribute('href').slice(1);
    var el = document.getElementById(id);
    if(el && id !== 'top'){ spySections.push({ id: id, el: el, top: 0 }); }
  });
  if(spySections.length){
    var measure = function(){
      spySections.forEach(function(s){
        s.top = s.el.getBoundingClientRect().top + window.scrollY;
      });
    };
    var setActive = function(id){
      navLinks.forEach(function(a){
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
      });
    };
    var onSpyScroll = function(){
      var headerEl = document.querySelector('.site-header');
      var offset = (headerEl ? headerEl.offsetHeight : 70) + 40;
      var y = window.scrollY + offset;
      var current = spySections[0];
      for(var i = 0; i < spySections.length; i++){
        if(spySections[i].top <= y){ current = spySections[i]; }
      }
      setActive(current.id);
    };
    measure();
    onSpyScroll();
    window.addEventListener('scroll', onSpyScroll, { passive: true });
    window.addEventListener('resize', function(){ measure(); onSpyScroll(); });
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
