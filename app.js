// ==========================================
// UNIPOS - Point of Sale System
// Vanilla JavaScript Application
// Updated for Multi-Page Structure
// ==========================================

// ==========================================
// Mock Users Database
// ==========================================

const USERS = {
	"cashier@unipos.com": {
		password: "cashier123",
		user: {
			id: "1",
			name: "Ashley Graham",
			email: "cashier@unipos.com",
			role: "cashier",
			active: true,
		},
	},
	"admin@unipos.com": {
		password: "admin123",
		user: {
			id: "2",
			name: "John Smith",
			email: "admin@unipos.com",
			role: "admin",
			active: true,
		},
	},
	"owner@unipos.com": {
		password: "owner123",
		user: {
			id: "3",
			name: "Sarah Johnson",
			email: "owner@unipos.com",
			role: "owner",
			active: true,
		},
	},
};

// Navigation Items with Role-based Access
const NAVIGATION_ITEMS = [
	{
		id: "dashboard",
		label: "Dashboard",
		page: "dashboard.html",
		icon: "layout-dashboard",
		roles: ["cashier", "admin", "owner"],
	},
	{
		id: "products",
		label: "Products",
		page: "products.html",
		icon: "package",
		roles: ["cashier", "admin"],
	},
	{
		id: "transactions",
		label: "Transactions",
		page: "transactions.html",
		icon: "shopping-cart",
		roles: ["admin"],
	},
	{
		id: "inventory",
		label: "Inventory",
		page: "inventory.html",
		icon: "package",
		roles: ["admin", "owner"],
	},
	{
		id: "reports",
		label: "Reports",
		page: "reports.html",
		icon: "file-text",
		roles: ["cashier", "admin", "owner"],
	},
	{
		id: "sales",
		label: "Sales",
		page: "sales.html",
		icon: "trending-up",
		roles: ["owner"],
	},
	{
		id: "refunds",
		label: "Refunds",
		page: "refunds.html",
		icon: "rotate-ccw",
		roles: ["admin"],
	},
	{
		id: "ai-insights",
		label: "AI Insights",
		page: "ai-insights.html",
		icon: "sparkles",
		roles: ["owner"],
	},
	{
		id: "settings",
		label: "Settings",
		page: "settings.html",
		icon: "settings",
		roles: ["admin", "owner"],
	},
	{
		id: "user-management",
		label: "User Management",
		page: "user-management.html",
		icon: "users",
		roles: ["admin"],
	},
];

// SVG Icons
const ICONS = {
	"layout-dashboard":
		'<path d="M3 3h7v9H3V3zm11 0h7v5h-7V3zm0 9h7v9h-7v-9zM3 16h7v5H3v-5z"/>',
	package:
		'<path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
	"shopping-cart":
		'<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
	"file-text":
		'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
	"trending-up":
		'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
	"rotate-ccw":
		'<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
	sparkles:
		'<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
	settings:
		'<circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m5.196-14.196l-4.243 4.243m-2.828 2.828l-4.243 4.243M23 12h-6m-6 0H5m14.196 5.196l-4.243-4.243m-2.828-2.828l-4.243-4.243"/>',
	users:
		'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
};

function getIcon(name) {
	const svgContent = ICONS[name] || ICONS["package"];
	return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgContent}</svg>`;
}

// ==========================================
// Local Storage Functions
// ==========================================

function saveUser(user) {
	localStorage.setItem("unipos_user", JSON.stringify(user));
}

function getUser() {
	const userJson = localStorage.getItem("unipos_user");
	return userJson ? JSON.parse(userJson) : null;
}

function clearUser() {
	localStorage.removeItem("unipos_user");
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
	window.location.href = "index.html";
}

// ==========================================
// Page Initialization
// ==========================================

function initLoginPage() {
	// If already authenticated, redirect to dashboard
	if (isAuthenticated()) {
		window.location.href = "dashboard.html";
		return;
	}

	const loginForm = document.getElementById("login-form");
	const togglePasswordBtn = document.getElementById("toggle-password");
	const passwordInput = document.getElementById("password");
	const showPasswordCheckbox = document.getElementById("show-password");
	const adminQuickBtn = document.getElementById("admin-quick-btn");

	if (loginForm) {
		loginForm.addEventListener("submit", (e) => {
			e.preventDefault();

			const email = document.getElementById("email").value;
			const password = document.getElementById("password").value;
			const errorMessage = document.getElementById("error-message");
			const loginBtn = document.getElementById("login-btn");

			loginBtn.textContent = "Logging in...";
			loginBtn.disabled = true;

			setTimeout(() => {
				const success = login(email, password);

				if (success) {
					errorMessage.style.display = "none";
					window.location.href = "dashboard.html";
				} else {
					errorMessage.textContent = "Invalid email or password";
					errorMessage.style.display = "block";
					loginBtn.textContent = "LOGIN";
					loginBtn.disabled = false;
				}
			}, 500);
		});
	}

	if (togglePasswordBtn && passwordInput) {
		togglePasswordBtn.addEventListener("click", () => {
			const type = passwordInput.type === "password" ? "text" : "password";
			passwordInput.type = type;
			if (showPasswordCheckbox) showPasswordCheckbox.checked = type === "text";
		});
	}

	if (showPasswordCheckbox && passwordInput) {
		showPasswordCheckbox.addEventListener("change", (e) => {
			passwordInput.type = e.target.checked ? "text" : "password";
		});
	}

	if (adminQuickBtn) {
		adminQuickBtn.addEventListener("click", () => {
			document.getElementById("email").value = "admin@unipos.com";
			document.getElementById("password").value = "admin123";
		});
	}
}

function initAppPage() {
	// Check authentication
	if (!isAuthenticated()) {
		window.location.href = "index.html";
		return;
	}

	const user = getUser();
	renderSidebar(user);
	renderUserProfile(user);

	// Set current date on dashboard
	const currentDateEl = document.getElementById("current-date");
	if (currentDateEl) {
		const currentDate = new Date().toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		currentDateEl.textContent = currentDate;
	}

	// Handle inventory subtitle for owner role
	const inventorySubtitle = document.getElementById("inventory-subtitle");
	if (inventorySubtitle && user.role === "owner") {
		inventorySubtitle.textContent = "View-only access to inventory";
	}

	// Hide update stock button for owner
	const updateStockBtn = document.getElementById("update-stock-btn");
	if (updateStockBtn && user.role === "owner") {
		updateStockBtn.style.display = "none";
	}

	// Logout handler
	const logoutBtn = document.getElementById("logout-btn");
	if (logoutBtn) {
		logoutBtn.addEventListener("click", logout);
	}
}

function renderSidebar(user) {
	const sidebarNav = document.getElementById("sidebar-nav");
	if (!sidebarNav) return;

	// Get current page
	const currentPath = window.location.pathname;
	const currentPage = currentPath.substring(currentPath.lastIndexOf("/") + 1);

	// Filter navigation items based on user role
	const allowedItems = NAVIGATION_ITEMS.filter((item) =>
		item.roles.includes(user.role)
	);

	sidebarNav.innerHTML = allowedItems
		.map(
			(item) => `
    <a class="nav-item ${item.page === currentPage ? "active" : ""}" 
       href="${item.page}">
      ${getIcon(item.icon)}
      <span class="nav-item-label">${item.label}</span>
    </a>
  `
		)
		.join("");
}

function renderUserProfile(user) {
	// Get user initials
	const initials = user.name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase();

	const userInitialsEl = document.getElementById("user-initials");
	const userNameEl = document.getElementById("user-name");
	const userRoleEl = document.getElementById("user-role");

	if (userInitialsEl) userInitialsEl.textContent = initials;
	if (userNameEl) userNameEl.textContent = user.name;
	if (userRoleEl) userRoleEl.textContent = user.role;
}

// ==========================================
// Initialize on DOM Load
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
	const currentPath = window.location.pathname;
	const currentPage = currentPath.substring(currentPath.lastIndexOf("/") + 1);

	// Initialize based on current page
	if (currentPage === "index.html" || currentPage === "") {
		initLoginPage();
	} else {
		initAppPage();
	}
});


/////////
//PRODUCT
/////////

(function () {
	// ---------- Helpers ----------
	const peso = (n) => `₱${Number(n || 0).toLocaleString("en-PH")}`;
	const parsePeso = (txt) => {
		if (!txt) return "";
		return String(txt).replace(/[₱,\s]/g, "");
	};

	function getStatusFromRow(row) {
		const badge = row.querySelector(".list-item-badge");
		const label = (badge?.textContent || "").trim().toLowerCase();
		if (label.includes("low")) return "Low Stock";
		return "Active";
	}

	function setStatusBadge(td, status) {
		// Clear td and recreate badge (keeps HTML consistent)
		td.innerHTML = "";
		const span = document.createElement("span");
		span.className =
			status === "Low Stock"
				? "list-item-badge warning"
				: "list-item-badge success";
		span.textContent = status;
		td.appendChild(span);
	}

	function buildRow({ name, sku, category, price, stock, status }) {
		const tr = document.createElement("tr");
		tr.style.borderBottom = "1px solid rgba(0, 0, 0, 0.05)";

		const tdName = document.createElement("td");
		tdName.style.padding = "1rem";
		tdName.style.fontWeight = "600";
		tdName.textContent = name;

		const tdSku = document.createElement("td");
		tdSku.style.padding = "1rem";
		tdSku.style.color = "var(--gray-500)";
		tdSku.textContent = sku;

		const tdCat = document.createElement("td");
		tdCat.style.padding = "1rem";
		tdCat.textContent = category;

		const tdPrice = document.createElement("td");
		tdPrice.style.padding = "1rem";
		tdPrice.style.fontWeight = "600";
		tdPrice.textContent = peso(price);

		const tdStock = document.createElement("td");
		tdStock.style.padding = "1rem";
		tdStock.textContent = stock;

		const tdStatus = document.createElement("td");
		tdStatus.style.padding = "1rem";
		setStatusBadge(tdStatus, status);

		const tdActions = document.createElement("td");
		tdActions.style.padding = "1rem";

		const btn = document.createElement("button");
		btn.className = "btn btn-outline";
		btn.textContent = "Edit";
		btn.style.width = "auto";
		btn.style.padding = "0.25rem 0.75rem";
		btn.style.height = "auto";
		btn.style.fontSize = "0.875rem";
		tdActions.appendChild(btn);

		tr.appendChild(tdName);
		tr.appendChild(tdSku);
		tr.appendChild(tdCat);
		tr.appendChild(tdPrice);
		tr.appendChild(tdStock);
		tr.appendChild(tdStatus);
		tr.appendChild(tdActions);

		return tr;
	}

	// ---------- Modal UI ----------
	let modalEl = null;

	function ensureModal() {
		if (modalEl) return modalEl;

		// Overlay
		const overlay = document.createElement("div");
		overlay.id = "product-modal-overlay";
		overlay.style.position = "fixed";
		overlay.style.inset = "0";
		overlay.style.zIndex = "9999";
		overlay.style.display = "none";
		overlay.style.alignItems = "center";
		overlay.style.justifyContent = "center";
		overlay.style.padding = "1rem";
		overlay.style.background = "rgba(15, 23, 42, 0.35)";
		overlay.style.backdropFilter = "blur(10px)";

		// Modal (uses your glass styles)
		const modal = document.createElement("div");
		modal.className = "glass-card";
		modal.style.width = "min(720px, 100%)";
		modal.style.borderRadius = "16px";
		modal.style.overflow = "hidden";
		modal.style.boxShadow = "0 20px 60px rgba(0,0,0,0.25)";

		// Header
		const header = document.createElement("div");
		header.style.display = "flex";
		header.style.alignItems = "center";
		header.style.justifyContent = "space-between";
		header.style.padding = "1rem 1.25rem";
		header.style.borderBottom = "1px solid rgba(0,0,0,0.06)";

		const title = document.createElement("div");
		title.id = "product-modal-title";
		title.style.fontWeight = "700";
		title.style.fontSize = "1.1rem";
		title.textContent = "Product";

		const closeBtn = document.createElement("button");
		closeBtn.className = "btn btn-outline";
		closeBtn.type = "button";
		closeBtn.textContent = "Close";
		closeBtn.style.width = "auto";
		closeBtn.style.padding = "0.4rem 0.8rem";
		closeBtn.style.height = "auto";
		closeBtn.style.fontSize = "0.875rem";

		header.appendChild(title);
		header.appendChild(closeBtn);

		// Body
		const body = document.createElement("div");
		body.style.padding = "1.25rem";

		const form = document.createElement("form");
		form.id = "product-form";
		form.autocomplete = "off";

		const grid = document.createElement("div");
		grid.style.display = "grid";
		grid.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
		grid.style.gap = "0.9rem";

		const field = (labelText, inputEl) => {
			const wrap = document.createElement("div");
			wrap.style.display = "flex";
			wrap.style.flexDirection = "column";
			wrap.style.gap = "0.35rem";

			const label = document.createElement("label");
			label.textContent = labelText;
			label.style.fontSize = "0.875rem";
			label.style.fontWeight = "600";
			label.style.opacity = "0.9";

			inputEl.style.width = "100%";
			inputEl.style.padding = "0.75rem 0.85rem";
			inputEl.style.borderRadius = "12px";
			inputEl.style.border = "1px solid rgba(0,0,0,0.08)";
			inputEl.style.outline = "none";
			inputEl.style.background = "rgba(255,255,255,0.65)";
			inputEl.style.backdropFilter = "blur(8px)";

			wrap.appendChild(label);
			wrap.appendChild(inputEl);
			return wrap;
		};

		const inputName = document.createElement("input");
		inputName.name = "name";
		inputName.placeholder = "e.g. Coffee Beans 1kg";

		const inputSku = document.createElement("input");
		inputSku.name = "sku";
		inputSku.placeholder = "e.g. COF-001";

		const inputCategory = document.createElement("select");
		inputCategory.name = "category";

		["Beverages", "Dairy", "Bakery", "Snacks"].forEach((cat) => {
		const opt = document.createElement("option");
		opt.value = cat;
		opt.textContent = cat;
		inputCategory.appendChild(opt);
		});

		const inputPrice = document.createElement("input");
		inputPrice.name = "price";
		inputPrice.inputMode = "decimal";
		inputPrice.placeholder = "e.g. 450";

		const inputStock = document.createElement("input");
		inputStock.name = "stock";
		inputStock.inputMode = "numeric";
		inputStock.placeholder = "e.g. 145";

		const selectStatus = document.createElement("select");
		selectStatus.name = "status";
		[
			{ label: "Active", value: "Active" },
			{ label: "Low Stock", value: "Low Stock" },
		].forEach((o) => {
			const opt = document.createElement("option");
			opt.value = o.value;
			opt.textContent = o.label;
			selectStatus.appendChild(opt);
		});

		grid.appendChild(field("Product Name", inputName));
		grid.appendChild(field("SKU", inputSku));
		grid.appendChild(field("Category", inputCategory));
		grid.appendChild(field("Price", inputPrice));
		grid.appendChild(field("Stock", inputStock));
		grid.appendChild(field("Status", selectStatus));

		form.appendChild(grid);

		// Footer actions
		const footer = document.createElement("div");
		footer.style.display = "flex";
		footer.style.justifyContent = "flex-end";
		footer.style.gap = "0.5rem";
		footer.style.marginTop = "1.1rem";

		const cancel = document.createElement("button");
		cancel.type = "button";
		cancel.className = "btn btn-outline";
		cancel.textContent = "Cancel";
		cancel.style.width = "auto";
		cancel.style.padding = "0.5rem 1rem";
		cancel.style.height = "auto";

		const save = document.createElement("button");
		save.type = "submit";
		save.className = "btn btn-primary";
		save.textContent = "Save";
		save.style.width = "auto";
		save.style.padding = "0.5rem 1rem";
		save.style.height = "auto";

		footer.appendChild(cancel);
		footer.appendChild(save);

		form.appendChild(footer);
		body.appendChild(form);

		modal.appendChild(header);
		modal.appendChild(body);
		overlay.appendChild(modal);
		document.body.appendChild(overlay);

		// Closing behaviors
		function closeModal() {
			overlay.style.display = "none";
			overlay.dataset.mode = "";
			overlay.dataset.rowId = "";
			form.reset();
		}

		closeBtn.addEventListener("click", closeModal);
		cancel.addEventListener("click", closeModal);
		overlay.addEventListener("click", (e) => {
			if (e.target === overlay) closeModal();
		});
		document.addEventListener("keydown", (e) => {
			if (overlay.style.display !== "none" && e.key === "Escape") closeModal();
		});

		// Expose refs
		overlay._refs = {
			title,
			form,
			inputName,
			inputSku,
			inputCategory,
			inputPrice,
			inputStock,
			selectStatus,
			closeModal,
		};

		modalEl = overlay;
		return modalEl;
	}

	function openEditModal(row) {
		const overlay = ensureModal();
		const r = overlay._refs;

		const cells = row.querySelectorAll("td");
		// expected: name, sku, category, price, stock, status, actions
		const name = (cells[0]?.textContent || "").trim();
		const sku = (cells[1]?.textContent || "").trim();
		const category = (cells[2]?.textContent || "").trim();
		const priceRaw = (cells[3]?.textContent || "").trim();
		const stock = (cells[4]?.textContent || "").trim();
		const status = getStatusFromRow(row);

		r.title.textContent = "Edit Product";
		overlay.dataset.mode = "edit";
		overlay.dataset.rowId = String(Date.now()); // just a marker; we keep row ref in closure below

		r.inputName.value = name;
		r.inputSku.value = sku;
		r.inputCategory.value = category;
		r.inputPrice.value = parsePeso(priceRaw);
		r.inputStock.value = stock;
		r.selectStatus.value = status;

		// Submit handler (overwrite)
		r.form.onsubmit = function (e) {
			e.preventDefault();

			const updated = {
				name: r.inputName.value.trim(),
				sku: r.inputSku.value.trim(),
				category: r.inputCategory.value.trim(),
				price: r.inputPrice.value.trim(),
				stock: r.inputStock.value.trim(),
				status: r.selectStatus.value,
			};

			// Basic required checks
			if (
				!updated.name ||
				!updated.sku ||
				!updated.category ||
				updated.price === "" ||
				updated.stock === ""
			) {
				return;
			}

			// Update cells
			if (cells[0]) cells[0].textContent = updated.name;
			if (cells[1]) cells[1].textContent = updated.sku;
			if (cells[2]) cells[2].textContent = updated.category;
			if (cells[3]) cells[3].textContent = peso(updated.price);
			if (cells[4]) cells[4].textContent = updated.stock;

			// Status cell (try to find the cell that contains badge)
			const statusCell = row.querySelector("td .list-item-badge")?.closest("td") || cells[5];
			if (statusCell) setStatusBadge(statusCell, updated.status);

			r.closeModal();
		};

		overlay.style.display = "flex";
		r.inputName.focus();
	}

	function openAddModal() {
		const overlay = ensureModal();
		const r = overlay._refs;

		r.title.textContent = "Add Product";
		overlay.dataset.mode = "add";
		r.form.reset();
		r.selectStatus.value = "Active";

		r.form.onsubmit = function (e) {
			e.preventDefault();

			const data = {
				name: r.inputName.value.trim(),
				sku: r.inputSku.value.trim(),
				category: r.inputCategory.value.trim(),
				price: r.inputPrice.value.trim(),
				stock: r.inputStock.value.trim(),
				status: r.selectStatus.value,
			};

			if (!data.name || !data.sku || !data.category || data.price === "" || data.stock === "") {
				return;
			}

			const tbody = document.querySelector("table tbody");
			if (!tbody) return;

			tbody.appendChild(buildRow(data));
			r.closeModal();
		};

		overlay.style.display = "flex";
		r.inputName.focus();
	}

	// ---------- Wire up buttons ----------
	function wireUp() {
		// Add Product button (matches your existing button)
		const addBtn = Array.from(document.querySelectorAll("button.btn.btn-primary")).find((b) =>
			(b.textContent || "").trim().toLowerCase().includes("add product")
		);
		if (addBtn) addBtn.addEventListener("click", openAddModal);

		// Edit buttons (event delegation)
		document.addEventListener("click", (e) => {
			const btn = e.target.closest("button");
			if (!btn) return;
			if ((btn.textContent || "").trim().toLowerCase() !== "edit") return;

			const row = btn.closest("tr");
			if (!row) return;

			openEditModal(row);
		});
	}

	// Run after DOM is ready
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", wireUp);
	} else {
		wireUp();
	}
})();


//////
//REPORTS
//////


(function () {
	// Find buttons by their text (no HTML changes needed)
	const btnPdf = Array.from(document.querySelectorAll("button.btn")).find(
		(b) => (b.textContent || "").trim().toLowerCase() === "export pdf"
	);
	const btnXlsx = Array.from(document.querySelectorAll("button.btn")).find(
		(b) => (b.textContent || "").trim().toLowerCase() === "export excel"
	);
	const btnCsv = Array.from(document.querySelectorAll("button.btn")).find(
		(b) => (b.textContent || "").trim().toLowerCase() === "export csv"
	);

	// Small helper: trigger a download
	function downloadFile(filename, mimeType, content) {
		const blob = new Blob([content], { type: mimeType });
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		a.remove();

		setTimeout(() => URL.revokeObjectURL(url), 500);
	}

	// Pull the visible report values from the page (so exported files match UI)
	function getSalesDataFromUI() {
		const salesCard = Array.from(document.querySelectorAll(".content-card")).find(
			(card) =>
				(card.querySelector(".card-title")?.textContent || "").trim().toLowerCase() ===
				"sales report"
		);
		const rows = Array.from(salesCard?.querySelectorAll(".list-item") || []);
		return rows.map((row) => ({
			label: (row.querySelector(".list-item-title")?.textContent || "").trim(),
			subtitle: (row.querySelector(".list-item-subtitle")?.textContent || "").trim(),
			value: (row.querySelector(".list-item-value")?.textContent || "").trim(),
		}));
	}

	function getInventoryDataFromUI() {
		const card = Array.from(document.querySelectorAll(".content-card")).find(
			(c) =>
				(c.querySelector(".card-title")?.textContent || "").trim().toLowerCase() ===
				"inventory report"
		);
		const rows = Array.from(card?.querySelectorAll(".list-item") || []);
		return rows.map((row) => ({
			label: (row.querySelector(".list-item-title")?.textContent || "").trim(),
			value: (row.querySelector(".list-item-value")?.textContent || "").trim(),
		}));
	}

	function getTransactionDataFromUI() {
		const card = Array.from(document.querySelectorAll(".content-card")).find(
			(c) =>
				(c.querySelector(".card-title")?.textContent || "").trim().toLowerCase() ===
				"transaction report"
		);
		const rows = Array.from(card?.querySelectorAll(".list-item") || []);
		return rows.map((row) => ({
			label: (row.querySelector(".list-item-title")?.textContent || "").trim(),
			subtitle: (row.querySelector(".list-item-subtitle")?.textContent || "").trim(),
			value: (row.querySelector(".list-item-value")?.textContent || "").trim(),
		}));
	}

	// -------- PDF (simple, works without libraries) --------
	function exportPDF() {
	const sales = getSalesDataFromUI();
	const now = new Date();

	const printHtml = `<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<title>Sales Report</title>
<style>
  body{font-family:Arial, sans-serif; padding:24px;}
  h1{margin:0 0 12px;}
  .muted{color:#555; margin:0 0 18px;}
  table{width:100%; border-collapse:collapse;}
  th,td{border:1px solid #ddd; padding:10px; text-align:left;}
  th{background:#f6f6f6;}
</style>
</head>
<body>
  <h1>Sales Report</h1>
  <p class="muted">Exported: ${now.toLocaleString()}</p>
  <table>
    <thead>
      <tr><th>Metric</th><th>Period</th><th>Value</th></tr>
    </thead>
    <tbody>
      ${sales
				.map(
					(r) =>
						`<tr><td>${escapeHtml(r.label)}</td><td>${escapeHtml(
							r.subtitle
						)}</td><td>${escapeHtml(r.value)}</td></tr>`
				)
				.join("")}
    </tbody>
  </table>
  <script>
    window.onload = () => window.print();
  </script>
</body>
</html>`;

	const w = window.open("", "_blank");

// If user closes/cancels the print dialog, close the new tab so you "go back" to Reports
const closeAfterPrint = () => {
	try { w.close(); } catch (e) {}
};
w.onafterprint = closeAfterPrint;
// Fallback (some browsers don't fire onafterprint reliably)
setTimeout(closeAfterPrint, 1500);

	w.document.open();
	w.document.write(printHtml);
	w.document.close();
}


	// -------- Excel (as .xls HTML table; opens in Excel) --------
	function exportExcel() {
		const inventory = getInventoryDataFromUI();
		const now = new Date();
		const stamp = now.toISOString().slice(0, 10);

		const xls = `<!doctype html>
<html>
<head><meta charset="utf-8"/></head>
<body>
  <table border="1" cellpadding="6" cellspacing="0">
    <tr><th colspan="2">Inventory Report</th></tr>
    <tr><th>Metric</th><th>Value</th></tr>
    ${inventory
			.map(
				(r) =>
					`<tr><td>${escapeHtml(r.label)}</td><td>${escapeHtml(r.value)}</td></tr>`
			)
			.join("")}
  </table>
</body>
</html>`;

		// Use .xls for best compatibility without external libs
		downloadFile(`Inventory_Report_${stamp}.xls`, "application/vnd.ms-excel", xls);
	}

	// -------- CSV --------
	function exportCSV() {
		const tx = getTransactionDataFromUI();
		const now = new Date();
		const stamp = now.toISOString().slice(0, 10);

		const header = ["Metric", "Period", "Value"];
		const lines = [
			header.join(","),
			...tx.map((r) =>
				[
					csvEscape(r.label),
					csvEscape(r.subtitle || ""),
					csvEscape(r.value),
				].join(",")
			),
		];

		downloadFile(`Transaction_Report_${stamp}.csv`, "text/csv;charset=utf-8", lines.join("\n"));
	}

	// Helpers for safety
	function csvEscape(v) {
		const s = String(v ?? "");
		if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
		return s;
	}
	function escapeHtml(str) {
		return String(str ?? "")
			.replaceAll("&", "&amp;")
			.replaceAll("<", "&lt;")
			.replaceAll(">", "&gt;")
			.replaceAll('"', "&quot;")
			.replaceAll("'", "&#039;");
	}

	// Wire up clicks
	if (btnPdf) btnPdf.addEventListener("click", exportPDF);
	if (btnXlsx) btnXlsx.addEventListener("click", exportExcel);
	if (btnCsv) btnCsv.addEventListener("click", exportCSV);
})();


////////
//SETTINGS
///////

(function () {
	// ---------- Utilities ----------
	const STORAGE_KEY = "unipos_settings_v1";

	function $(sel, root = document) {
		return root.querySelector(sel);
	}
	function $all(sel, root = document) {
		return Array.from(root.querySelectorAll(sel));
	}
	function textEq(el, txt) {
		return (el?.textContent || "").trim().toLowerCase() === txt.trim().toLowerCase();
	}
	function findButtonByText(txt) {
		return $all("button.btn").find((b) => textEq(b, txt));
	}
	function downloadFile(filename, mimeType, content) {
		const blob = new Blob([content], { type: mimeType });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		a.remove();
		setTimeout(() => URL.revokeObjectURL(url), 500);
	}
	function nowStamp() {
		const d = new Date();
		return d.toISOString().slice(0, 10);
	}

	// ---------- Center Toast ----------
	function toast(message) {
		const el = document.createElement("div");
		el.textContent = message;

		el.style.position = "fixed";
		el.style.left = "50%";
		el.style.top = "50%";
		el.style.transform = "translate(-50%, -50%)";
		el.style.zIndex = "10000";

		el.style.padding = "0.9rem 1.1rem";
		el.style.borderRadius = "14px";
		el.style.background = "rgba(255,255,255,0.78)";
		el.style.backdropFilter = "blur(12px)";
		el.style.border = "1px solid rgba(0,0,0,0.10)";
		el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.22)";
		el.style.fontWeight = "800";
		el.style.textAlign = "center";
		el.style.minWidth = "240px";

		el.style.opacity = "0";
		el.style.transition = "opacity 160ms ease, transform 160ms ease";
		document.body.appendChild(el);

		requestAnimationFrame(() => {
			el.style.opacity = "1";
			el.style.transform = "translate(-50%, -50%) scale(1.02)";
		});

		setTimeout(() => {
			el.style.opacity = "0";
			el.style.transform = "translate(-50%, -50%) scale(0.98)";
			setTimeout(() => el.remove(), 200);
		}, 1400);
	}

	// ---------- Aesthetic Modal (glass) ----------
	let overlay = null;

	function ensureModal() {
		if (overlay) return overlay;

		overlay = document.createElement("div");
		overlay.id = "unipos-modal-overlay";
		overlay.style.position = "fixed";
		overlay.style.inset = "0";
		overlay.style.zIndex = "9999";
		overlay.style.display = "none";
		overlay.style.alignItems = "center";
		overlay.style.justifyContent = "center";
		overlay.style.padding = "1rem";
		overlay.style.background = "rgba(15, 23, 42, 0.35)";
		overlay.style.backdropFilter = "blur(10px)";

		const modal = document.createElement("div");
		modal.className = "glass-card";
		modal.style.width = "min(760px, 100%)";
		modal.style.borderRadius = "16px";
		modal.style.overflow = "hidden";
		modal.style.boxShadow = "0 20px 60px rgba(0,0,0,0.25)";

		const header = document.createElement("div");
		header.style.display = "flex";
		header.style.alignItems = "center";
		header.style.justifyContent = "space-between";
		header.style.padding = "1rem 1.25rem";
		header.style.borderBottom = "1px solid rgba(0,0,0,0.06)";

		const title = document.createElement("div");
		title.id = "unipos-modal-title";
		title.style.fontWeight = "700";
		title.style.fontSize = "1.1rem";
		title.textContent = "Modal";

		const closeBtn = document.createElement("button");
		closeBtn.className = "btn btn-outline";
		closeBtn.type = "button";
		closeBtn.textContent = "Close";
		closeBtn.style.width = "auto";
		closeBtn.style.padding = "0.4rem 0.8rem";
		closeBtn.style.height = "auto";
		closeBtn.style.fontSize = "0.875rem";

		header.appendChild(title);
		header.appendChild(closeBtn);

		const body = document.createElement("div");
		body.id = "unipos-modal-body";
		body.style.padding = "1.25rem";

		modal.appendChild(header);
		modal.appendChild(body);
		overlay.appendChild(modal);
		document.body.appendChild(overlay);

		function closeModal() {
			overlay.style.display = "none";
			body.innerHTML = "";
		}

		closeBtn.addEventListener("click", closeModal);
		overlay.addEventListener("click", (e) => {
			if (e.target === overlay) closeModal();
		});
		document.addEventListener("keydown", (e) => {
			if (overlay.style.display !== "none" && e.key === "Escape") closeModal();
		});

		overlay._refs = { title, body, closeModal };
		return overlay;
	}

	function openModal(modalTitle, contentNode) {
		const o = ensureModal();
		o._refs.title.textContent = modalTitle;
		o._refs.body.innerHTML = "";
		o._refs.body.appendChild(contentNode);
		o.style.display = "flex";
	}

	// ---------- Settings: find cards ----------
	function getCard(titleText) {
		return $all(".content-card").find(
			(c) =>
				(c.querySelector(".card-title")?.textContent || "").trim().toLowerCase() ===
				titleText.toLowerCase()
		);
	}

	function readStoreInformation() {
		const card = getCard("Store Information");
		if (!card) return null;
		const inputs = $all("input.form-input, textarea.form-input", card);
		return {
			storeName: (inputs[0]?.value || "").trim(),
			contactEmail: (inputs[1]?.value || "").trim(),
			phoneNumber: (inputs[2]?.value || "").trim(),
			address: (inputs[3]?.value || "").trim(),
		};
	}

	function writeStoreInformation(data) {
		const card = getCard("Store Information");
		if (!card || !data) return;
		const inputs = $all("input.form-input, textarea.form-input", card);
		if (inputs[0]) inputs[0].value = data.storeName ?? "";
		if (inputs[1]) inputs[1].value = data.contactEmail ?? "";
		if (inputs[2]) inputs[2].value = data.phoneNumber ?? "";
		if (inputs[3]) inputs[3].value = data.address ?? "";
	}

	function readCheckboxGroup(cardTitle) {
		const card = getCard(cardTitle);
		if (!card) return null;
		const checkboxes = $all('input[type="checkbox"]', card);
		return checkboxes.map((cb) => ({ id: cb.id, checked: !!cb.checked }));
	}

	function writeCheckboxGroup(cardTitle, items) {
		const card = getCard(cardTitle);
		if (!card || !Array.isArray(items)) return;
		items.forEach((item) => {
			const cb = $("#" + CSS.escape(item.id), card);
			if (cb) cb.checked = !!item.checked;
		});
	}

	function readReceiptSettings() {
		const card = getCard("Receipt Settings");
		if (!card) return null;
		const textInputs = $all('input.form-input[type="text"]', card);
		const logoCheckbox = card.querySelector('input[type="checkbox"]');
		return {
			receiptHeader: (textInputs[0]?.value || "").trim(),
			receiptFooter: (textInputs[1]?.value || "").trim(),
			printLogo: !!logoCheckbox?.checked,
			printLogoId: logoCheckbox?.id || "receipt-1",
		};
	}

	function writeReceiptSettings(data) {
		const card = getCard("Receipt Settings");
		if (!card || !data) return;
		const textInputs = $all('input.form-input[type="text"]', card);
		if (textInputs[0]) textInputs[0].value = data.receiptHeader ?? "";
		if (textInputs[1]) textInputs[1].value = data.receiptFooter ?? "";
		const cb = $("#" + CSS.escape(data.printLogoId || "receipt-1"), card);
		if (cb) cb.checked = !!data.printLogo;
	}

	// ---------- Persistence ----------
	function loadSettings() {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return null;
			return JSON.parse(raw);
		} catch {
			return null;
		}
	}

	function saveSettings(payload) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
	}

	function applySettingsToUI(payload) {
		if (!payload) return;
		writeStoreInformation(payload.storeInformation);
		writeCheckboxGroup("System Preferences", payload.systemPreferences);
		writeCheckboxGroup("Payment Settings", payload.paymentSettings);
		writeReceiptSettings(payload.receiptSettings);
	}

	function collectAllSettingsFromUI() {
		return {
			version: 1,
			savedAt: new Date().toISOString(),
			storeInformation: readStoreInformation(),
			systemPreferences: readCheckboxGroup("System Preferences"),
			paymentSettings: readCheckboxGroup("Payment Settings"),
			receiptSettings: readReceiptSettings(),
		};
	}

	// ---------- Activity Log ----------
	const ACT_KEY = "unipos_activity_log_v1";

	function getActivity() {
		try {
			const raw = localStorage.getItem(ACT_KEY);
			if (raw) return JSON.parse(raw);
		} catch {}
		return [];
	}
	function setActivity(items) {
		localStorage.setItem(ACT_KEY, JSON.stringify(items));
	}
	function logActivity(message) {
		const items = getActivity();
		items.unshift({ at: new Date().toISOString(), message });
		setActivity(items.slice(0, 50));
	}

	// ---------- Security: Change Password ----------
	const PASS_KEY = "unipos_password_v1"; // demo only

	function getStoredPassword() {
		return localStorage.getItem(PASS_KEY) || "admin123";
	}
	function setStoredPassword(pw) {
		localStorage.setItem(PASS_KEY, pw);
	}

	function makeFormField(labelText, inputEl) {
		const wrap = document.createElement("div");
		wrap.style.display = "flex";
		wrap.style.flexDirection = "column";
		wrap.style.gap = "0.35rem";

		const label = document.createElement("label");
		label.textContent = labelText;
		label.style.fontSize = "0.875rem";
		label.style.fontWeight = "600";
		label.style.opacity = "0.9";

		inputEl.style.width = "100%";
		inputEl.style.padding = "0.75rem 0.85rem";
		inputEl.style.borderRadius = "12px";
		inputEl.style.border = "1px solid rgba(0,0,0,0.08)";
		inputEl.style.outline = "none";
		inputEl.style.background = "rgba(255,255,255,0.65)";
		inputEl.style.backdropFilter = "blur(8px)";

		wrap.appendChild(label);
		wrap.appendChild(inputEl);
		return wrap;
	}

	function openChangePasswordModal() {
		const container = document.createElement("div");
		container.style.display = "flex";
		container.style.flexDirection = "column";
		container.style.gap = "0.9rem";

		const form = document.createElement("form");
		form.style.display = "grid";
		form.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
		form.style.gap = "0.9rem";

		const current = document.createElement("input");
		current.type = "password";
		current.placeholder = "Current password";

		const next = document.createElement("input");
		next.type = "password";
		next.placeholder = "New password";

		const confirm = document.createElement("input");
		confirm.type = "password";
		confirm.placeholder = "Confirm new password";

		form.appendChild(makeFormField("Current Password", current));
		form.appendChild(makeFormField("New Password", next));
		form.appendChild(makeFormField("Confirm Password", confirm));

		const actions = document.createElement("div");
		actions.style.display = "flex";
		actions.style.justifyContent = "flex-end";
		actions.style.gap = "0.5rem";

		const cancel = document.createElement("button");
		cancel.type = "button";
		cancel.className = "btn btn-outline";
		cancel.textContent = "Cancel";
		cancel.style.width = "auto";

		const save = document.createElement("button");
		save.type = "submit";
		save.className = "btn btn-primary";
		save.textContent = "Update Password";
		save.style.width = "auto";
		save.style.padding = "0.5rem 1rem";
		save.style.height = "auto";

		actions.appendChild(cancel);
		actions.appendChild(save);

		container.appendChild(form);
		container.appendChild(actions);

		cancel.addEventListener("click", () => ensureModal()._refs.closeModal());

		container.addEventListener("submit", (e) => {
			e.preventDefault();
			if ((current.value || "") !== getStoredPassword()) {
				toast("Current password is incorrect");
				return;
			}
			if (!next.value || next.value.length < 4) {
				toast("New password must be at least 4 characters");
				return;
			}
			if (next.value !== confirm.value) {
				toast("Passwords do not match");
				return;
			}
			setStoredPassword(next.value);
			logActivity("Password changed");
			toast("Password updated");
			ensureModal()._refs.closeModal();
		});

		openModal("Change Password", container);
		current.focus();
	}

	// ---------- Security: Two-Factor Auth ----------
	const TFA_KEY = "unipos_2fa_enabled_v1";

	function openTwoFactorModal() {
		const container = document.createElement("div");
		container.style.display = "flex";
		container.style.flexDirection = "column";
		container.style.gap = "0.9rem";

		const enabled = localStorage.getItem(TFA_KEY) === "1";

		const box = document.createElement("div");
		box.style.padding = "1rem";
		box.style.borderRadius = "14px";
		box.style.border = "1px solid rgba(0,0,0,0.08)";
		box.style.background = "rgba(255,255,255,0.55)";
		box.style.backdropFilter = "blur(10px)";

		const title = document.createElement("div");
		title.style.fontWeight = "900";
		title.textContent = "Two-Factor Authentication";

		const desc = document.createElement("div");
		desc.style.marginTop = "0.25rem";
		desc.style.opacity = "0.85";
		desc.style.fontSize = "0.95rem";
		desc.textContent =
			"Enable or disable 2FA. (Stored locally for demo)";

		const row = document.createElement("div");
		row.style.display = "flex";
		row.style.alignItems = "center";
		row.style.justifyContent = "space-between";
		row.style.marginTop = "0.9rem";
		row.style.gap = "0.75rem";

		const status = document.createElement("div");
		status.style.fontWeight = "800";
		status.textContent = enabled ? "Status: Enabled" : "Status: Disabled";

		const toggle = document.createElement("button");
		toggle.type = "button";
		toggle.className = enabled ? "btn btn-outline" : "btn btn-primary";
		toggle.textContent = enabled ? "Disable 2FA" : "Enable 2FA";
		toggle.style.width = "auto";
		toggle.style.padding = "0.5rem 1rem";
		toggle.style.height = "auto";

		toggle.addEventListener("click", () => {
			const isEnabled = localStorage.getItem(TFA_KEY) === "1";
			localStorage.setItem(TFA_KEY, isEnabled ? "0" : "1");
			logActivity(isEnabled ? "2FA disabled" : "2FA enabled");
			toast(isEnabled ? "2FA disabled" : "2FA enabled");
			ensureModal()._refs.closeModal();
		});

		row.appendChild(status);
		row.appendChild(toggle);

		box.appendChild(title);
		box.appendChild(desc);
		box.appendChild(row);

		container.appendChild(box);
		openModal("Two-Factor Authentication", container);
	}

	// ---------- Security: Session Management ----------
	const SESS_KEY = "unipos_sessions_v1";

	function getSessions() {
		try {
			const raw = localStorage.getItem(SESS_KEY);
			if (raw) return JSON.parse(raw);
		} catch {}

		const seed = [
			{
				id: "sess_" + Math.random().toString(16).slice(2),
				device: "Chrome on Windows",
				location: "Local Device",
				lastActive: new Date().toISOString(),
				current: true,
			},
		];
		localStorage.setItem(SESS_KEY, JSON.stringify(seed));
		return seed;
	}
	function setSessions(list) {
		localStorage.setItem(SESS_KEY, JSON.stringify(list));
	}

	function openSessionManagementModal() {
		const container = document.createElement("div");
		container.style.display = "flex";
		container.style.flexDirection = "column";
		container.style.gap = "0.9rem";

		const sessions = getSessions();

		const list = document.createElement("div");
		list.style.display = "flex";
		list.style.flexDirection = "column";
		list.style.gap = "0.6rem";

		sessions.forEach((s) => {
			const item = document.createElement("div");
			item.style.display = "flex";
			item.style.justifyContent = "space-between";
			item.style.alignItems = "center";
			item.style.gap = "0.75rem";
			item.style.padding = "0.85rem 1rem";
			item.style.borderRadius = "14px";
			item.style.border = "1px solid rgba(0,0,0,0.08)";
			item.style.background = "rgba(255,255,255,0.55)";
			item.style.backdropFilter = "blur(10px)";

			const left = document.createElement("div");
			const t = document.createElement("div");
			t.style.fontWeight = "900";
			t.textContent = s.device + (s.current ? " (Current)" : "");
			const sub = document.createElement("div");
			sub.style.opacity = "0.85";
			sub.style.fontSize = "0.9rem";
			sub.textContent = `${s.location} • Last active: ${new Date(s.lastActive).toLocaleString()}`;
			left.appendChild(t);
			left.appendChild(sub);

			const btn = document.createElement("button");
			btn.type = "button";
			btn.className = "btn btn-outline";
			btn.textContent = s.current ? "Sign out others" : "Sign out";
			btn.style.width = "auto";
			btn.style.padding = "0.5rem 0.9rem";
			btn.style.height = "auto";

			btn.addEventListener("click", () => {
				let updated = getSessions();
				if (s.current) {
					updated = updated.filter((x) => x.current);
					logActivity("Signed out other sessions");
					toast("Signed out other sessions");
				} else {
					updated = updated.filter((x) => x.id !== s.id);
					logActivity("Signed out a session");
					toast("Session signed out");
				}
				setSessions(updated);
				ensureModal()._refs.closeModal();
			});

			item.appendChild(left);
			item.appendChild(btn);
			list.appendChild(item);
		});

		container.appendChild(list);
		openModal("Session Management", container);
	}

	// ---------- Security: Activity Log Modal ----------
	function openActivityLogModal() {
		const container = document.createElement("div");
		container.style.display = "flex";
		container.style.flexDirection = "column";
		container.style.gap = "0.75rem";

		const items = getActivity();

		const header = document.createElement("div");
		header.style.display = "flex";
		header.style.justifyContent = "space-between";
		header.style.alignItems = "center";
		header.style.gap = "0.75rem";

		const hint = document.createElement("div");
		hint.style.fontWeight = "900";
		hint.textContent = "Recent Activity";

		const clear = document.createElement("button");
		clear.type = "button";
		clear.className = "btn btn-outline";
		clear.textContent = "Clear Log";
		clear.style.width = "auto";

		clear.addEventListener("click", () => {
			setActivity([]);
			toast("Activity log cleared");
			ensureModal()._refs.closeModal();
		});

		header.appendChild(hint);
		header.appendChild(clear);

		const list = document.createElement("div");
		list.style.display = "flex";
		list.style.flexDirection = "column";
		list.style.gap = "0.6rem";
		// Make it scroll when there are many items (5+)
		list.style.maxHeight = "320px";
		list.style.overflowY = "auto";
		list.style.paddingRight = "6px";
		list.style.scrollbarGutter = "stable";


		if (items.length === 0) {
			const empty = document.createElement("div");
			empty.style.opacity = "0.85";
			empty.textContent = "No activity yet.";
			list.appendChild(empty);
		} else {
			items.forEach((it) => {
				const row = document.createElement("div");
				row.style.padding = "0.85rem 1rem";
				row.style.borderRadius = "14px";
				row.style.border = "1px solid rgba(0,0,0,0.08)";
				row.style.background = "rgba(255,255,255,0.55)";
				row.style.backdropFilter = "blur(10px)";

				const m = document.createElement("div");
				m.style.fontWeight = "900";
				m.textContent = it.message;

				const t = document.createElement("div");
				t.style.opacity = "0.85";
				t.style.fontSize = "0.9rem";
				t.textContent = new Date(it.at).toLocaleString();

				row.appendChild(m);
				row.appendChild(t);
				list.appendChild(row);
			});
		}

		container.appendChild(header);
		container.appendChild(list);
		openModal("Activity Log", container);
	}

	// ---------- Data Management ----------
	function exportAllData() {
		const payload = {
			exportedAt: new Date().toISOString(),
			settings: loadSettings(),
			security: {
				twoFactorEnabled: localStorage.getItem(TFA_KEY) === "1",
				sessions: getSessions(),
				activityLog: getActivity(),
			},
		};
		downloadFile(
			`UNIPOS_All_Data_${nowStamp()}.json`,
			"application/json",
			JSON.stringify(payload, null, 2)
		);
		logActivity("Exported all data");
		toast("All data downloaded");
	}

	function backupDatabase() {
		// No backend: store a snapshot as "backup"
		localStorage.setItem(
			"unipos_backup_snapshot_v1",
			JSON.stringify({
				at: new Date().toISOString(),
				settings: loadSettings(),
				security: {
					twoFactorEnabled: localStorage.getItem(TFA_KEY) === "1",
					sessions: getSessions(),
					activityLog: getActivity(),
				},
			})
		);
		logActivity("Database backup created");
		toast("Backup created");
	}

	// NOTE: "Clear Cache" should not delete activity log if you still want it kept.
	// We'll clear app settings + security caches but KEEP ACTIVITY LOG.
	function clearCache() {
		const keys = [
			STORAGE_KEY,
			TFA_KEY,
			SESS_KEY,
			PASS_KEY,
			"unipos_backup_snapshot_v1",
			// ACT_KEY intentionally NOT removed
		];
		keys.forEach((k) => localStorage.removeItem(k));
		logActivity("Cache cleared (activity log kept)");
		toast("Cache cleared");
	}

	// ---------- RESET ALL SETTINGS (with confirmation, keeps activity log) ----------
	function resetAllSettings() {
		const container = document.createElement("div");
		container.style.display = "flex";
		container.style.flexDirection = "column";
		container.style.gap = "0.9rem";

		const box = document.createElement("div");
		box.style.padding = "1rem";
		box.style.borderRadius = "14px";
		box.style.border = "1px solid rgba(0,0,0,0.08)";
		box.style.background = "rgba(255,255,255,0.55)";
		box.style.backdropFilter = "blur(10px)";

		const title = document.createElement("div");
		title.style.fontWeight = "900";
		title.style.fontSize = "1.05rem";
		title.textContent = "Reset all settings?";

		const desc = document.createElement("div");
		desc.style.marginTop = "0.35rem";
		desc.style.opacity = "0.85";
		desc.style.lineHeight = "1.35";
		desc.textContent =
			"This will restore Store Information, System Preferences, Payment Settings, and Receipt Settings to default values. (Activity Log will NOT be reset.)";

		box.appendChild(title);
		box.appendChild(desc);

		const actions = document.createElement("div");
		actions.style.display = "flex";
		actions.style.justifyContent = "flex-end";
		actions.style.gap = "0.5rem";

		const cancel = document.createElement("button");
		cancel.type = "button";
		cancel.className = "btn btn-outline";
		cancel.textContent = "Cancel";
		cancel.style.width = "auto";
		cancel.style.padding = "0.5rem 1rem";
		cancel.style.height = "auto";

		const confirm = document.createElement("button");
		confirm.type = "button";
		confirm.className = "btn btn-primary";
		confirm.textContent = "Yes, Reset";
		confirm.style.width = "auto";
		confirm.style.padding = "0.5rem 1rem";
		confirm.style.height = "auto";

		actions.appendChild(cancel);
		actions.appendChild(confirm);

		container.appendChild(box);
		container.appendChild(actions);

		cancel.addEventListener("click", () => ensureModal()._refs.closeModal());

		confirm.addEventListener("click", () => {
			const defaults = {
				version: 1,
				savedAt: new Date().toISOString(),
				storeInformation: {
					storeName: "UNIPOS Store",
					contactEmail: "contact@unipos.com",
					phoneNumber: "+63 123 456 7890",
					address: "123 Main Street, City, Province",
				},
				systemPreferences: [
					{ id: "setting-1", checked: true },
					{ id: "setting-2", checked: true },
					{ id: "setting-3", checked: false },
					{ id: "setting-4", checked: true },
					{ id: "setting-5", checked: false },
				],
				paymentSettings: [
					{ id: "payment-1", checked: true },
					{ id: "payment-2", checked: true },
					{ id: "payment-3", checked: true },
					{ id: "payment-4", checked: false },
				],
				receiptSettings: {
					receiptHeader: "Thank you for shopping!",
					receiptFooter: "Please come again!",
					printLogo: true,
					printLogoId: "receipt-1",
				},
			};

			// Reset main settings
			saveSettings(defaults);
			applySettingsToUI(defaults);

			// Reset security (but keep Activity Log)
			localStorage.setItem(TFA_KEY, "0");
			localStorage.setItem(
				SESS_KEY,
				JSON.stringify([
					{
						id: "sess_" + Math.random().toString(16).slice(2),
						device: "Chrome on Windows",
						location: "Local Device",
						lastActive: new Date().toISOString(),
						current: true,
					},
				])
			);
			setStoredPassword("admin123");

			logActivity("Settings reset (activity log kept)");
			toast("All settings reset");
			ensureModal()._refs.closeModal();
		});

		openModal("Confirm Reset", container);
	}

	// ---------- Save Changes ----------
	function handleSaveChanges() {
	const container = document.createElement("div");
	container.style.display = "flex";
	container.style.flexDirection = "column";
	container.style.gap = "0.9rem";

	const box = document.createElement("div");
	box.style.padding = "1rem";
	box.style.borderRadius = "14px";
	box.style.border = "1px solid rgba(0,0,0,0.08)";
	box.style.background = "rgba(255,255,255,0.55)";
	box.style.backdropFilter = "blur(10px)";

	const title = document.createElement("div");
	title.style.fontWeight = "900";
	title.style.fontSize = "1.05rem";
	title.textContent = "Save changes?";

	const desc = document.createElement("div");
	desc.style.marginTop = "0.35rem";
	desc.style.opacity = "0.85";
	desc.style.lineHeight = "1.35";
	desc.textContent =
		"This will save Store Information, System Preferences, Payment Settings, and Receipt Settings.";

	box.appendChild(title);
	box.appendChild(desc);

	const actions = document.createElement("div");
	actions.style.display = "flex";
	actions.style.justifyContent = "flex-end";
	actions.style.gap = "0.5rem";

	const cancel = document.createElement("button");
	cancel.type = "button";
	cancel.className = "btn btn-outline";
	cancel.textContent = "Cancel";
	cancel.style.width = "auto";
	cancel.style.padding = "0.5rem 1rem";
	cancel.style.height = "auto";

	const confirm = document.createElement("button");
	confirm.type = "button";
	confirm.className = "btn btn-primary";
	confirm.textContent = "Save Changes";
	confirm.style.width = "auto";
	confirm.style.padding = "0.5rem 1rem";
	confirm.style.height = "auto";

	actions.appendChild(cancel);
	actions.appendChild(confirm);

	container.appendChild(box);
	container.appendChild(actions);

	cancel.addEventListener("click", () => ensureModal()._refs.closeModal());

	confirm.addEventListener("click", () => {
		const payload = collectAllSettingsFromUI();
		saveSettings(payload);
		logActivity("Settings saved");
		toast("Changes saved");
		ensureModal()._refs.closeModal();
	});

	openModal("Confirm Save", container);
}

	// ---------- Wire up ----------
	function wireUpSettingsPage() {
		// Apply saved settings on load
		const saved = loadSettings();
		if (saved) applySettingsToUI(saved);

		// Save Changes
		const saveBtn = findButtonByText("Save Changes");
		if (saveBtn) saveBtn.addEventListener("click", handleSaveChanges);

		// Security buttons
		const btnChangePw = findButtonByText("Change Password");
		const btn2fa = findButtonByText("Two-Factor Authentication");
		const btnSess = findButtonByText("Session Management");
		const btnAct = findButtonByText("Activity Log");

		if (btnChangePw) btnChangePw.addEventListener("click", openChangePasswordModal);
		if (btn2fa) btn2fa.addEventListener("click", openTwoFactorModal);
		if (btnSess) btnSess.addEventListener("click", openSessionManagementModal);
		if (btnAct) btnAct.addEventListener("click", openActivityLogModal);

		// Data Management buttons
		const btnExportAll = findButtonByText("Export All Data");
		const btnBackup = findButtonByText("Backup Database");
		const btnClearCache = findButtonByText("Clear Cache");
		const btnReset = findButtonByText("Reset All Settings");

		if (btnExportAll) btnExportAll.addEventListener("click", exportAllData);
		if (btnBackup) btnBackup.addEventListener("click", backupDatabase);
		if (btnClearCache) btnClearCache.addEventListener("click", clearCache);
		if (btnReset) btnReset.addEventListener("click", resetAllSettings);
	}

	// Run
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", wireUpSettingsPage);
	} else {
		wireUpSettingsPage();
	}
})();


//////
//TRANSACTIONS
//////


(function () {
	// ---------- Helpers ----------
	function $all(sel, root = document) {
		return Array.from(root.querySelectorAll(sel));
	}
	function textEq(el, txt) {
		return (el?.textContent || "").trim().toLowerCase() === txt.trim().toLowerCase();
	}
	function findButtonByText(txt) {
		return $all("button.btn").find((b) => textEq(b, txt));
	}
	function downloadFile(filename, mimeType, content) {
		const blob = new Blob([content], { type: mimeType });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		a.remove();
		setTimeout(() => URL.revokeObjectURL(url), 500);
	}
	function nowStamp() {
		return new Date().toISOString().slice(0, 10);
	}
	function escapeHtml(str) {
		return String(str ?? "")
			.replaceAll("&", "&amp;")
			.replaceAll("<", "&lt;")
			.replaceAll(">", "&gt;")
			.replaceAll('"', "&quot;")
			.replaceAll("'", "&#039;");
	}

	// ---------- Date + ISO Week ----------
	function isoWeekInfo(date) {
		const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
		const dayNum = d.getUTCDay() || 7;
		d.setUTCDate(d.getUTCDate() + 4 - dayNum);
		const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
		const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
		return { isoYear: d.getUTCFullYear(), isoWeek: weekNo };
	}
	function parseTransactionDate(s) {
		const d = new Date(s);
		return isNaN(d.getTime()) ? null : d;
	}

	// ---------- Modal (reuse if exists) ----------
	let overlay = document.getElementById("unipos-modal-overlay") || null;

	function ensureModal() {
		if (overlay) return overlay;

		overlay = document.createElement("div");
		overlay.id = "unipos-modal-overlay";
		overlay.style.position = "fixed";
		overlay.style.inset = "0";
		overlay.style.zIndex = "9999";
		overlay.style.display = "none";
		overlay.style.alignItems = "center";
		overlay.style.justifyContent = "center";
		overlay.style.padding = "1rem";
		overlay.style.background = "rgba(15, 23, 42, 0.35)";
		overlay.style.backdropFilter = "blur(10px)";

		const modal = document.createElement("div");
		modal.className = "glass-card";
		modal.style.width = "min(860px, 100%)";
		modal.style.borderRadius = "16px";
		modal.style.overflow = "hidden";
		modal.style.boxShadow = "0 20px 60px rgba(0,0,0,0.25)";

		const header = document.createElement("div");
		header.style.display = "flex";
		header.style.alignItems = "center";
		header.style.justifyContent = "space-between";
		header.style.padding = "1rem 1.25rem";
		header.style.borderBottom = "1px solid rgba(0,0,0,0.06)";

		const title = document.createElement("div");
		title.style.fontWeight = "800";
		title.style.fontSize = "1.1rem";
		title.textContent = "Modal";

		const closeBtn = document.createElement("button");
		closeBtn.className = "btn btn-outline";
		closeBtn.type = "button";
		closeBtn.textContent = "Close";
		closeBtn.style.width = "auto";
		closeBtn.style.padding = "0.4rem 0.8rem";
		closeBtn.style.height = "auto";
		closeBtn.style.fontSize = "0.875rem";

		header.appendChild(title);
		header.appendChild(closeBtn);

		const body = document.createElement("div");
		body.style.padding = "1.25rem";

		modal.appendChild(header);
		modal.appendChild(body);
		overlay.appendChild(modal);
		document.body.appendChild(overlay);

		function closeModal() {
			overlay.style.display = "none";
			body.innerHTML = "";
		}

		closeBtn.addEventListener("click", closeModal);
		overlay.addEventListener("click", (e) => {
			if (e.target === overlay) closeModal();
		});
		document.addEventListener("keydown", (e) => {
			if (overlay.style.display !== "none" && e.key === "Escape") closeModal();
		});

		overlay._refs = { title, body, closeModal };
		return overlay;
	}

	function openModal(modalTitle, contentNode) {
		const o = ensureModal();
		o._refs.title.textContent = modalTitle;
		o._refs.body.innerHTML = "";
		o._refs.body.appendChild(contentNode);
		o.style.display = "flex";
	}

	// ---------- Read transactions ----------
	function getTransactionRows() {
		const tbody = document.querySelector("table tbody");
		if (!tbody) return [];
		const trs = $all("tr", tbody);
		return trs.map((tr) => {
			const tds = $all("td", tr);
			return {
				id: (tds[0]?.textContent || "").trim(),
				dt: (tds[1]?.textContent || "").trim(),
				items: (tds[2]?.textContent || "").trim(),
				total: (tds[3]?.textContent || "").trim(),
				payment: (tds[4]?.textContent || "").trim(),
				cashier: (tds[5]?.textContent || "").trim(),
			};
		});
	}

	// ---------- Filters ----------
	function filterWeeklyRange(rows, year, wf, wt) {
		const y = Number(year);
		let a = Number(wf);
		let b = Number(wt);
		if (a > b) [a, b] = [b, a];

		return rows.filter((r) => {
			const d = parseTransactionDate(r.dt);
			if (!d) return true;
			const info = isoWeekInfo(d);
			return info.isoYear === y && info.isoWeek >= a && info.isoWeek <= b;
		});
	}

	function filterMonthlyRange(rows, year, mf, mt) {
		const y = Number(year);
		let a = Number(mf);
		let b = Number(mt);
		if (a > b) [a, b] = [b, a];

		return rows.filter((r) => {
			const d = parseTransactionDate(r.dt);
			if (!d) return true;
			return d.getFullYear() === y && d.getMonth() >= a && d.getMonth() <= b;
		});
	}

	function filterYearlyRange(rows, yf, yt) {
		let a = Number(yf);
		let b = Number(yt);
		if (a > b) [a, b] = [b, a];

		return rows.filter((r) => {
			const d = parseTransactionDate(r.dt);
			if (!d) return true;
			const y = d.getFullYear();
			return y >= a && y <= b;
		});
	}

	// ---------- Export builders ----------
	function buildExcelTable(rows, label) {
		return `<!doctype html>
<html>
<head><meta charset="utf-8"/></head>
<body>
  <table border="1" cellpadding="6" cellspacing="0">
    <tr><th colspan="6">Transactions (${escapeHtml(label)})</th></tr>
    <tr>
      <th>Transaction ID</th><th>Date & Time</th><th>Items</th>
      <th>Total</th><th>Payment</th><th>Cashier</th>
    </tr>
    ${rows
			.map(
				(r) => `<tr>
        <td>${escapeHtml(r.id)}</td>
        <td>${escapeHtml(r.dt)}</td>
        <td>${escapeHtml(r.items)}</td>
        <td>${escapeHtml(r.total)}</td>
        <td>${escapeHtml(r.payment)}</td>
        <td>${escapeHtml(r.cashier)}</td>
      </tr>`
			)
			.join("")}
  </table>
</body>
</html>`;
	}

	function openPDFPrint(rows, label) {
		const now = new Date();
		const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<title>${escapeHtml(label)}</title>
<style>
  body{font-family:Arial, sans-serif; padding:24px;}
  h1{margin:0 0 10px;}
  .muted{color:#555; margin:0 0 18px;}
  table{width:100%; border-collapse:collapse;}
  th,td{border:1px solid #ddd; padding:10px; text-align:left; font-size:12px;}
  th{background:#f6f6f6;}
</style>
</head>
<body>
  <h1>${escapeHtml(label)}</h1>
  <p class="muted">Generated: ${now.toLocaleString()}</p>
  <table>
    <thead>
      <tr>
        <th>Transaction ID</th><th>Date & Time</th><th>Items</th>
        <th>Total</th><th>Payment</th><th>Cashier</th>
      </tr>
    </thead>
    <tbody>
      ${rows
			.map(
				(r) => `<tr>
          <td>${escapeHtml(r.id)}</td>
          <td>${escapeHtml(r.dt)}</td>
          <td>${escapeHtml(r.items)}</td>
          <td>${escapeHtml(r.total)}</td>
          <td>${escapeHtml(r.payment)}</td>
          <td>${escapeHtml(r.cashier)}</td>
        </tr>`
			)
			.join("")}
    </tbody>
  </table>
  <script>window.onload=()=>window.print();</script>
</body>
</html>`;

		const w = window.open("", "_blank");
		if (!w) {
			alert("Popup blocked. Please allow popups for this site to download/print PDF.");
			return;
		}
		const closeAfter = () => {
			try { w.close(); } catch (e) {}
		};
		w.onafterprint = closeAfter;
		setTimeout(closeAfter, 2000);
		w.document.open();
		w.document.write(html);
		w.document.close();
	}

	// ---------- UI helpers ----------
	function field(labelText, inputEl) {
		const wrap = document.createElement("div");
		wrap.style.display = "flex";
		wrap.style.flexDirection = "column";
		wrap.style.gap = "0.35rem";

		const label = document.createElement("label");
		label.textContent = labelText;
		label.style.fontSize = "0.875rem";
		label.style.fontWeight = "800";
		label.style.opacity = "0.9";

		inputEl.style.width = "100%";
		inputEl.style.padding = "0.75rem 0.85rem";
		inputEl.style.borderRadius = "12px";
		inputEl.style.border = "1px solid rgba(0,0,0,0.08)";
		inputEl.style.outline = "none";
		inputEl.style.background = "rgba(255,255,255,0.65)";
		inputEl.style.backdropFilter = "blur(8px)";

		wrap.appendChild(label);
		wrap.appendChild(inputEl);
		return wrap;
	}
	function makeSelect(options, value) {
		const sel = document.createElement("select");
		options.forEach((o) => {
			const opt = document.createElement("option");
			opt.value = String(o.value);
			opt.textContent = o.label;
			sel.appendChild(opt);
		});
		sel.value = String(value);
		return sel;
	}
	function showError(msg) {
		alert(msg);
	}

	// ---------- Export Modal (NO AUTO DOWNLOAD) ----------
	function openExportModal() {
		const rows = getTransactionRows();

		const yearsInData = Array.from(
			new Set(
				rows
					.map((r) => {
						const d = parseTransactionDate(r.dt);
						return d ? d.getFullYear() : null;
					})
					.filter(Boolean)
			)
		).sort((a, b) => a - b);

		const currentYear = new Date().getFullYear();
		const yearOptions = yearsInData.length ? yearsInData : [currentYear - 2, currentYear - 1, currentYear];
		const maxYear = Math.max(...yearOptions.map(Number));

		const months = [
			"January","February","March","April","May","June",
			"July","August","September","October","November","December"
		];

		const container = document.createElement("div");
		container.style.display = "flex";
		container.style.flexDirection = "column";
		container.style.gap = "0.9rem";

		const intro = document.createElement("div");
		intro.style.padding = "1rem";
		intro.style.borderRadius = "14px";
		intro.style.border = "1px solid rgba(0,0,0,0.08)";
		intro.style.background = "rgba(255,255,255,0.55)";
		intro.style.backdropFilter = "blur(10px)";

		const t = document.createElement("div");
		t.style.fontWeight = "900";
		t.style.fontSize = "1.05rem";
		t.textContent = "Export Transactions";

		const d = document.createElement("div");
		d.style.marginTop = "0.35rem";
		d.style.opacity = "0.85";
		d.textContent = "Choose your range then click Download Excel or Download PDF.";

		intro.appendChild(t);
		intro.appendChild(d);

		// Range type
		const rangeSelect = makeSelect(
			[
				{ label: "Weekly", value: "weekly" },
				{ label: "Monthly", value: "monthly" },
				{ label: "Yearly", value: "yearly" },
			],
			"weekly"
		);

		// Weekly controls
		const weeklyYear = makeSelect(yearOptions.map((y) => ({ label: String(y), value: y })), yearOptions[0]);
		const weekFrom = makeSelect(Array.from({ length: 53 }, (_, i) => ({ label: `Week ${i + 1}`, value: i + 1 })), 1);
		const weekTo = makeSelect(Array.from({ length: 53 }, (_, i) => ({ label: `Week ${i + 1}`, value: i + 1 })), 1);

		// Monthly controls
		const monthlyYear = makeSelect(yearOptions.map((y) => ({ label: String(y), value: y })), yearOptions[0]);
		const monthFrom = makeSelect(months.map((m, i) => ({ label: m, value: i })), 0);
		const monthTo = makeSelect(months.map((m, i) => ({ label: m, value: i })), 0);

		// Yearly controls
		const yearFrom = makeSelect(yearOptions.map((y) => ({ label: String(y), value: y })), yearOptions[0]);
		const yearTo = makeSelect(
			yearOptions.map((y) => ({ label: String(y), value: y })),
			yearOptions[yearOptions.length - 1]
		);

		// Layout blocks
		const topGrid = document.createElement("div");
		topGrid.style.display = "grid";
		topGrid.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
		topGrid.style.gap = "0.9rem";
		topGrid.appendChild(field("Range Type", rangeSelect));
		topGrid.appendChild(document.createElement("div"));

		const weeklyBlock = document.createElement("div");
		weeklyBlock.style.display = "grid";
		weeklyBlock.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
		weeklyBlock.style.gap = "0.9rem";
		weeklyBlock.appendChild(field("Weekly Year", weeklyYear));
		weeklyBlock.appendChild(field("Week From", weekFrom));
		weeklyBlock.appendChild(field("Week To", weekTo));

		const monthlyBlock = document.createElement("div");
		monthlyBlock.style.display = "grid";
		monthlyBlock.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
		monthlyBlock.style.gap = "0.9rem";
		monthlyBlock.appendChild(field("Monthly Year", monthlyYear));
		monthlyBlock.appendChild(field("Month From", monthFrom));
		monthlyBlock.appendChild(field("Month To", monthTo));

		const yearlyBlock = document.createElement("div");
		yearlyBlock.style.display = "grid";
		yearlyBlock.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
		yearlyBlock.style.gap = "0.9rem";
		yearlyBlock.appendChild(field("Year From", yearFrom));
		yearlyBlock.appendChild(field("Year To", yearTo));

		function syncVisibility() {
			const v = rangeSelect.value;
			weeklyBlock.style.display = v === "weekly" ? "grid" : "none";
			monthlyBlock.style.display = v === "monthly" ? "grid" : "none";
			yearlyBlock.style.display = v === "yearly" ? "grid" : "none";
		}
		rangeSelect.addEventListener("change", syncVisibility);
		syncVisibility();

		// Restrictions (Dec->Dec only, Week53->53 only, maxYear locked)
		function syncEndRestrictions() {
			// Week end restriction
			if (Number(weekFrom.value) === 53) {
				weekTo.value = "53";
				weekTo.disabled = true;
			} else {
				weekTo.disabled = false;
				if (Number(weekTo.value) < Number(weekFrom.value)) weekTo.value = weekFrom.value;
			}

			// Month end restriction
			if (Number(monthFrom.value) === 11) {
				monthTo.value = "11";
				monthTo.disabled = true;
			} else {
				monthTo.disabled = false;
				if (Number(monthTo.value) < Number(monthFrom.value)) monthTo.value = monthFrom.value;
			}

			// Year end restriction
			if (Number(yearFrom.value) === maxYear) {
				yearTo.value = String(maxYear);
				yearTo.disabled = true;
			} else {
				yearTo.disabled = false;
				if (Number(yearTo.value) < Number(yearFrom.value)) yearTo.value = yearFrom.value;
			}
		}

		weekFrom.addEventListener("change", syncEndRestrictions);
		monthFrom.addEventListener("change", syncEndRestrictions);
		yearFrom.addEventListener("change", syncEndRestrictions);

		weekTo.addEventListener("change", () => {
			if (Number(weekTo.value) < Number(weekFrom.value)) {
				showError("Invalid week range: Week To cannot be less than Week From.");
				weekTo.value = weekFrom.value;
			}
		});
		monthTo.addEventListener("change", () => {
			if (Number(monthTo.value) < Number(monthFrom.value)) {
				showError("Invalid month range: Month To cannot be earlier than Month From.");
				monthTo.value = monthFrom.value;
			}
		});
		yearTo.addEventListener("change", () => {
			if (Number(yearTo.value) < Number(yearFrom.value)) {
				showError("Invalid year range: Year To cannot be less than Year From.");
				yearTo.value = yearFrom.value;
			}
		});

		syncEndRestrictions();

		// Preview label + compute filtered rows (ONLY when download is clicked)
		function computeSelection() {
			const all = getTransactionRows(); // refresh in case table changed
			const type = rangeSelect.value;

			if (type === "weekly") {
				const y = Number(weeklyYear.value);
				const wf = Number(weekFrom.value);
				const wt = Number(weekTo.value);
				const label = `${y}_W${Math.min(wf, wt)}-W${Math.max(wf, wt)}`;
				return { rows: filterWeeklyRange(all, y, wf, wt), label };
			}

			if (type === "monthly") {
				const y = Number(monthlyYear.value);
				const mf = Number(monthFrom.value);
				const mt = Number(monthTo.value);
				const label = `${y}_${months[Math.min(mf, mt)]}-${months[Math.max(mf, mt)]}`;
				return { rows: filterMonthlyRange(all, y, mf, mt), label };
			}

			const yf = Number(yearFrom.value);
			const yt = Number(yearTo.value);
			const label = `Y${Math.min(yf, yt)}-Y${Math.max(yf, yt)}`;
			return { rows: filterYearlyRange(all, yf, yt), label };
		}

		// Action buttons
		const actions = document.createElement("div");
		actions.style.display = "flex";
		actions.style.justifyContent = "flex-end";
		actions.style.gap = "0.5rem";
		actions.style.marginTop = "0.25rem";

		const cancel = document.createElement("button");
		cancel.type = "button";
		cancel.className = "btn btn-outline";
		cancel.textContent = "Cancel";
		cancel.style.width = "auto";
		cancel.style.padding = "0.5rem 1rem";
		cancel.style.height = "auto";
		cancel.addEventListener("click", () => ensureModal()._refs.closeModal());

		const dlExcel = document.createElement("button");
		dlExcel.type = "button";
		dlExcel.className = "btn btn-primary";
		dlExcel.textContent = "Download Excel";
		dlExcel.style.width = "auto";
		dlExcel.style.padding = "0.5rem 1rem";
		dlExcel.style.height = "auto";

		const dlPdf = document.createElement("button");
		dlPdf.type = "button";
		dlPdf.className = "btn btn-outline";
		dlPdf.textContent = "Download PDF";
		dlPdf.style.width = "auto";
		dlPdf.style.padding = "0.5rem 1rem";
		dlPdf.style.height = "auto";

		dlExcel.addEventListener("click", () => {
			const sel = computeSelection();
			const content = buildExcelTable(sel.rows, sel.label);
			downloadFile(`Transactions_${sel.label}_${nowStamp()}.xls`, "application/vnd.ms-excel", content);
		});

		dlPdf.addEventListener("click", () => {
			const sel = computeSelection();
			openPDFPrint(sel.rows, `Transactions (${sel.label})`);
		});

		actions.appendChild(cancel);
		actions.appendChild(dlPdf);
		actions.appendChild(dlExcel);

		container.appendChild(intro);
		container.appendChild(topGrid);
		container.appendChild(weeklyBlock);
		container.appendChild(monthlyBlock);
		container.appendChild(yearlyBlock);
		container.appendChild(actions);

		openModal("Export Data", container);
	}

	// ---------- View Modal (NO AUTO DOWNLOAD) ----------
	function openViewModal(row) {
		const container = document.createElement("div");
		container.style.display = "flex";
		container.style.flexDirection = "column";
		container.style.gap = "0.9rem";

		const box = document.createElement("div");
		box.style.padding = "1rem";
		box.style.borderRadius = "14px";
		box.style.border = "1px solid rgba(0,0,0,0.08)";
		box.style.background = "rgba(255,255,255,0.55)";
		box.style.backdropFilter = "blur(10px)";

		const title = document.createElement("div");
		title.style.fontWeight = "900";
		title.style.fontSize = "1.05rem";
		title.textContent = `Transaction: ${row.id}`;

		const sub = document.createElement("div");
		sub.style.marginTop = "0.35rem";
		sub.style.opacity = "0.85";
		sub.textContent = "Choose download type. PDF will open print dialog (Save as PDF).";

		box.appendChild(title);
		box.appendChild(sub);

		const details = document.createElement("div");
		details.style.display = "grid";
		details.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
		details.style.gap = "0.75rem";
		details.style.marginTop = "0.75rem";

		function detail(label, value) {
			const wrap = document.createElement("div");
			wrap.style.padding = "0.75rem";
			wrap.style.borderRadius = "12px";
			wrap.style.border = "1px solid rgba(0,0,0,0.06)";
			wrap.style.background = "rgba(255,255,255,0.55)";
			const l = document.createElement("div");
			l.style.fontSize = "0.75rem";
			l.style.opacity = "0.75";
			l.style.fontWeight = "700";
			l.textContent = label;
			const v = document.createElement("div");
			v.style.fontWeight = "900";
			v.style.marginTop = "0.25rem";
			v.textContent = value;
			wrap.appendChild(l);
			wrap.appendChild(v);
			return wrap;
		}

		details.appendChild(detail("Date & Time", row.dt));
		details.appendChild(detail("Items", row.items));
		details.appendChild(detail("Total", row.total));
		details.appendChild(detail("Payment", row.payment));
		details.appendChild(detail("Cashier", row.cashier));

		const actions = document.createElement("div");
		actions.style.display = "flex";
		actions.style.justifyContent = "flex-end";
		actions.style.gap = "0.5rem";

		const close = document.createElement("button");
		close.type = "button";
		close.className = "btn btn-outline";
		close.textContent = "Close";
		close.style.width = "auto";
		close.style.padding = "0.5rem 1rem";
		close.style.height = "auto";
		close.addEventListener("click", () => ensureModal()._refs.closeModal());

		const dlExcel = document.createElement("button");
		dlExcel.type = "button";
		dlExcel.className = "btn btn-primary";
		dlExcel.textContent = "Download Excel";
		dlExcel.style.width = "auto";
		dlExcel.style.padding = "0.5rem 1rem";
		dlExcel.style.height = "auto";

		const dlPdf = document.createElement("button");
		dlPdf.type = "button";
		dlPdf.className = "btn btn-outline";
		dlPdf.textContent = "Download PDF / Print";
		dlPdf.style.width = "auto";
		dlPdf.style.padding = "0.5rem 1rem";
		dlPdf.style.height = "auto";

		dlExcel.addEventListener("click", () => {
			const label = `Receipt_${row.id}`;
			const rows = [row];
			const content = buildExcelTable(rows, label);
			downloadFile(`Receipt_${row.id}_${nowStamp()}.xls`, "application/vnd.ms-excel", content);
		});

		dlPdf.addEventListener("click", () => {
			openPDFPrint([row], `Transaction Receipt (${row.id})`);
		});

		actions.appendChild(close);
		actions.appendChild(dlPdf);
		actions.appendChild(dlExcel);

		container.appendChild(box);
		container.appendChild(details);
		container.appendChild(actions);

		openModal("Transaction Details", container);
	}

	// ---------- Wire up ----------
	function wireUp() {
		// Export Data button
		const exportBtn = findButtonByText("Export Data");
		if (exportBtn) exportBtn.addEventListener("click", openExportModal);

		// View buttons (delegation)
		document.addEventListener("click", (e) => {
			const btn = e.target.closest("button");
			if (!btn) return;
			const label = (btn.textContent || "").trim().toLowerCase();
			if (label !== "view") return;

			const tr = btn.closest("tr");
			if (!tr) return;

			const tds = $all("td", tr);
			const row = {
				id: (tds[0]?.textContent || "").trim(),
				dt: (tds[1]?.textContent || "").trim(),
				items: (tds[2]?.textContent || "").trim(),
				total: (tds[3]?.textContent || "").trim(),
				payment: (tds[4]?.textContent || "").trim(),
				cashier: (tds[5]?.textContent || "").trim(),
			};

			openViewModal(row);
		});
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", wireUp);
	} else {
		wireUp();
	}
})();


//////
//REFUNDS
//////


(function () {
	// ---------- Helpers ----------
	function $all(sel, root = document) {
		return Array.from(root.querySelectorAll(sel));
	}
	function $(sel, root = document) {
		return root.querySelector(sel);
	}
	function escapeHtml(str) {
		return String(str ?? "")
			.replaceAll("&", "&amp;")
			.replaceAll("<", "&lt;")
			.replaceAll(">", "&gt;")
			.replaceAll('"', "&quot;")
			.replaceAll("'", "&#039;");
	}
	function textLower(el) {
		return (el?.textContent || "").trim().toLowerCase();
	}
	function formatDateLong(d) {
		// "Jan 13, 2025" style
		return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
	}
	function todayLong() {
		return formatDateLong(new Date());
	}

	// ---------- Minimal modal (glass style) ----------
	let overlay = document.getElementById("unipos-modal-overlay") || null;

	function ensureModal() {
		if (overlay) return overlay;

		overlay = document.createElement("div");
		overlay.id = "unipos-modal-overlay";
		overlay.style.position = "fixed";
		overlay.style.inset = "0";
		overlay.style.zIndex = "9999";
		overlay.style.display = "none";
		overlay.style.alignItems = "center";
		overlay.style.justifyContent = "center";
		overlay.style.padding = "1rem";
		overlay.style.background = "rgba(15, 23, 42, 0.35)";
		overlay.style.backdropFilter = "blur(10px)";

		const modal = document.createElement("div");
		modal.className = "glass-card";
		modal.style.width = "min(720px, 100%)";
		modal.style.borderRadius = "16px";
		modal.style.overflow = "hidden";
		modal.style.boxShadow = "0 20px 60px rgba(0,0,0,0.25)";

		const header = document.createElement("div");
		header.style.display = "flex";
		header.style.alignItems = "center";
		header.style.justifyContent = "space-between";
		header.style.padding = "1rem 1.25rem";
		header.style.borderBottom = "1px solid rgba(0,0,0,0.06)";

		const title = document.createElement("div");
		title.style.fontWeight = "900";
		title.style.fontSize = "1.1rem";
		title.textContent = "Modal";

		const closeBtn = document.createElement("button");
		closeBtn.className = "btn btn-outline";
		closeBtn.type = "button";
		closeBtn.textContent = "Close";
		closeBtn.style.width = "auto";
		closeBtn.style.padding = "0.45rem 0.9rem";
		closeBtn.style.height = "auto";
		closeBtn.style.fontSize = "0.875rem";

		header.appendChild(title);
		header.appendChild(closeBtn);

		const body = document.createElement("div");
		body.style.padding = "1.25rem";

		modal.appendChild(header);
		modal.appendChild(body);
		overlay.appendChild(modal);
		document.body.appendChild(overlay);

		function closeModal() {
			overlay.style.display = "none";
			body.innerHTML = "";
		}

		closeBtn.addEventListener("click", closeModal);
		overlay.addEventListener("click", (e) => {
			if (e.target === overlay) closeModal();
		});
		document.addEventListener("keydown", (e) => {
			if (overlay.style.display !== "none" && e.key === "Escape") closeModal();
		});

		overlay._refs = { title, body, closeModal };
		return overlay;
	}

	function openModal(modalTitle, contentNode) {
		const o = ensureModal();
		o._refs.title.textContent = modalTitle;
		o._refs.body.innerHTML = "";
		o._refs.body.appendChild(contentNode);
		o.style.display = "flex";
	}

	// ---------- Form UI helpers ----------
	function formGroup(labelText, inputEl) {
		const wrap = document.createElement("div");
		wrap.style.display = "flex";
		wrap.style.flexDirection = "column";
		wrap.style.gap = "0.35rem";

		const label = document.createElement("label");
		label.textContent = labelText;
		label.style.fontSize = "0.875rem";
		label.style.fontWeight = "800";
		label.style.opacity = "0.9";

		inputEl.style.width = "100%";
		inputEl.style.padding = "0.75rem 0.85rem";
		inputEl.style.borderRadius = "12px";
		inputEl.style.border = "1px solid rgba(0,0,0,0.08)";
		inputEl.style.outline = "none";
		inputEl.style.background = "rgba(255,255,255,0.65)";
		inputEl.style.backdropFilter = "blur(8px)";

		wrap.appendChild(label);
		wrap.appendChild(inputEl);
		return wrap;
	}

	function makeInput(type, value = "") {
		const i = document.createElement("input");
		i.type = type;
		i.value = value;
		return i;
	}

	function makeTextarea(value = "") {
		const t = document.createElement("textarea");
		t.rows = 3;
		t.value = value;
		t.style.resize = "vertical";
		return t;
	}

	function makeSelect(options, value) {
		const s = document.createElement("select");
		options.forEach((opt) => {
			const o = document.createElement("option");
			o.value = String(opt.value);
			o.textContent = opt.label;
			s.appendChild(o);
		});
		s.value = String(value);
		return s;
	}

	function showError(msg) {
		alert(msg);
	}

	// ---------- Refund ID generator ----------
	function nextRefundId() {
		const tbody = document.querySelector("table tbody");
		if (!tbody) return "REF-0001";

		let maxNum = 0;
		$all("tr", tbody).forEach((tr) => {
			const id = (tr.querySelector("td")?.textContent || "").trim(); // first td
			const m = id.match(/REF-(\d+)/i);
			if (m) maxNum = Math.max(maxNum, Number(m[1]));
		});

		const next = maxNum + 1;
		return `REF-${String(next).padStart(4, "0")}`;
	}

	// ---------- Try to get amount from TRANSACTIONS table (if available on page) ----------
	function findAmountByTransactionId(txnId) {
		// If transactions table exists on current page, search it.
		const tables = $all("table");
		for (const table of tables) {
			const ths = $all("thead th", table).map((th) => (th.textContent || "").trim().toLowerCase());
			const maybeTransactions =
				ths.includes("transaction id") &&
				(ths.includes("total") || ths.includes("amount") || ths.includes("total amount"));

			if (!maybeTransactions) continue;

			const trs = $all("tbody tr", table);
			for (const tr of trs) {
				const tds = $all("td", tr);
				const idText = (tds[0]?.textContent || "").trim();
				if (idText === txnId) {
					// try total column (commonly 4th td in your Transactions page)
					// Transaction table: ID, Date, Items, Total, Payment, Cashier
					const totalText = (tds[3]?.textContent || "").trim();
					return totalText || "";
				}
			}
		}
		return "";
	}

	// ---------- Badge update ----------
	function setStatusBadge(span, status) {
		const s = String(status).toLowerCase();
		span.classList.remove("success", "warning", "danger");

		if (s === "completed") {
			span.classList.add("success");
			span.textContent = "Completed";
		} else if (s === "rejected") {
			span.classList.add("danger");
			span.textContent = "Rejected";
		} else {
			span.classList.add("warning");
			span.textContent = "Pending";
		}
	}

	// ---------- Edit Refund modal (Process) ----------
	function openEditRefundModal(tr) {
		const tds = $all("td", tr);
		const refundId = (tds[0]?.textContent || "").trim();
		const txnId = (tds[1]?.textContent || "").trim();
		const date = (tds[2]?.textContent || "").trim();
		const amount = (tds[3]?.textContent || "").trim();
		const reason = (tds[4]?.textContent || "").trim();
		const badge = tds[5]?.querySelector("span");
		const currentStatus = (badge?.textContent || "Pending").trim();

		const container = document.createElement("div");
		container.style.display = "flex";
		container.style.flexDirection = "column";
		container.style.gap = "1rem";

		const grid = document.createElement("div");
		grid.style.display = "grid";
		grid.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
		grid.style.gap = "0.9rem";

		const refundIdInput = makeInput("text", refundId);
		refundIdInput.disabled = true;

		const txnInput = makeInput("text", txnId);
		txnInput.disabled = true;

		const dateInput = makeInput("text", date);
		dateInput.disabled = true;

		const amountInput = makeInput("text", amount);
		amountInput.disabled = true;

		const reasonInput = makeTextarea(reason);

		const statusSelect = makeSelect(
			[
				{ label: "Pending", value: "Pending" },
				{ label: "Completed", value: "Completed" },
				{ label: "Rejected", value: "Rejected" },
			],
			currentStatus
		);

		grid.appendChild(formGroup("Refund ID", refundIdInput));
		grid.appendChild(formGroup("Transaction ID", txnInput));
		grid.appendChild(formGroup("Date", dateInput));
		grid.appendChild(formGroup("Amount", amountInput));

		container.appendChild(grid);
		container.appendChild(formGroup("Reason", reasonInput));
		container.appendChild(formGroup("Status", statusSelect));

		const actions = document.createElement("div");
		actions.style.display = "flex";
		actions.style.justifyContent = "flex-end";
		actions.style.gap = "0.5rem";

		const cancel = document.createElement("button");
		cancel.className = "btn btn-outline";
		cancel.type = "button";
		cancel.textContent = "Cancel";
		cancel.style.width = "auto";
		cancel.style.height = "auto";
		cancel.style.padding = "0.5rem 1rem";
		cancel.addEventListener("click", () => ensureModal()._refs.closeModal());

		const save = document.createElement("button");
		save.className = "btn btn-primary";
		save.type = "button";
		save.textContent = "Save";
		save.style.width = "auto";
		save.style.height = "auto";
		save.style.padding = "0.5rem 1rem";

		save.addEventListener("click", () => {
			// Update reason + status in table
			tds[4].textContent = reasonInput.value.trim() || "—";
			if (badge) setStatusBadge(badge, statusSelect.value);
			ensureModal()._refs.closeModal();
		});

		actions.appendChild(cancel);
		actions.appendChild(save);
		container.appendChild(actions);

		openModal(`Edit Refund (${refundId})`, container);
	}

	// ---------- Add Refund modal (Add Refund button) ----------
	function openAddRefundModal() {
		const container = document.createElement("div");
		container.style.display = "flex";
		container.style.flexDirection = "column";
		container.style.gap = "1rem";

		const grid = document.createElement("div");
		grid.style.display = "grid";
		grid.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
		grid.style.gap = "0.9rem";

		const refundId = nextRefundId();
		const refundIdInput = makeInput("text", refundId);
		refundIdInput.disabled = true;

		const txnInput = makeInput("text", "TXN-");
		const dateInput = makeInput("text", todayLong());
		dateInput.disabled = true;

		const amountInput = makeInput("text", "");
		amountInput.placeholder = "₱0";

		const reasonInput = makeTextarea("");

		const statusSelect = makeSelect(
			[
				{ label: "Pending", value: "Pending" },
				{ label: "Completed", value: "Completed" },
				{ label: "Rejected", value: "Rejected" },
			],
			"Pending"
		);

		// Auto-fill amount when txn changes (if transactions exist)
		txnInput.addEventListener("blur", () => {
			const txnId = txnInput.value.trim();
			if (!txnId) return;

			const found = findAmountByTransactionId(txnId);
			if (found) amountInput.value = found;
		});

		grid.appendChild(formGroup("Refund ID (Auto)", refundIdInput));
		grid.appendChild(formGroup("Transaction ID", txnInput));
		grid.appendChild(formGroup("Date (Auto)", dateInput));
		grid.appendChild(formGroup("Amount", amountInput));

		container.appendChild(grid);
		container.appendChild(formGroup("Reason", reasonInput));
		container.appendChild(formGroup("Status", statusSelect));

		const actions = document.createElement("div");
		actions.style.display = "flex";
		actions.style.justifyContent = "flex-end";
		actions.style.gap = "0.5rem";

		const cancel = document.createElement("button");
		cancel.className = "btn btn-outline";
		cancel.type = "button";
		cancel.textContent = "Cancel";
		cancel.style.width = "auto";
		cancel.style.height = "auto";
		cancel.style.padding = "0.5rem 1rem";
		cancel.addEventListener("click", () => ensureModal()._refs.closeModal());

		const add = document.createElement("button");
		add.className = "btn btn-primary";
		add.type = "button";
		add.textContent = "Add Refund";
		add.style.width = "auto";
		add.style.height = "auto";
		add.style.padding = "0.5rem 1rem";

		add.addEventListener("click", () => {
			const tbody = document.querySelector("table tbody");
			if (!tbody) return;

			const txnId = txnInput.value.trim();
			const amount = amountInput.value.trim();
			const reason = reasonInput.value.trim() || "—";
			const status = statusSelect.value;

			if (!txnId || !txnId.toUpperCase().startsWith("TXN-")) {
				showError("Please enter a valid Transaction ID (example: TXN-001230).");
				return;
			}
			if (!amount) {
				showError("Amount is required. (It can auto-fill if transaction is available)");
				return;
			}

			// Create row (matches your table layout)
			const tr = document.createElement("tr");
			tr.style.borderBottom = "1px solid rgba(0, 0, 0, 0.05)";

			tr.innerHTML = `
				<td style="padding: 1rem; font-weight: 600; color: var(--primary);">
					${escapeHtml(refundId)}
				</td>
				<td style="padding: 1rem">${escapeHtml(txnId)}</td>
				<td style="padding: 1rem; color: var(--gray-500)">${escapeHtml(todayLong())}</td>
				<td style="padding: 1rem; font-weight: 600">${escapeHtml(amount)}</td>
				<td style="padding: 1rem; color: var(--gray-500)">${escapeHtml(reason)}</td>
				<td style="padding: 1rem">
					<span class="list-item-badge warning">Pending</span>
				</td>
				<td style="padding: 1rem">
					<button class="btn btn-outline" style="width:auto; padding:0.25rem 0.75rem; height:auto; font-size:0.875rem;">
						Process
					</button>
				</td>
			`;

			const badge = tr.querySelector("td:nth-child(6) span");
			setStatusBadge(badge, status);

	
			tbody.prepend(tr);

			ensureModal()._refs.closeModal();
		});

		actions.appendChild(cancel);
		actions.appendChild(add);
		container.appendChild(actions);

		openModal("Add Refund", container);
	}


	function wireUpRefundsPage() {
	
		const headerButtons = $all(".card-header button.btn");
		const addRefundBtn = headerButtons.find((b) => textLower(b) === "process refund");
		if (addRefundBtn) {
			addRefundBtn.textContent = "Add Refund";
			addRefundBtn.addEventListener("click", openAddRefundModal);
		}

	
		document.addEventListener("click", (e) => {
			const btn = e.target.closest("button");
			if (!btn) return;

			const label = textLower(btn);
			if (label !== "process") return;

			const tr = btn.closest("tr");
			if (!tr) return;

			openEditRefundModal(tr);
		});
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", wireUpRefundsPage);
	} else {
		wireUpRefundsPage();
	}
})();