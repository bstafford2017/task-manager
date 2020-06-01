import jwt from 'jsonwebtoken'
import config from '../config/keys.js'

export default function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if(!token) {
        return res.status(401).json({ msg: 'No token found. Access denied.' })
    }

    try {
        const decoded = jwt.verify(token, config.secret)
        req.user = decoded
        next()
    } catch(err) {
        res.status(400).json({ msg: 'Token is not valid.' })
    }
}