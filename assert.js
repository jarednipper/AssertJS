/**
 * AssertJS
 * A JavaScript unit testing library.
 * @author Dan Cobb
 * @version 0.2
 * 
 * @example
 *  user.setName("John Doe");
 *  var name = user.getName();
 *  name.assertEquals("John Doe", "John's Name Check");
 * 
 * @example
 *  AssertJS.test(function () {
 *      var volume = getVolume();
 *      volume.assertGreaterThan(0);
 *      volume.assertLessThan(100);
 *  }, "Volume Test");
 * 
 * @example
 *  var shape = createShape();
 *  AssertJS.assert(function () {
 *      return (shape.color !== Color.GREEN);
 *  }, "Green shape found!");
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
 * @param {Object} pass The object to deep compare to.
 * @param {String} [message] Error message to display.
 * @returns {Boolean} True if assertion passed.
 * @since v0.2
 */
Object.prototype.assertEquals = function (pass, message) {
    message = (message) ? ("[" + message + "] ") : "";
    
    var valA = JSON.stringify(this);
    var valB = JSON.stringify(pass);
    
    return AssertJS.assert(
        function () {
            return (valA === valB);
        },
        message + this + " != " + pass,
        this,
        pass
    );
};


/**
 * @param {Object} pass The object to compare to.
 * @param {String} [message] Error message to display.
 * @returns {Boolean} True if assertion passed.
 * @since v0.2
 */
Object.prototype.assertGreaterThan = function (pass, message) {
    message = (message) ? ("[" + message + "] ") : "";
    var myVal = this;
    
    return AssertJS.assert(
        function () {
            return (myVal > pass);
        },
        message + this + " <= " + pass,
        this
    );
};


/**
 * @param {Object} pass The object to compare to.
 * @param {String} [message] Error message to display.
 * @returns {Boolean} True if assertion passed.
 * @since v0.2
 */
Object.prototype.assertLessThan = function (pass, message) {
    message = (message) ? ("[" + message + "] ") : "";
    var myVal = this;
    
    return AssertJS.assert(
        function () {
            return (myVal < pass);
        },
        message + this + " >= " + pass,
        this
    );
};


/**
 * @namespace Holds advanced testing behaviors.
 */
var AssertJS = new function () {
    /**
     * @description True if an assertion failed during a test.
     */
    var testError = false;
    
    return {
        /**
         * @param {Function} compare Function to do comparison.
         * @param {String} message Text to display on compare failure.
         * @param {Object} [found] Found value from test.
         * @param {Object} [expected] Expected value of test.
         * @returns {Boolean} True if assertion passed.
         * @since v0.2
         */
        assert: function (compare, message, found, expected) {
            if(compare()) {
                return true;
            } else {
                AssertJS.log(message, found, expected);
                return false;
            }
        },
        
        /**
         * @description A test is an atom of assertions to run to
         * completion before throwing an error if an assertion fails.
         * @param {Function} assertions Series of assertions to execute
         * for this test.
         * @param {String} [testName] Reference label for this test.
         * @throws {AssertError}
         * @since v0.2
         */
        test: function (assertions, testName) {
            testName = (testName) ? ("[" + testName + "] ") : "Test";
            testError = false;
            
            // Run the series of assertions.
            assertions();
            
            if(testError) {
                throw new AssertError(testName + " Failed");
            }
        },
        
        /**
         * @param {String} message Description of error.
         * @param {Object} [found] Found value from test.
         * @param {Object} [expected] Expected value of test.
         * @since v0.2
         */
        log: function (message, found, expected) {
            // Message for found value.
            if(found) {
                found = JSON.stringify(found);
                found = "\n\t   Found: " + found;
            } else {
                found = "";
            }
            // Message for expected value.
            if(expected) {
                expected = JSON.stringify(expected);
                expected = "\n\tExpected: " + expected;
            } else {
                expected = "";
            }
            
            testError = true;
            console.log("AssertError: " + message + found + expected);
        }
    };
};







