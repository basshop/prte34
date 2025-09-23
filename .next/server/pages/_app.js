const CHUNK_PUBLIC_PATH = "server/pages/_app.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root-of-the-server]__66e3eb3c._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_react-icons_fa_index_mjs_275a2265._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_react-icons_lib_6322dabf._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_31f0067d._.js");
runtime.getOrInstantiateRuntimeModule("[project]/pages/_app.tsx [ssr] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/pages/_app.tsx [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
