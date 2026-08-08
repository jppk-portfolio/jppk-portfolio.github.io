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

/* ------------------------------------------------------------
   Email links.

   The address is split across data-u / data-d and joined here, so it never
   appears in the served HTML — that defeats the bulk harvesters that regex
   raw markup, which is the great majority of them. It is obfuscation, not
   security: anything that executes JavaScript still sees the address.

   Links carry an #contact fallback href, so with JS disabled they go to the
   contact panel, where the address stays readable in its (at)/(dot) form.
   ------------------------------------------------------------ */

(() => {
  "use strict";

  document.querySelectorAll("a.mail[data-u][data-d]").forEach((a) => {
    const address = a.dataset.u + "@" + a.dataset.d;
    a.href = "mailto:" + address;
    if (a.hasAttribute("data-show")) a.textContent = address;
  });
})();
