document.addEventListener('DOMContentLoaded', function() {
    // ===== القائمة الجانبية للهاتف المحمول =====
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const closeMenu = document.getElementById('close-menu');

    if (mobileMenuToggle && mobileNav && closeMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileNav.classList.add('active');
        });

        closeMenu.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });

        // إغلاق القائمة الجانبية عند النقر على رابط
        document.querySelectorAll('.mobile-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
            });
        });
    }

    // ===== تأثيرات التمرير للكشف عن العناصر =====
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }

    window.addEventListener('scroll', reveal);
    reveal(); // تشغيل عند تحميل الصفحة لتطبيق على العناصر المرئية

    // ===== شريط التقدم أثناء التمرير =====
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
            progressBar.style.width = progress + '%';
        });
    }

    // ===== زر العودة للأعلى =====
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== تغيير اللغة =====
    const langToggleDesktop = document.getElementById('lang-toggle');
    const langToggleMobile = document.getElementById('mobile-lang-toggle');
    const htmlElement = document.documentElement;

    const toggleLanguage = () => {
        const currentLang = htmlElement.getAttribute('lang');
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        htmlElement.setAttribute('lang', newLang);
        htmlElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');

        // تحديث نص زر اللغة
        const langButtonDesktopSpan = langToggleDesktop.querySelector('span');
        const langButtonMobileSpan = langToggleMobile.querySelector('span');
        if (langButtonDesktopSpan) langButtonDesktopSpan.textContent = currentLang === 'ar' ? 'English' : 'العربية';
        if (langButtonMobileSpan) langButtonMobileSpan.textContent = currentLang === 'ar' ? 'English' : 'العربية';

        // يمكنك هنا إضافة المزيد من المنطق لتغيير محتوى النصوص بناءً على اللغة
    };

    if (langToggleDesktop) {
        langToggleDesktop.addEventListener('click', toggleLanguage);
    }
    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', toggleLanguage);
    }

    // ===== تغيير الوضع الداكن =====
    const themeToggleDesktop = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('mobile-theme-toggle');
    const body = document.body;

    const toggleDarkMode = () => {
        body.classList.toggle('dark-mode');

        // تحديث نص زر الوضع الداكن
        const themeButtonDesktopSpan = themeToggleDesktop.querySelector('span');
        const themeButtonMobileSpan = themeToggleMobile.querySelector('span');
        const isDarkMode = body.classList.contains('dark-mode');
        if (themeButtonDesktopSpan) themeButtonDesktopSpan.textContent = isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن';
        if (themeButtonMobileSpan) themeButtonMobileSpan.textContent = isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن';

        // حفظ حالة الوضع الداكن في Local Storage
        localStorage.setItem('darkMode', isDarkMode);
    };

    // التحقق من حالة الوضع الداكن المحفوظة عند التحميل
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        body.classList.add('dark-mode');
        if (themeToggleDesktop && themeToggleMobile) {
            themeToggleDesktop.querySelector('span').textContent = 'الوضع الفاتح';
            themeToggleMobile.querySelector('span').textContent = 'الوضع الفاتح';
        }
    }

    if (themeToggleDesktop) {
        themeToggleDesktop.addEventListener('click', toggleDarkMode);
    }
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleDarkMode);
    }

    // ===== معالجة نموذج الاتصال =====
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('form-response');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    if (contactForm && formResponse && nameInput && emailInput && messageInput && nameError && emailError && messageError) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset errors
            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';
            nameInput.classList.remove('is-invalid');
            emailInput.classList.remove('is-invalid');
            messageInput.classList.remove('is-invalid');

            let isValid = true;

            if (nameInput.value.trim() === '') {
                nameError.textContent = 'الرجاء إدخال اسمك.';
                nameInput.classList.add('is-invalid');
                isValid = false;
            }

            if (emailInput.value.trim() === '') {
                emailError.textContent = 'الرجاء إدخال بريدك الإلكتروني.';
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                emailError.textContent = 'الرجاء إدخال بريد إلكتروني صحيح.';
                emailInput.classList.add('is-invalid');
                isValid = false;
            }

            if (messageInput.value.trim() === '') {
                messageError.textContent = 'الرجاء إدخال رسالتك.';
                messageInput.classList.add('is-invalid');
                isValid = false;
            }

            if (isValid) {
                // هنا يمكنك إضافة كود لإرسال البيانات إلى الخادم
                // في هذا المثال، سنقوم فقط بعرض رسالة نجاح مؤقتة
                formResponse.textContent = 'تم إرسال رسالتك بنجاح!';
                formResponse.className = 'alert alert-success';
                formResponse.style.display = 'block';
                contactForm.reset();
                setTimeout(() => {
                    formResponse.style.display = 'none';
                }, 3000);
            } else {
                formResponse.textContent = 'يرجى تصحيح الأخطاء في النموذج.';
                formResponse.className = 'alert alert-danger';
                formResponse.style.display = 'block';
                setTimeout(() => {
                    formResponse.style.display = 'none';
                }, 3000);
            }
        });
    }

    // ===== تحديث سنة حقوق النشر في الفوتر =====
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ===== تأثيرات Ripple للأزرار =====
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});