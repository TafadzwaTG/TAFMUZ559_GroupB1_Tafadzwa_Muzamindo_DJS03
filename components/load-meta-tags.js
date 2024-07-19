document.addEventListener('DOMContentLoaded', () => {
    fetch('./meta-tags.html')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const metaTags = doc.querySelectorAll('link, meta');
        const head = document.head;
  
        metaTags.forEach(tag => {
          head.appendChild(tag.cloneNode(true));
        });
      })
      .catch(err => console.error('Error loading meta tags:', err));
  });
  