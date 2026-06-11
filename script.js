/* ==========================================================================
   AURA ESTATES - SCRIPT PREMIUM INTERACTIVO (PARTE 1)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MANEJO DEL MENÚ MÓVIL (Elegante, Fluido y Confidencial)
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Estilos dinámicos para el menú móvil sin ensuciar el CSS base
    const injectMobileMenuStyles = () => {
        if (window.innerWidth <= 768) {
            navMenu.style.position = 'fixed';
            navMenu.style.top = '85px'; // Sincronizado con la altura del header en móviles
            navMenu.style.left = '-100%';
            navMenu.style.width = '100%';
            navMenu.style.height = 'calc(100vh - 85px)';
            navMenu.style.backgroundColor = 'rgba(13, 13, 13, 0.98)'; // Fondo negro puro aura
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
            // Resetear estilos por completo si el usuario regresa a pantallas de escritorio
            navMenu.style = '';
            navLinks.forEach(link => link.style = '');
        }
    };

    window.addEventListener('resize', injectMobileMenuStyles);
    injectMobileMenuStyles(); // Inicializar en la primera carga

    // Alternar apertura/cierre del menú al presionar el botón de hamburguesa
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

    // Cerrar el menú automáticamente al hacer clic en cualquier enlace (Experiencia fluida)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.style.left = '-100%';
                menuToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
            }
        });
    });


    // 2. DETECTOR DE SECCIONES ACTIVAS (Resalta el menú conforme se navega)
    const sections = document.querySelectorAll('section');
    
    const activeMenuOnScroll = () => {
        let scrollPosition = window.scrollY + 160; // Margen de detección para activar el enlace antes
        
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
    // Inicializamos el estado oculto desde JS para garantizar una carga limpia y maquetación fina
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .fade-in, .fade-in-delayed');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        
        if (el.classList.contains('fade-in-delayed')) {
            el.style.transitionDelay = '0.3s';
        }
    });

    // Configuración del Observer (Detecta la visibilidad del elemento con rendimiento óptimo)
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Se ejecuta una sola vez por elemento
            }
        });
    }, {
        threshold: 0.12 // Se activa cuando el 12% del elemento entra en pantalla
    });

    animatedElements.forEach(el => animationObserver.observe(el));


        // 4. PROCESAMIENTO DEL FORMULARIO VIP (Envío Invisible sin crear cuentas)
    const contactForm = document.getElementById('contactForm');
    
    // FUNCIÓN HELPER: Para mostrar notificaciones premium flotantes
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
            style.innerHTML = `
                @keyframes slideInEstates {
                    from { transform: translateX(110%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            notification.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 600);
        }, 6000);
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Detiene la recarga de la página
            
            const emailDestino = "gondresmk@gmail.com";
            
            // Captura de valores eliminando espacios vacíos (.trim())
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const selectResidencia = document.getElementById('residencia');
            const residenciaSeleccionada = selectResidencia.value;
            const residenciaTexto = selectResidencia.options[selectResidencia.selectedIndex].text;
            
            // 1. VALIDACIÓN ESTRICTA: Evita envíos con espacios vacíos
            if (!nombre || !email || !telefono || !residenciaSeleccionada) {
                showPremiumNotification(
                    "Revisión de Credenciales", 
                    "Por favor, complete todos los campos del formulario. No se permiten espacios vacíos.", 
                    false
                );
                return; // Detiene la ejecución inmediatamente
            }
            
            // 2. ANIMACIÓN DE CARGA DEL BOTÓN
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerText;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Procesando...';
            submitBtn.style.opacity = "0.7";
            submitBtn.disabled = true;
            
            // 3. ENVÍO INVISIBLE USANDO FORMSUBMIT
            fetch(`https://formsubmit.co/ajax/${emailDestino}`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `Acceso VIP Aura Estates - ${nombre}`,
                    Nombre: nombre,
                    Email: email,
                    Teléfono: telefono,
                    Propiedad_Interes: residenciaTexto,
                    _template: "table"
                })
            })
            .then(response => response.json())
            .then(data => {
                showPremiumNotification(
                    "Acceso VIP Concedido", 
                    `Estimado(a) <strong>${nombre}</strong>. El formulario fue enviado con éxito y nuestro equipo se pondrá en contacto en breve vía correo.`, 
                    true
                );
                contactForm.reset();
            })
            .catch(error => {
                showPremiumNotification(
                    "Error de Conexión", 
                    "Hubo un inconveniente en la red. Por favor, intente de nuevo en unos momentos.", 
                    false
                );
            })
            .finally(() => {
                // Restaurar botón siempre al final
                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = "1";
                submitBtn.disabled = false;
            });
        });
    }
