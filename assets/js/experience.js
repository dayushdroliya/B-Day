/* Birthday experience, music, gallery and celebration */
"use strict";

(() => {

    const $ = id => document.getElementById(id);

    const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    // =====================================
    // SCROLL REVEAL ANIMATIONS
    // =====================================

    const reveals = document.querySelectorAll(
        "#birthdaySite .reveal"
    );

    if ("IntersectionObserver" in window) {

        const io = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");
                    io.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        reveals.forEach(x => io.observe(x));

    } else {

        reveals.forEach(x => x.classList.add("visible"));

    }


    // =====================================
    // PHOTO GALLERY
    // =====================================

    const grid = $("gallery");
    const dlg = $("photoDialog");

    for (
        let i = 1;
        i <= (window.MANUU_CONFIG.photoCount || 20);
        i++
    ) {

        const name =
            `photo-${String(i).padStart(2, "0")}.` +
            `${window.MANUU_CONFIG.photoExtension || "jpg"}`;

        const card = document.createElement("button");
        const img = document.createElement("img");

        card.className = "photo";
        card.type = "button";

        img.src = "assets/images/photos/" + name;
        img.alt = "Memory " + i;
        img.loading = "lazy";

        img.onerror = () => card.remove();

        card.append(img);

        card.addEventListener("click", () => {

            $("largePhoto").src = img.src;

            $("photoCaption").textContent =
                "A little piece of us ♡";

            dlg.showModal();

        });

        grid.append(card);

    }

    $("closePhoto").onclick = () => dlg.close();

    dlg.addEventListener("click", e => {

        if (e.target === dlg) {
            dlg.close();
        }

    });


    // =====================================
    // SONG PLAYER
    // =====================================

    const audio = $("songAudio");
    const play = $("playSong");
    const seek = $("seek");

    function fmt(s) {

        return Number.isFinite(s)
            ? `${Math.floor(s / 60)}:${String(
                Math.floor(s % 60)
            ).padStart(2, "0")}`
            : "0:00";

    }

    play.onclick = async () => {

        if (audio.paused) {

            try {

                await audio.play();

            } catch (e) {

                $("songStatus").textContent =
                    "Tap Play to start our little song ♡";

            }

        } else {

            audio.pause();

        }

    };

    audio.onplay = () => {

        play.textContent = "Ⅱ";

        $("songStatus").textContent =
            "Playing our little song ♡";

    };

    audio.onpause = () => {

        play.textContent = "▶";

    };

    audio.ontimeupdate = () => {

        if (audio.duration) {

            seek.value =
                audio.currentTime / audio.duration * 100;

            $("songTime").textContent =
                fmt(audio.currentTime);

        }

    };

    seek.oninput = () => {

        if (audio.duration) {

            audio.currentTime =
                seek.value / 100 * audio.duration;

        }

    };

    $("musicToggle").onclick = () => play.click();


    // =====================================
    // LETTER ANIMATION
    // =====================================

    const open = $("openLetter");
    const paper = $("letterPaper");
    const close = $("closeLetter");
    const letterText = $("letterText");

    open.onclick = () => {

        open.classList.add("opened");

        open.setAttribute("aria-expanded", "true");

        paper.hidden = false;

        if (!letterText.dataset.typed) {

            letterText.dataset.typed = "1";

            const ps = [
                ...letterText.querySelectorAll("p")
            ];

            let pi = 0;
            let ci = 0;

            ps.forEach(p => {

                p.dataset.full = p.textContent;
                p.textContent = "";

            });

            function type() {

                if (pi >= ps.length) return;

                const p = ps[pi];
                const s = p.dataset.full;

                if (ci < s.length) {

                    p.textContent += s[ci++];

                    setTimeout(
                        type,
                        reduced ? 0 : 18
                    );

                } else {

                    pi++;
                    ci = 0;

                    setTimeout(
                        type,
                        reduced ? 0 : 250
                    );

                }

            }

            type();

        }

        setTimeout(() => {

            paper.scrollIntoView({
                behavior: reduced ? "auto" : "smooth",
                block: "center"
            });

        }, 250);

    };

    close.onclick = () => {

        paper.hidden = true;

        open.classList.remove("opened");

        open.setAttribute("aria-expanded", "false");

        open.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    };


    // =====================================
    // REASONS CARDS
    // =====================================

    document.querySelectorAll(".reason").forEach(x => {

        x.onclick = () => {
            x.classList.toggle("flipped");
        };

    });


    // =====================================
    // YES / NO QUESTION
    // =====================================

    let noCount = 0;

    const no = $("no");
    const yes = $("yes");
    const answer = $("answer");

    no.onclick = () => {

        noCount++;

        answer.textContent = [

            "Arey, ek baar phir soch lo na? 🥺",

            "Please, Manuu… ek tiny sa yes? ♡",

            "Okay, no pressure. Your answer matters. 💗"

        ][Math.min(noCount - 1, 2)];

        if (noCount < 3 && !reduced) {

            const box = no.parentElement.getBoundingClientRect();

            no.style.transform =
                `translate(${
                    Math.random() *
                    Math.max(0, box.width - no.offsetWidth)
                    - box.width / 3
                }px, ${
                    Math.random() * 28 - 14
                }px)`;

        }

        if (noCount >= 3) {

            no.textContent = "Okay, I won't ask again";

            no.style.transform = "none";

        }

    };

    $("decline").onclick = () => {

        answer.textContent =
            "That's okay, Manuu. Your comfort always comes first. ♡";

        yes.disabled = true;
        no.disabled = true;

        no.style.transform = "none";

    };

    yes.onclick = () => {

        answer.textContent =
            "You just made your Dayuu the happiest. I choose you, too. ♡";

        yes.textContent = "A thousand times YES ♡";

        burst();

    };


    // =====================================
    // HEART BURST
    // =====================================

    function burst() {

        const layer = $("heartsBurst");

        for (let i = 0; i < 40; i++) {

            const h = document.createElement("span");

            h.textContent = ["♡", "♥", "✦"][i % 3];

            h.className = "burst";

            h.style.left =
                Math.random() * 100 + "%";

            h.style.setProperty(
                "--x",
                Math.random() * 220 - 110 + "px"
            );

            h.style.setProperty(
                "--y",
                -100 - Math.random() * 250 + "px"
            );

            layer.append(h);

            setTimeout(() => h.remove(), 1800);

        }

    }


    // =====================================
    // FULL SCREEN PARTY CONFETTI
    // =====================================

    function partyConfetti() {

        if (reduced) return;

        const canvas = document.createElement("canvas");

        canvas.style.position = "fixed";
        canvas.style.inset = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "999999";

        document.body.appendChild(canvas);

        const ctx = canvas.getContext("2d");

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const colors = [
            "#ff4d88",
            "#ffcf5c",
            "#a78bfa",
            "#4dd9c0",
            "#ffffff",
            "#ff86b7",
            "#72baff"
        ];

        const particles = [];

        function resize() {

            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

        }

        window.addEventListener("resize", resize);

        // Three big party bursts
        for (let burst = 0; burst < 3; burst++) {

            const originX = width * (
                burst === 0 ? 0.2 :
                burst === 1 ? 0.5 : 0.8
            );

            const originY = height * 0.35;

            for (let i = 0; i < 100; i++) {

                const angle = Math.random() * Math.PI * 2;
                const speed = 3 + Math.random() * 9;

                particles.push({

                    x: originX,
                    y: originY,

                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 3,

                    size: 4 + Math.random() * 7,

                    color: colors[
                        Math.floor(Math.random() * colors.length)
                    ],

                    rotation: Math.random() * 6,
                    spin: Math.random() * 0.2 - 0.1,

                    life: 1

                });

            }

        }

        let start = null;

        function animate(timestamp) {

            if (!start) start = timestamp;

            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {

                p.x += p.vx;
                p.y += p.vy;

                p.vy += 0.12;
                p.vx *= 0.995;

                p.rotation += p.spin;
                p.life -= 0.004;

                ctx.save();

                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);

                ctx.globalAlpha = Math.max(0, p.life);

                ctx.fillStyle = p.color;

                ctx.fillRect(
                    -p.size / 2,
                    -p.size / 2,
                    p.size,
                    p.size * 0.65
                );

                ctx.restore();

            });

            const alive = particles.some(p => p.life > 0);

            if (alive && timestamp - start < 6500) {

                requestAnimationFrame(animate);

            } else {

                window.removeEventListener("resize", resize);
                canvas.remove();

            }

        }

        requestAnimationFrame(animate);

    }


    // =====================================
    // BIRTHDAY UNLOCK CELEBRATION
    // =====================================

    window.addEventListener("manuu:unlocked", async () => {

        document.body.classList.add("unlocked");

        // Hearts
        burst();

        // Big party confetti
        partyConfetti();

        // Attempt automatic music playback
        try {

            audio.volume = 1;

            await audio.play();

            $("songStatus").textContent =
                "Happy Birthday, Manuu! Our song is playing ♡";

        } catch (error) {

            // Browser may block automatic playback
            $("songStatus").textContent =
                "Happy Birthday, Manuu! Tap Play for our song ♡";

            play.textContent = "▶";

        }

    });

})();