// Light/dark toggle, same behavior as the league sites: follows the system
// until the visitor picks, then remembers the choice in this browser.
(function () {
  var root = document.documentElement, key = "portfolio-theme";
  try { var saved = localStorage.getItem(key); if (saved) root.dataset.theme = saved; } catch (e) {}
  // Other open tabs of these pages follow a switch made in any one of them.
  window.addEventListener("storage", function (e) {
    if (e.key !== key) return;
    if (e.newValue) root.dataset.theme = e.newValue; else delete root.dataset.theme;
  });
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
      root.dataset.theme = dark ? "light" : "dark";
      try { localStorage.setItem(key, root.dataset.theme); } catch (e) {}
    });
  });
})();
