(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/RouteLoader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RouteLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function RouteLoader() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [width, setWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RouteLoader.useEffect": ()=>{
            if (!pathname) return;
            setLoading(true);
            setWidth(30);
            // Animate progress bar
            const interval = setInterval({
                "RouteLoader.useEffect.interval": ()=>{
                    setWidth({
                        "RouteLoader.useEffect.interval": (old)=>{
                            if (old >= 90) return old; // max before completion
                            return old + Math.random() * 10; // increase randomly
                        }
                    }["RouteLoader.useEffect.interval"]);
                }
            }["RouteLoader.useEffect.interval"], 200);
            // Finish after a short delay
            const timeout = setTimeout({
                "RouteLoader.useEffect.timeout": ()=>{
                    setWidth(100);
                    setTimeout({
                        "RouteLoader.useEffect.timeout": ()=>{
                            setLoading(false);
                            setWidth(0);
                        }
                    }["RouteLoader.useEffect.timeout"], 300);
                }
            }["RouteLoader.useEffect.timeout"], 800); // adjust based on expected page load
            return ({
                "RouteLoader.useEffect": ()=>{
                    clearInterval(interval);
                    clearTimeout(timeout);
                    setWidth(0);
                    setLoading(false);
                }
            })["RouteLoader.useEffect"];
        }
    }["RouteLoader.useEffect"], [
        pathname
    ]);
    if (!loading) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-0 left-0 h-1 z-[60] w-full bg-transparent",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-1 bg-[#f8ff00] transition-all duration-200 ease-out",
            style: {
                width: "".concat(width, "%")
            }
        }, void 0, false, {
            fileName: "[project]/components/RouteLoader.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/RouteLoader.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(RouteLoader, "hBJRSr+5mP3rNOVdgwBGh7hwMDs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = RouteLoader;
var _c;
__turbopack_context__.k.register(_c, "RouteLoader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_RouteLoader_tsx_80234a29._.js.map