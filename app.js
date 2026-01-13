// ==========================================
// UNIPOS - Point of Sale System
// Vanilla JavaScript Application
// Updated for Multi-Page Structure
// ==========================================

// ==========================================
// Mock Users Database
// ==========================================

const USERS = {
  'cashier@unipos.com': {
    password: 'cashier123',
    user: {
      id: '1',
      name: 'Ashley Graham',
      email: 'cashier@unipos.com',
      role: 'cashier',
      active: true
    }
  },
  'admin@unipos.com': {
    password: 'admin123',
    user: {
      id: '2',
      name: 'John Smith',
      email: 'admin@unipos.com',
      role: 'admin',
      active: true
    }
  },
  'owner@unipos.com': {
    password: 'owner123',
    user: {
      id: '3',
      name: 'Sarah Johnson',
      email: 'owner@unipos.com',
      role: 'owner',
      active: true
    }
  }
};

// Navigation Items with Role-based Access
const NAVIGATION_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    page: 'dashboard.html',
    icon: 'layout-dashboard',
    roles: ['cashier', 'admin', 'owner']
  },
  {
    id: 'products',
    label: 'Products',
    page: 'products.html',
    icon: 'package',
    roles: ['cashier', 'admin']
  },
  {
    id: 'transactions',
    label: 'Transactions',
    page: 'transactions.html',
    icon: 'shopping-cart',
    roles: ['admin']
  },
  {
    id: 'inventory',
    label: 'Inventory',
    page: 'inventory.html',
    icon: 'package',
    roles: ['admin', 'owner']
  },
  {
    id: 'reports',
    label: 'Reports',
    page: 'reports.html',
    icon: 'file-text',
    roles: ['cashier', 'admin', 'owner']
  },
  {
    id: 'sales',
    label: 'Sales',
    page: 'sales.html',
    icon: 'trending-up',
    roles: ['owner']
  },
  {
    id: 'refunds',
    label: 'Refunds',
    page: 'refunds.html',
    icon: 'rotate-ccw',
    roles: ['admin']
  },
  {
    id: 'ai-insights',
    label: 'AI Insights',
    page: 'ai-insights.html',
    icon: 'sparkles',
    roles: ['owner']
  },
  {
    id: 'settings',
    label: 'Settings',
    page: 'settings.html',
    icon: 'settings',
    roles: ['admin', 'owner']
  },
  {
    id: 'user-management',
    label: 'User Management',
    page: 'user-management.html',
    icon: 'users',
    roles: ['admin']
  }
];

// SVG Icons
const ICONS = {
  'layout-dashboard': '<path d="M3 3h7v9H3V3zm11 0h7v5h-7V3zm0 9h7v9h-7v-9zM3 16h7v5H3v-5z"/>',
  'package': '<path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  'shopping-cart': '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
  'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
  'trending-up': '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  'rotate-ccw': '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
  'sparkles': '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
  'settings': '<circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m5.196-14.196l-4.243 4.243m-2.828 2.828l-4.243 4.243M23 12h-6m-6 0H5m14.196 5.196l-4.243-4.243m-2.828-2.828l-4.243-4.243"/>',
  'users': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
};

function getIcon(name) {
  const svgContent = ICONS[name] || ICONS['package'];
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgContent}</svg>`;
}

// ==========================================
// Local Storage Functions
// ==========================================

function saveUser(user) {
  localStorage.setItem('unipos_user', JSON.stringify(user));
}

function getUser() {
  const userJson = localStorage.getItem('unipos_user');
  return userJson ? JSON.parse(userJson) : null;
}

function clearUser() {
  localStorage.removeItem('unipos_user');
}

function isAuthenticated() {
  return getUser() !== null;
}

// ==========================================
// Authentication Functions
// ==========================================

function login(email, password) {
  const userRecord = USERS[email];
  
  if (userRecord && userRecord.password === password) {
    saveUser(userRecord.user);
    return true;
  }
  
  return false;
}

function logout() {
  clearUser();
  window.location.href = 'index.html';
}

// ==========================================
// Page Initialization
// ==========================================

function initLoginPage() {
  // If already authenticated, redirect to dashboard
  if (isAuthenticated()) {
    window.location.href = 'dashboard.html';
    return;
  }

  const loginForm = document.getElementById('login-form');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password');
  const showPasswordCheckbox = document.getElementById('show-password');
  const adminQuickBtn = document.getElementById('admin-quick-btn');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorMessage = document.getElementById('error-message');
      const loginBtn = document.getElementById('login-btn');
      
      loginBtn.textContent = 'Logging in...';
      loginBtn.disabled = true;
      
      setTimeout(() => {
        const success = login(email, password);
        
        if (success) {
          errorMessage.style.display = 'none';
          window.location.href = 'dashboard.html';
        } else {
          errorMessage.textContent = 'Invalid email or password';
          errorMessage.style.display = 'block';
          loginBtn.textContent = 'LOGIN';
          loginBtn.disabled = false;
        }
      }, 500);
    });
  }
  
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
      if (showPasswordCheckbox) showPasswordCheckbox.checked = type === 'text';
    });
  }
  
  if (showPasswordCheckbox && passwordInput) {
    showPasswordCheckbox.addEventListener('change', (e) => {
      passwordInput.type = e.target.checked ? 'text' : 'password';
    });
  }
  
  if (adminQuickBtn) {
    adminQuickBtn.addEventListener('click', () => {
      document.getElementById('email').value = 'admin@unipos.com';
      document.getElementById('password').value = 'admin123';
    });
  }
}

function initAppPage() {
  // Check authentication
  if (!isAuthenticated()) {
    window.location.href = 'index.html';
    return;
  }

  const user = getUser();
  renderSidebar(user);
  renderUserProfile(user);
  
  // Set current date on dashboard
  const currentDateEl = document.getElementById('current-date');
  if (currentDateEl) {
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    currentDateEl.textContent = currentDate;
  }
  
  // Handle inventory subtitle for owner role
  const inventorySubtitle = document.getElementById('inventory-subtitle');
  if (inventorySubtitle && user.role === 'owner') {
    inventorySubtitle.textContent = 'View-only access to inventory';
  }
  
  // Hide update stock button for owner
  const updateStockBtn = document.getElementById('update-stock-btn');
  if (updateStockBtn && user.role === 'owner') {
    updateStockBtn.style.display = 'none';
  }
  
  // Logout handler
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
}

function renderSidebar(user) {
  const sidebarNav = document.getElementById('sidebar-nav');
  if (!sidebarNav) return;
  
  // Get current page
  const currentPath = window.location.pathname;
  const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  
  // Filter navigation items based on user role
  const allowedItems = NAVIGATION_ITEMS.filter(item => 
    item.roles.includes(user.role)
  );
  
  sidebarNav.innerHTML = allowedItems.map(item => `
    <a class="nav-item ${item.page === currentPage ? 'active' : ''}" 
       href="${item.page}">
      ${getIcon(item.icon)}
      <span class="nav-item-label">${item.label}</span>
    </a>
  `).join('');
}

function renderUserProfile(user) {
  // Get user initials
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  const userInitialsEl = document.getElementById('user-initials');
  const userNameEl = document.getElementById('user-name');
  const userRoleEl = document.getElementById('user-role');
  
  if (userInitialsEl) userInitialsEl.textContent = initials;
  if (userNameEl) userNameEl.textContent = user.name;
  if (userRoleEl) userRoleEl.textContent = user.role;
}

// ==========================================
// Initialize on DOM Load
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  
  // Initialize based on current page
  if (currentPage === 'index.html' || currentPage === '') {
    initLoginPage();
  } else {
    initAppPage();
  }
});
