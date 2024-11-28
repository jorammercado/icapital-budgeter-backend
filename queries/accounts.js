const db = require("../db/dbConfig.js")

const getOneAccount = async (id) => {
    try {
        const account = await db.one(`SELECT * FROM accounts WHERE account_id=$1`, id)
        return account
    } catch (err) {
        return { err: `${err}, sql query error - get one account` }
    }
}

const getAllAccounts = async () => {
    try {
        const allAccounts = await db.any(`SELECT * FROM accounts`)
        return allAccounts
    }
    catch (err) {
        return { err: `${err}, sql query error - get all accounts` }
    }
}

const getOneAccountByEmail = async ( email ) => {
    try {
        const account = await db.oneOrNone("SELECT * FROM accounts WHERE email=$1",
            email)
        return account
    }
    catch (err) {
        return { err: `${err}, sql query error - get one account by email` }
    }
}

const getOneAccountByUserName = async ( username ) => {
    try {
        const account = await db.oneOrNone("SELECT * FROM accounts WHERE username=$1",
            username)
        return account
    }
    catch (err) {
        return { err: `${err}, sql query error - get one account by username` }
    }
}

const createAccount = async (user) => {
    try {
        const createdUser = await db.one(`INSERT INTO accounts (firstname,` +
            ` lastname,` +
            ` email,` +
            ` password_hashed,` +
            ` username,` +
            ` profile_img,` +
            ` about,` +
            ` dob) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [user.firstname,
            user.lastname,
            user.email,
            user.password,
            user.username,
            user.profile_img,
            user.about,
            user.dob])
        return createdUser
    }
    catch (err) {
        return { err: `${err}, sql query error - create user` }
    }
}

const deleteAccountByUsername = async (username) => {
    try {
        const deletedAccount = await db.one(
            `DELETE FROM accounts WHERE username=$1 RETURNING *`,
            username
        )
        return deletedAccount
    }
    catch (err) {
        return { err: `${err}, sql query error in deleting an account` }
    }
}

const deleteAccountByAccountID = async (account_id) => {
    try {
        const deletedAccount = await db.one(
            `DELETE FROM accounts WHERE account_id=$1 RETURNING *`,
            account_id
        )
        return deletedAccount
    }
    catch (err) {
        return { err: `${err}, sql query error in deleting an account` }
    }
}

const updateAccount = async (account_id, account) => {
    try {
        const { firstname, lastname, profile_img, about, dob, username, email } = account
        const updatedAccount = await db.one(
            `UPDATE accounts SET firstname=$1, lastname=$2, ` +
            `profile_img=$3, about=$4, dob=$5, username=$6, email=$7 WHERE account_id=$8 ` +
            `RETURNING *`,
            [firstname, lastname, profile_img, about, dob, username, email, account_id]
        )
        return updatedAccount
    }
    catch (err) {
        return { err: `${err}, sql query error in updating an account` }
    }
}

module.exports = {
    getOneAccount,
    getAllAccounts,
    getOneAccountByEmail,
    getOneAccountByUserName,
    createAccount,
    deleteAccountByUsername,
    deleteAccountByAccountID,
    updateAccount
}