/* ==========================================================================
   AURA ESTATES - SCRIPT PREMIUM INTERACTIVO (COMPLETO)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MANEJO DEL MENÚ MÓVIL
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    const injectMobileMenuStyles = () => {
        if (window.innerWidth <= 768) {
            navMenu.style.position = 'fixed';
            navMenu.style.top = '85px';
            navMenu.style.left = '-100%';
            navMenu.style.width = '100%';
            navMenu.style.height = 'calc(100vh - 85px)';
            navMenu.style.backgroundColor = 'rgba(13, 13, 13, 0.98)';
            navMenu.style.backdropFilter = 'blur(20px)';
            navMenu.style.webkitBackdropFilter = 'blur(20px)';
            navMenu.style.display = 'block';
            navMenu.style.transition = 'left 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            
            const ul = navMenu.querySelector('ul');
            if (ul) {
                ul.style.flexDirection = 'column';
                ul.style.alignItems = 'center';
                ul.style.justifyContent = 'center';
                ul.style.height = '65%';
                ul.style.gap = '35px';
            }
            
            navLinks.forEach(link => link.style.fontSize = '1.2rem');
        } else {
            navMenu.style = '';
            navLinks.forEach(link => link.style = '');
        }
    };

    window.addEventListener('resize', injectMobileMenuStyles);
    injectMobileMenuStyles();

    menuToggle.addEventListener('click', () => {
        const icon = menuToggle.querySelector('i');
        if (navMenu.style.left === '0px') {
            navMenu.style.left = '-100%';
            icon.className = 'fa-solid fa-bars-staggered';
        } else {
            navMenu.style.left = '0px';
            icon.className = 'fa-solid fa-xmark';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.style.left = '-100%';
                menuToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
            }
        });
    });

    // 2. DETECTOR DE SECCIONES ACTIVAS
    const sections = document.querySelectorAll('section');
    const activeMenuOnScroll = () => {
        let scrollPosition = window.scrollY + 160;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) link.classList.add('active');
                });
            }
        });
    };
    window.addEventListener('scroll', activeMenuOnScroll);

    // 3. EFECTO DE APARICIÓN SUAVE
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .fade-in, .fade-in-delayed');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        if (el.classList.contains('fade-in-delayed')) el.style.transitionDelay = '0.3s';
    });

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    animatedElements.forEach(el => animationObserver.observe(el));

        // 4. PROCESAMIENTO DEL FORMULARIO VIP (Idéntico a tu código funcional)
    const contactForm = document.getElementById('contactForm');
    
    // Función para crear la notificación elegante
    const showPremiumNotification = (title, message, isSuccess = true) => {
        const existingNotification = document.getElementById('auraNotification');
        if (existingNotification) existingNotification.remove();

        const notification = document.createElement('div');
        notification.id = 'auraNotification';
        notification.style.position = 'fixed';
        notification.style.bottom = '30px';
        notification.style.right = '30px';
        notification.style.backgroundColor = '#141414';
        notification.style.color = '#ffffff';
        notification.style.border = isSuccess ? '1px solid #d4b383' : '1px solid #c94c4c';
        notification.style.padding = '25px 35px';
        notification.style.boxShadow = '0 30px 60px rgba(0,0,0,0.4)';
        notification.style.zIndex = '2000';
        notification.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
        notification.style.maxWidth = '450px';
        notification.style.animation = 'slideInEstates 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        
        notification.innerHTML = `
            <h4 style="font-family: 'Playfair Display', serif; color: ${isSuccess ? '#d4b383' : '#c94c4c'}; margin-bottom: 8px; font-size: 1.25rem; font-weight: 400;">${title}</h4>
            <p style="font-size: 0.85rem; font-weight: 300; line-height: 1.6; color: rgba(255,255,255,0.8);">${message}</p>
        `;
        
        document.body.appendChild(notification);
        
        if (!document.getElementById('estateAnimationStyles')) {
            const style = document.createElement('style');
            style.id = 'estateAnimationStyles';
            style.innerHTML = `@keyframes slideInEstates { from { transform: translateX(110%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            notification.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 600);
        }, 8000);
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            // Esto es lo que bloquea que la página recargue y salte hacia arriba
            event.preventDefault(); 
            
            const emailDestino = "gondresmk@gmail.com";
            
            // Extraer datos limpios
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const selectResidencia = document.getElementById('residencia');
            const residenciaTexto = selectResidencia.options[selectResidencia.selectedIndex]?.text || '';
            
            // Validación estricta anti-espacios vacíos
            if (!nombre || !email || !telefono || selectResidencia.value === "") {
                showPremiumNotification("Revisión de Credenciales", "Por favor, complete todos los campos del formulario.", false);
                return;
            }
            
            // Efecto de carga en el botón
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Procesando...';
            submitBtn.disabled = true;
            
            // Envío con el método exacto de tu otro código funcional
            fetch(`https://formsubmit.co/ajax/${emailDestino}`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `💎 Solicitud de Acceso VIP: ${nombre}`,
                    Nombre: nombre,
                    Correo: email,
                    Teléfono: telefono,
                    Propiedad_Interes: residenciaTexto,
                    _template: "table"
                })
            })
            .then(response => response.json())
            .then(data => {
                // Restaurar botón y mostrar éxito
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                showPremiumNotification("Acceso VIP Concedido", `Estimado(a) <strong>${nombre}</strong>. El formulario fue enviado con éxito y nuestro equipo se pondrá en contacto en breve vía correo.`, true);
                contactForm.reset();
            })
            .catch(error => {
                // Restaurar botón y mostrar error si no hay internet
                console.log(error);
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                showPremiumNotification("Error de Conexión", "Surgió un inconveniente en la red. Por favor, inténtelo de nuevo.", false);
            });
        });
    }
}); // <-- Esta llave y paréntesis cierran todo el archivo, no las borres.

