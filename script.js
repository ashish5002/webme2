document.addEventListener('DOMContentLoaded', () => {
    
    // ─── CUSTOM CURSOR ───
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
    });

    function animCursor() {
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
        
        // Ring follow effect
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        
        requestAnimationFrame(animCursor);
    }
    animCursor();

    // Hover effects for links and buttons
    const hoverTargets = document.querySelectorAll('a, button, .portfolio-card, .team-card');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            ring.style.width = '56px';
            ring.style.height = '56px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '12px';
            cursor.style.height = '12px';
            ring.style.width = '36px';
            ring.style.height = '36px';
        });
    });

    // ─── SCROLL REVEAL (Intersection Observer) ───
    const observerOptions = {
        threshold: 0.12
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // ─── PORTFOLIO FILTER ───
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Logic for actual filtering would go here
        });
    });

    // ─── TESTIMONIAL SLIDER ───
    const testimonials = [
        { 
            text: "Service is good and I recommend. Working with Esther completely transformed how our users experience our product. The attention to detail and design execution were all exceptional.", 
            author: "Sarah Johnson", 
            role: "CEO, TechFlow Inc." 
        },
        { 
            text: "Esther delivered beyond our expectations. The redesign increased our conversion rate by 40% within the first month. Her process is thorough, creative, and always on time.", 
            author: "Michael Roberts", 
            role: "Founder, StartupHub" 
        },
        { 
            text: "An incredibly talented designer who understands both aesthetics and function. Our brand has never looked better, and the response from our customers has been overwhelmingly positive.", 
            author: "Elena Vasquez", 
            role: "Marketing Director, NovaLabs" 
        },
    ];

    let tIdx = 0;
    const tText = document.querySelector('.testimonial-text');
    const tName = document.querySelector('.testimonial-author h4');
    const tRole = document.querySelector('.testimonial-author p');
    const tNavBtns = document.querySelectorAll('.t-nav-btn');

    tNavBtns.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            // Update Index
            if (i === 0) {
                tIdx = (tIdx - 1 + testimonials.length) % testimonials.length;
            } else {
                tIdx = (tIdx + 1) % testimonials.length;
            }

            // Animate transition
            tText.style.opacity = 0;
            setTimeout(() => {
                tText.textContent = testimonials[tIdx].text;
                tName.textContent = testimonials[tIdx].author;
                tRole.textContent = testimonials[tIdx].role;
                tText.style.opacity = 1;
            }, 200);
        });
    });

    // ─── PARALLAX HERO EFFECT ───
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && window.innerWidth > 1024) {
            heroContent.style.transform = `translateY(${y * 0.08}px)`;
        }
    });

});