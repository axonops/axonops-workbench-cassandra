import {
  g as n
} from "./p-6f4eae92.js";
let e;
const r = () => {
    if ("undefined" == typeof window) return new Map;
    if (!e) {
      const n = window;
      n.Ionicons = n.Ionicons || {}, e = n.Ionicons.map = n.Ionicons.map || new Map
    }
    return e
  },
  t = n => {
    const e = r();
    Object.keys(n).forEach(r => e.set(r, n[r]))
  },
  i = n => {
    let e = f(n.src);
    if (e) return e;
    if (e = o(n.name, n.icon, n.mode, n.ios, n.md), e) return s(e);
    if (n.icon) {
      if (e = f(n.icon), e) return e;
      if (e = f(n.icon[n.mode]), e) return e
    }
    return null
  },
  s = e => r().get(e) || n(`../../../assets/images/icons/${e}.svg`),
  o = (n, e, r, t, i) => (r = "ios" === (r && l(r)) ? "ios" : "md", t && "ios" === r ? n = l(t) : i && "md" === r ? n = l(i) : (n || !e || u(e) || (n = e), a(n) && (n = l(n))), a(n) && "" !== n.trim() ? "" !== n.replace(/[a-z]|-|\d/gi, "") ? null : n : null),
  f = n => a(n) && (n = n.trim(), u(n)) ? n : null,
  u = n => n.length > 0 && /(\/|\.)/.test(n),
  a = n => "string" == typeof n,
  l = n => n.toLowerCase();
export {
  t as a, o as b, i as g, a as i
}
