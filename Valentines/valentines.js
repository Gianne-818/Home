document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mark current page link as active by matching link href to current location
    try {
        navLinks.forEach(link => {
            try {
                const linkUrl = new URL(link.getAttribute('href'), document.baseURI);
                // compare pathname (ignores query/hash)
                if (linkUrl.pathname === window.location.pathname || linkUrl.pathname === window.location.pathname.replace(/\/$/, '')) {
                    link.classList.add('active');
                } else {
                    // also support matching by file name only (if paths are relative)
                    const linkFile = linkUrl.pathname.split('/').pop();
                    const currentFile = window.location.pathname.split('/').pop();
                    if (linkFile && currentFile && linkFile === currentFile) {
                        link.classList.add('active');
                    }
                }
            } catch (e) {
                // ignore malformed href
            }
        });
    } catch (e) {
        // ignore
    }

    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (sidebarCollapsed) {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('expanded');
    } else if (localStorage.getItem('sidebarCollapsed') !== null) {
        sidebarToggle.classList.add('active');
    }

    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
        sidebarToggle.classList.toggle('active');
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    });

    // Close sidebar when clicking outside of it (only if open)
    document.addEventListener('click', function(e) {
        const isCollapsedNow = sidebar.classList.contains('collapsed');
        if (isCollapsedNow) return; // already closed

        const target = e.target;
        // if click is inside sidebar or on the toggle, do nothing
        if (sidebar.contains(target) || (sidebarToggle && sidebarToggle.contains(target))) return;

        // otherwise close sidebar
        sidebar.classList.add('collapsed');
        mainContent.classList.add('expanded');
        if (sidebarToggle) sidebarToggle.classList.remove('active');
        localStorage.setItem('sidebarCollapsed', true);
    });

    // Close sidebar on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            if (!sidebar.classList.contains('collapsed')) {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('expanded');
                if (sidebarToggle) sidebarToggle.classList.remove('active');
                localStorage.setItem('sidebarCollapsed', true);
            }
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() { this.style.transform = 'translateX(5px)'; });
        link.addEventListener('mouseleave', function() { this.style.transform = 'translateX(0)'; });
    });

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

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth <= 768 && !sidebar.classList.contains('collapsed')) {
                const wasOpened = sessionStorage.getItem('sidebarOpenedOnMobile');
                if (!wasOpened) {
                    sidebar.classList.add('collapsed');
                    mainContent.classList.add('expanded');
                    sidebarToggle.classList.remove('active');
                }
            }
        }, 250);
    });
});
