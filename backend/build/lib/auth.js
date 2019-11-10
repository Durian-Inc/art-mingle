"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authChecker = async ({ context }, roles) => {
    const user = context.state.user;
    if (process.env.NODE_ENV === "development") {
        const username = user ? user.email : undefined;
        console.debug("[auth] Skipping permission check (development mode)...");
        console.info(`[auth] Currently logged in as ${username}`);
        return true;
    }
    if (roles.length === 0) {
        return user !== undefined;
    }
    if (context.state.scope) {
        const scopes = context.state.scope.split(" ");
        if (scopes.includes("all")) {
            return true;
        }
        if (scopes.some((scope) => roles.includes(scope))) {
            return true;
        }
    }
    if (!user) {
        return false;
    }
    return false;
};
