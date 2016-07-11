/*
Compass- is copywritten 2016 Joshua Carroll.
It is released under the MIT License.  Basically it lets you do anything you want with the code as 
long as you provide attribution back to me and don't hold me liable.

https://github.com/JoshuaCarroll/Compass-/
*/

var _objGlobalCompassForCallbackFunctions;
function Compass (canvasElementId) {
    
    // Please do not hot link to my Dropbox in production.
    document.getElementById(canvasElementId).style.backgroundImage = "url(https://dl.dropboxusercontent.com/u/20650772/compass.png)";
    this.needleImageURL = "https://dl.dropboxusercontent.com/u/20650772/needle.png";
    
    // --------------------------------------------
    this.debugMode = false;
    
    this.needle =  null;
    this.ctx = null;
    this.currentAzimuth =  0;
    this.canvas = document.getElementById(canvasElementId);
    this.timeout = null;

    this.clearCanvas = function() {
        this.ctx.clearRect(0, 0, 200, 200);
    };
    
    this.calculateDegreeDifference = function (a,b) {
        var delta = 0;

        if (a <= b) {
            var d1 = b - a;
            var d2 = 360 + a - b;
            if (d1 < d2) { 
                delta = d1;
            } 
            else {
                delta = d2 * -1;
            }
        }
        else {
            var d1 = a - b;
            var d2 = 360 + b - a;
            if (d1 < d2) { 
                delta = d1 * -1;
            } 
            else {
                delta = d2;
            }
        }
        return delta;
    };
    
    this.animateCompass = function (target) {
        target = Math.round(target);
        var objCompass = _objGlobalCompassForCallbackFunctions;

        if (objCompass.timeout) {
            clearTimeout(objCompass.timeout);
        }
        
        if (target != objCompass.currentAzimuth) { 
            var delta = objCompass.calculateDegreeDifference(objCompass.currentAzimuth, target);

            if (delta != 0) {
                var nextStep = (delta > 0 ? objCompass.currentAzimuth+1 : objCompass.currentAzimuth-1);
                objCompass.setCompass(nextStep);
                var interval = Math.round((180 - Math.abs(delta)) / 15);

                objCompass.debug("target = " + target + "\tdelta = " + delta + "\tnextStep = " + nextStep + "\tinterval = " + interval);

                objCompass.timeout = setTimeout(objCompass.animateCompass, interval, target);
            }
        }
    };
    
    this.setCompass = function (degrees) {
        this.debug("setCompass(" + degrees + ")");
        
        this.clearCanvas();
        this.ctx.save();
        this.ctx.translate(100, 100);
        this.ctx.rotate(degrees * (Math.PI / 180));
        this.ctx.drawImage(this.needle, -100, -100);
        this.ctx.restore();
        this.currentAzimuth = degrees;
    };
    
    this.log = function (str) {
        if (_objGlobalCompassForCallbackFunctions.debugMode) {
            if(typeof console === "undefined") {
                console = {
                    log: function() { }
                };
            }
            else {
                console.log(str);
            }
        }
    };
    
    this.error = function (str) {
        if (_objGlobalCompassForCallbackFunctions.debugMode) {
            if(typeof console === "undefined") {
                console = {
                    error: function(str) { 
                        alert("Error:\r\n\r\n" + str);
                    }
                };
            }
            else {
                console.error(str);
            }
        }
    };
    
    this.debug = function (str) {
        if (_objGlobalCompassForCallbackFunctions.debugMode) {
            if(typeof console === "undefined") {
                console = {
                    debug: function() { }
                };
            }
            else {
                console.debug(str);
            }
        }
    };
    
    // CONTRUCTOR METHOD
    _objGlobalCompassForCallbackFunctions = this;
    
    if (this.canvas.getContext('2d')) {
        this.ctx = this.canvas.getContext('2d');

        this.needle = new Image();
        this.needle.src = this.needleImageURL;
        this.needle.onload = function() {
            _objGlobalCompassForCallbackFunctions.setCompass(1);
        };
    } else {
        this.error("HTML5 canvas is not supported in this browser. Please upgrade to use it.");
        return false;
    }
}
