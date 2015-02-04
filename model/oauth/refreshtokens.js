module.exports = function(app) {

    var _log      = app.system.logger;
    var mongoose  = app.core.mongo.mongoose;
    var ObjectId  = mongoose.Schema.Types.ObjectId;
    var Inspector = app.lib.inspector;
    var query     = app.lib.query;

    var Schema = {
        refreshToken : {type: String, required: true, unique: true},
        clientId     : {type: String},
        userId       : {type: String, required: true},
        expires      : {type: Date}
    };

    var RefreshTokensSchema = app.core.mongo.db.Schema(Schema);

    // statics
    RefreshTokensSchema.method('getRefreshToken', function(refreshToken, cb) {
        var RefreshTokens = mongoose.model('Oauth_RefreshTokens');

        RefreshTokens.findOne({refreshToken: refreshToken}, function(err, token) {
            // node-oauth2-server defaults to .user or { id: userId }, but { id: userId} doesn't work
            // This is in node-oauth2-server/lib/grant.js on line 256
            if (token)
                token.user = token.userId;

            cb(err, token);
        });
    });

    RefreshTokensSchema.method('saveRefreshToken', function(token, clientId, expires, userId, cb) {
        var RefreshTokens = mongoose.model('Oauth_RefreshTokens');

        if (userId.id)
            userId = userId.id;

        var refreshToken = new RefreshTokens({
            refreshToken : token,
            clientId     : clientId,
            userId       : userId,
            expires      : expires
        });

        refreshToken.save(cb);
    });

    return mongoose.model('Oauth_RefreshTokens', RefreshTokensSchema);

};