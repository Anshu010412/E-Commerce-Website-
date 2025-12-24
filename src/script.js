document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  const searchInput = document.getElementById('search');
  const searchButton = document.getElementById('search-btn');
  const shopNow = document.getElementById('shop-now');
  const loginBtn = document.getElementById('login-btn');

  // Toggle mobile nav
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => navList.classList.toggle('show'));
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
          if (navList && navList.classList.contains('show')) navList.classList.remove('show');
        }
      }
    });
  });

  // Search products
  function filterProducts(query) {
    const products = document.querySelectorAll('.box');
    products.forEach((p) => {
      const titleEl = p.querySelector('h2');
      const title = titleEl ? titleEl.textContent.toLowerCase() : '';
      p.style.display = title.includes(query) ? '' : 'none';
    });
  }

  if (searchButton && searchInput) {
    searchButton.addEventListener('click', () => filterProducts(searchInput.value.trim().toLowerCase()));
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) filterProducts('');
    });
  }

  // Shop Now scroll
  if (shopNow) {
    shopNow.addEventListener('click', () => {
      const products = document.getElementById('products');
      if (products) products.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Product click handler (delegation)
  document.getElementById('products')?.addEventListener('click', (e) => {
    const box = e.target.closest('.box');
    if (!box) return;
    const title = box.querySelector('h2')?.textContent ?? 'product';
    const price = box.querySelector('.price')?.textContent ?? '';
    alert(`You selected ${title} — ${price}`);
  });

  // Login placeholder
  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => { e.preventDefault(); alert('Login functionality coming soon!'); });
  }

  // Rotating heading text
  const heading = document.querySelector('.rotating');
  if (heading) {
    const textArray = [
      'Handcrafted Wooden Toys',
      'Eco-Friendly Wooden Toys',
      'Perfect Gifts for Kids & Toddlers',
      'Bring Joy with Wooden Toys!',
    ];
    let idx = 0;
    setInterval(() => { idx = (idx + 1) % textArray.length; heading.textContent = textArray[idx]; }, 3000);
    heading.style.transition = 'color 0.3s ease';
  }

});
