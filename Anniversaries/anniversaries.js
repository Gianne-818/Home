document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const navLinks = document.querySelectorAll('.nav-link');

    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (sidebarCollapsed) { sidebar.classList.add('collapsed'); mainContent.classList.add('expanded'); } else if (localStorage.getItem('sidebarCollapsed') !== null) { sidebarToggle.classList.add('active'); }

    sidebarToggle.addEventListener('click', function() { sidebar.classList.toggle('collapsed'); mainContent.classList.toggle('expanded'); sidebarToggle.classList.toggle('active'); localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed')); });

    navLinks.forEach(link => { link.addEventListener('mouseenter', function(){ this.style.transform = 'translateX(5px)'; }); link.addEventListener('mouseleave', function(){ this.style.transform = 'translateX(0)'; }); });

    const contentSection = document.querySelector('.content-section');
    if (contentSection) { contentSection.style.opacity = '0'; contentSection.style.transform = 'translateY(20px)'; setTimeout(()=>{ contentSection.style.transition = 'all 0.6s ease'; contentSection.style.opacity = '1'; contentSection.style.transform = 'translateY(0)'; }, 100); }
});
