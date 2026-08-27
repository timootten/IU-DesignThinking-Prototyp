// ==================== SHARED CONFIGURATION ====================
// This file contains shared utilities and configuration for all pages

// ==================== USER PROFILE ====================

function getUserProfile() {
  const profile = localStorage.getItem('userProfile');
  return profile ? JSON.parse(profile) : {
    name: '',
    email: '',
    avatar: '👤',
    theme: 'light',
    accentColor: 'purple',
    notifications: true,
    weekStart: 'monday',
    language: 'en'
  };
}

function saveUserProfile(profile) {
  localStorage.setItem('userProfile', JSON.stringify(profile));
  applyThemeAndColors();
}

// ==================== COLOR SCHEMES ====================

const colorSchemes = {
  purple: {
    primary: '#8b5cf6',
    primaryHover: '#7c3aed',
    primaryLight: '#ede9fe',
    primaryDark: '#6d28d9',
    gradient: 'from-purple-500 to-pink-500'
  },
  blue: {
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    primaryLight: '#dbeafe',
    primaryDark: '#1e40af',
    gradient: 'from-blue-500 to-cyan-500'
  },
  green: {
    primary: '#10b981',
    primaryHover: '#059669',
    primaryLight: '#d1fae5',
    primaryDark: '#047857',
    gradient: 'from-green-500 to-emerald-500'
  },
  pink: {
    primary: '#ec4899',
    primaryHover: '#db2777',
    primaryLight: '#fce7f3',
    primaryDark: '#be185d',
    gradient: 'from-pink-500 to-rose-500'
  },
  orange: {
    primary: '#f97316',
    primaryHover: '#ea580c',
    primaryLight: '#ffedd5',
    primaryDark: '#c2410c',
    gradient: 'from-orange-500 to-amber-500'
  },
  indigo: {
    primary: '#6366f1',
    primaryHover: '#4f46e5',
    primaryLight: '#e0e7ff',
    primaryDark: '#4338ca',
    gradient: 'from-indigo-500 to-purple-500'
  }
};

// ==================== THEME MANAGEMENT ====================

function initTheme() {
  const profile = getUserProfile();
  
  // Apply dark mode
  if (profile.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  // Update theme toggle icon
  updateThemeToggleIcon();
  
  // Apply accent color
  applyAccentColor(profile.accentColor);
}

function toggleTheme() {
  const profile = getUserProfile();
  profile.theme = profile.theme === 'dark' ? 'light' : 'dark';
  saveUserProfile(profile);
}

function updateThemeToggleIcon() {
  const profile = getUserProfile();
  const isDark = profile.theme === 'dark';
  
  const moonIcon = document.querySelector('#themeToggle .fa-moon');
  const sunIcon = document.querySelector('#themeToggle .fa-sun');
  
  if (moonIcon && sunIcon) {
    if (isDark) {
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
    } else {
      moonIcon.classList.remove('hidden');
      sunIcon.classList.add('hidden');
    }
  }
}

function applyAccentColor(color) {
  const scheme = colorSchemes[color] || colorSchemes.purple;
  
  // Create CSS custom properties
  const root = document.documentElement;
  root.style.setProperty('--color-primary', scheme.primary);
  root.style.setProperty('--color-primary-hover', scheme.primaryHover);
  root.style.setProperty('--color-primary-light', scheme.primaryLight);
  root.style.setProperty('--color-primary-dark', scheme.primaryDark);
  
  // Store color in data attribute for CSS targeting
  document.documentElement.setAttribute('data-accent-color', color);
  
  // Inject dynamic styles
  injectDynamicStyles(color, scheme);
}
  // Remove existing dynamic style if it exists
  const existingStyle = document.getElementById('dynamic-accent-styles');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  // Create new style element
  const style = document.createElement('style');
  style.id = 'dynamic-accent-styles';
  
  // Define the CSS that uses the selected color
  style.textContent = `
    /* Primary Buttons */
    .btn-primary {
      background-color: ${scheme.primary} !important;
    }
    .btn-primary:hover {
      background-color: ${scheme.primaryHover} !important;
    }
    
    /* Text Colors */
    .text-primary {
      color: ${scheme.primary} !important;
    }
    
    /* Active Navigation */
    nav a.text-purple-500,
    nav a.text-blue-500,
    nav a.text-green-500,
    nav a.text-pink-500,
    nav a.text-orange-500,
    nav a.text-indigo-500 {
      color: ${scheme.primary} !important;
    }
    
    /* Hover states for text */
    .hover\\:text-purple-500:hover,
    .hover\\:text-purple-600:hover {
      color: ${scheme.primary} !important;
    }
    
    /* Icon colors */
    .text-purple-500 {
      color: ${scheme.primary} !important;
    }
    
    /* Borders */
    .border-primary,
    .border-purple-500,
    .peer-checked\\:border-purple-500:checked {
      border-color: ${scheme.primary} !important;
    }
    
    /* Hover states for borders */
    .hover-border-primary:hover,
    .hover\\:border-purple-500:hover,
    .hover\\:border-purple-300:hover {
      border-color: ${scheme.primary} !important;
    }
    
    /* Ring colors */
    .ring-primary,
    .ring-purple-500 {
      --tw-ring-color: ${scheme.primary} !important;
    }
    
    /* Background hover */
    .hover-bg-primary:hover,
    .hover\\:bg-purple-100:hover {
      background-color: ${scheme.primaryLight} !important;
    }
    
    /* Background colors */
    .bg-purple-50 {
      background-color: ${scheme.primaryLight} !important;
    }
    
    /* Checked states */
    .peer:checked ~ .peer-checked-bg-primary,
    .peer:checked ~ .peer-checked\\:bg-purple-50 {
      background-color: ${scheme.primaryLight} !important;
    }
    
    /* Dark mode checked backgrounds */
    .dark .peer:checked ~ .dark\\:peer-checked\\:bg-purple-900\\/20 {
      background-color: ${scheme.primaryDark}33 !important;
    }
    
    /* Text colors for identities and special elements */
    .text-purple-600 {
      color: ${scheme.primary} !important;
    }
    
    .dark .dark\\:text-purple-400 {
      color: ${scheme.primaryLight} !important;
    }
    
    /* Gradient backgrounds */
    .bg-gradient-primary,
    .bg-gradient-to-r.from-purple-500 {
      background: linear-gradient(to right, ${scheme.primary}, ${scheme.primaryDark}) !important;
    }
  `;
  
  document.head.appendChild(style);
}

function applyThemeAndColors() {
  initTheme();
}

// ==================== SETUP THEME TOGGLE ====================

function setupThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

// ==================== LANGUAGE MANAGEMENT ====================

function applyLanguage() {
  const profile = getUserProfile();
  const lang = profile.language || 'en';
  document.documentElement.setAttribute('lang', lang);
  
  // Basic translations (can be extended)
  const translations = {
    en: {
      home: 'Home',
      add: 'Add',
      focus: 'Focus',
      buddy: 'Buddy',
      profile: 'Profile'
    },
    de: {
      home: 'Start',
      add: 'Hinzufügen',
      focus: 'Fokus',
      buddy: 'Partner',
      profile: 'Profil'
    },
    es: {
      home: 'Inicio',
      add: 'Añadir',
      focus: 'Enfoque',
      buddy: 'Compañero',
      profile: 'Perfil'
    },
    fr: {
      home: 'Accueil',
      add: 'Ajouter',
      focus: 'Focus',
      buddy: 'Partenaire',
      profile: 'Profil'
    }
  };
  
  // Apply translations to navigation
  const t = translations[lang] || translations.en;
  document.querySelectorAll('nav a span').forEach(el => {
    const key = el.textContent.toLowerCase();
    if (t[key]) {
      el.textContent = t[key];
    }
  });
}

// ==================== INITIALIZATION ====================

// Auto-initialize when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupThemeToggle();
    applyLanguage();
  });
} else {
  initTheme();
  setupThemeToggle();
  applyLanguage();
}
