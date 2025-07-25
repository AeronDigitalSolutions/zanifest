"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var router_1 = require("next/router");
var Login_module_css_1 = require("@/styles/components/Auth/Login.module.css");
var image_1 = require("next/image");
var react_2 = require("next-auth/react");
function Login() {
    var _this = this;
    var _a = react_1.useState(""), userName = _a[0], setUserName = _a[1];
    var _b = react_1.useState(""), password = _b[0], setPassword = _b[1];
    var _c = react_1.useState(false), showPassword = _c[0], setShowPassword = _c[1];
    var _d = react_1.useState(false), error = _d[0], setError = _d[1];
    var _e = react_1.useState(false), loading = _e[0], setLoading = _e[1];
    var _f = react_1.useState(""), email = _f[0], setEmail = _f[1];
    var router = router_1.useRouter();
    // async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    //   event.preventDefault();
    //   setLoading(true);
    //   if (userName === "admin" && password === "admin@123") {
    //     setError(false);
    //     router.push("/dashboard");
    //   } else {
    //     setError(true);
    //   }
    //   setLoading(false);
    // }
    //added by ashwina
    //   const onSubmit = async (e: React.FormEvent) => {
    //   e.preventDefault();
    //   const res = await fetch('/api/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   const data = await res.json();
    //   console.log(data);
    //   if (res.ok) {
    //     router.push("/dashboard");
    //   } else {
    //     alert(data.message);
    //   }
    // };
    //letting nextauth handle 
    var onSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, react_2.signIn("credentials", {
                            redirect: false,
                            email: email,
                            password: password
                        })];
                case 1:
                    res = _a.sent();
                    if (res === null || res === void 0 ? void 0 : res.ok) {
                        router.push("/dashboard");
                    }
                    else {
                        alert("Invalid credentials");
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: Login_module_css_1["default"].cont },
        React.createElement("div", { className: Login_module_css_1["default"].left },
            React.createElement(image_1["default"], { src: require("@/assets/loginbanner.png"), alt: "image", className: Login_module_css_1["default"].leftImage })),
        React.createElement("div", { className: Login_module_css_1["default"].loginCont },
            React.createElement("div", { className: Login_module_css_1["default"].formDiv },
                React.createElement("div", { className: Login_module_css_1["default"].logo },
                    React.createElement(image_1["default"], { src: require("@/assets/logo.png"), alt: "logo", className: Login_module_css_1["default"].logoImage })),
                React.createElement("h1", { className: Login_module_css_1["default"].heading }, "Get more things done with Loggin platform."),
                React.createElement("p", { className: Login_module_css_1["default"].headingp }, "Access to the most powerfull tool in the entire design and web industry."),
                React.createElement("form", { className: Login_module_css_1["default"].loginForm, onSubmit: onSubmit },
                    React.createElement("div", { className: Login_module_css_1["default"].error }, error && React.createElement("h4", null, "Invalid Credentials")),
                    React.createElement("div", { className: Login_module_css_1["default"].formInput },
                        React.createElement("input", { type: "text", name: "uname", id: "uname", placeholder: "E-mail Address", required: true, className: Login_module_css_1["default"].input, onChange: function (e) { return setEmail(e.target.value); } })),
                    React.createElement("div", { className: Login_module_css_1["default"].formInput },
                        React.createElement("input", { type: showPassword ? "text" : "password", name: "pass", id: "pass", placeholder: "Password", required: true, className: Login_module_css_1["default"].input, onChange: function (e) { return setPassword(e.target.value); } })),
                    React.createElement("div", { className: Login_module_css_1["default"].showPasswordDiv },
                        React.createElement("input", { type: "checkbox", id: "showP", className: Login_module_css_1["default"].passCheck, onClick: function () { return setShowPassword(!showPassword); } }),
                        React.createElement("label", { htmlFor: "showP" }, "Show Password")),
                    React.createElement("button", { className: Login_module_css_1["default"].loginButton, disabled: loading, type: "submit" }, loading ? "Loading" : "Login"),
                    React.createElement("p", { className: Login_module_css_1["default"].signupLink },
                        "Don't have an account?",
                        " ",
                        React.createElement("span", { className: Login_module_css_1["default"].signupText, onClick: function () { return router.push("/signup"); } }, "Sign Up")))))));
}
exports["default"] = Login;
