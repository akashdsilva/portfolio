const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "アィウェオABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(0);


function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#1e3a8a";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(
            Math.floor(Math.random() * chars.length)
        );

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (
            drops[i] * fontSize > canvas.height &&
            Math.random() > 0.98
        ) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrix, 35);


window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            document
                .getElementById("navLinks")
                .classList.remove("active");
        }
    });
});


const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.addEventListener("click", e => {
    if (
        !menuToggle.contains(e.target) &&
        !navLinks.contains(e.target)
    ) {
        navLinks.classList.remove("active");
    }
});

const form = document.getElementById("form");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append(
        "access_key",
        "6f996897-40d4-4896-ad62-85c639f94056"
    );

    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch(
            "https://api.web3forms.com/submit",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (response.ok) {
            showNotification(
                "Success! Your message has been sent.",
                "success"
            );
            form.reset();
        } else {
            showNotification(
                "Error: " + data.message,
                "error"
            );
        }
    } catch (error) {
        showNotification(
            "Something went wrong. Please try again.",
            "error"
        );
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

function showNotification(message, type) {
    const notification = document.createElement("div");

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1.5rem 2rem;
        background: ${
            type === "success"
                ? "rgba(0, 255, 234, 0.2)"
                : "rgba(255, 0, 76, 0.2)"
        };
        border: 2px solid ${
            type === "success" ? "#00ffea" : "#ff004c"
        };
        color: ${
            type === "success" ? "#00ffea" : "#ff004c"
        };
        border-radius: 10px;
        font-family: 'Share Tech Mono', monospace;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease";
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}


const style = document.createElement("style");
style.textContent = `
@keyframes slideIn {
    from {
        transform: translateX(400px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(400px);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
    const animateElements = document.querySelectorAll(
        ".project-card, .skill-category, .highlight-card, .contact-item, .about-text p"
    );

    animateElements.forEach(el => {
        el.classList.add("fade-in-up");
        observer.observe(el);
    });
});
