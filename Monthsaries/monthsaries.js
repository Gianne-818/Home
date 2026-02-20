document.addEventListener('DOMContentLoaded', function(){
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const navLinks = document.querySelectorAll('.nav-link');

    if (localStorage.getItem('sidebarCollapsed') === 'true') { sidebar.classList.add('collapsed'); mainContent.classList.add('expanded'); }
    else if (localStorage.getItem('sidebarCollapsed') !== null) { sidebarToggle.classList.add('active'); }

    sidebarToggle.addEventListener('click', ()=>{ sidebar.classList.toggle('collapsed'); mainContent.classList.toggle('expanded'); sidebarToggle.classList.toggle('active'); localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed')); });

    navLinks.forEach(link=>{ link.addEventListener('mouseenter', ()=> link.style.transform='translateX(5px)'); link.addEventListener('mouseleave', ()=> link.style.transform='translateX(0)'); });
});
