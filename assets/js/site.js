(function () {
  "use strict";

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  });

  /* ---- Video ---- */
  var V = window.VIDEO || {};
  var shell = document.getElementById("video-shell");
  var vlinks = document.getElementById("video-links");
  var title = V.title || "Memorial slideshow";
  var embed = null;

  if (V.youtubeId) {
    embed = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(V.youtubeId) +
      '?rel=0&modestbranding=1" title="' + title + '" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  } else if (V.vimeoId) {
    embed = '<iframe src="https://player.vimeo.com/video/' + encodeURIComponent(V.vimeoId) +
      '?dnt=1" title="' + title + '" allow="fullscreen; picture-in-picture" allowfullscreen></iframe>';
  } else if (V.src) {
    embed = '<video controls preload="metadata" playsinline' + (V.poster ? ' poster="' + V.poster + '"' : "") + '>' +
      '<source src="' + V.src + '" type="video/mp4">Your browser can’t play this video. ' +
      '<a href="' + V.src + '">Download it instead.</a></video>';
  }
  if (embed) shell.innerHTML = embed;
  if (V.downloadUrl) {
    vlinks.innerHTML = '<a class="btn ghost" href="' + V.downloadUrl + '">Download the full-quality slideshow</a>';
  }

  /* ---- Mark past services ---- */
  var now = Date.now();
  document.querySelectorAll(".service[data-date]").forEach(function (el) {
    if (Date.parse(el.dataset.date) < now) el.classList.add("past");
  });

  /* ---- Gallery + lightbox ---- */
  var items = window.GALLERY || [];
  var gallery = document.getElementById("gallery");
  items.forEach(function (it, i) {
    var b = document.createElement("button");
    b.className = "thumb";
    b.setAttribute("aria-label", "View " + (it.caption || "image " + (i + 1)));
    b.innerHTML = '<img loading="lazy" src="' + it.src + '" alt="">' +
      (it.caption ? '<span>' + it.caption + '</span>' : "");
    b.addEventListener("click", function () { openLb(i); });
    gallery.appendChild(b);
  });

  var lb = document.getElementById("lightbox");
  var lbImg = lb.querySelector("img");
  var lbCap = lb.querySelector("figcaption");
  var lbDl = lb.querySelector(".lb-download");
  var cur = 0;

  function show(i) {
    cur = (i + items.length) % items.length;
    var it = items[cur];
    lbImg.src = it.src;
    lbImg.alt = it.caption || "";
    lbCap.textContent = it.caption || "";
    lbDl.href = it.src;
  }
  function openLb(i) {
    show(i);
    if (lb.showModal) lb.showModal(); else lb.setAttribute("open", "");
  }
  var multi = items.length > 1;
  lb.querySelector(".lb-prev").hidden = !multi;
  lb.querySelector(".lb-next").hidden = !multi;
  lb.querySelector(".lb-close").addEventListener("click", function () { lb.close(); });
  lb.querySelector(".lb-prev").addEventListener("click", function () { show(cur - 1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { show(cur + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
})();
