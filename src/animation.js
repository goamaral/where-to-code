export const fade = function(elem, delay, tdelay) {
  elem.style.display = 'block';
  fadeIn(elem, tdelay)
    .then(() => {
      setTimeout(function() {
        fadeOut(elem, tdelay)
          .then(() => {
            elem.style.display = 'none';
          });
      }, delay);
    });
}

export const fadeIn = function(elem, tdelay) {
  return new Promise(function(resolve, reject) {
    elem.animate({ opacity: [0,1] }, { duration: tdelay, fill: 'forwards' });
    setTimeout(resolve, tdelay);
  });
}

export const fadeOut = function(elem, tdelay) {
  return new Promise(function(resolve, reject) {
    elem.animate({ opacity: [1,0] }, { duration: tdelay, fill: 'forwards' });
    setTimeout(resolve, tdelay);
  });
}
