"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var logo_png_1 = require("@/assets/logo.png");
var createadmin_1 = require("@/components/superadminsidebar/createadmin");
var createmanager_1 = require("@/components/superadminsidebar/createmanager");
var createagent_1 = require("@/components/superadminsidebar/createagent");
var adminlist_1 = require("@/components/superadminsidebar/adminlist");
var managerlist_1 = require("@/components/superadminsidebar/managerlist");
var agentlist_1 = require("@/components/superadminsidebar/agentlist");
var navigation_1 = require("next/navigation");
var admindashboard_module_css_1 = require("@/styles/pages/admindashboard.module.css");
var fi_1 = require("react-icons/fi");
var AdminDashboard = function () {
    var handleLogout = function () {
        console.log("Logged out");
    };
    var router = navigation_1.useRouter();
    var _a = react_1.useState("dashboard"), activeSection = _a[0], setActiveSection = _a[1];
    return (react_1["default"].createElement("div", { className: admindashboard_module_css_1["default"].wrapper },
        react_1["default"].createElement("header", { className: admindashboard_module_css_1["default"].header },
            react_1["default"].createElement("div", { className: admindashboard_module_css_1["default"].logoContainer },
                react_1["default"].createElement(image_1["default"], { src: logo_png_1["default"], alt: "Logo", width: 130, height: 40, className: admindashboard_module_css_1["default"].logo })),
            react_1["default"].createElement("button", { className: admindashboard_module_css_1["default"].logoutButton, onClick: handleLogout }, "Logout")),
        react_1["default"].createElement("div", { className: admindashboard_module_css_1["default"].container },
            react_1["default"].createElement("aside", { className: admindashboard_module_css_1["default"].sidebar },
                react_1["default"].createElement("ul", { className: admindashboard_module_css_1["default"].navList },
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement(fi_1.FiUserPlus, null),
                        "dashboard"),
                    react_1["default"].createElement("li", { onClick: function () { return setActiveSection("createAdmin"); } },
                        react_1["default"].createElement(fi_1.FiUserPlus, null),
                        " Create Admin"),
                    react_1["default"].createElement("li", { onClick: function () { return setActiveSection("createManager"); } },
                        react_1["default"].createElement(fi_1.FiUserPlus, null),
                        " Create Manager"),
                    react_1["default"].createElement("li", { onClick: function () { return setActiveSection("createAgent"); } },
                        react_1["default"].createElement(fi_1.FiUserPlus, null),
                        " Create Agent"),
                    react_1["default"].createElement("li", { onClick: function () { return setActiveSection("adminList"); } },
                        react_1["default"].createElement(fi_1.FiList, null),
                        " Admin List"),
                    react_1["default"].createElement("li", { onClick: function () { return setActiveSection("managerlist"); } },
                        react_1["default"].createElement(fi_1.FiList, null),
                        " Manager List"),
                    react_1["default"].createElement("li", { onClick: function () { return setActiveSection("agentlist"); } },
                        react_1["default"].createElement(fi_1.FiList, null),
                        " Agents List"),
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement(fi_1.FiKey, null),
                        " Reset Password"),
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement(fi_1.FiLock, null),
                        " Change Password"))),
            react_1["default"].createElement("main", { className: admindashboard_module_css_1["default"].mainContent },
                activeSection === "dashboard" && (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement("div", { className: admindashboard_module_css_1["default"].card }, "Number of Admins: 5"),
                    react_1["default"].createElement("div", { className: admindashboard_module_css_1["default"].card }, "State Managers: 12"),
                    react_1["default"].createElement("div", { className: admindashboard_module_css_1["default"].card }, "District Managers: 48"),
                    react_1["default"].createElement("div", { className: admindashboard_module_css_1["default"].card }, "Agents: 105"))),
                activeSection === "createAdmin" && react_1["default"].createElement(createadmin_1["default"], null),
                activeSection === "createManager" && react_1["default"].createElement(createmanager_1["default"], null),
                activeSection === "createAgent" && react_1["default"].createElement(createagent_1["default"], null),
                activeSection === "adminList" && react_1["default"].createElement(adminlist_1["default"], null),
                activeSection === "managerlist" && react_1["default"].createElement(managerlist_1["default"], null),
                activeSection === "agentlist" && react_1["default"].createElement(agentlist_1["default"], null)))));
};
exports["default"] = AdminDashboard;
