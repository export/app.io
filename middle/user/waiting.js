function UserWaiting(req, res, next) {

    var _app      = req.app;
    var _env      = _app.get('env');
    var _resp     = _app.system.response.app;
    var _schema   = _app.lib.schema;
    var _userData = req.__userData;
    var paths     = ['/api/social', '/api/social/'];
    var pIndex    = paths.indexOf(req.path);
    
    // yukarıdaki path'ler için user data kontrol etmiyoruz
    if( pIndex == -1 && ! _userData ) {
        return next( _resp.Unauthorized({
            type: 'InvalidCredentials',
            errors: ['not found user data']
        }));
    }
    else if(_userData && _userData.is_enabled == 'No' && _userData.waiting_status == 'Waiting') {
        return next( _resp.Unauthorized({
            type: 'InvalidCredentials',
            errors: ['you are in the waiting list']
        }));
    }

    next();

}

module.exports = function(app) {
    return UserWaiting;
};