/**
 * Vow & Co. - Global Main Scripts
 * Handles Header, Navigation, Mobile Menu, Shortlist State, Search Bar, Modals, Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initShortlistCounter();
  initToast();
  initGlobalModals();
});

// Toast notifications
function showToast(message, icon = '✓') {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  toast.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Navigation & Mobile Drawer
function initNavigation() {
  const menuBtn = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const closeBtn = document.querySelector('.drawer-close');

  if (menuBtn && drawer && backdrop) {
    menuBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      backdrop.classList.add('active');
    });

    const closeDrawer = () => {
      drawer.classList.remove('open');
      backdrop.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);
  }
}

// Saved / Shortlist Manager
const ShortlistManager = {
  getSavedIds: function() {
    return StorageHelper.get('saved_vendors', ['v-101', 'v-102']);
  },
  isSaved: function(id) {
    return this.getSavedIds().includes(id);
  },
  toggle: function(id) {
    let list = this.getSavedIds();
    const idx = list.indexOf(id);
    let added = false;
    if (idx > -1) {
      list.splice(idx, 1);
      added = false;
    } else {
      list.push(id);
      added = true;
    }
    StorageHelper.set('saved_vendors', list);
    this.updateBadges();
    showToast(added ? 'Saved to your wedding shortlist' : 'Removed from shortlist', added ? '♥' : '✕');
    return added;
  },
  updateBadges: function() {
    const count = this.getSavedIds().length;
    document.querySelectorAll('.shortlist-badge-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  }
};

function initShortlistCounter() {
  ShortlistManager.updateBadges();
}

// Global Enquiry & Booking Modal
function initGlobalModals() {
  // Check if enquiry modal exists, otherwise create it
  if (!document.getElementById('enquiry-modal')) {
    const modalHtml = `
      <div id="enquiry-modal" class="modal-backdrop">
        <div class="modal-box">
          <div class="modal-header">
            <h3 class="modal-title" id="enquiry-modal-title">Request Official Quote & Availability</h3>
            <button class="modal-close" onclick="closeEnquiryModal()">&times;</button>
          </div>
          <div class="modal-body">
            <form id="enquiry-form" onsubmit="handleEnquirySubmit(event)">
              <div class="form-group">
                <label class="form-label">Your Name</label>
                <input type="text" class="form-control" id="enq-name" placeholder="e.g. Priyal Sharma" required>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                <div class="form-group">
                  <label class="form-label">Phone / WhatsApp</label>
                  <input type="tel" class="form-control" id="enq-phone" placeholder="+91 98765 43210" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Email Address</label>
                  <input type="email" class="form-control" id="enq-email" placeholder="priyal@example.com" required>
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                <div class="form-group">
                  <label class="form-label">Wedding Date</label>
                  <input type="date" class="form-control" id="enq-date" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Estimated Guests</label>
                  <select class="form-control" id="enq-guests">
                    <option value="100-250">100 - 250 Guests</option>
                    <option value="250-500" selected>250 - 500 Guests</option>
                    <option value="500-1000">500 - 1,000 Guests</option>
                    <option value="1000+">1,000+ Royal Scale</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Specific Requirements / Message</label>
                <textarea class="form-control" id="enq-notes" placeholder="Please mention ceremonies (Sangeet, Pheras, Reception) or specific catering and decor preferences..."></textarea>
              </div>
              <div style="background: var(--color-surface-subtle); padding: 12px 16px; border-radius: var(--radius-small); margin-bottom: 20px; font-size: 0.82rem; color: var(--color-text-muted);">
                🛡️ <strong>Price Beat Guarantee:</strong> If you receive a lower quote directly from the vendor, Vow & Co. matches and applies an extra concierge cash credit.
              </div>
              <button type="submit" class="btn btn-primary btn-block btn-lg" id="enq-submit-btn">Send Enquiry to Vendor Concierge</button>
            </form>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }
}

function openEnquiryModal(vendorName = 'Selected Partner') {
  const modal = document.getElementById('enquiry-modal');
  const title = document.getElementById('enquiry-modal-title');
  if (title) title.textContent = `Enquire with ${vendorName}`;
  if (modal) modal.classList.add('active');
}

function closeEnquiryModal() {
  const modal = document.getElementById('enquiry-modal');
  if (modal) modal.classList.remove('active');
}

function handleEnquirySubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('enq-submit-btn');
  const originalText = btn.textContent;
  btn.textContent = 'Transmitting to Vendor Concierge...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = originalText;
    btn.disabled = false;
    closeEnquiryModal();
    showToast('Enquiry sent! The wedding manager will contact you within 2 hours.', '✦');
    e.target.reset();
  }, 1000);
}

// Reusable Vendor Card Generator
function renderVendorCard(vendor) {
  const isSaved = ShortlistManager.isSaved(vendor.id);
  const heartIcon = isSaved 
    ? `<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
    : `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;

  return `
    <article class="card vendor-card" data-vendor-id="${vendor.id}">
      <div class="card-img-wrap">
        <img src="${vendor.image}" alt="${vendor.name}" loading="lazy">
        <span class="card-badge">${vendor.categoryName}</span>
        <button class="card-save-btn ${isSaved ? 'saved' : ''}" 
                title="Save to shortlist" 
                onclick="event.stopPropagation(); toggleVendorShortlist('${vendor.id}', this)">
          ${heartIcon}
        </button>
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="card-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            ${vendor.city}
          </span>
          <span class="card-rating">
            <span class="rating-star">★</span> ${vendor.rating} <span class="text-muted text-sm">(${vendor.reviewCount})</span>
          </span>
        </div>
        <h3 class="card-title">
          <a href="pages/vendor-details.html?id=${vendor.id}">${vendor.name}</a>
        </h3>
        <p class="card-desc">${vendor.description}</p>
        <div class="card-footer">
          <div>
            <span class="card-price-label">Starting Investment</span>
            <span class="card-price-value">${vendor.price}</span>
          </div>
          <a href="pages/vendor-details.html?id=${vendor.id}" class="btn btn-secondary btn-sm">View Profile</a>
        </div>
      </div>
    </article>
  `;
}

function toggleVendorShortlist(id, btnElement) {
  const isSaved = ShortlistManager.toggle(id);
  btnElement.classList.toggle('saved', isSaved);
  btnElement.innerHTML = isSaved
    ? `<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
    : `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
}
