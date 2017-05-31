/* Microsoft customization: Adding cookie related JS functions */

oxa = window.oxa || {};

(function (namespace) {
    namespace.cookieBanner = cookieBanner;
    var proto = cookieBanner.prototype;

    // constructor
    function cookieBanner() {
        var self = this;

        // track the user clicks, anchor/button and exclude the LearnMore link on the banner itself
        $(document).ready(function() {
            debugger;
            $("a, button").on("click", function() {
                if (this.id !== "btnPrivacy") {
                    self.closeCookieBanner();
                }
            });
        });
    };

    // sets the cookie given name, value and expiration days
    // it sets the cookie for all the sub pages of the site
    proto.setCookie = function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        // Need to set the path of the cookie so that it is accessible from the successor pages.
        // Otherwise the set cookie is not accessible by child pages causing the cookie-banner to show again uselessly
        // even if it was closed at a parent page.
        var path = "path=/";
        document.cookie = cname + "=" + cvalue + "; " + expires + "; " + path;
    };

    // gets the cookie value given the cookie name
    proto.getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "false";
    };

    // closes down the cookie banner by setting the cookie-banner cookie
    proto.closeCookieBanner = function () {
        debugger;
        var cookieContainer = document.getElementById("cookie-notice");
        if (cookieContainer) {
            cookieContainer.style.display = "none";
        }
        var navWrapper = document.getElementsByClassName("nav-wrapper");
        if (navWrapper.length > 0) {
            navWrapper[0].className = "nav-wrapper";
        }
        this.setCookie("cookie-banner", "true", 365);

        //unregister the anchor/button clicks so we don't keep tracking if the consent is already given
        $("a, button").off("click");
    };
}

(oxa));

var cookieNotice = new oxa.cookieBanner();
