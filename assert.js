/**
 * AssertJS
 * A JavaScript unit testing library.
 * @author Dan Cobb
 * @version 0.1
 */


/**
 * @param {String} [message] Description of this error.
 * @since v0.1
 * @constructor
 */
function AssertError(message) {
    message = message || "";
    
    // Inherit from Error
    var error = new Error(message);
    error.name = "AssertError";
    return error;
}


/**
 * @param {Function} compare Function to do comparison.
 * @param {String} errorText Text to display on compare failure.
 * @throws {AssertError}
 * @since v0.1
 */
Object.prototype.assert = function (compare, errorText) {
    if(!compare()) {
        throw new AssertError(errorText);
    }
};


/**
 * @param {Object} pass The object to deep compare to.
 * @param {String} [message] Error message to display.
 * @throws {AssertError}
 * @since v0.1
 */
Object.prototype.assertEquals = function (pass, message) {
    message = (message) ? ("[" + message + "] ") : "";
    
    if(this.valueOf() !== pass) {
        throw new AssertError(
            message + this + " != " + pass
        );
    }
};


/**
 * @param {Object} pass The object to compare to.
 * @param {String} [message] Error message to display.
 * @throws {AssertError}
 * @since v0.1
 */
Object.prototype.assertGreaterThan = function (pass, message) {
    message = (message) ? ("[" + message + "] ") : "";
    
    if(this.valueOf() <= pass) {
        throw new AssertError(
            message + this + " <= " + pass
        );
    }
};


/**
 * @param {Object} pass The object to compare to.
 * @param {String} [message] Error message to display.
 * @throws {AssertError}
 * @since v0.1
 */
Object.prototype.assertLessThan = function (pass, message) {
    message = (message) ? ("[" + message + "] ") : "";
    
    if(this.valueOf() >= pass) {
        throw new AssertError(
            message + this + " >= " + pass
        );
    }
};


/**
 * @namespace Holds advanced testing behaviors.
 */
var AssertJS = new function () {
    return {
        /**
         * @param {Function} assertions Series of assertions to execute for this test.
         * @param {String} [testName] Reference label for this test.
         * @since v0.1
         */
        run: function (assertions, testName) {
            testName = (testName) ? (" on test " + testName + ": ") : ": ";
            
            try {
                assertions();
            } catch(err) {
                console.log(err.name + testName + err.message);
            }
        }
    };
};







