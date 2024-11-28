const { getOneAccountByUserName } = require("../queries/accounts")

const checkUsernameProvided = (req, res, next) => {
    if (req.body?.username) {
        return next()
    } else {
        res.status(400).json({ error: "Username is required!" })
    }
}

const checkUsernameExists = async (req, res, next) => {
    const registeredAccount = await getOneAccountByUserName(req.body?.username)
    if (registeredAccount) {
        res.status(400).json({ error: "Account already registered with this username." })
    } else {
        next()
    }
}

const checkUsernameExistsOtherThanSelf = async (req, res, next) => {
    const { account_id } = req.params
    const registeredAccount = await getOneAccountByUserName(req.body?.username)
    if (registeredAccount?.account_id === Number(account_id) || !registeredAccount)
        return next()
    else
        res.status(400).json({ error: "Account already registered with this username." })
}

const checkEmailProvided = (req, res, next) => {
    if (req.body?.email) {
        return next()
    } else {
        res.status(400).json({ error: "Email is required!" })
    }
}

module.exports = {
    checkUsernameProvided,
    checkUsernameExists,
    checkUsernameExistsOtherThanSelf
}