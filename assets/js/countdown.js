/* Password gate, birthday countdown and unlock */
"use strict";

(() => {
    const c = window.MANUU_CONFIG || {};

    const pw = String(c.password || "manuu").trim().toLowerCase();
    const date = new Date(
        c.revealAt || "2026-11-18T00:00:00+05:30"
    ).getTime();

    const gate = document.getElementById("passwordScreen");
    const count = document.getElementById("countdownScreen");
    const site = document.getElementById("birthdaySite");

    const form = document.getElementById("passwordForm");
    const input = document.getElementById("passwordInput");
    const err = document.getElementById("passwordError");
    const toggle = document.getElementById("togglePassword");

    const t = {
        d: document.getElementById("days"),
        h: document.getElementById("hours"),
        m: document.getElementById("minutes"),
        s: document.getElementById("seconds")
    };

    let timer = null;
    let unlocked = false;

    function show(screen) {
        [gate, count, site].forEach(x => {
            x.classList.add("hidden");
        });

        screen.classList.remove("hidden");
        screen.classList.add("enter");
    }

    function unlock() {
        if (unlocked) return;

        unlocked = true;

        if (timer) {
            clearInterval(timer);
        }

        // Reveal birthday website
        show(site);

        document.title = "Happy Birthday, Manuu ♡";

        // Trigger birthday celebration
        window.dispatchEvent(
            new CustomEvent("manuu:unlocked")
        );
    }

    function tick() {
        const ms = date - Date.now();

        if (ms <= 0) {
            unlock();
            return;
        }

        const n = Math.floor(ms / 1000);

        t.d.textContent = String(
            Math.floor(n / 86400)
        ).padStart(2, "0");

        t.h.textContent = String(
            Math.floor(n % 86400 / 3600)
        ).padStart(2, "0");

        t.m.textContent = String(
            Math.floor(n % 3600 / 60)
        ).padStart(2, "0");

        t.s.textContent = String(
            n % 60
        ).padStart(2, "0");
    }

    form.addEventListener("submit", e => {
        e.preventDefault();

        if (input.value.trim().toLowerCase() !== pw) {
            err.textContent =
                "Not quite, baby. Try our little secret again ♡";

            input.value = "";
            input.focus();
            return;
        }

        err.textContent = "";
        input.value = "";

        // Preview mode for testing
        if (
            new URLSearchParams(location.search).get("preview") === "1"
            || Date.now() >= date
        ) {
            unlock();
            return;
        }

        show(count);

        tick();

        if (!timer) {
            timer = setInterval(tick, 1000);
        }
    });

    toggle.addEventListener("click", () => {
        const isText = input.type === "text";

        input.type = isText ? "password" : "text";
        toggle.textContent = isText ? "♡" : "♥" ;

        toggle.setAttribute(
            "aria-label",
            isText ? "Show password" : "Hide password"
        );
    });

    show(gate);

})();