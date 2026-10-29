/**
 * Vow & Co. - Vendor Directory Controller
 * Handles Search, Dynamic Category & City Filtering, Sorting, and Card Rendering
 */

document.addEventListener('DOMContentLoaded', () => {
  initVendorPage();
});

let currentVendors = [...VOW_DATA.vendors];

function initVendorPage() {
  // Parse URL search params
  const params = new URLSearchParams(window.location.search);
  const initialCategory = params.get('category') || '';
  const initialSearch = params.get('search') || '';

  const searchInput = document.getElementById('vendor-search-input');
  const categoryFilter = document.getElementById('filter-category');
  const cityFilter = document.getElementById('filter-city');
  const sortSelect = document.getElementById('vendor-sort');
  const countDisplay = document.getElementById('vendor-results-count');

  if (initialSearch && searchInput) {
    searchInput.value = initialSearch;
  }
  if (initialCategory && categoryFilter) {
    categoryFilter.value = initialCategory;
  }

  // Populate city dropdown dynamically
  if (cityFilter) {
    const cities = Array.from(new Set(VOW_DATA.vendors.map(v => v.city.split(',')[0].trim())));
    cities.forEach(city => {
      const opt = document.createElement('option');
      opt.value = city;
      opt.textContent = city;
      cityFilter.appendChild(opt);
    });
  }

  // Render initial
  applyFilters();

  // Attach event listeners
  if (searchInput) searchInput.addEventListener('input', debounce(applyFilters, 250));
  if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
  if (cityFilter) cityFilter.addEventListener('change', applyFilters);
  if (sortSelect) sortSelect.addEventListener('change', applyFilters);
}

function applyFilters() {
  const searchVal = (document.getElementById('vendor-search-input')?.value || '').toLowerCase().trim();
  const catVal = document.getElementById('filter-category')?.value || '';
  const cityVal = document.getElementById('filter-city')?.value || '';
  const sortVal = document.getElementById('vendor-sort')?.value || 'featured';
  const priceBeatOnly = document.getElementById('filter-price-beat')?.checked || false;

  let filtered = VOW_DATA.vendors.filter(v => {
    // Search match: name, city, description
    const matchSearch = !searchVal || 
      v.name.toLowerCase().includes(searchVal) || 
      v.city.toLowerCase().includes(searchVal) || 
      v.description.toLowerCase().includes(searchVal);

    // Category match
    const matchCat = !catVal || v.category === catVal;

    // City match
    const matchCity = !cityVal || v.city.toLowerCase().includes(cityVal.toLowerCase());

    // Price beat guarantee filter
    const matchPriceBeat = !priceBeatOnly || v.priceBeatEligible;

    return matchSearch && matchCat && matchCity && matchPriceBeat;
  });

  // Sorting
  if (sortVal === 'rating-desc') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortVal === 'price-asc') {
    filtered.sort((a, b) => a.priceRaw - b.priceRaw);
  } else if (sortVal === 'price-desc') {
    filtered.sort((a, b) => b.priceRaw - a.priceRaw);
  } else {
    // Featured first
    filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  // Render
  const grid = document.getElementById('vendors-grid');
  const countEl = document.getElementById('vendor-results-count');

  if (countEl) {
    countEl.textContent = `${filtered.length} wedding artisan${filtered.length === 1 ? '' : 's'} found`;
  }

  if (grid) {
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; background: var(--color-surface); border-radius: var(--radius-medium); border: 1px dashed var(--color-border);">
          <div style="font-size: 2.5rem; margin-bottom: 12px; color: var(--color-text-muted);">❦</div>
          <h3 style="margin-bottom: 8px;">No matching wedding artisans found</h3>
          <p class="text-muted" style="margin-bottom: 20px;">Try loosening your filters or searching another Indian destination or specialty.</p>
          <button class="btn btn-secondary btn-sm" onclick="resetFilters()">Reset All Filters</button>
        </div>
      `;
    } else {
      grid.innerHTML = filtered.map(v => renderVendorCard(v)).join('');
    }
  }
}

function resetFilters() {
  const searchInput = document.getElementById('vendor-search-input');
  const catFilter = document.getElementById('filter-category');
  const cityFilter = document.getElementById('filter-city');
  const pbFilter = document.getElementById('filter-price-beat');
  if (searchInput) searchInput.value = '';
  if (catFilter) catFilter.value = '';
  if (cityFilter) cityFilter.value = '';
  if (pbFilter) pbFilter.checked = false;
  applyFilters();
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
