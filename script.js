// Initialize AOS animations
AOS.init({
    once: true,
    offset: 100
});

// DOM Elements
const navbar = document.getElementById('navbar');
const menuIcon = document.getElementById('menu-icon');
const sideDrawer = document.getElementById('side-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const closeDrawerBtn = document.getElementById('close-drawer');
const submenuToggle = document.querySelector('.submenu-toggle');
const submenu = document.querySelector('.submenu');
const themeToggle = document.getElementById('theme-toggle');
const langRadios = document.querySelectorAll('.lang-radio');
const translatableEls = document.querySelectorAll('.translatable');

// Views
const homeView = document.getElementById('home-view');
const branchView = document.getElementById('branch-view');
const branchTitle = document.getElementById('branch-title');
const branchAddress = document.getElementById('branch-address');
const branchMap = document.getElementById('branch-map');

// Branch Data
const branches = {
    'mandar': {
        title: { en: 'Mandar Road Campus', ur: 'مندر روڈ کیمپس' },
        address: { en: 'Main Mandar Road, Chiniot', ur: 'مین مندر روڈ، چنیوٹ' },
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108865.234149091!2d72.8906!3d31.7258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39223707e155bcab%3A0xc3c9469273cba94f!2sChiniot%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s'
    },
    'karmabad': {
        title: { en: 'Karmabad Campus', ur: 'کرم آباد کیمپس' },
        address: { en: 'Karmabad Area, Chiniot', ur: 'کرم آباد، چنیوٹ' },
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108865.234149091!2d72.8906!3d31.7258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39223707e155bcab%3A0xc3c9469273cba94f!2sChiniot%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s'
    },
    'mouzam': {
        title: { en: 'Mouzam Shah Road Campus', ur: 'معظم شاہ روڈ کیمپس' },
        address: { en: 'Mouzam Shah Road, Chiniot', ur: 'معظم شاہ روڈ، چنیوٹ' },
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108865.234149091!2d72.8906!3d31.7258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39223707e155bcab%3A0xc3c9469273cba94f!2sChiniot%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s'
    }
};

let currentLang = 'en';

// Sticky Navbar
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Drawer Logic
function openDrawer() {
    sideDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    sideDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

menuIcon.addEventListener('click', openDrawer);
if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

// Submenu Logic
submenuToggle.addEventListener('click', () => {
    submenu.classList.toggle('open');
    const icon = submenuToggle.querySelector('.toggle-icon');
    if (submenu.classList.contains('open')) {
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
});

// Routing / SPA Logic
const navItems = document.querySelectorAll('.nav-item');
const branchSelects = document.querySelectorAll('.branch-select');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const target = item.getAttribute('data-target');
        if (target === 'home') {
            homeView.style.display = 'block';
            branchView.style.display = 'none';
        }
        closeDrawer();
    });
});

branchSelects.forEach(select => {
    select.addEventListener('click', (e) => {
        e.preventDefault();
        const branchId = select.getAttribute('data-branch');
        const branch = branches[branchId];

        if (branch) {
            // Update branch view
            branchTitle.textContent = branch.title[currentLang];
            branchTitle.setAttribute('data-en', branch.title.en);
            branchTitle.setAttribute('data-ur', branch.title.ur);
            branchTitle.classList.add('translatable');

            branchAddress.innerHTML = `<i class="fas fa-map-marker-alt" style="color: var(--primary-yellow);"></i> ${branch.address[currentLang]}`;

            branchMap.innerHTML = `<iframe src="${branch.mapUrl}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

            homeView.style.display = 'none';
            branchView.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        closeDrawer();
    });
});

// Theme Logic
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Language/Localization Logic
function applyLanguage(lang) {
    currentLang = lang;
    translatableEls.forEach(el => {
        if (el.getAttribute(`data-${lang}`)) {
            if (el.tagName === 'INPUT' && el.type === 'submit') {
                el.value = el.getAttribute(`data-${lang}`);
            } else {
                el.textContent = el.getAttribute(`data-${lang}`);
            }
        }
    });

    if (lang === 'ur') {
        document.body.classList.add('nastaleeq-active');
        document.documentElement.dir = 'rtl';
    } else {
        document.body.classList.remove('nastaleeq-active');
        document.documentElement.dir = 'ltr';
    }

    langRadios.forEach(radio => {
        if (radio.value === lang) {
            radio.checked = true;
        }
    });
}

langRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.checked) {
            applyLanguage(radio.value);
        }
    });
});
