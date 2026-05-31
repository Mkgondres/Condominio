/* ==========================================================================
   AURA RESIDENCES - SCRIPT PREMIUM INTERACTIVO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MANEJO DEL MENÚ MÓVIL (Elegante y Fluido)
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Estilos dinámicos para el menú móvil sin alterar el CSS base
    const injectMobileMenuStyles = () => {
        if (window.innerWidth <= 768) {
            navMenu.style.position = 'fixed';
            navMenu.style.top = '80px';
            navMenu.style.left = '-100%';
            navMenu.style.width = '100%';
            navMenu.style.height = 'calc(100vh - 80px)';
            navMenu.style.backgroundColor = 'rgba(17, 17, 17, 0.98)';
            navMenu.style.backdropFilter = 'blur(20px)';
            navMenu.style.display = 'block';
            navMenu.style.transition = 'left 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
            
            const ul = navMenu.querySelector('ul');
            ul.style.flexDirection = 'column';
            ul.style.alignItems = 'center';
            ul.style.justifyContent = 'center';
            ul.style.height = '70%';
            ul.style.gap = '40px';
            
            navLinks.forEach(link => link.style.fontSize = '1.3rem');
        } else {
            // Resetear estilos si pasa a pantalla de computadora
            navMenu.style = '';
            navLinks.forEach(link => link.style = '');
        }
    };

    window.addEventListener('resize', injectMobileMenuStyles);
    injectMobileMenuStyles(); // Ejecutar al cargar

    // Alternar menú al dar clic en el botón hamburguesa
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

    // Cerrar el menú automáticamente cuando se da clic en un enlace (Móviles)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.style.left = '-100%';
                menuToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
            }
        });
    });


    // 2. DETECTOR DE SECCIONES ACTIVAS (Actualiza el menú al hacer scroll)
    const sections = document.querySelectorAll('section');
    
    const activeMenuOnScroll = () => {
        let scrollPosition = window.scrollY + 150; // Margen de detección
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', activeMenuOnScroll);


    // 3. EFECTO DE APARICIÓN SUAVE (Scroll Reveal de Alta Gama)
    // Inicializamos el estado oculto desde JS para garantizar una carga limpia
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .fade-in, .fade-in-delayed');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 1s cubic-bezier(0.25, 1, 0.5, 1), transform 1s cubic-bezier(0.25, 1, 0.5, 1)';
        
        if (el.classList.contains('fade-in-delayed')) {
            el.style.transitionDelay = '0.3s';
        }
    });

    // Configuración del Intersection Observer (Detecta cuando el usuario ve el elemento)
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Se ejecuta solo una vez para mejor rendimiento
            }
        });
    }, {
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    });

    animatedElements.forEach(el => animationObserver.observe(el));


    // 4. PROCESAMIENTO DEL FORMULARIO VIP (Simulación de Alta Gama)
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue
            
            // Captura de datos (Listo para conectar con tu sistema de correos o base de datos)
            const nombre = document.getElementById('nombre').value;
            const selectResidencia = document.getElementById('residencia');
            const residenciaSeleccionada = selectResidencia.options[selectResidencia.selectedIndex].text;
            
            // Cambiar el estado del botón a modo "Procesando"
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Verificando Credenciales...";
            submitBtn.style.opacity = "0.7";
            submitBtn.disabled = true;
            
            // Simulación de respuesta premium tras 2 segundos
            setTimeout(() => {
                // Crear notificación flotante elegante
                const notification = document.createElement('div');
                notification.style.position = 'fixed';
                notification.style.bottom = '30px';
                notification.style.right = '30px';
                notification.style.backgroundColor = '#111111';
                notification.style.color = '#ffffff';
                notification.style.border = '1px solid #c5a880';
                notification.style.padding = '25px 35px';
                notification.style.boxShadow = '0 20px 50px rgba(0,0,0,0.3)';
                notification.style.zIndex = '2000';
                notification.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
                notification.style.maxWidth = '450px';
                notification.style.animation = 'slideIn 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards';
                
                notification.innerHTML = `
                    <h4 style="font-family: 'Playfair Display', serif; color: #c5a880; margin-bottom: 8px; font-size: 1.2rem; font-weight: 400;">Solicitud Recibida</h4>
                    <p style="font-size: 0.85rem; font-weight: 300; line-height: 1.5; color: rgba(255,255,255,0.8);">
                        Gracias, <strong>${nombre}</strong>. Un asesor de inversiones se comunicará de manera privada contigo en las próximas horas para coordinar tu recorrido exclusivo en relación a: <em>${residenciaSeleccionada}</em>.
                    </p>
                `;
                
                document.body.appendChild(notification);
                
                // Animación CSS temporal para la notificación
                const style = document.createElement('style');
                style.innerHTML = `
                    @keyframes slideIn {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
                
                // Resetear formulario y botón
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = "1";
                submitBtn.disabled = false;
                
                // Desvanecer la notificación automáticamente después de 7 segundos
                setTimeout(() => {
                    notification.style.transition = 'opacity 0.5s ease';
                    notification.style.opacity = '0';
                    setTimeout(() => notification.remove(), 500);
                }, 7000);
                
            }, 2000);
        });
    }
});

