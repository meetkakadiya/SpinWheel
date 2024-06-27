const APIError = require('../helpers/APIError');
const resPattern = require('../helpers/resPattern');
const httpStatus = require('http-status');
const db = require('../index')
const query = require('../query/query');
const { ObjectId } = require('mongodb');

const userColl = db.collection('Usersname');

const addUserNames = async (req, res, next) => {
    try {

        let userData = req.body

        let registerUsers = await query.insert(userColl, userData)

        let obj = resPattern.successPattern(httpStatus.OK, registerUsers.ops, 'success');
        return res.status(obj.code).json(obj)

    } catch (e) {
        return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true));
    }
}

const getUserNames = async ( req, res, next) => {
    try {
        let allUsers = await userColl.find({}).toArray()

        let obj = resPattern.successPattern(httpStatus.OK, allUsers, 'success');
        return res.status(obj.code).json(obj)
    } catch (e) {
        return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true));
    }
}

const deleteUsernames = async ( req, res, next) => {
    try {
        let userId = req.params.id 

        let deleteUser = await query.deleteOne(userColl, {
            _id : ObjectId(userId)
        });
        let obj = resPattern.successPattern(httpStatus.OK, deleteUser, 'success');
        return res.status(obj.code).json(obj)

    } catch (e) {
        return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true));
    } 
}

module.exports = {
    addUserNames,
    getUserNames,
    deleteUsernames
}