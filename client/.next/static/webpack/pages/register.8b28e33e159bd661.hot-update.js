"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/register",{

/***/ "./src/pages/register.js":
/*!*******************************!*\
  !*** ./src/pages/register.js ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ RegisterPage)\n/* harmony export */ });\n/* harmony import */ var _app_context_AuthContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/app/context/AuthContext */ \"./src/app/context/AuthContext.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _app_components_SignupForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/app/components/SignupForm */ \"./src/app/components/SignupForm.js\");\n/* harmony import */ var _app_components_Loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/app/components/Loading */ \"./src/app/components/Loading.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\nvar _jsxFileName = \"C:\\\\Users\\\\salaqaily\\\\Desktop\\\\JS\\\\client\\\\src\\\\pages\\\\register.js\",\n  _s = $RefreshSig$();\n\n\n\n\n\n\nfunction RegisterPage() {\n  _s();\n  var _useAuth = (0,_app_context_AuthContext__WEBPACK_IMPORTED_MODULE_0__.useAuth)(),\n    user = _useAuth.user,\n    loading = _useAuth.loading;\n  var router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {\n    if (user && !loading) {\n      router.push(\"/homepage\");\n    }\n  }, [user, loading, router]);\n  if (loading) return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_app_components_Loading__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 16,\n    columnNumber: 23\n  }, this);\n  console.log;\n  return !user ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_app_components_SignupForm__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 18,\n    columnNumber: 18\n  }, this) : null;\n}\n_s(RegisterPage, \"Zr2WDa/YWeMetzDhcnOimt0LiKE=\", false, function () {\n  return [_app_context_AuthContext__WEBPACK_IMPORTED_MODULE_0__.useAuth, next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter];\n});\n_c = RegisterPage;\nvar _c;\n$RefreshReg$(_c, \"RegisterPage\");\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvcmVnaXN0ZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBb0Q7QUFDbEI7QUFDTTtBQUNhO0FBQ047QUFBQTtBQUVoQyxTQUFTTyxZQUFZQSxDQUFBLEVBQUc7RUFBQUMsRUFBQTtFQUNyQyxJQUFBQyxRQUFBLEdBQTBCVCxpRUFBTyxDQUFDLENBQUM7SUFBM0JVLElBQUksR0FBQUQsUUFBQSxDQUFKQyxJQUFJO0lBQUVDLE9BQU8sR0FBQUYsUUFBQSxDQUFQRSxPQUFPO0VBQ3JCLElBQU1DLE1BQU0sR0FBR1Ysc0RBQVMsQ0FBQyxDQUFDO0VBQzFCRCxnREFBUyxDQUFDLFlBQU07SUFDZCxJQUFJUyxJQUFJLElBQUksQ0FBQ0MsT0FBTyxFQUFFO01BQ3BCQyxNQUFNLENBQUNDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUI7RUFDRixDQUFDLEVBQUUsQ0FBQ0gsSUFBSSxFQUFFQyxPQUFPLEVBQUVDLE1BQU0sQ0FBQyxDQUFDO0VBRTNCLElBQUlELE9BQU8sRUFBRSxvQkFBT0wsNkRBQUEsQ0FBQ0YsK0RBQU87SUFBQVUsUUFBQSxFQUFBQyxZQUFBO0lBQUFDLFVBQUE7SUFBQUMsWUFBQTtFQUFBLE9BQUUsQ0FBQztFQUM3QkMsT0FBTyxDQUFDQyxHQUFHO0VBQ2IsT0FBTyxDQUFDVCxJQUFJLGdCQUFHSiw2REFBQSxDQUFDSCxrRUFBVTtJQUFBVyxRQUFBLEVBQUFDLFlBQUE7SUFBQUMsVUFBQTtJQUFBQyxZQUFBO0VBQUEsT0FBRSxDQUFDLEdBQUcsSUFBSTtBQUN0QztBQUFDVCxFQUFBLENBWnVCRCxZQUFZO0VBQUEsUUFDUlAsNkRBQU8sRUFDbEJFLGtEQUFTO0FBQUE7QUFBQWtCLEVBQUEsR0FGRmIsWUFBWTtBQUFBLElBQUFhLEVBQUE7QUFBQUMsWUFBQSxDQUFBRCxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9wYWdlcy9yZWdpc3Rlci5qcz9iNGMyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUF1dGggfSBmcm9tIFwiQC9hcHAvY29udGV4dC9BdXRoQ29udGV4dFwiO1xyXG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XHJcbmltcG9ydCBTaWdudXBGb3JtIGZyb20gXCJAL2FwcC9jb21wb25lbnRzL1NpZ251cEZvcm1cIjtcclxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIkAvYXBwL2NvbXBvbmVudHMvTG9hZGluZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVnaXN0ZXJQYWdlKCkge1xyXG4gIGNvbnN0IHsgdXNlciwgbG9hZGluZyB9ID0gdXNlQXV0aCgpO1xyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAodXNlciAmJiAhbG9hZGluZykge1xyXG4gICAgICByb3V0ZXIucHVzaChcIi9ob21lcGFnZVwiKTtcclxuICAgIH1cclxuICB9LCBbdXNlciwgbG9hZGluZywgcm91dGVyXSk7XHJcblxyXG4gIGlmIChsb2FkaW5nKSByZXR1cm4gPExvYWRpbmcgLz47XHJcbiAgICBjb25zb2xlLmxvZ1xyXG4gIHJldHVybiAhdXNlciA/IDxTaWdudXBGb3JtIC8+IDogbnVsbDtcclxufVxyXG4iXSwibmFtZXMiOlsidXNlQXV0aCIsInVzZUVmZmVjdCIsInVzZVJvdXRlciIsIlNpZ251cEZvcm0iLCJMb2FkaW5nIiwianN4REVWIiwiX2pzeERFViIsIlJlZ2lzdGVyUGFnZSIsIl9zIiwiX3VzZUF1dGgiLCJ1c2VyIiwibG9hZGluZyIsInJvdXRlciIsInB1c2giLCJmaWxlTmFtZSIsIl9qc3hGaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJjb2x1bW5OdW1iZXIiLCJjb25zb2xlIiwibG9nIiwiX2MiLCIkUmVmcmVzaFJlZyQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/register.js\n"));

/***/ })

});