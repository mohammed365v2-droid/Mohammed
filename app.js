/* ModHaven — catalog data + client-side search, filter, sort */

var CATS = {
  Tech:        'var(--cat-tech)',
  Mobs:        'var(--cat-mobs)',
  Adventure:   'var(--cat-adv)',
  Magic:       'var(--cat-magic)',
  Performance: 'var(--cat-perf)',
  Utility:     'var(--cat-util)'
};

var MODS = [
  { n: "Sodium", a: "jellysquid3", c: "Performance",
    d: "A modern rendering engine that dramatically improves frame rates and reduces micro-stutter without changing how the game looks.",
    v: ["1.21","1.20","1.19"], dl: 48200000, rt: 4.9, up: 9 },
  { n: "Create", a: "simibubi", c: "Tech",
    d: "A mod about rotational power, contraptions and automation — build moving machines, trains and factories with mechanical flair.",
    v: ["1.21","1.20","1.18"], dl: 31900000, rt: 4.9, up: 21 },
  { n: "Just Enough Items (JEI)", a: "mezz", c: "Utility",
    d: "View items and recipes for everything in your modpack, with fast search and bookmarking built in.",
    v: ["1.21","1.20","1.19","1.12"], dl: 29600000, rt: 4.8, up: 6 },
  { n: "Biomes O' Plenty", a: "Forstride", c: "Adventure",
    d: "Adds over 50 gorgeous new biomes to the overworld, Nether and End, with custom trees, plants and building blocks.",
    v: ["1.21","1.20"], dl: 24300000, rt: 4.7, up: 14 },
  { n: "Twilight Forest", a: "Benimatic", c: "Adventure",
    d: "An endless twilight dimension of dungeons, bosses and treasure — one of Minecraft's oldest and biggest adventure mods.",
    v: ["1.20","1.19","1.12"], dl: 19800000, rt: 4.8, up: 45 },
  { n: "Iris Shaders", a: "coderbot", c: "Performance",
    d: "A modern shaders mod built to work with Sodium, bringing OptiFine-style shader support with far better performance.",
    v: ["1.21","1.20"], dl: 17500000, rt: 4.8, up: 4 },
  { n: "Applied Energistics 2", a: "AlgorithmX2", c: "Tech",
    d: "Digitize your storage: compact ME networks, autocrafting and channel-based energy systems for serious bases.",
    v: ["1.20","1.19","1.12"], dl: 15200000, rt: 4.7, up: 30 },
  { n: "Botania", a: "Vazkii", c: "Magic",
    d: "Natural magic through flowers and mana. Automation-friendly, fully documented, and powered by in-world systems rather than GUIs.",
    v: ["1.20","1.19"], dl: 12900000, rt: 4.8, up: 60 },
  { n: "Lithium", a: "jellysquid3", c: "Performance",
    d: "Optimizes server-side physics, mob AI and chunk handling — big tick-rate gains for both singleplayer and servers.",
    v: ["1.21","1.20"], dl: 9800000, rt: 4.8, up: 11 },
  { n: "Alex's Mobs", a: "sbom_xela", c: "Mobs",
    d: "90+ beautifully animated real and fantastical creatures, each with unique drops, behaviors and interactions with the world.",
    v: ["1.20","1.19","1.18"], dl: 8700000, rt: 4.7, up: 80 },
  { n: "Farmer's Delight", a: "vectorwing", c: "Utility",
    d: "A gentle expansion of farming and cooking: new crops, meals, kitchen tools and a cozy rural aesthetic.",
    v: ["1.21","1.20","1.19","1.18"], dl: 8400000, rt: 4.9, up: 3 },
  { n: "Ars Nouveau", a: "baileyholl", c: "Magic",
    d: "Craft custom spells from glyphs, summon familiars and automate magic — a friendly entry point into spellcasting mods.",
    v: ["1.21","1.20"], dl: 6100000, rt: 4.7, up: 18 }
];

var state = { q: "", cat: "All", ver: "", sort: "dl" };

var ICON_DL = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.90002C12.4971 2.90002 12.9 3.30297 12.9 3.80002V12.2939L15.8081 9.38585C16.1595 9.03438 16.7294 9.03438 17.0808 9.38585C17.4323 9.73732 17.4323 10.3072 17.0808 10.6586L12.6364 15.1031C12.4676 15.2719 12.2387 15.3667 12 15.3667C11.7613 15.3667 11.5324 15.2719 11.3636 15.1031L6.91917 10.6586C6.5677 10.3072 6.5677 9.73732 6.91917 9.38585C7.27064 9.03438 7.84049 9.03438 8.19196 9.38585L11.1 12.2939V3.80002C11.1 3.30297 11.503 2.90002 12 2.90002ZM4.00001 13.5874C4.49706 13.5874 4.90001 13.9903 4.90001 14.4874V18.043C4.90001 18.2758 4.99249 18.499 5.1571 18.6636C5.32172 18.8282 5.54498 18.9207 5.77778 18.9207H18.2222C18.455 18.9207 18.6783 18.8283 18.8429 18.6636C19.0075 18.499 19.1 18.2758 19.1 18.043V14.4874C19.1 13.9903 19.5029 13.5874 20 13.5874C20.4971 13.5874 20.9 13.9903 20.9 14.4874V18.043C20.9 18.7531 20.6179 19.4342 20.1157 19.9364C19.6135 20.4386 18.9324 20.7207 18.2222 20.7207H5.77778C5.06759 20.7207 4.38649 20.4386 3.88431 19.9364C3.38213 19.4342 3.10001 18.7531 3.10001 18.043V14.4874C3.10001 13.9903 3.50295 13.5874 4.00001 13.5874Z" fill="currentColor"/></svg>';
var ICON_LIKE = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M11.8008 2.20386C11.8418 2.20504 11.8761 2.20679 11.9004 2.20679C12.9196 2.20697 14.0714 2.95768 14.6924 4.17847C15.3083 5.25838 15.3183 6.6302 15.0029 8.06226H18.0244C20.3536 8.06238 22.3556 10.0885 21.6377 12.4167L19.7588 18.5105C19.286 20.0439 17.7636 21.0064 16.1455 21.0066H8.86621C7.29432 21.0066 6.01953 19.7318 6.01953 18.1599V9.61792C6.01953 8.75706 6.59143 8.12094 7.18652 7.81421C7.74138 7.52813 8.27631 7.03526 8.55762 6.28882C8.7423 5.79875 8.81718 5.36749 8.89551 4.91284C8.90613 4.85121 8.91669 4.78901 8.92773 4.72632C9.01218 4.24725 9.13189 3.60409 9.57715 3.073C9.98574 2.58579 10.4533 2.34616 10.9248 2.25269C11.2492 2.18839 11.6072 2.19827 11.8008 2.20386ZM3.90039 8.70679C4.39721 8.707 4.79972 9.10935 4.7998 9.6062V19.6062C4.7998 20.1031 4.39727 20.5064 3.90039 20.5066C3.40333 20.5066 3 20.1033 3 19.6062V9.6062C3.00009 9.10922 3.40339 8.70679 3.90039 8.70679ZM11.5127 3.99976C11.4072 4.00007 11.3335 4.0066 11.2744 4.01831C11.1904 4.03501 11.0911 4.0682 10.9561 4.22925C10.8577 4.34667 10.79 4.52909 10.7002 5.03882C10.6906 5.093 10.6811 5.15005 10.6709 5.20972C10.5941 5.66065 10.4914 6.26229 10.2422 6.92358C9.77757 8.15644 8.89074 8.9602 8.01074 9.41382C7.93454 9.45309 7.88026 9.5043 7.84961 9.54761C7.82127 9.58767 7.81934 9.6106 7.81934 9.61792V18.1599C7.81934 18.7377 8.28844 19.2068 8.86621 19.2068H16.1455C17.1015 19.2066 17.8346 18.6435 18.0391 17.9802L19.918 11.8865C20.1905 11.0025 19.4593 9.86217 18.0244 9.86206H13.8223C13.5343 9.86197 13.264 9.72391 13.0947 9.49097C12.9254 9.25776 12.8776 8.95738 12.9668 8.68335C13.5367 6.93328 13.5148 5.73387 13.1221 5.05835C13.1126 5.04208 13.1031 5.02537 13.0947 5.00854C12.7129 4.24514 12.1035 4.00689 11.9004 4.00659C11.8294 4.00659 11.7579 4.00414 11.6982 4.00269H11.6865C11.6208 4.00109 11.5658 3.9996 11.5127 3.99976Z" fill="currentColor"/></svg>';

function fmt(x) {
  return x >= 1e6 ? (x / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
       : x >= 1e3 ? Math.round(x / 1e3) + "K"
       : String(x);
}
function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
function catCount(c) { return c === "All" ? MODS.length : MODS.filter(function (m) { return m.c === c; }).length; }

/* ---------- Build category filters ---------- */
var chipsEl = document.getElementById("chips");
var catListEl = document.getElementById("catList");

["All"].concat(Object.keys(CATS)).forEach(function (c) {
  var b = document.createElement("button");
  b.className = "chip";
  b.textContent = c;
  b.setAttribute("role", "tab");
  b.onclick = function () { state.cat = c; syncUI(); render(); };
  chipsEl.appendChild(b);

  var l = document.createElement("button");
  l.className = "cat";
  l.innerHTML =
    '<span class="dot" style="background:' + (c === "All" ? "var(--text)" : CATS[c]) + '"></span>' +
    esc(c) +
    '<span class="n">' + catCount(c) + "</span>";
  l.onclick = function () { state.cat = c; syncUI(); render(); };
  catListEl.appendChild(l);
});

function syncUI() {
  Array.prototype.forEach.call(chipsEl.children, function (b) {
    b.classList.toggle("on", b.textContent === state.cat);
  });
  Array.prototype.forEach.call(catListEl.children, function (b) {
    b.classList.toggle("on", b.childNodes[1].textContent === state.cat);
  });
}

/* ---------- Wire up controls ---------- */
document.getElementById("q").addEventListener("input", function (e) {
  state.q = e.target.value.toLowerCase();
  render();
});
document.getElementById("ver").addEventListener("change", function (e) {
  state.ver = e.target.value;
  render();
});
document.getElementById("sort").addEventListener("change", function (e) {
  state.sort = e.target.value;
  render();
});

/* ---------- Render ---------- */
var grid = document.getElementById("grid");

function render() {
  var list = MODS.filter(function (m) {
    if (state.cat !== "All" && m.c !== state.cat) return false;
    if (state.ver && m.v.indexOf(state.ver) < 0) return false;
    if (state.q && (m.n + " " + m.a + " " + m.d).toLowerCase().indexOf(state.q) < 0) return false;
    return true;
  });
  list.sort(function (a, b) {
    return state.sort === "dl" ? b.dl - a.dl
         : state.sort === "rt" ? b.rt - a.rt
         : b.up - a.up;
  });

  document.getElementById("n").textContent = list.length;
  grid.innerHTML = "";

  if (!list.length) {
    grid.innerHTML = '<div class="empty">No mods match your search. Try a different keyword or clear the filters.</div>';
    return;
  }

  list.forEach(function (m, i) {
    var col = CATS[m.c];
    var card = document.createElement("article");
    card.className = "card";
    card.innerHTML =
      '<div class="card-head">' +
        '<div class="card-icon" style="background:' + col + '1f;color:' + col + '">' + esc(m.n[0]) + "</div>" +
        "<div><div class="card-name">" + esc(m.n) + '</div><div class="card-author">by ' + esc(m.a) + "</div></div>" +
      "</div>" +
      '<div class="card-desc">' + esc(m.d) + "</div>" +
      '<div class="card-tags">' +
        '<span class="tag tag-cat" style="background:' + col + "1f;color:" + col + '">' + esc(m.c) + "</span>" +
        m.v.map(function (v) { return '<span class="tag">' + esc(v) + "</span>"; }).join("") +
      "</div>" +
      '<div class="card-meta">' +
        "<span>" + ICON_DL + fmt(m.dl) + "</span>" +
        "<span>" + ICON_LIKE + m.rt.toFixed(1) + "</span>" +
        "<span>updated " + m.up + "d ago</span>" +
      "</div>";
    grid.appendChild(card);

    if (i === 3) {
      var ad = document.createElement("div");
      ad.className = "ad-slot ad-card";
      ad.setAttribute("data-ad", "infeed-300x250");
      ad.innerHTML = "<b>Advertisement</b><span>In-feed &middot; 300 &times; 250</span>";
      grid.appendChild(ad);
    }
  });
}

syncUI();
render();
