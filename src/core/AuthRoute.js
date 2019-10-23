const AuthRoute = async (req, res, next) => {

    if (req.url.match(/\/public/)) {
        next()
        return
    }

    let id
    
    try {
        const token = (req.headers['authorization'] || "").replace("Bearer ", "")
        const payload = App.Core.JWT.decode(token)
        ;({ id } = payload)
    }
    catch (e) {
	    console.log('JWT ERR -', e)
        res.status(401).send()
        return
    }

    req.user = await App.Services.User.getInfo(id)

    if (!req.user) {
        res.status(401).send()
        return
    }

    next()
}

module.exports = AuthRoute