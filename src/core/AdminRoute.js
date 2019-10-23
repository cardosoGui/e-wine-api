const AdminRoute = async (req, res, next) => {

    if (!req.user || !req.user.isAdmin) {
        res.status(401).send()
        return
    }

    next()
}

module.exports = AdminRoute