/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./lib/auth-context.tsx":
/*!******************************!*\
  !*** ./lib/auth-context.tsx ***!
  \******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/app */ \"firebase/app\");\n/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/analytics */ \"firebase/analytics\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_auth__WEBPACK_IMPORTED_MODULE_2__, firebase_app__WEBPACK_IMPORTED_MODULE_3__, firebase_analytics__WEBPACK_IMPORTED_MODULE_4__]);\n([firebase_auth__WEBPACK_IMPORTED_MODULE_2__, firebase_app__WEBPACK_IMPORTED_MODULE_3__, firebase_analytics__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\nconst firebaseConfig = {\n    apiKey: \"AIzaSyDYJpxwibPgJiH418xvjrLJXv_W6opaNbo\",\n    authDomain: \"atamagri-iot.firebaseapp.com\",\n    databaseURL: \"https://atamagri-iot-default-rtdb.asia-southeast1.firebasedatabase.app\",\n    projectId: \"atamagri-iot\",\n    storageBucket: \"atamagri-iot.firebasestorage.app\",\n    messagingSenderId: \"745512120451\",\n    appId: \"1:745512120451:web:6cfdd1aab20747f675ebb6\",\n    measurementId: \"G-XTB9N3NRDD\"\n};\n// Initialize Firebase\nconst app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_3__.getApps)().length === 0 ? (0,firebase_app__WEBPACK_IMPORTED_MODULE_3__.initializeApp)(firebaseConfig) : (0,firebase_app__WEBPACK_IMPORTED_MODULE_3__.getApp)();\nconst auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)(app);\n// Initialize Analytics (only in browser)\nif (false) {}\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);\nconst useAuth = ()=>{\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n    if (context === undefined) {\n        throw new Error('useAuth must be used within an AuthProvider');\n    }\n    return context;\n};\nconst AuthProvider = ({ children })=>{\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [isAdmin, setIsAdmin] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"AuthProvider.useEffect\": ()=>{\n            const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.onAuthStateChanged)(auth, {\n                \"AuthProvider.useEffect.unsubscribe\": async (user)=>{\n                    setUser(user);\n                    // Check if user is admin using custom claims\n                    if (user) {\n                        try {\n                            const idTokenResult = await user.getIdTokenResult();\n                            const adminClaim = idTokenResult.claims.admin === true || idTokenResult.claims.admin === 'true';\n                            setIsAdmin(adminClaim);\n                            // Fallback to email check for backward compatibility\n                            if (!adminClaim && user.email === 'admin@atamagri.com') {\n                                setIsAdmin(true);\n                            }\n                        } catch (error) {\n                            console.error('Error checking admin status:', error);\n                            // Fallback to email check\n                            if (user.email === 'admin@atamagri.com') {\n                                setIsAdmin(true);\n                            } else {\n                                setIsAdmin(false);\n                            }\n                        }\n                    } else {\n                        setIsAdmin(false);\n                    }\n                    setLoading(false);\n                }\n            }[\"AuthProvider.useEffect.unsubscribe\"]);\n            return unsubscribe;\n        }\n    }[\"AuthProvider.useEffect\"], []);\n    const signIn = async (email, password)=>{\n        try {\n            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithEmailAndPassword)(auth, email, password);\n            router.push('/dashboard');\n        } catch (error) {\n            console.error('Sign in error:', error);\n            throw error;\n        }\n    };\n    const signUp = async (email, password)=>{\n        try {\n            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.createUserWithEmailAndPassword)(auth, email, password);\n            router.push('/dashboard');\n        } catch (error) {\n            console.error('Sign up error:', error);\n            throw error;\n        }\n    };\n    const createUser = async (email, password)=>{\n        try {\n            // Store current user info\n            const currentUser = auth.currentUser;\n            // Create new user\n            const userCredential = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.createUserWithEmailAndPassword)(auth, email, password);\n            // Sign out the newly created user\n            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signOut)(auth);\n            // If there was a current user (admin), sign them back in\n            // Note: In production, use Firebase Admin SDK via Cloud Functions instead\n            if (currentUser && currentUser.email) {\n                // Admin will need to re-authenticate after creating a user\n                // This is a limitation of client-side user creation\n                router.push('/login?message=User created successfully. Please sign in again.');\n            }\n        } catch (error) {\n            console.error('Create user error:', error);\n            throw error;\n        }\n    };\n    const logout = async ()=>{\n        try {\n            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signOut)(auth);\n            router.push('/login');\n        } catch (error) {\n            console.error('Logout error:', error);\n            throw error;\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            loading,\n            isAdmin,\n            signIn,\n            signUp,\n            createUser,\n            logout\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"D:\\\\Klimacek\\\\Klimacek-main\\\\lib\\\\auth-context.tsx\",\n        lineNumber: 154,\n        columnNumber: 5\n    }, undefined);\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU1JLGNBQWMvQixLQUFLK0IsV0FBVztZQUVwQyxrQkFBa0I7WUFDbEIsTUFBTUMsaUJBQWlCLE1BQU05RCw2RUFBOEJBLENBQUM4QixNQUFNdUIsT0FBT0k7WUFFekUsa0NBQWtDO1lBQ2xDLE1BQU14RCxzREFBT0EsQ0FBQzZCO1lBRWQseURBQXlEO1lBQ3pELDBFQUEwRTtZQUMxRSxJQUFJK0IsZUFBZUEsWUFBWVIsS0FBSyxFQUFFO2dCQUNwQywyREFBMkQ7Z0JBQzNELG9EQUFvRDtnQkFDcERQLE9BQU9ZLElBQUksQ0FBQztZQUNkO1FBRUYsRUFBRSxPQUFPSixPQUFPO1lBQ2RDLFFBQVFELEtBQUssQ0FBQyxzQkFBc0JBO1lBQ3BDLE1BQU1BO1FBQ1I7SUFDRjtJQUVBLE1BQU1TLFNBQVM7UUFDYixJQUFJO1lBQ0YsTUFBTTlELHNEQUFPQSxDQUFDNkI7WUFDZGdCLE9BQU9ZLElBQUksQ0FBQztRQUNkLEVBQUUsT0FBT0osT0FBTztZQUNkQyxRQUFRRCxLQUFLLENBQUMsaUJBQWlCQTtZQUMvQixNQUFNQTtRQUNSO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ3JCLFlBQVkrQixRQUFRO1FBQUNDLE9BQU87WUFBRXpCO1lBQU1FO1lBQVNFO1lBQVNZO1lBQVFHO1lBQVFDO1lBQVlHO1FBQU87a0JBQ3ZGeEI7Ozs7OztBQUdQLEVBQUUiLCJzb3VyY2VzIjpbIkQ6XFxLbGltYWNla1xcS2xpbWFjZWstbWFpblxcbGliXFxhdXRoLWNvbnRleHQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgZ2V0QXV0aCxcbiAgc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQsXG4gIGNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCxcbiAgc2lnbk91dCxcbiAgb25BdXRoU3RhdGVDaGFuZ2VkLFxuICBVc2VyXG59IGZyb20gJ2ZpcmViYXNlL2F1dGgnO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZUFwcCwgZ2V0QXBwcywgZ2V0QXBwIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcbmltcG9ydCB7IGdldEFuYWx5dGljcywgaXNTdXBwb3J0ZWQgfSBmcm9tICdmaXJlYmFzZS9hbmFseXRpY3MnO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xuXG5jb25zdCBmaXJlYmFzZUNvbmZpZyA9IHtcbiAgYXBpS2V5OiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9BUElfS0VZLFxuICBhdXRoRG9tYWluOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9BVVRIX0RPTUFJTixcbiAgZGF0YWJhc2VVUkw6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX0RBVEFCQVNFX1VSTCxcbiAgcHJvamVjdElkOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9QUk9KRUNUX0lELFxuICBzdG9yYWdlQnVja2V0OiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9TVE9SQUdFX0JVQ0tFVCxcbiAgbWVzc2FnaW5nU2VuZGVySWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX01FU1NBR0lOR19TRU5ERVJfSUQsXG4gIGFwcElkOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9BUFBfSUQsXG4gIG1lYXN1cmVtZW50SWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX01FQVNVUkVNRU5UX0lEXG59O1xuXG4vLyBJbml0aWFsaXplIEZpcmViYXNlXG5jb25zdCBhcHAgPSBnZXRBcHBzKCkubGVuZ3RoID09PSAwID8gaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZykgOiBnZXRBcHAoKTtcbmNvbnN0IGF1dGggPSBnZXRBdXRoKGFwcCk7XG5cbi8vIEluaXRpYWxpemUgQW5hbHl0aWNzIChvbmx5IGluIGJyb3dzZXIpXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgaXNTdXBwb3J0ZWQoKS50aGVuKChzdXBwb3J0ZWQpID0+IHtcbiAgICBpZiAoc3VwcG9ydGVkKSB7XG4gICAgICBnZXRBbmFseXRpY3MoYXBwKTtcbiAgICB9XG4gIH0pO1xufVxuXG5pbnRlcmZhY2UgQXV0aENvbnRleHRUeXBlIHtcbiAgdXNlcjogVXNlciB8IG51bGw7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG4gIGlzQWRtaW46IGJvb2xlYW47XG4gIHNpZ25JbjogKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD47XG4gIHNpZ25VcDogKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD47XG4gIGNyZWF0ZVVzZXI6IChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBsb2dvdXQ6ICgpID0+IFByb21pc2U8dm9pZD47XG59XG5cbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxBdXRoQ29udGV4dFR5cGUgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG5cbmV4cG9ydCBjb25zdCB1c2VBdXRoID0gKCkgPT4ge1xuICBjb25zdCBjb250ZXh0ID0gdXNlQ29udGV4dChBdXRoQ29udGV4dCk7XG4gIGlmIChjb250ZXh0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZUF1dGggbXVzdCBiZSB1c2VkIHdpdGhpbiBhbiBBdXRoUHJvdmlkZXInKTtcbiAgfVxuICByZXR1cm4gY29udGV4dDtcbn07XG5cbmV4cG9ydCBjb25zdCBBdXRoUHJvdmlkZXI6IFJlYWN0LkZDPHsgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZSB9PiA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGU8VXNlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2lzQWRtaW4sIHNldElzQWRtaW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gb25BdXRoU3RhdGVDaGFuZ2VkKGF1dGgsIGFzeW5jICh1c2VyKSA9PiB7XG4gICAgICBzZXRVc2VyKHVzZXIpO1xuXG4gICAgICAvLyBDaGVjayBpZiB1c2VyIGlzIGFkbWluIHVzaW5nIGN1c3RvbSBjbGFpbXNcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgaWRUb2tlblJlc3VsdCA9IGF3YWl0IHVzZXIuZ2V0SWRUb2tlblJlc3VsdCgpO1xuICAgICAgICAgIGNvbnN0IGFkbWluQ2xhaW0gPSBpZFRva2VuUmVzdWx0LmNsYWltcy5hZG1pbiA9PT0gdHJ1ZSB8fCBpZFRva2VuUmVzdWx0LmNsYWltcy5hZG1pbiA9PT0gJ3RydWUnO1xuICAgICAgICAgIHNldElzQWRtaW4oYWRtaW5DbGFpbSk7XG5cbiAgICAgICAgICAvLyBGYWxsYmFjayB0byBlbWFpbCBjaGVjayBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgICAgICAgIGlmICghYWRtaW5DbGFpbSAmJiB1c2VyLmVtYWlsID09PSAnYWRtaW5AYXRhbWFncmkuY29tJykge1xuICAgICAgICAgICAgc2V0SXNBZG1pbih0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY2hlY2tpbmcgYWRtaW4gc3RhdHVzOicsIGVycm9yKTtcbiAgICAgICAgICAvLyBGYWxsYmFjayB0byBlbWFpbCBjaGVja1xuICAgICAgICAgIGlmICh1c2VyLmVtYWlsID09PSAnYWRtaW5AYXRhbWFncmkuY29tJykge1xuICAgICAgICAgICAgc2V0SXNBZG1pbih0cnVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0SXNBZG1pbihmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRJc0FkbWluKGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdW5zdWJzY3JpYmU7XG4gIH0sIFtdKTtcblxuICBjb25zdCBzaWduSW4gPSBhc3luYyAoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChhdXRoLCBlbWFpbCwgcGFzc3dvcmQpO1xuICAgICAgcm91dGVyLnB1c2goJy9kYXNoYm9hcmQnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignU2lnbiBpbiBlcnJvcjonLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2lnblVwID0gYXN5bmMgKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKGF1dGgsIGVtYWlsLCBwYXNzd29yZCk7XG4gICAgICByb3V0ZXIucHVzaCgnL2Rhc2hib2FyZCcpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdTaWduIHVwIGVycm9yOicsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjcmVhdGVVc2VyID0gYXN5bmMgKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gU3RvcmUgY3VycmVudCB1c2VyIGluZm9cbiAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gYXV0aC5jdXJyZW50VXNlcjtcblxuICAgICAgLy8gQ3JlYXRlIG5ldyB1c2VyXG4gICAgICBjb25zdCB1c2VyQ3JlZGVudGlhbCA9IGF3YWl0IGNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChhdXRoLCBlbWFpbCwgcGFzc3dvcmQpO1xuXG4gICAgICAvLyBTaWduIG91dCB0aGUgbmV3bHkgY3JlYXRlZCB1c2VyXG4gICAgICBhd2FpdCBzaWduT3V0KGF1dGgpO1xuXG4gICAgICAvLyBJZiB0aGVyZSB3YXMgYSBjdXJyZW50IHVzZXIgKGFkbWluKSwgc2lnbiB0aGVtIGJhY2sgaW5cbiAgICAgIC8vIE5vdGU6IEluIHByb2R1Y3Rpb24sIHVzZSBGaXJlYmFzZSBBZG1pbiBTREsgdmlhIENsb3VkIEZ1bmN0aW9ucyBpbnN0ZWFkXG4gICAgICBpZiAoY3VycmVudFVzZXIgJiYgY3VycmVudFVzZXIuZW1haWwpIHtcbiAgICAgICAgLy8gQWRtaW4gd2lsbCBuZWVkIHRvIHJlLWF1dGhlbnRpY2F0ZSBhZnRlciBjcmVhdGluZyBhIHVzZXJcbiAgICAgICAgLy8gVGhpcyBpcyBhIGxpbWl0YXRpb24gb2YgY2xpZW50LXNpZGUgdXNlciBjcmVhdGlvblxuICAgICAgICByb3V0ZXIucHVzaCgnL2xvZ2luP21lc3NhZ2U9VXNlciBjcmVhdGVkIHN1Y2Nlc3NmdWxseS4gUGxlYXNlIHNpZ24gaW4gYWdhaW4uJyk7XG4gICAgICB9XG5cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignQ3JlYXRlIHVzZXIgZXJyb3I6JywgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGxvZ291dCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgc2lnbk91dChhdXRoKTtcbiAgICAgIHJvdXRlci5wdXNoKCcvbG9naW4nKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignTG9nb3V0IGVycm9yOicsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxBdXRoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17eyB1c2VyLCBsb2FkaW5nLCBpc0FkbWluLCBzaWduSW4sIHNpZ25VcCwgY3JlYXRlVXNlciwgbG9nb3V0IH19PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQXV0aENvbnRleHQuUHJvdmlkZXI+XG4gICk7XG59OyJdLCJuYW1lcyI6WyJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJnZXRBdXRoIiwic2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQiLCJjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQiLCJzaWduT3V0Iiwib25BdXRoU3RhdGVDaGFuZ2VkIiwiaW5pdGlhbGl6ZUFwcCIsImdldEFwcHMiLCJnZXRBcHAiLCJnZXRBbmFseXRpY3MiLCJpc1N1cHBvcnRlZCIsInVzZVJvdXRlciIsImZpcmViYXNlQ29uZmlnIiwiYXBpS2V5IiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQSV9LRVkiLCJhdXRoRG9tYWluIiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfQVVUSF9ET01BSU4iLCJkYXRhYmFzZVVSTCIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX0RBVEFCQVNFX1VSTCIsInByb2plY3RJZCIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX1BST0pFQ1RfSUQiLCJzdG9yYWdlQnVja2V0IiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfU1RPUkFHRV9CVUNLRVQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX01FU1NBR0lOR19TRU5ERVJfSUQiLCJhcHBJZCIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQUF9JRCIsIm1lYXN1cmVtZW50SWQiLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9NRUFTVVJFTUVOVF9JRCIsImFwcCIsImxlbmd0aCIsImF1dGgiLCJ0aGVuIiwic3VwcG9ydGVkIiwiQXV0aENvbnRleHQiLCJ1bmRlZmluZWQiLCJ1c2VBdXRoIiwiY29udGV4dCIsIkVycm9yIiwiQXV0aFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJ1c2VyIiwic2V0VXNlciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiaXNBZG1pbiIsInNldElzQWRtaW4iLCJyb3V0ZXIiLCJ1bnN1YnNjcmliZSIsImlkVG9rZW5SZXN1bHQiLCJnZXRJZFRva2VuUmVzdWx0IiwiYWRtaW5DbGFpbSIsImNsYWltcyIsImFkbWluIiwiZW1haWwiLCJlcnJvciIsImNvbnNvbGUiLCJzaWduSW4iLCJwYXNzd29yZCIsInB1c2giLCJzaWduVXAiLCJjcmVhdGVVc2VyIiwiY3VycmVudFVzZXIiLCJ1c2VyQ3JlZGVudGlhbCIsImxvZ291dCIsIlByb3ZpZGVyIiwidmFsdWUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./lib/auth-context.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_tailwind_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/tailwind.css */ \"(pages-dir-node)/./styles/tailwind.css\");\n/* harmony import */ var _styles_tailwind_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_tailwind_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_auth_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/auth-context */ \"(pages-dir-node)/./lib/auth-context.tsx\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_auth_context__WEBPACK_IMPORTED_MODULE_3__]);\n_lib_auth_context__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_lib_auth_context__WEBPACK_IMPORTED_MODULE_3__.AuthProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"D:\\\\Klimacek\\\\Klimacek-main\\\\pages\\\\_app.tsx\",\n            lineNumber: 9,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"D:\\\\Klimacek\\\\Klimacek-main\\\\pages\\\\_app.tsx\",\n        lineNumber: 8,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNnQztBQUNEO0FBQ29CO0FBRXBDLFNBQVNDLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQVk7SUFDOUQscUJBQ0UsOERBQUNILDJEQUFZQTtrQkFDWCw0RUFBQ0U7WUFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7OztBQUc5QiIsInNvdXJjZXMiOlsiRDpcXEtsaW1hY2VrXFxLbGltYWNlay1tYWluXFxwYWdlc1xcX2FwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcbmltcG9ydCAnLi4vc3R5bGVzL3RhaWx3aW5kLmNzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuLi9saWIvYXV0aC1jb250ZXh0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxBdXRoUHJvdmlkZXI+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC9BdXRoUHJvdmlkZXI+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiQXV0aFByb3ZpZGVyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "(pages-dir-node)/./styles/tailwind.css":
/*!*****************************!*\
  !*** ./styles/tailwind.css ***!
  \*****************************/
/***/ (() => {



/***/ }),

/***/ "firebase/analytics":
/*!*************************************!*\
  !*** external "firebase/analytics" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/analytics");;

/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/app");;

/***/ }),

/***/ "firebase/auth":
/*!********************************!*\
  !*** external "firebase/auth" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/auth");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("(pages-dir-node)/./pages/_app.tsx")));
module.exports = __webpack_exports__;

})();