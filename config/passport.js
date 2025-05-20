const passport = require("passport");
const { Strategy } = require("passport-local");
const argon = require("argon2");
const prisma = require("./prisma");

passport.use(new Strategy(async function (credential, password, done) {

    const user = await prisma.users.findFirst({
        where: {
            OR: [{ email: credential }, { username: credential }]
        }
    });

    if (!user) {
        return done(null, false, { message: "invalid credentials" });
    }

    if (!await argon.verify(user.password, password)) {
        return done(null, false, { message: "invalid credentials" });
    }

    delete user.password;

    return done(null, user);
}));

passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    const user = await prisma.users.findUnique({ where: { id } });
    delete user.password;
    return done(null, user);
});