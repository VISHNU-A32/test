(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-primary shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('bg-primary shadow-sm').css('top', '-150px');
        }
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Testimonial slider
    const carousel = document.querySelector('.testimonial-carousel');
    const slides = carousel ? carousel.querySelectorAll('.testimonial-card') : [];
    const prevBtn = document.querySelector('.testimonial-nav.prev');
    const nextBtn = document.querySelector('.testimonial-nav.next');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentIndex = 0;

    const setAriaActive = (index) => {
        slides.forEach((slide, idx) => {
            slide.id = `testimonial-${idx}`;
            const isActive = idx === index;
            slide.classList.toggle('is-active', isActive);
            slide.setAttribute('aria-hidden', (!isActive).toString());
        });
        dotsContainer && dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, idx) => {
            const isActive = idx === index;
            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-selected', isActive.toString());
            dot.setAttribute('tabindex', isActive ? '0' : '-1');
        });
    };

    const updateCarousel = () => {
        if (!carousel) return;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        setAriaActive(currentIndex);
    };

    const moveTo = (index) => {
        if (!slides.length) return;
        currentIndex = (index + slides.length) % slides.length;
        updateCarousel();
    };

    if (dotsContainer && slides.length) {
        slides.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = 'testimonial-dot';
            dot.type = 'button';
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-controls', `testimonial-${idx}`);
            dot.addEventListener('click', () => moveTo(idx));
            dot.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    moveTo(idx);
                }
            });
            dotsContainer.appendChild(dot);
        });
    }

    prevBtn && prevBtn.addEventListener('click', () => moveTo(currentIndex - 1));
    nextBtn && nextBtn.addEventListener('click', () => moveTo(currentIndex + 1));

    if (slides.length > 1) {
        let autoplay = setInterval(() => moveTo(currentIndex + 1), 6000);
        carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
        carousel.addEventListener('mouseleave', () => {
            clearInterval(autoplay);
            autoplay = setInterval(() => moveTo(currentIndex + 1), 6000);
        });
    }

    updateCarousel();

    // Partner logos autoplay scrolling
    const partnerGrid = document.querySelector('.partner-grid');
    if (partnerGrid && partnerGrid.children.length > 0) {
        const cloneCount = partnerGrid.children.length;
        for (let i = 0; i < cloneCount; i++) {
            partnerGrid.appendChild(partnerGrid.children[i].cloneNode(true));
        }
        let offset = 0;
        const animatePartners = () => {
            offset -= 0.5;
            partnerGrid.style.transform = `translateX(${offset}px)`;
            if (Math.abs(offset) >= partnerGrid.scrollWidth / 2) {
                offset = 0;
            }
            requestAnimationFrame(animatePartners);
        };
        partnerGrid.style.whiteSpace = 'nowrap';
        partnerGrid.style.display = 'inline-flex';
        Array.from(partnerGrid.children).forEach(card => {
            card.style.marginRight = '36px';
            card.style.flex = '0 0 auto';
        });
        animatePartners();
    }

})(jQuery);


