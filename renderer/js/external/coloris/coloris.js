/*!
 * Copyright (c) 2021 Momo Bassit.
 * Licensed under the MIT License (MIT)
 * https://github.com/mdbassit/Coloris
 */
! function(u, d, s) {
  var p, f, h, b, i, v, y, c, g, m, l, w, k, L, E, a, r = d.createElement("canvas").getContext("2d"),
    x = {
      r: 0,
      g: 0,
      b: 0,
      h: 0,
      s: 0,
      v: 0,
      a: 1
    },
    A = {
      el: "[data-coloris]",
      parent: "body",
      theme: "default",
      themeMode: "light",
      rtl: !1,
      wrap: !0,
      margin: 2,
      format: "hex",
      formatToggle: !1,
      swatches: [],
      swatchesOnly: !1,
      alpha: !0,
      forceAlpha: !1,
      focusInput: !0,
      selectInput: !1,
      inline: !1,
      defaultColor: "#000000",
      clearButton: !1,
      clearLabel: "Clear",
      closeButton: !1,
      closeLabel: "Close",
      onChange: function() {},
      a11y: {
        open: "Open color picker",
        close: "Close color picker",
        clear: "Clear the selected color",
        marker: "Saturation: {s}. Brightness: {v}.",
        hueSlider: "Hue slider",
        alphaSlider: "Opacity slider",
        input: "Color value field",
        format: "Color format",
        swatch: "Color swatch",
        instruction: "Saturation and brightness selector. Use up, down, left and right arrow keys to select."
      }
    },
    n = {},
    o = "",
    S = {},
    C = !1;

  function T(e) {
    if ("object" == typeof e)
      for (var t in e) switch (t) {
        case "el":
          O(e.el), !1 !== e.wrap && I(e.el);
          break;
        case "parent":
          (p = d.querySelector(e.parent)) && (p.appendChild(f), A.parent = e.parent, p === d.body && (p = null));
          break;
        case "themeMode":
          A.themeMode = e.themeMode, "auto" === e.themeMode && u.matchMedia && u.matchMedia("(prefers-color-scheme: dark)").matches && (A.themeMode = "dark");
        case "theme":
          e.theme && (A.theme = e.theme), f.className = "clr-picker clr-" + A.theme + " clr-" + A.themeMode, A.inline && N();
          break;
        case "rtl":
          A.rtl = !!e.rtl, d.querySelectorAll(".clr-field").forEach(function(e) {
            return e.classList.toggle("clr-rtl", A.rtl)
          });
          break;
        case "margin":
          e.margin *= 1, A.margin = (isNaN(e.margin) ? A : e).margin;
          break;
        case "wrap":
          e.el && e.wrap && I(e.el);
          break;
        case "formatToggle":
          A.formatToggle = !!e.formatToggle, G("clr-format").style.display = A.formatToggle ? "block" : "none", A.formatToggle && (A.format = "auto");
          break;
        case "swatches":
          Array.isArray(e.swatches) && function() {
            var a = [];
            e.swatches.forEach(function(e, t) {
              a.push('<button type="button" id="clr-swatch-' + t + '" aria-labelledby="clr-swatch-label clr-swatch-' + t + '" style="color: ' + e + ';">' + e + "</button>")
            }), G("clr-swatches").innerHTML = a.length ? "<div>" + a.join("") + "</div>" : "", A.swatches = e.swatches.slice()
          }();
          break;
        case "swatchesOnly":
          A.swatchesOnly = !!e.swatchesOnly, f.setAttribute("data-minimal", A.swatchesOnly);
          break;
        case "alpha":
          A.alpha = !!e.alpha, f.setAttribute("data-alpha", A.alpha);
          break;
        case "inline":
          A.inline = !!e.inline, f.setAttribute("data-inline", A.inline), A.inline && (l = e.defaultColor || A.defaultColor, E = F(l), N(), j(l));
          break;
        case "clearButton":
          "object" == typeof e.clearButton && (e.clearButton.label && (A.clearLabel = e.clearButton.label, c.innerHTML = A.clearLabel), e.clearButton = e.clearButton.show), A.clearButton = !!e.clearButton, c.style.display = A.clearButton ? "block" : "none";
          break;
        case "clearLabel":
          A.clearLabel = e.clearLabel, c.innerHTML = A.clearLabel;
          break;
        case "closeButton":
          A.closeButton = !!e.closeButton, A.closeButton ? f.insertBefore(g, v) : v.appendChild(g);
          break;
        case "closeLabel":
          A.closeLabel = e.closeLabel, g.innerHTML = A.closeLabel;
          break;
        case "a11y":
          var a, l, r = e.a11y,
            n = !1;
          if ("object" == typeof r)
            for (var o in r) r[o] && A.a11y[o] && (A.a11y[o] = r[o], n = !0);
          n && (a = G("clr-open-label"), l = G("clr-swatch-label"), a.innerHTML = A.a11y.open, l.innerHTML = A.a11y.swatch, g.setAttribute("aria-label", A.a11y.close), c.setAttribute("aria-label", A.a11y.clear), m.setAttribute("aria-label", A.a11y.hueSlider), w.setAttribute("aria-label", A.a11y.alphaSlider), y.setAttribute("aria-label", A.a11y.input), h.setAttribute("aria-label", A.a11y.instruction));
          break;
        default:
          A[t] = e[t]
      }
  }

  function B(e, t) {
    "string" == typeof e && "object" == typeof t && (n[e] = t, C = !0)
  }

  function M(e) {
    delete n[e], 0 === Object.keys(n).length && (C = !1, e === o && H())
  }

  function t(l) {
    if (C) {
      var e, r = ["el", "wrap", "rtl", "inline", "defaultColor", "a11y"];
      for (e in n)
        if ("break" === function(e) {
            var t = n[e];
            if (l.matches(e)) {
              for (var a in o = e, S = {}, r.forEach(function(e) {
                  return delete t[e]
                }), t) S[a] = Array.isArray(A[a]) ? A[a].slice() : A[a];
              return T(t), "break"
            }
          }(e)) break
    }
  }

  function H() {
    0 < Object.keys(S).length && (T(S), o = "", S = {})
  }

  function O(e) {
    $(d, "click", e, function(e) {
      A.inline || (t(e.target), L = e.target, a = L.value, E = F(a), f.classList.add("clr-open"), N(), j(a), (A.focusInput || A.selectInput) && y.focus({
        preventScroll: !0
      }), A.selectInput && y.select(), L.dispatchEvent(new Event("open", {
        bubbles: !0
      })))
    }), $(d, "input", e, function(e) {
      var t = e.target.parentNode;
      t.classList.contains("clr-field") && (t.style.color = e.target.value)
    })
  }

  function N() {
    var e, t, a, l, r = p,
      n = u.scrollY,
      o = f.offsetWidth,
      c = f.offsetHeight,
      i = {
        left: !1,
        top: !1
      },
      s = {
        x: 0,
        y: 0
      };
    r && (a = u.getComputedStyle(r), e = parseFloat(a.marginTop), l = parseFloat(a.borderTopWidth), (s = r.getBoundingClientRect()).y += l + n), A.inline || (a = (t = L.getBoundingClientRect()).x, l = n + t.y + t.height + A.margin, r ? (a -= s.x, l -= s.y, a + o > r.clientWidth && (a += t.width - o, i.left = !0), l + c > r.clientHeight - e && c + A.margin <= t.top - (s.y - n) && (l -= t.height + c + 2 * A.margin, i.top = !0), l += r.scrollTop) : (a + o > d.documentElement.clientWidth && (a += t.width - o, i.left = !0), l + c - n > d.documentElement.clientHeight && c + A.margin <= t.top && (l = n + t.y - c - A.margin, i.top = !0)), f.classList.toggle("clr-left", i.left), f.classList.toggle("clr-top", i.top), f.style.left = a + "px", f.style.top = l + "px", s.x += f.offsetLeft, s.y += f.offsetTop), b = {
      width: h.offsetWidth,
      height: h.offsetHeight,
      x: h.offsetLeft + s.x,
      y: h.offsetTop + s.y
    }
  }

  function I(e) {
    d.querySelectorAll(e).forEach(function(e) {
      var t, a, l = e.parentNode;
      l.classList.contains("clr-field") || (t = d.createElement("div"), a = "clr-field", (A.rtl || e.classList.contains("clr-rtl")) && (a += " clr-rtl"), t.innerHTML = '<button type="button" aria-labelledby="clr-open-label"></button>', l.insertBefore(t, e), t.setAttribute("class", a), t.style.color = e.value, t.appendChild(e))
    })
  }

  function D(e) {
    var t;
    L && !A.inline && (t = L, e && (L = null, a !== t.value && (t.value = a, t.dispatchEvent(new Event("input", {
      bubbles: !0
    })))), setTimeout(function() {
      a !== t.value && t.dispatchEvent(new Event("change", {
        bubbles: !0
      }))
    }), f.classList.remove("clr-open"), C && H(), t.dispatchEvent(new Event("close", {
      bubbles: !0
    })), A.focusInput && t.focus({
      preventScroll: !0
    }), L = null)
  }

  function j(e) {
    var t = function(e) {
        var t;
        r.fillStyle = "#000", r.fillStyle = e, (e = /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i.exec(r.fillStyle)) ? (t = {
          r: +e[3],
          g: +e[4],
          b: +e[5],
          a: +e[6]
        }).a = +t.a.toFixed(2) : (e = r.fillStyle.replace("#", "").match(/.{2}/g).map(function(e) {
          return parseInt(e, 16)
        }), t = {
          r: e[0],
          g: e[1],
          b: e[2],
          a: 1
        });
        return t
      }(e),
      e = function(e) {
        var t = e.r / 255,
          a = e.g / 255,
          l = e.b / 255,
          r = s.max(t, a, l),
          n = s.min(t, a, l),
          o = r - n,
          c = r,
          i = 0,
          n = 0;
        o && (r === t && (i = (a - l) / o), r === a && (i = 2 + (l - t) / o), r === l && (i = 4 + (t - a) / o), r && (n = o / r));
        return {
          h: (i = s.floor(60 * i)) < 0 ? i + 360 : i,
          s: s.round(100 * n),
          v: s.round(100 * c),
          a: e.a
        }
      }(t);
    q(e.s, e.v), U(t, e), m.value = e.h, f.style.color = "hsl(" + e.h + ", 100%, 50%)", l.style.left = e.h / 360 * 100 + "%", i.style.left = b.width * e.s / 100 + "px", i.style.top = b.height - b.height * e.v / 100 + "px", w.value = 100 * e.a, k.style.left = 100 * e.a + "%"
  }

  function F(e) {
    e = e.substring(0, 3).toLowerCase();
    return "rgb" === e || "hsl" === e ? e : "hex"
  }

  function R(e) {
    e = void 0 !== e ? e : y.value, L && (L.value = e, L.dispatchEvent(new Event("input", {
      bubbles: !0
    }))), A.onChange && A.onChange.call(u, e), d.dispatchEvent(new CustomEvent("coloris:pick", {
      detail: {
        color: e
      }
    }))
  }

  function W(e, t) {
    e = {
      h: +m.value,
      s: e / b.width * 100,
      v: 100 - t / b.height * 100,
      a: w.value / 100
    }, t = function(e) {
      var t = e.s / 100,
        a = e.v / 100,
        l = t * a,
        r = e.h / 60,
        n = l * (1 - s.abs(r % 2 - 1)),
        o = a - l;
      l += o, n += o;
      t = s.floor(r) % 6, a = [l, n, o, o, n, l][t], r = [n, l, l, n, o, o][t], t = [o, o, n, l, l, n][t];
      return {
        r: s.round(255 * a),
        g: s.round(255 * r),
        b: s.round(255 * t),
        a: e.a
      }
    }(e);
    q(e.s, e.v), U(t, e), R()
  }

  function q(e, t) {
    var a = A.a11y.marker;
    e = +e.toFixed(1), t = +t.toFixed(1), a = (a = a.replace("{s}", e)).replace("{v}", t), i.setAttribute("aria-label", a)
  }

  function Y(e) {
    var t = {
        pageX: ((a = e).changedTouches ? a.changedTouches[0] : a).pageX,
        pageY: (a.changedTouches ? a.changedTouches[0] : a).pageY
      },
      a = t.pageX - b.x,
      t = t.pageY - b.y;
    p && (t += p.scrollTop), P(a, t), e.preventDefault(), e.stopPropagation()
  }

  function P(e, t) {
    e = e < 0 ? 0 : e > b.width ? b.width : e, t = t < 0 ? 0 : t > b.height ? b.height : t, i.style.left = e + "px", i.style.top = t + "px", W(e, t), i.focus()
  }

  function U(e, t) {
    void 0 === t && (t = {});
    var a, l, r = A.format;
    for (a in e = void 0 === e ? {} : e) x[a] = e[a];
    for (l in t) x[l] = t[l];
    var n, o = function(e) {
        var t = e.r.toString(16),
          a = e.g.toString(16),
          l = e.b.toString(16),
          r = "";
        e.r < 16 && (t = "0" + t);
        e.g < 16 && (a = "0" + a);
        e.b < 16 && (l = "0" + l);
        A.alpha && (e.a < 1 || A.forceAlpha) && (e = 255 * e.a | 0, r = e.toString(16), e < 16 && (r = "0" + r));
        return "#" + t + a + l + r
      }(x),
      c = o.substring(0, 7);
    switch (i.style.color = c, k.parentNode.style.color = c, k.style.color = o, v.style.color = o, h.style.display = "none", h.offsetHeight, h.style.display = "", k.nextElementSibling.style.display = "none", k.nextElementSibling.offsetHeight, k.nextElementSibling.style.display = "", "mixed" === r ? r = 1 === x.a ? "hex" : "rgb" : "auto" === r && (r = E), r) {
      case "hex":
        y.value = o;
        break;
      case "rgb":
        y.value = (n = x, !A.alpha || 1 === n.a && !A.forceAlpha ? "rgb(" + n.r + ", " + n.g + ", " + n.b + ")" : "rgba(" + n.r + ", " + n.g + ", " + n.b + ", " + n.a + ")");
        break;
      case "hsl":
        y.value = (n = function(e) {
          var t, a = e.v / 100,
            l = a * (1 - e.s / 100 / 2);
          0 < l && l < 1 && (t = s.round((a - l) / s.min(l, 1 - l) * 100));
          return {
            h: e.h,
            s: t || 0,
            l: s.round(100 * l),
            a: e.a
          }
        }(x), !A.alpha || 1 === n.a && !A.forceAlpha ? "hsl(" + n.h + ", " + n.s + "%, " + n.l + "%)" : "hsla(" + n.h + ", " + n.s + "%, " + n.l + "%, " + n.a + ")")
    }
    d.querySelector('.clr-format [value="' + r + '"]').checked = !0
  }

  function e() {
    var e = +m.value,
      t = +i.style.left.replace("px", ""),
      a = +i.style.top.replace("px", "");
    f.style.color = "hsl(" + e + ", 100%, 50%)", l.style.left = e / 360 * 100 + "%", W(t, a)
  }

  function X() {
    var e = w.value / 100;
    k.style.left = 100 * e + "%", U({
      a: e
    }), R()
  }

  function G(e) {
    return d.getElementById(e)
  }

  function $(e, t, a, l) {
    var r = Element.prototype.matches || Element.prototype.msMatchesSelector;
    "string" == typeof a ? e.addEventListener(t, function(e) {
      r.call(e.target, a) && l.call(e.target, e)
    }) : (l = a, e.addEventListener(t, l))
  }

  function z(e, t) {
    t = void 0 !== t ? t : [], "loading" !== d.readyState ? e.apply(void 0, t) : d.addEventListener("DOMContentLoaded", function() {
      e.apply(void 0, t)
    })
  }
  void 0 !== NodeList && NodeList.prototype && !NodeList.prototype.forEach && (NodeList.prototype.forEach = Array.prototype.forEach), u.Coloris = function() {
    var r = {
      set: T,
      wrap: I,
      close: D,
      setInstance: B,
      removeInstance: M,
      updatePosition: N
    };

    function e(e) {
      z(function() {
        e && ("string" == typeof e ? O : T)(e)
      })
    }
    for (var t in r) ! function(l) {
      e[l] = function() {
        for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
        z(r[l], t)
      }
    }(t);
    return e
  }(), z(function() {
    p = null, (f = d.createElement("div")).setAttribute("id", "clr-picker"), f.className = "clr-picker", f.innerHTML = '<input id="clr-color-value" name="clr-color-value" class="clr-color" type="text" value="" spellcheck="false" aria-label="' + A.a11y.input + '"><div id="clr-color-area" class="clr-gradient" role="application" aria-label="' + A.a11y.instruction + '"><div id="clr-color-marker" class="clr-marker" tabindex="0"></div></div><div class="clr-hue"><input id="clr-hue-slider" name="clr-hue-slider" type="range" min="0" max="360" step="1" aria-label="' + A.a11y.hueSlider + '"><div id="clr-hue-marker"></div></div><div class="clr-alpha"><input id="clr-alpha-slider" name="clr-alpha-slider" type="range" min="0" max="100" step="1" aria-label="' + A.a11y.alphaSlider + '"><div id="clr-alpha-marker"></div><span></span></div><div id="clr-format" class="clr-format"><fieldset class="clr-segmented"><legend>' + A.a11y.format + '</legend><input id="clr-f1" type="radio" name="clr-format" value="hex"><label for="clr-f1">Hex</label><input id="clr-f2" type="radio" name="clr-format" value="rgb"><label for="clr-f2">RGB</label><input id="clr-f3" type="radio" name="clr-format" value="hsl"><label for="clr-f3">HSL</label><span></span></fieldset></div><div id="clr-swatches" class="clr-swatches"></div><button type="button" id="clr-clear" class="clr-clear" aria-label="' + A.a11y.clear + '">' + A.clearLabel + '</button><div id="clr-color-preview" class="clr-preview"><button type="button" id="clr-close" class="clr-close" aria-label="' + A.a11y.close + '">' + A.closeLabel + '</button></div><span id="clr-open-label" hidden>' + A.a11y.open + '</span><span id="clr-swatch-label" hidden>' + A.a11y.swatch + "</span>", d.body.appendChild(f), h = G("clr-color-area"), i = G("clr-color-marker"), c = G("clr-clear"), g = G("clr-close"), v = G("clr-color-preview"), y = G("clr-color-value"), m = G("clr-hue-slider"), l = G("clr-hue-marker"), w = G("clr-alpha-slider"), k = G("clr-alpha-marker"), O(A.el), I(A.el), $(f, "mousedown", function(e) {
      f.classList.remove("clr-keyboard-nav"), e.stopPropagation()
    }), $(h, "mousedown", function(e) {
      $(d, "mousemove", Y)
    }), $(h, "touchstart", function(e) {
      d.addEventListener("touchmove", Y, {
        passive: !1
      })
    }), $(i, "mousedown", function(e) {
      $(d, "mousemove", Y)
    }), $(i, "touchstart", function(e) {
      d.addEventListener("touchmove", Y, {
        passive: !1
      })
    }), $(y, "change", function(e) {
      (L || A.inline) && (j(y.value), R())
    }), $(c, "click", function(e) {
      R(""), D()
    }), $(g, "click", function(e) {
      R(), D()
    }), $(d, "click", ".clr-format input", function(e) {
      E = e.target.value, U(), R()
    }), $(f, "click", ".clr-swatches button", function(e) {
      j(e.target.textContent), R(), A.swatchesOnly && D()
    }), $(d, "mouseup", function(e) {
      d.removeEventListener("mousemove", Y)
    }), $(d, "touchend", function(e) {
      d.removeEventListener("touchmove", Y)
    }), $(d, "mousedown", function(e) {
      f.classList.remove("clr-keyboard-nav"), D()
    }), $(d, "keydown", function(e) {
      "Escape" === e.key ? D(!0) : ["Tab", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) && f.classList.add("clr-keyboard-nav")
    }), $(d, "click", ".clr-field button", function(e) {
      C && H(), e.target.nextElementSibling.dispatchEvent(new Event("click", {
        bubbles: !0
      }))
    }), $(i, "keydown", function(e) {
      var t = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0]
      };
      Object.keys(t).includes(e.key) && (! function(e, t) {
        P(+i.style.left.replace("px", "") + e, +i.style.top.replace("px", "") + t)
      }.apply(void 0, t[e.key]), e.preventDefault())
    }), $(h, "click", Y), $(m, "input", e), $(w, "input", X)
  })
}(window, document, Math);
