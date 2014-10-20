angular.module('ba.services').service('cmnSessionSvc', function () {

    function create(userId, username, sessionId, userRole) {
        this.id = sessionId;
        this.userId = userId;
        this.username = username;
    }

    function destroy() {
        this.id = null;
        this.userId = null;
        this.username = null;
    }
    return {
        create: create,
        destroy: destroy
    };
});