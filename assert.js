/**
 * AssertJS
 * A JavaScript unit testing library.
 * @author Dan Cobb
 * @version 0.2.5
 * 
 * @example
 *  user.setName("John Doe");
 *  var name = user.getName();
 *  AssertJS.equals(name, "John Doe", "getName/0 Test");
 * 
 * @example
 *  $A.test(function () {
 *      var volume = getVolume();
 *      volume.assertGreaterThan(0);
 *      volume.assertLessThan(100);
 *  }, "Volume Test");
 * 
 * @example
 *  var shape = createShape();
 *  $A.assert(function () {
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
 * @namespace Holds all testing behaviors.
 * @since v0.2.5
 */
var AssertJS = new function () {
    /**
     * @description True if an assertion failed during a test.
     * @since v0.2
     */
    var testError = false;
    
    
    /**
     * @param {String} message Description of error.
     * @param {Object} [found] Found value from test.
     * @param {Object} [expected] Expected value of test.
     * @since v0.2.5
     */
    var log = function (message, found, expected) {
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
    };
    
    
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
                log(message, found, expected);
                return false;
            }
        },
        
        
        /**
         * @param {Object} test The object under test.
         * @param {Object} pass The object to deep compare to.
         * @param {String} [message] Error message to display.
         * @returns {Boolean} True if assertion passed.
         * @since v0.2.5
         */
        equals: function (test, pass, message) {
            message = (message) ? ("[" + message + "] ") : "";
            
            var valA = JSON.stringify(test);
            var valB = JSON.stringify(pass);
            
            return AssertJS.assert(
                function () {
                    return (valA === valB);
                },
                message + test + " != " + pass,
                test,
                pass
            );
        },
        
        
        /**
         * @param {Object} test The object under test.
         * @param {Object} pass The object to compare to.
         * @param {String} [message] Error message to display.
         * @returns {Boolean} True if assertion passed.
         * @since v0.2.5
         */
        greaterThan: function (test, pass, message) {
            message = (message) ? ("[" + message + "] ") : "";
            
            return AssertJS.assert(
                function () {
                    return (test > pass);
                },
                message + test + " <= " + pass,
                test
            );
        },
        
        
        /**
         * @param {Object} test The object under test.
         * @param {Object} pass The object to compare to.
         * @param {String} [message] Error message to display.
         * @returns {Boolean} True if assertion passed.
         * @since v0.2.5
         */
        lessThan: function (test, pass, message) {
            message = (message) ? ("[" + message + "] ") : "";
            
            return AssertJS.assert(
                function () {
                    return (test < pass);
                },
                message + test + " >= " + pass,
                test
            );
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
        }
    };
};


/**
 * @description Shortcut for AssertJS.
 * @since v0.2.5
 */
var $A = AssertJS;





