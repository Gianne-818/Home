document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const topHeader = document.getElementById('topHeader');

    // Check if sidebar was previously collapsed (only if sidebar/mainContent exist)
    if (sidebar && mainContent) {
        const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';

        if (sidebarCollapsed) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
        } else if (localStorage.getItem('sidebarCollapsed') !== null && sidebarToggle) {
            sidebarToggle.classList.add('active');
        }
    }

    // Toggle sidebar
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            if (!sidebar || !mainContent) return;
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
            sidebarToggle.classList.toggle('active');
            
            // Save state to localStorage
            const isCollapsed = sidebar.classList.contains('collapsed');
            localStorage.setItem('sidebarCollapsed', isCollapsed);
        });
    }

    // No header toggle required — header links are displayed directly.

    // ---- Start / Login overlay handling (home page) ----
    const startOverlay = document.getElementById('startOverlay');
    const startForm = document.getElementById('startForm');
    const startError = document.getElementById('startError');

    // Credentials provided (client-side check)
    const CORRECT_EMAIL = 'crissamayeconas@gmail.com';
    const CORRECT_PASSWORD = 'crssmy';

    // If overlay exists, wire up handlers. Persist a "loggedIn" flag in localStorage.
    if (startOverlay && startForm) {
        // If already logged in, hide overlay
        if (localStorage.getItem('loggedIn') === 'true') {
            startOverlay.classList.add('hidden');
        } else {
            startForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = (document.getElementById('startEmail').value || '').trim();
                const pass = (document.getElementById('startPassword').value || '');

                // simple check: email case-insensitive, password exact
                if (email.toLowerCase() === CORRECT_EMAIL.toLowerCase() && pass === CORRECT_PASSWORD) {
                    localStorage.setItem('loggedIn', 'true');
                    startOverlay.classList.add('hidden');
                    if (startError) startError.textContent = '';
                } else {
                    if (startError) startError.textContent = 'Invalid email or password.';
                }
            });

            // keep overlay modal; no ESC bypass
            startOverlay.addEventListener('keydown', function(e) {
                // intentionally empty — overlay should remain until correct credentials
            });
        }
    }

    // Smooth hover effects for navigation links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add fade-in animation for content
    const contentSection = document.querySelector('.content-section');
    if (contentSection) {
        contentSection.style.opacity = '0';
        contentSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            contentSection.style.transition = 'all 0.6s ease';
            contentSection.style.opacity = '1';
            contentSection.style.transform = 'translateY(0)';
        }, 100);
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Adjust layout if needed
            if (sidebar && mainContent) {
                if (window.innerWidth <= 768 && !sidebar.classList.contains('collapsed')) {
                    // On mobile, default to collapsed if not explicitly opened
                    const wasOpened = sessionStorage.getItem('sidebarOpenedOnMobile');
                    if (!wasOpened) {
                        sidebar.classList.add('collapsed');
                        mainContent.classList.add('expanded');
                        if (sidebarToggle) sidebarToggle.classList.remove('active');
                    }
                }
            }
        }, 250);
    });
});