// Section tabs: one section shows at a time; the address (#overview, #results...)
// keeps the current tab, so shared links and the back button work. Section elements are
// id="v-<name>" so the browser never jumps to them on its own.
document.documentElement.classList.add("js");
document.addEventListener("DOMContentLoaded", function () {
  var views = Array.prototype.slice.call(document.querySelectorAll(".view"));
  var links = Array.prototype.slice.call(document.querySelectorAll(".sections a"));
  var bar = document.querySelector(".sections");
  if (!views.length || !bar) return;
  function show(id, jump) {
    var v = views.filter(function (x) { return x.id === "v-" + id; })[0] || views[0];
    views.forEach(function (x) { x.classList.toggle("on", x === v); });
    links.forEach(function (a) {
      if (a.getAttribute("href") === "#" + v.id.slice(2)) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
    if (jump) {
      // Start the section just under the tabs; never scroll down past where the reader is.
      var top = v.getBoundingClientRect().top + window.scrollY - bar.offsetHeight - 53 - 8;
      window.scrollTo(0, Math.max(0, Math.min(window.scrollY, top)));
    }
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('.sections a, .view-next a[href^="#"]');
    if (!a) return;
    e.preventDefault();
    var id = a.getAttribute("href").slice(1);
    if (location.hash !== "#" + id) history.pushState(null, "", "#" + id);
    show(id, true);
  });
  window.addEventListener("popstate", function () { show(location.hash.slice(1), true); });
  show(location.hash.slice(1), false);
});
