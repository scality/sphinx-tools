//#region src/core/manifest.ts
function e(e) {
	let t = e.replace(/#.*$/, ""), n = t.match(/^(.*?)([^/?#]+)-portal\/[^?#]*\?(?:[^&]*&)*version=([^&]+)/);
	if (n) {
		let [, e, t, r] = n;
		return `${e}${t}/${decodeURIComponent(r)}/`;
	}
	return t = t.replace(/\?.*$/, ""), t = t.replace(/index\.html?$/i, ""), t = t.replace(/guide\/$/i, ""), t.endsWith("/") || (t += "/"), t;
}
var t = {
	ring: "RING",
	s3c: "S3C",
	xdm: "XDM"
};
function n(n) {
	let r = [];
	n.products.forEach((n, i) => {
		let a = /* @__PURE__ */ new Set(), o = [];
		for (let e of n.versionGroups ?? []) for (let t of e.versions ?? []) a.has(t.url) || (a.add(t.url), o.push(t));
		n.default && !a.has(n.default.url) && o.push(n.default);
		for (let a of o) {
			let o = `${i}:${a.url}`, s = a.url === n.default?.url, c = {
				product: n.name,
				subtitle: n.subtitle,
				icon: n.icon,
				versionLabel: a.label,
				unitId: o,
				unitLabel: a.label,
				isDefault: s
			};
			r.push({
				...c,
				docRoot: e(a.url)
			});
			for (let [e, n] of Object.entries(a.components ?? {})) {
				if (!n) continue;
				let i = t[e];
				i && r.push({
					...c,
					docRoot: `${i}/${n}/`,
					component: e
				});
			}
		}
	});
	let i = /* @__PURE__ */ new Map();
	for (let e of r) {
		let t = i.get(e.product);
		t ? t.push(e) : i.set(e.product, [e]);
	}
	for (let e of i.values()) {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) {
			let e = t.get(n.unitLabel);
			e ? e.add(n.unitId) : t.set(n.unitLabel, new Set([n.unitId]));
		}
		for (let n of e) (t.get(n.unitLabel)?.size ?? 0) > 1 && n.subtitle && (n.unitLabel = `${n.versionLabel} — ${n.subtitle}`);
	}
	return {
		sources: r,
		internalResources: n.internalResources ?? []
	};
}
//#endregion
//#region src/core/detect.ts
var r = /index\.[a-f0-9]{6,}\.js/i;
function i(e, t) {
	let n = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), r = RegExp(`"###${n}"\\s*:\\s*"([a-f0-9]+)"`, "i"), i = e.match(r);
	return i ? i[1] : null;
}
async function a(e, t, n, a) {
	let o = {
		type: "sphinx",
		indexUrl: `${e}searchindex.js`
	};
	try {
		let s = await n(`${a}${e}index.html`);
		if (!s.ok) return o;
		let c = (await s.text()).match(r);
		if (!c) return o;
		let l = await n(`${a}${e}static/js/${c[0]}`);
		if (!l.ok) return o;
		let u = i(await l.text(), t);
		return u ? {
			type: "rspress",
			indexUrl: `${e}static/search_index.${t}.${u}.json`
		} : o;
	} catch {
		return o;
	}
}
//#endregion
//#region src/core/porter.ts
var o = {
	ational: "ate",
	tional: "tion",
	enci: "ence",
	anci: "ance",
	izer: "ize",
	bli: "ble",
	alli: "al",
	entli: "ent",
	eli: "e",
	ousli: "ous",
	ization: "ize",
	ation: "ate",
	ator: "ate",
	alism: "al",
	iveness: "ive",
	fulness: "ful",
	ousness: "ous",
	aliti: "al",
	iviti: "ive",
	biliti: "ble",
	logi: "log"
}, s = {
	icate: "ic",
	ative: "",
	alize: "al",
	iciti: "ic",
	ical: "ic",
	ful: "",
	ness: ""
}, c = "^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*", l = "^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*([aeiouy][aeiou]*)?$", u = "^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*", d = "^([^aeiou][^aeiouy]*)?[aeiouy]";
function f(e) {
	let t, n, r, i, a, f, p, m;
	return e.length < 3 ? e : (r = e.substr(0, 1), r === "y" && (e = r.toUpperCase() + e.substr(1)), i = /^(.+?)(ss|i)es$/, a = /^(.+?)([^s])s$/, i.test(e) ? e = e.replace(i, "$1$2") : a.test(e) && (e = e.replace(a, "$1$2")), i = /^(.+?)eed$/, a = /^(.+?)(ed|ing)$/, i.test(e) ? (m = e.match(i), i = new RegExp(c), i.test(m[1]) && (i = /.$/, e = e.replace(i, ""))) : a.test(e) && (m = e.match(a), t = m[1], a = new RegExp(d), a.test(t) && (e = t, a = /(at|bl|iz)$/, f = /* @__PURE__ */ RegExp("([^aeiouylsz])\\1$"), p = /* @__PURE__ */ RegExp("^[^aeiou][^aeiouy]*[aeiouy][^aeiouwxy]$"), a.test(e) ? e += "e" : f.test(e) ? (i = /.$/, e = e.replace(i, "")) : p.test(e) && (e += "e"))), i = /^(.+?)y$/, i.test(e) && (m = e.match(i), t = m[1], i = new RegExp(d), i.test(t) && (e = t + "i")), i = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/, i.test(e) && (m = e.match(i), t = m[1], n = m[2], i = new RegExp(c), i.test(t) && (e = t + o[n])), i = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/, i.test(e) && (m = e.match(i), t = m[1], n = m[2], i = new RegExp(c), i.test(t) && (e = t + s[n])), i = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/, a = /^(.+?)(s|t)(ion)$/, i.test(e) ? (m = e.match(i), t = m[1], i = new RegExp(u), i.test(t) && (e = t)) : a.test(e) && (m = e.match(a), t = m[1] + m[2], a = new RegExp(u), a.test(t) && (e = t)), i = /^(.+?)e$/, i.test(e) && (m = e.match(i), t = m[1], i = new RegExp(u), a = new RegExp(l), f = /* @__PURE__ */ RegExp("^[^aeiou][^aeiouy]*[aeiouy][^aeiouwxy]$"), (i.test(t) || a.test(t) && !f.test(t)) && (e = t)), i = /ll$/, a = new RegExp(u), i.test(e) && a.test(e) && (i = /.$/, e = e.replace(i, "")), r === "y" && (e = r.toLowerCase() + e.substr(1)), e);
}
//#endregion
//#region src/core/text.ts
function p(e) {
	return e.normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function m(e) {
	return p(e.toLowerCase()).split(/[^a-z0-9]+/).filter((e) => e.length > 0);
}
function h(e) {
	return e.replace(/```[\s\S]*?```/g, " ").replace(/`([^`]*)`/g, "$1").replace(/<!--[\s\S]*?-->/g, " ").replace(/^[ \t]*:::+[ \t]*\w*[ \t]*(\{[^}]*\})?/gm, " ").replace(/<\/?[A-Za-z][^>]*>/g, " ").replace(/\{#[^}]*\}/g, " ").replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/^[#>\-*\s]+/gm, " ").replace(/[*_~]/g, " ").replace(/\s+/g, " ").trim();
}
function g(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function _(e, t, n = 120, r = 280) {
	let i = e.toLowerCase(), a = -1;
	for (let e of t) {
		let t = i.indexOf(e.toLowerCase());
		t > -1 && (a === -1 || t < a) && (a = t);
	}
	let o = a === -1 ? 0 : Math.max(0, a - n), s = o + r, c = e.substr(o, r).trim();
	return o > 0 && (c = "…" + c), e.slice(s).trim().length > 0 && (c += "…"), c;
}
function v(e, t) {
	if (!e || t.length === 0) return;
	let n = e.toLowerCase(), r = -1;
	for (let e of t) {
		let t = n.indexOf(e.toLowerCase());
		t > -1 && (r === -1 || t < r) && (r = t);
	}
	if (r === -1) return;
	let i = r;
	for (; i > 0 && /\S/.test(e[i - 1]);) i--;
	let a = e.slice(i, i + 120).replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
	if (a.length === 0) return;
	let o = (e) => encodeURIComponent(e);
	if (a.length <= 8) return `text=${o(a.join(" "))}`;
	let s = a.slice(0, 5).join(" "), c = a.slice(-3).join(" ");
	return `text=${o(s)},${o(c)}`;
}
function y(e, t) {
	let n = (e) => p(e.toLowerCase()).trim().replace(/\s+/g, " "), r = n(e), i = n(t);
	return i ? r === i ? {
		exact: !0,
		prefix: !0
	} : {
		exact: !1,
		prefix: r.startsWith(i + " ")
	} : {
		exact: !1,
		prefix: !1
	};
}
function b(e, t) {
	let n = t.map((e) => p(e.toLowerCase()).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).filter(Boolean).sort((e, t) => t.length - e.length);
	if (n.length === 0) return g(e);
	let r = RegExp(`(${n.join("|")})\\w*`, "gi"), i = "", a = 0;
	for (let t = r.exec(e); t; t = r.exec(e)) i += g(e.slice(a, t.index)), i += "<mark>" + g(t[0]) + "</mark>", a = t.index + t[0].length, t[0].length === 0 && r.lastIndex++;
	return i += g(e.slice(a)), i;
}
//#endregion
//#region src/core/adapters/sphinx.ts
var x = 15, S = 5;
function C(e) {
	let t = e.indexOf("("), n = e.lastIndexOf(")"), r = e.slice(t + 1, n);
	return JSON.parse(r);
}
function w(e) {
	return e === void 0 ? [] : Array.isArray(e) ? e : [e];
}
function T(e) {
	return e.split("/").filter((e) => e && e !== "index").map((e) => e.replace(/[-_]/g, " ").replace(/\b\w/g, (e) => e.toUpperCase())).join(" › ");
}
function E(e, t, n, r) {
	let i = Object.keys(t.terms), a = Object.keys(t.titleterms);
	function o(n) {
		let r = m(n);
		if (r.length === 0) return [];
		let o = /\s$/.test(n), s = r.length - 1, c = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set(), p = (e, t, n, r) => {
			for (let i of e) {
				let e = c.get(i);
				e || (e = /* @__PURE__ */ new Set(), c.set(i, e)), e.add(t), n && l.add(i), r && d.add(i);
			}
		};
		r.forEach((e, n) => {
			let r = n === s && !o, c = f(e);
			if (r) {
				let r = c.length >= 2 ? c : e;
				for (let e of i) e.startsWith(r) && p(w(t.terms[e]), n, !1, e !== r);
				for (let e of a) e.startsWith(r) && p(w(t.titleterms[e]), n, !0, e !== r);
				p(w(t.terms[c]), n, !1, !1), p(w(t.titleterms[c]), n, !0, !1);
			} else p(w(t.terms[c]), n, !1, !1), p(w(t.titleterms[c]), n, !0, !1);
		});
		let h = [];
		for (let [i, a] of c) {
			if (a.size !== r.length) continue;
			let o = l.has(i), s = d.has(i) && a.size === 1, c = t.docnames[i], f = t.titles[i] ?? c, p = y(f, n), m = {
				titleExact: p.exact,
				titlePrefix: p.prefix,
				titleHit: o,
				termCoverage: 1,
				fieldWeight: o ? 1 : S / x,
				proximity: 0,
				prefixOnly: s
			};
			h.push({
				source: e,
				title: f,
				url: `${e.docRoot}${c}.html`,
				breadcrumb: T(c),
				features: m,
				score: 0,
				docId: i,
				adapter: u
			});
		}
		return h;
	}
	let s = /* @__PURE__ */ new Map();
	function c(e) {
		let t = new DOMParser().parseFromString(e, "text/html");
		return ((t.querySelector("[role=\"main\"]") || t.querySelector(".body") || t.querySelector("main") || t.body)?.textContent ?? "").replace(/\s+/g, " ").trim();
	}
	async function l(t) {
		let i = `${r}${e.docRoot}${t}.html`, a = s.get(i);
		return a || (a = (async () => {
			try {
				let e = await n(i);
				return e.ok ? c(await e.text()) : "";
			} catch {
				return "";
			}
		})(), s.set(i, a)), a;
	}
	let u = {
		source: e,
		search: o,
		async getSnippet(e, n) {
			if (e.docId === void 0) return "";
			let r = await l(t.docnames[e.docId]);
			if (!r) return "";
			let i = m(n).map(f);
			return e.textFragment = v(r, i), b(_(r, i), i);
		}
	};
	return u;
}
//#endregion
//#region src/core/adapters/rspress.ts
function D(e, t) {
	let n;
	for (let r of e.toc ?? []) r.charIndex <= t && (!n || r.charIndex > n.at) && (n = {
		id: r.id,
		at: r.charIndex
	});
	return n?.id;
}
function O(e, t) {
	let n = t.replace(/^\//, "");
	return n === "" || n.endsWith("/") ? `${e}${n}index.html` : `${e}${n}.html`;
}
function k(e) {
	return e.split("/").filter((e) => e && e !== "guide").map((e) => e.replace(/[-_]/g, " ").replace(/\b\w/g, (e) => e.toUpperCase())).join(" › ");
}
function A(e, t) {
	let n = t.map((e) => {
		let t = h(e.content), n = m(t);
		return {
			doc: e,
			titleTokens: new Set(m(e.title)),
			headingTokens: new Set((e.toc ?? []).flatMap((e) => m(e.text))),
			bodyText: t,
			bodyTokens: n,
			bodySet: new Set(n)
		};
	});
	function r(e, t, n) {
		if (t.has(e)) return !0;
		if (n) {
			for (let n of t) if (n.startsWith(e)) return !0;
		}
		return !1;
	}
	function i(e, t, n) {
		for (let r of t) if (r === e || n && r.startsWith(e)) return !0;
		return !1;
	}
	function a(t) {
		let a = m(t);
		if (a.length === 0) return [];
		let s = /\s$/.test(t), c = a.length - 1, l = [];
		for (let u of n) {
			let n = 0, d = !1, f = !1, p = !1;
			if (a.forEach((e, t) => {
				let a = t === c && !s, o = r(e, u.titleTokens, a), l = r(e, u.headingTokens, a), m = i(e, u.bodyTokens, a);
				if (o || l || m) {
					n++, o && (d = !0), l && (f = !0);
					let t = u.titleTokens.has(e) || u.headingTokens.has(e) || u.bodySet.has(e);
					a && !t && (p = !0);
				}
			}), n === 0) continue;
			let m = 0, h = a.map((e, t) => t === c && !s ? u.bodyTokens.findIndex((t) => t.startsWith(e)) : u.bodyTokens.indexOf(e)).filter((e) => e >= 0);
			if (h.length >= 2) {
				let e = Math.max(...h) - Math.min(...h);
				m = e <= 20 ? 1 : e <= 60 ? .5 : 0;
			}
			let g = (() => {
				let e = u.bodyText.toLowerCase();
				for (let t of a) {
					let n = e.indexOf(t);
					if (n > -1) return n;
				}
				return 0;
			})(), _ = y(u.doc.title, t), b = {
				titleExact: _.exact,
				titlePrefix: _.prefix,
				titleHit: d,
				termCoverage: n / a.length,
				fieldWeight: d ? 1 : f ? .6 : .3,
				proximity: m,
				prefixOnly: p && n === 1
			};
			l.push({
				source: e,
				title: u.doc.title,
				url: O(e.docRoot, u.doc.routePath),
				anchor: D(u.doc, g),
				breadcrumb: k(u.doc.routePath),
				features: b,
				score: 0,
				contentRef: u.bodyText,
				matchPos: g,
				textFragment: v(u.bodyText, a),
				adapter: o
			});
		}
		return l;
	}
	let o = {
		source: e,
		search: a,
		async getSnippet(e, t) {
			let n = e.contentRef ?? "";
			if (!n) return "";
			let r = m(t);
			return b(_(n, r), r);
		}
	};
	return o;
}
//#endregion
//#region src/core/loader.ts
function j(e) {
	return e === "" || e.endsWith("/") ? e : e + "/";
}
var M = class {
	constructor(e) {
		this.cache = /* @__PURE__ */ new Map(), this.fetchFn = e.fetchFn ?? ((e, t) => fetch(e, t)), this.docsBase = j(e.docsBase), this.lang = e.lang;
	}
	load(e) {
		let t = this.cache.get(e.docRoot);
		if (t) return t;
		let n = this.build(e).catch((t) => {
			throw this.cache.delete(e.docRoot), t;
		});
		return this.cache.set(e.docRoot, n), n;
	}
	async build(e) {
		let t = `${this.docsBase}${e.docRoot}searchindex.js`, n = await this.fetchFn(t);
		if (n.ok) return E(e, C(await n.text()), this.fetchFn, this.docsBase);
		let { type: r, indexUrl: i } = await a(e.docRoot, this.lang, this.fetchFn, this.docsBase), o = `${this.docsBase}${i}`;
		if (o === t) throw Error(`index fetch failed: ${i} (${n.status})`);
		let s = await this.fetchFn(o);
		if (!s.ok) throw Error(`index fetch failed: ${i} (${s.status})`);
		let c = await s.text();
		return r === "sphinx" ? E(e, C(c), this.fetchFn, this.docsBase) : A(e, JSON.parse(c));
	}
}, N = .45, P = .3, F = .15, I = .1, L = .15, R = 1;
function z(e) {
	let t = (e.titleExact ? 1 : e.titlePrefix ? .85 : e.titleHit ? .7 : 0) * N + e.termCoverage * P + e.fieldWeight * F + e.proximity * I;
	return t /= R, e.prefixOnly && (t -= L), Math.max(0, Math.min(1, t));
}
function B(e) {
	for (let t of e) t.score = z(t.features);
	return e.slice().sort((e, t) => t.score === e.score ? e.title.length === t.title.length ? e.source.product === t.source.product ? e.title < t.title ? -1 : +(e.title > t.title) : e.source.product < t.source.product ? -1 : 1 : e.title.length - t.title.length : t.score - e.score);
}
//#endregion
//#region src/core/query.ts
function V(e, t) {
	if (t.trim().length === 0) return [];
	let n = [];
	for (let r of e) try {
		n.push(...r.search(t));
	} catch {}
	return B(n);
}
//#endregion
//#region src/core/adapters/composite.ts
function H(e, t) {
	return {
		source: e,
		search(e) {
			let n = [];
			for (let r of t) try {
				n.push(...r.search(e));
			} catch {}
			return n;
		},
		getSnippet(e, t) {
			return e.adapter ? e.adapter.getSnippet(e, t) : Promise.resolve("");
		}
	};
}
//#endregion
//#region src/core/controller.ts
var U = class {
	constructor(e) {
		this.unitsByProduct = /* @__PURE__ */ new Map(), this.defaultUnit = /* @__PURE__ */ new Map(), this.active = /* @__PURE__ */ new Map(), this.activeUnit = /* @__PURE__ */ new Map(), this.scope = { mode: "all" }, this.query = "", this.allHits = [], this.shown = 0, this.partialFailure = !1, this.loading = !1, this.snippetTimer = null, this.queryToken = 0, this.listeners = [], this.loader = e.loader, this.sources = e.sources, this.pageSize = e.pageSize ?? 10, this.debounceMs = e.debounceMs ?? 250;
		for (let e of this.sources) {
			let t = e.unitId ?? e.docRoot, n = this.unitsByProduct.get(e.product);
			n || (n = /* @__PURE__ */ new Map(), this.unitsByProduct.set(e.product, n));
			let r = n.get(t);
			r ? r.push(e) : n.set(t, [e]), e.isDefault && !this.defaultUnit.has(e.product) && this.defaultUnit.set(e.product, t);
		}
	}
	onResults(e) {
		this.listeners.push(e);
	}
	emit() {
		let e = {
			query: this.query,
			hits: this.allHits.slice(0, this.shown),
			shown: this.shown,
			total: this.allHits.length,
			loading: this.loading,
			partialFailure: this.partialFailure
		};
		for (let t of this.listeners) t(e);
	}
	async buildUnit(e, t) {
		let n = this.unitsByProduct.get(e)?.get(t) ?? [], r = await Promise.allSettled(n.map((e) => this.loader.load(e))), i = [];
		return r.forEach((e) => {
			e.status === "fulfilled" ? i.push(e.value) : this.partialFailure = !0;
		}), H(n[0], i);
	}
	async init() {
		let e = [...this.unitsByProduct.keys()];
		await Promise.all(e.map(async (e) => {
			let t = this.unitsByProduct.get(e), n = this.defaultUnit.get(e) ?? [...t.keys()][0];
			n !== void 0 && (this.activeUnit.set(e, n), this.active.set(e, await this.buildUnit(e, n)));
		}));
	}
	adaptersInScope() {
		if (this.scope.mode === "single" && this.scope.product) {
			let e = this.active.get(this.scope.product);
			return e ? [e] : [];
		}
		return [...this.active.values()];
	}
	setQuery(e) {
		this.query = e, this.queryToken++, this.allHits = V(this.adaptersInScope(), e), this.shown = Math.min(this.pageSize, this.allHits.length), this.emit(), this.scheduleSnippets();
	}
	loadMore() {
		this.shown = Math.min(this.shown + this.pageSize, this.allHits.length), this.emit(), this.scheduleSnippets();
	}
	setScopeAll() {
		this.scope = { mode: "all" }, this.setQuery(this.query);
	}
	setScopeProduct(e) {
		this.scope = {
			mode: "single",
			product: e
		}, this.setQuery(this.query);
	}
	async setActiveVersion(e, t) {
		this.loading = !0, this.emit();
		try {
			let n = await this.buildUnit(e, t);
			this.active.set(e, n), this.activeUnit.set(e, t), this.loading = !1, this.setQuery(this.query);
		} catch {
			this.partialFailure = !0, this.loading = !1, this.emit();
		}
	}
	scheduleSnippets() {
		this.snippetTimer && clearTimeout(this.snippetTimer);
		let e = this.queryToken, t = this.allHits.slice(0, this.shown);
		this.snippetTimer = setTimeout(async () => {
			e === this.queryToken && (await Promise.all(t.map(async (t) => {
				if (!t.snippet) try {
					let n = await t.adapter.getSnippet(t, this.query);
					e === this.queryToken && (t.snippet = n);
				} catch {}
			})), e === this.queryToken && this.emit());
		}, this.debounceMs);
	}
	destroy() {
		this.snippetTimer && clearTimeout(this.snippetTimer), this.listeners = [];
	}
}, W = "\n:host { --ds-accent: #3b82f6; --ds-bg: #fff; --ds-fg: #0f172a; --ds-muted: #94a3b8; font-family: system-ui, sans-serif; }\n.ds-trigger { display:inline-flex; align-items:center; gap:8px; border:1px solid #cbd5e1; border-radius:8px; padding:8px 12px; background:var(--ds-bg); color:var(--ds-muted); cursor:pointer; }\n.ds-overlay { position:fixed; inset:0; background:rgba(15,23,42,.35); display:none; align-items:flex-start; justify-content:center; padding-top:10vh; z-index:9999; }\n.ds-overlay.open { display:flex; }\n.ds-panel { position:relative; width:min(640px,92vw); max-height:75vh; display:flex; flex-direction:column; background:var(--ds-bg); border-radius:12px; box-shadow:0 20px 50px rgba(0,0,0,.25); overflow:hidden; }\n.ds-input { display:block; width:100%; box-sizing:border-box; border:0; border-bottom:1px solid #f1f5f9; padding:16px; padding-right:44px; font-size:16px; outline:none; color:var(--ds-fg); }\n.ds-pills { display:flex; gap:6px; flex-wrap:wrap; padding:10px 12px; border-bottom:1px solid #f1f5f9; }\n.ds-pills:empty { display:none; }\n.ds-pill { font-size:12px; padding:4px 10px; border-radius:999px; border:1px solid #cbd5e1; background:#f8fafc; color:#475569; cursor:pointer; display:inline-flex; gap:4px; align-items:center; }\n.ds-pill.on { background:var(--ds-accent); border-color:var(--ds-accent); color:#fff; }\n.ds-pill-name { text-transform:uppercase; }\n.ds-pill select { font-size:11px; border:0; background:transparent; color:inherit; cursor:pointer; text-transform:none; }\n.ds-results { overflow-y:auto; padding:6px; }\n.ds-res { display:flex; gap:10px; padding:10px 12px; border-radius:8px; cursor:pointer; text-decoration:none; color:inherit; }\n.ds-res.sel, .ds-res:hover { background:#f1f5f9; }\n.ds-res .ttl { font-weight:600; font-size:14px; color:var(--ds-fg); }\n.ds-res .crumb { font-size:11px; color:var(--ds-muted); margin:1px 0 3px; }\n.ds-res .snip { font-size:12px; color:#475569; line-height:1.45; }\n.ds-res .snip mark { background:#fde68a; color:#0f172a; border-radius:2px; }\n.ds-badge { font-size:10px; font-weight:600; padding:2px 7px; border-radius:999px; background:#ddd6fe; color:#5b21b6; white-space:nowrap; margin-left:auto; }\n.ds-shim { height:11px; border-radius:3px; width:80%; background:linear-gradient(90deg,#eef2f7,#e2e8f0,#eef2f7); }\n.ds-kbd { font-size:11px; border:1px solid #cbd5e1; border-bottom-width:2px; border-radius:4px; padding:1px 5px; color:#475569; background:#f8fafc; }\n.ds-trigger .ds-kbd { margin-left:6px; }\n.ds-header { position:relative; }\n.ds-close { position:absolute; top:50%; right:12px; transform:translateY(-50%); z-index:2; border:0; background:transparent; color:#94a3b8; cursor:pointer; font-size:16px; line-height:1; padding:4px; }\n.ds-close:hover { color:#0f172a; }\n.ds-footer { display:flex; justify-content:space-between; align-items:center; gap:12px; padding:8px 14px; border-top:1px solid #f1f5f9; font-size:11px; color:var(--ds-muted); }\n.ds-footer .ds-kbd { margin-right:4px; }\n.ds-footer .ds-kbd + .ds-kbd { margin-left:-2px; }\n.ds-more { text-align:center; font-size:12px; color:var(--ds-accent); padding:10px; cursor:pointer; }\n.ds-more.sel { background:#f1f5f9; }\n.ds-empty, .ds-note { padding:20px; text-align:center; color:var(--ds-muted); font-size:13px; }\n";
//#endregion
//#region src/ui/component.ts
function G() {
	if (typeof navigator > "u") return !1;
	let e = navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || "";
	return /mac|iphone|ipad|ipod/i.test(e);
}
function K() {
	return G() ? "⌘K" : "Ctrl K";
}
var q = class extends HTMLElement {
	constructor(...e) {
		super(...e), this.sources = [], this.selIndex = -1;
	}
	connectedCallback() {
		this.ready = new Promise((e) => this.resolveReady = e), this.attachShadow({ mode: "open" }), this.shadowRoot.innerHTML = `<style>${W}</style>${this.template()}`, this.wireStaticEvents(), this.boot();
	}
	get searchLang() {
		return this.getAttribute("lang") || "en";
	}
	get docsBase() {
		return this.getAttribute("docs-base") || "";
	}
	get manifestUrl() {
		return this.getAttribute("manifest-url") || "data.json";
	}
	get indexUrl() {
		return this.getAttribute("searchindex-url") || "";
	}
	get focusProduct() {
		return this.getAttribute("product") || "";
	}
	get focusVersion() {
		return this.getAttribute("version") || "";
	}
	template() {
		return `
      <button class="ds-trigger" part="trigger">🔎 <span>Search docs</span> <kbd class="ds-kbd">${K()}</kbd></button>
      <div class="ds-overlay">
        <div class="ds-panel" role="dialog" aria-modal="true">
          <div class="ds-header">
            <input class="ds-input" type="text" placeholder="Search all docs…" aria-label="Search docs" />
            <button class="ds-close" aria-label="Close search (Escape)" type="button">✕</button>
          </div>
          <div class="ds-pills"></div>
          <div class="ds-results" role="listbox"></div>
          <div class="ds-footer">
            <span><kbd class="ds-kbd">↵</kbd> to select</span>
            <span><kbd class="ds-kbd">↑</kbd><kbd class="ds-kbd">↓</kbd> to navigate</span>
            <span><kbd class="ds-kbd">esc</kbd> to close</span>
          </div>
        </div>
      </div>`;
	}
	async boot() {
		let e = this.fetchImpl ?? ((e, t) => fetch(e, t)), t;
		if (this.indexUrl) t = [{
			product: "",
			versionLabel: "",
			docRoot: this.indexUrl.replace(/searchindex\.js(\?.*)?$/, ""),
			isDefault: !0
		}];
		else {
			let r = this.manifest;
			if (!r) try {
				r = await (await e(this.manifestUrl)).json();
			} catch {
				this.renderNote("Could not load search manifest."), this.resolveReady();
				return;
			}
			t = n(r).sources, this.focusProduct && (t = t.filter((e) => e.product === this.focusProduct && (!this.focusVersion || e.versionLabel === this.focusVersion)));
		}
		if (this.sources = t, this.focusProduct) {
			let e = this.shadowRoot.querySelector(".ds-input");
			e && (e.placeholder = `Search ${this.focusProduct} docs…`);
		}
		let r = new M({
			docsBase: this.docsBase,
			lang: this.searchLang,
			fetchFn: e
		});
		this.controller = new U({
			loader: r,
			sources: t
		}), this.controller.onResults((e) => this.render(e)), !this.focusProduct && t.some((e) => e.product) && this.renderPills(), await this.controller.init(), this.resolveReady();
	}
	wireStaticEvents() {
		let e = this.shadowRoot;
		e.querySelector(".ds-trigger").addEventListener("click", () => this.open()), e.querySelector(".ds-close").addEventListener("click", () => this.close()), e.querySelector(".ds-overlay").addEventListener("click", (e) => {
			e.target === e.currentTarget && this.close();
		});
		let t = e.querySelector(".ds-input");
		t.addEventListener("input", () => this.controller?.setQuery(t.value)), t.addEventListener("keydown", (e) => this.onKeydown(e)), this.hotkeyHandler = (e) => {
			(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && (e.preventDefault(), this.open());
		}, document.addEventListener("keydown", this.hotkeyHandler);
	}
	disconnectedCallback() {
		this.hotkeyHandler && document.removeEventListener("keydown", this.hotkeyHandler), this.controller?.destroy();
	}
	open() {
		this.shadowRoot.querySelector(".ds-overlay").classList.add("open"), this.shadowRoot.querySelector(".ds-input").focus();
	}
	close() {
		this.shadowRoot.querySelector(".ds-overlay").classList.remove("open");
	}
	onKeydown(e) {
		let t = [...this.shadowRoot.querySelectorAll(".ds-res, .ds-more")];
		if (e.key === "Escape") return this.close();
		if (e.key === "ArrowDown") e.preventDefault(), this.selIndex = Math.min(this.selIndex + 1, t.length - 1);
		else if (e.key === "ArrowUp") e.preventDefault(), this.selIndex = Math.max(this.selIndex - 1, 0);
		else if (e.key === "Enter") {
			t[this.selIndex]?.click();
			return;
		} else return;
		t.forEach((e, t) => e.classList.toggle("sel", t === this.selIndex));
		try {
			t[this.selIndex]?.scrollIntoView({ block: "nearest" });
		} catch {}
	}
	renderPills() {
		let e = [...new Set(this.sources.map((e) => e.product))], t = this.shadowRoot.querySelector(".ds-pills");
		t.innerHTML = "<span class=\"ds-pill on\" data-product=\"\"><span class=\"ds-pill-name\">All</span></span>" + e.map((e) => {
			let t = /* @__PURE__ */ new Map();
			for (let n of this.sources) {
				if (n.product !== e) continue;
				let r = n.unitId ?? n.docRoot;
				t.has(r) || t.set(r, {
					uid: r,
					label: n.unitLabel ?? n.versionLabel,
					isDefault: !!n.isDefault
				});
			}
			let n = [...t.values()].map((e) => `<option value="${g(e.uid)}"${e.isDefault ? " selected" : ""}>${g(e.label)}</option>`).join("");
			return `<span class="ds-pill" data-product="${g(e)}"><span class="ds-pill-name">${g(e)}</span>
        <select data-product="${g(e)}">${n}</select></span>`;
		}).join(""), t.querySelectorAll(".ds-pill").forEach((e) => {
			e.addEventListener("click", (n) => {
				if (n.target.tagName === "SELECT") return;
				t.querySelectorAll(".ds-pill").forEach((e) => e.classList.remove("on")), e.classList.add("on");
				let r = e.getAttribute("data-product");
				r ? this.controller.setScopeProduct(r) : this.controller.setScopeAll();
			});
		}), t.querySelectorAll("select").forEach((e) => {
			e.addEventListener("change", () => {
				let t = e.getAttribute("data-product");
				this.controller.setActiveVersion(t, e.value);
			});
		});
	}
	renderNote(e) {
		let t = this.shadowRoot.querySelector(".ds-results");
		t.innerHTML = `<div class="ds-note">${g(e)}</div>`;
	}
	render(e) {
		let t = this.shadowRoot.querySelector(".ds-results");
		if (e.query.trim() === "") {
			t.innerHTML = "", this.selIndex = -1;
			return;
		}
		if (this.selIndex = -1, e.total === 0) {
			t.innerHTML = `<div class="ds-empty">No results for "${g(e.query)}".</div>`;
			return;
		}
		let n = m(e.query), r = e.hits.map((e) => {
			let t = "";
			e.textFragment ? t = `#${e.anchor ?? ""}:~:${e.textFragment}` : e.anchor && (t = `#${e.anchor}`);
			let r = `${this.docsBase}${e.url}${t}`;
			return `
      <a class="ds-res" href="${/^\s*javascript:/i.test(r) ? "#" : g(r)}">
        <div style="flex:1">
          <div style="display:flex;align-items:center"><span class="ttl">${b(e.title, n)}</span>
            ${e.source.product ? `<span class="ds-badge">${g(e.source.product)} ${g(e.source.versionLabel)}</span>` : ""}</div>
          <div class="crumb">${g(e.breadcrumb)}</div>
          ${e.snippet ? `<div class="snip">${e.snippet}</div>` : "<div class=\"ds-shim\"></div>"}
        </div>
      </a>`;
		}).join(""), i = e.shown < e.total ? `<div class="ds-more">Load ${Math.min(10, e.total - e.shown)} more results ↓</div>` : "", a = e.partialFailure ? "<div class=\"ds-note\">Some sources are unavailable.</div>" : "";
		t.innerHTML = r + i + a, t.querySelectorAll(".ds-res").forEach((e) => {
			e.addEventListener("click", (t) => {
				let n = e.getAttribute("href"), r = new CustomEvent("docs-search:navigate", {
					detail: { url: n },
					bubbles: !0,
					composed: !0,
					cancelable: !0
				});
				this.dispatchEvent(r) || t.preventDefault();
			});
		}), t.querySelector(".ds-more")?.addEventListener("click", () => this.controller.loadMore());
	}
};
customElements.get("docs-search") || customElements.define("docs-search", q);
//#endregion
export { q as DocsSearchElement, n as parseManifest };
