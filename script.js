document.addEventListener("DOMContentLoaded", () => {

    // --- 1. THREE.JS "Architectural / Civil Engineering" Background ---
    const canvasContainer = document.getElementById("canvas-container");

    const scene = new THREE.Scene();

    // Light, airy fog for distance (Professional look)
    scene.fog = new THREE.FogExp2(0xF4F7F6, 0.0015);
    // Background color matches the light theme
    scene.background = new THREE.Color(0xF4F7F6);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasContainer.appendChild(renderer.domElement);

    // Create floating, elegant architectural geometry (e.g., concrete/glass slabs)
    const blocks = [];

    // Subtle, high-end materials
    const materialPrimary = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        shininess: 30,
    });

    const materialSecondary = new THREE.MeshLambertMaterial({
        color: 0x001F3F, // Navy blue accent blocks
        transparent: true,
        opacity: 0.1, // Very subtle
    });

    for (let i = 0; i < 60; i++) {
        // Varying block sizes representing architectural elements
        const width = Math.random() * 40 + 10;
        const height = Math.random() * 5 + 2;
        const depth = Math.random() * 40 + 10;

        const geometry = new THREE.BoxGeometry(width, height, depth);

        // Mix two materials
        const mat = Math.random() > 0.8 ? materialSecondary : materialPrimary;
        const mesh = new THREE.Mesh(geometry, mat);

        // Spread them out massively in 3D space
        mesh.position.x = (Math.random() - 0.5) * 1500;
        mesh.position.y = (Math.random() - 0.5) * 800;
        mesh.position.z = (Math.random() - 0.5) * 1500 - 400;

        // Give them slight architectural angles
        mesh.rotation.y = Math.random() * Math.PI;

        scene.add(mesh);
        blocks.push({
            mesh: mesh,
            speedY: (Math.random() * 0.2 + 0.05) * (Math.random() > 0.5 ? 1 : -1),
            speedRot: (Math.random() * 0.002)
        });
    }

    // Professional Soft Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(100, 200, 50);
    scene.add(directionalLight);

    camera.position.z = 200;
    camera.position.y = 50;

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Gentle, professional floating motion for the architectural blocks
        blocks.forEach(block => {
            block.mesh.position.y += block.speedY;
            block.mesh.rotation.y += block.speedRot;

            // Loop them if they float too high/low
            if (block.mesh.position.y > 600) block.mesh.position.y = -600;
            if (block.mesh.position.y < -600) block.mesh.position.y = 600;
        });

        // Parallax camera easing (smooth depth effect on mouse move)
        targetX = mouseX * 0.05;
        targetY = mouseY * 0.05;
        camera.position.x += (targetX - camera.position.x) * 0.03;
        camera.position.y += (-targetY - camera.position.y) * 0.03;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });


    // --- 2. GSAP "Anti-Gravity" DOM Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Panel Subtle Bobbing
    gsap.to(".main-hero-panel", {
        y: -10,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });

    // The Reveal: Architectural blueprint wipes away to show the firm's real work
    gsap.to(".blueprint-photo", {
        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        duration: 3,
        ease: "power2.inOut",
        delay: 0.5
    });

    // Animate Hero Text (Using Timeline for exact control)
    const heroTl = gsap.timeline({ delay: 0.5 });

    heroTl.from(".hero-text-centered h1", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    })
        .from(".hero-text-centered p", {
            y: 30,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        }, "-=0.8"); // Start 0.8s before the h1 animation finishes

    // Blend and Move the Hero Image while Scrolling Down
    gsap.to(".image-reveal-container", {
        y: 100, // Move down slightly slower than the scroll speed for parallax
        opacity: 0, // Blend/fade out
        scale: 0.9,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top", // Start animation when top of hero is at top of viewport
            end: "bottom top", // End when bottom of hero hits top
            scrub: true // Tie progress to scroll bar directly
        }
    });

    // Metrics Floating Panels (staggered)
    const statCards = document.querySelectorAll(".stat-item");
    statCards.forEach((card, index) => {
        gsap.to(card, {
            y: (index % 2 === 0 ? -8 : 8), // Alternate slight up/down
            duration: 3 + index * 0.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    });

    // GSAP Number Counters
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        gsap.to(counter, {
            innerHTML: target,
            duration: 2.5,
            snap: { innerHTML: 1 },
            ease: "power1.out",
            scrollTrigger: {
                trigger: counter,
                start: "top 85%"
            }
        });
    });

    // --- 3. Navbar Scroll Animation ---
    const header = document.querySelector(".glass-header");
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        // Add base rolled state if not at very top
        if (currentScroll > 50) {
            header.classList.add("nav-scrolled");

            // Determine scroll direction
            if (currentScroll < lastScroll) {
                // Scrolling UP
                header.classList.add("nav-up");
            } else {
                // Scrolling DOWN
                header.classList.remove("nav-up");
            }
        } else {
            // At the very top
            header.classList.remove("nav-scrolled");
            header.classList.remove("nav-up");
        }

        lastScroll = currentScroll;
    });

});
