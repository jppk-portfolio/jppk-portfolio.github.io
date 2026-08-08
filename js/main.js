/* ============================================================
   J.P. Park — portfolio
   The only interactive state on the site is the theme.
   (The initial theme is applied by the inline script in <head>
   so it is set before first paint; this file only handles the
   toggle button.)
   ============================================================ */

(() => {
  "use strict";

  const KEY = "jpp-theme";
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  function paint(theme) {
    const dark = theme === "dark";
    btn.textContent = dark ? "☀" : "☾";           // ☀ / ☾
    const label = dark ? "Switch to light theme" : "Switch to dark theme";
    btn.setAttribute("aria-label", label);
    btn.title = label;
  }

  function apply(theme) {
    root.setAttribute("data-th", theme);
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    paint(theme);
  }

  paint(root.getAttribute("data-th") === "dark" ? "dark" : "light");

  btn.addEventListener("click", () => {
    apply(root.getAttribute("data-th") === "dark" ? "light" : "dark");
  });
})();
