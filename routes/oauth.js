let express = require('express');
let router = express.Router();
let sc2 = require('steemconnect');
let config = require("../config");

let steem = sc2.Initialize({
    app: config.app_id,
    callbackURL: config.redirect_uri,
    scope: config.scopes
});

router.get('/login', (req, res) => {

    if (!req.query.access_token) {
        let uri = steem.getLoginURL();
        res.redirect(uri);
    } else {
        steem.setAccessToken(req.query.access_token);
        steem.me(function (err, response) {
            response.account.json_metadata = JSON.parse(response.account.json_metadata);
            response.access_token = req.query.access_token;
            req.session.steem = response;
            res.redirect("/")
        })
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect("/")
});

module.exports = router;
