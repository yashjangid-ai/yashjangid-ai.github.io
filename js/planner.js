/**
 * Vow & Co. - Interactive Planning Suite
 * 1. Interactive Checklist with Add/Toggle/Delete and LocalStorage persistence
 * 2. Budget Allocator with Dynamic Total, Allocated, Spent and Remaining calculation
 * 3. Guest List Manager with RSVP status toggling, count addition, search and side filtering
 */

document.addEventListener('DOMContentLoaded', () => {
  initPlannerTabs();
  initChecklist();
  initBudget();
  initGuests();

  // Check URL hash for tab
  const hash = window.location.hash.replace('#', '');
  if (['checklist', 'budget', 'guests'].includes(hash)) {
    switchTab(hash);
  }
});

function initPlannerTabs() {
  const tabs = document.querySelectorAll('.planner-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      switchTab(target);
    });
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.planner-tab-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
  });
  document.querySelectorAll('.planner-content-pane').forEach(p => {
    p.classList.toggle('active', p.id === `pane-${tabId}`);
  });
  window.location.hash = tabId;
}

/* ==========================================================================
   1. Wedding Checklist Module
   ========================================================================== */

let checklistItems = [];

function initChecklist() {
  checklistItems = StorageHelper.get('planner_checklist', VOW_DATA.defaultChecklist);
  renderChecklist();

  const addForm = document.getElementById('add-task-form');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('new-task-input');
      const catInput = document.getElementById('new-task-cat');
      const text = input.value.trim();
      if (!text) return;

      const newTask = {
        id: Date.now(),
        title: text,
        category: catInput.value || 'General',
        done: false,
        due: 'Upcoming'
      };

      checklistItems.unshift(newTask);
      StorageHelper.set('planner_checklist', checklistItems);
      input.value = '';
      renderChecklist();
      showToast('Task added to your wedding checklist', '✓');
    });
  }
}

function renderChecklist() {
  const container = document.getElementById('checklist-container');
  const countDisplay = document.getElementById('checklist-progress-text');
  const progressFill = document.getElementById('checklist-progress-bar');
  if (!container) return;

  const total = checklistItems.length;
  const completed = checklistItems.filter(i => i.done).length;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  if (countDisplay) countDisplay.textContent = `${completed} of ${total} tasks completed (${pct}%)`;
  if (progressFill) progressFill.style.width = `${pct}%`;

  if (checklistItems.length === 0) {
    container.innerHTML = `
      <div style="padding: 40px; text-align: center; color: var(--color-text-muted);">
        No tasks in your checklist. Add your first wedding milestone above!
      </div>
    `;
    return;
  }

  container.innerHTML = checklistItems.map(item => `
    <div class="checklist-item ${item.done ? 'completed' : ''}">
      <div class="checklist-left">
        <input type="checkbox" class="custom-checkbox" 
               ${item.done ? 'checked' : ''} 
               onchange="toggleTaskDone(${item.id})">
        <div>
          <span class="task-text" style="font-weight: 500;">${item.title}</span>
          <div style="display: flex; gap: 8px; margin-top: 4px;">
            <span class="task-tag">${item.category}</span>
            <span class="text-muted text-sm">${item.due}</span>
          </div>
        </div>
      </div>
      <button class="btn btn-ghost btn-sm" onclick="deleteTask(${item.id})" title="Delete task" style="color: var(--color-text-muted);">
        ✕
      </button>
    </div>
  `).join('');
}

function toggleTaskDone(id) {
  const task = checklistItems.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
    StorageHelper.set('planner_checklist', checklistItems);
    renderChecklist();
  }
}

function deleteTask(id) {
  checklistItems = checklistItems.filter(t => t.id !== id);
  StorageHelper.set('planner_checklist', checklistItems);
  renderChecklist();
  showToast('Task removed', '✓');
}

/* ==========================================================================
   2. Budget Planner Module
   ========================================================================== */

let budgetData = {};

function initBudget() {
  budgetData = StorageHelper.get('planner_budget', VOW_DATA.defaultBudget);
  renderBudget();

  const totalInput = document.getElementById('total-budget-input');
  if (totalInput) {
    totalInput.value = budgetData.total;
    totalInput.addEventListener('change', () => {
      const val = parseInt(totalInput.value, 10);
      if (!isNaN(val) && val > 0) {
        budgetData.total = val;
        StorageHelper.set('planner_budget', budgetData);
        renderBudget();
        showToast('Master budget ceiling updated', '₹');
      }
    });
  }

  const addCatForm = document.getElementById('add-budget-cat-form');
  if (addCatForm) {
    addCatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('new-bcat-name').value.trim();
      const alloc = parseInt(document.getElementById('new-bcat-alloc').value, 10) || 0;
      if (!name) return;

      budgetData.categories.push({
        id: 'b-' + Date.now(),
        name: name,
        allocated: alloc,
        spent: 0
      });
      StorageHelper.set('planner_budget', budgetData);
      renderBudget();
      e.target.reset();
      showToast('Budget category added', '✓');
    });
  }
}

function formatINR(number) {
  return '₹' + number.toLocaleString('en-IN');
}

function renderBudget() {
  const categoriesList = document.getElementById('budget-categories-list');
  const statTotal = document.getElementById('stat-budget-total');
  const statAlloc = document.getElementById('stat-budget-allocated');
  const statSpent = document.getElementById('stat-budget-spent');
  const statRemain = document.getElementById('stat-budget-remaining');
  const progressFill = document.getElementById('budget-progress-fill');

  const total = budgetData.total || 0;
  const totalAlloc = budgetData.categories.reduce((acc, c) => acc + (c.allocated || 0), 0);
  const totalSpent = budgetData.categories.reduce((acc, c) => acc + (c.spent || 0), 0);
  const remaining = total - totalSpent;

  if (statTotal) statTotal.textContent = formatINR(total);
  if (statAlloc) statAlloc.textContent = formatINR(totalAlloc);
  if (statSpent) statSpent.textContent = formatINR(totalSpent);
  if (statRemain) {
    statRemain.textContent = formatINR(remaining);
    statRemain.style.color = remaining < 0 ? 'var(--color-error)' : 'var(--color-success)';
  }

  const spentPct = total > 0 ? Math.min(100, Math.round((totalSpent / total) * 100)) : 0;
  if (progressFill) progressFill.style.width = `${spentPct}%`;

  if (categoriesList) {
    categoriesList.innerHTML = budgetData.categories.map((cat, idx) => `
      <div class="card" style="padding: 16px 20px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
        <div style="flex: 2; min-width: 180px;">
          <h4 style="margin-bottom: 2px;">${cat.name}</h4>
          <span class="text-muted text-sm">Spent: ${formatINR(cat.spent || 0)}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
          <div>
            <label class="form-label" style="font-size: 0.72rem; margin-bottom: 2px;">Allocated (₹)</label>
            <input type="number" class="form-control" value="${cat.allocated}" 
                   style="width: 140px; padding: 6px 10px; font-size: 0.9rem;"
                   onchange="updateBudgetAlloc('${cat.id}', this.value)">
          </div>
          <div>
            <label class="form-label" style="font-size: 0.72rem; margin-bottom: 2px;">Paid / Spent (₹)</label>
            <input type="number" class="form-control" value="${cat.spent}" 
                   style="width: 140px; padding: 6px 10px; font-size: 0.9rem;"
                   onchange="updateBudgetSpent('${cat.id}', this.value)">
          </div>
          <button class="btn btn-ghost" onclick="deleteBudgetCategory('${cat.id}')" title="Delete category" style="color: var(--color-error); padding: 4px 8px;">
            ✕
          </button>
        </div>
      </div>
    `).join('');
  }
}

function updateBudgetAlloc(id, val) {
  const cat = budgetData.categories.find(c => c.id === id);
  if (cat) {
    cat.allocated = parseInt(val, 10) || 0;
    StorageHelper.set('planner_budget', budgetData);
    renderBudget();
  }
}

function updateBudgetSpent(id, val) {
  const cat = budgetData.categories.find(c => c.id === id);
  if (cat) {
    cat.spent = parseInt(val, 10) || 0;
    StorageHelper.set('planner_budget', budgetData);
    renderBudget();
  }
}

function deleteBudgetCategory(id) {
  budgetData.categories = budgetData.categories.filter(c => c.id !== id);
  StorageHelper.set('planner_budget', budgetData);
  renderBudget();
}

/* ==========================================================================
   3. Guest List & RSVP Manager
   ========================================================================== */

let guestList = [];

function initGuests() {
  guestList = StorageHelper.get('planner_guests', VOW_DATA.defaultGuests);
  renderGuests();

  const addGuestForm = document.getElementById('add-guest-form');
  if (addGuestForm) {
    addGuestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('g-name').value.trim();
      const relation = document.getElementById('g-rel').value.trim();
      const side = document.getElementById('g-side').value;
      const count = parseInt(document.getElementById('g-count').value, 10) || 1;
      const diet = document.getElementById('g-diet').value.trim() || 'Standard';

      if (!name) return;

      guestList.unshift({
        id: 'g-' + Date.now(),
        name,
        relation,
        side,
        count,
        rsvp: 'Pending',
        diet
      });

      StorageHelper.set('planner_guests', guestList);
      e.target.reset();
      renderGuests();
      showToast('Guest added to invitation register', '✓');
    });
  }

  const searchInput = document.getElementById('guest-search-input');
  if (searchInput) searchInput.addEventListener('input', renderGuests);

  const filterSide = document.getElementById('guest-filter-side');
  if (filterSide) filterSide.addEventListener('change', renderGuests);
}

function renderGuests() {
  const tableBody = document.getElementById('guest-table-body');
  const countDisplay = document.getElementById('guest-stats-summary');
  const searchVal = (document.getElementById('guest-search-input')?.value || '').toLowerCase().trim();
  const sideFilter = document.getElementById('guest-filter-side')?.value || '';

  const totalHeadcount = guestList.reduce((acc, g) => acc + (g.count || 1), 0);
  const attendingHeadcount = guestList
    .filter(g => g.rsvp === 'Attending')
    .reduce((acc, g) => acc + (g.count || 1), 0);

  if (countDisplay) {
    countDisplay.textContent = `Total Expected: ${totalHeadcount} Guests across ${guestList.length} families (${attendingHeadcount} Confirmed Attending)`;
  }

  if (!tableBody) return;

  const filtered = guestList.filter(g => {
    const matchSearch = !searchVal || g.name.toLowerCase().includes(searchVal) || g.relation.toLowerCase().includes(searchVal);
    const matchSide = !sideFilter || g.side === sideFilter;
    return matchSearch && matchSide;
  });

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 32px; color: var(--color-text-muted);">
          No matching guests found.
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filtered.map(g => {
    let rsvpClass = 'status-pending';
    if (g.rsvp === 'Attending') rsvpClass = 'status-attending';
    if (g.rsvp === 'Declined') rsvpClass = 'status-declined';

    return `
      <tr>
        <td>
          <strong>${g.name}</strong><br>
          <span class="text-muted text-sm">${g.relation}</span>
        </td>
        <td>
          <span class="filter-chip" style="padding: 2px 10px; font-size: 0.78rem;">${g.side}</span>
        </td>
        <td><strong>${g.count}</strong></td>
        <td>
          <select class="form-control" style="width: auto; padding: 4px 8px; font-size: 0.85rem;" onchange="updateGuestRsvp('${g.id}', this.value)">
            <option value="Pending" ${g.rsvp === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Attending" ${g.rsvp === 'Attending' ? 'selected' : ''}>Attending</option>
            <option value="Declined" ${g.rsvp === 'Declined' ? 'selected' : ''}>Declined</option>
          </select>
        </td>
        <td><span class="text-muted text-sm">${g.diet}</span></td>
        <td>
          <button class="btn btn-ghost btn-sm" onclick="deleteGuest('${g.id}')" title="Remove guest" style="color: var(--color-error);">
            ✕
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function updateGuestRsvp(id, newRsvp) {
  const guest = guestList.find(g => g.id === id);
  if (guest) {
    guest.rsvp = newRsvp;
    StorageHelper.set('planner_guests', guestList);
    renderGuests();
  }
}

function deleteGuest(id) {
  guestList = guestList.filter(g => g.id !== id);
  StorageHelper.set('planner_guests', guestList);
  renderGuests();
  showToast('Guest record removed', '✓');
}
