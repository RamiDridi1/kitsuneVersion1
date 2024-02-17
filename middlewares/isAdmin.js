// middlewares/isAdmin.js
const isAdmin = (req, res, next) => {
    try {
        // Assuming user details are attached to the request object by the isAuth middleware
        const user = req.user;

        if (user && user.role === 'admin') {
            next();
        } else {
            return res.status(403).send({ msg: "Access Forbidden. Admins only." });
        }
    } catch (err) {
        console.error("Error in isAdmin middleware:", err);
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

module.exports = isAdmin;

