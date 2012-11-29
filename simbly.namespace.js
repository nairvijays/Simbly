/***************************************************
    Author: Vijay S Nair
	URI: thewebstalker.tumblr.com
	Github: https://github.com/nairvijays/Simbly
***************************************************/

/*jslint browser: true*/

(function (win, un) {
    
    "use strict";
    
    /*
        @desc Declare a temp object and later assign it to window object
    */
    var NameSpace = {};
    
    /*
        @desc Check whether the Namespace starts with "window"
        @param array nsSplit - array of strings
        @return number - 1 if "window" is first array element else 0
    */
    function getStartIndex(nsSplit) {
        
		return (nsSplit[0] === "window") ? 1 : 0;
        
	}
    
    /*
        @desc Create's a Namespace object
        @param string - eg: "my.namespace.abc"
        @return object - empty object
    */
    function create(ns) {
        
        return (typeof ns === "string") ? (function () {
            
            var nsSplit = ns.split("."),
                nsIndex = getStartIndex(nsSplit),
                winTemp = win,
                nsName;

            for (nsIndex; nsIndex < nsSplit.length; nsIndex += 1) {
                nsName = nsSplit[nsIndex];
                winTemp[nsName] = winTemp[nsName] || {};
                winTemp = winTemp[nsName];
            }
            
            return winTemp;
            
        }()) : false;
    }
    
    /*
        @desc Create's a Namespace module
        @param string - eg: "my.namespace.abc"
        @param asignee - eg: function, string, array, number, boolean, object
        @return object - with value
    */
    function createNameSpaceModule(ns, asignee) {
        
        return (typeof ns === "string")  ? (function (ns) {
            
			var nsSplit = ns.split("."),
				lastIndex = nsSplit.length - 1,
				nsName = nsSplit[lastIndex],
                nsModule;
            
            nsSplit.splice(lastIndex, 1);
            nsSplit = nsSplit.join(".");
            nsModule = create(nsSplit);
            nsModule[nsName] = (typeof asignee !== un) ? asignee : null;
            
            return true;
            
		}(ns)) : false;
    }
    
    /*
        @desc Verify if a Namespace exist
        @param string - eg: "my.namespace.abc"
        @return boolean
    */
    function verifyNameSpace(ns) {
        
        return (typeof ns === "string")  ? (function (ns) {
            
			var nsSplit = ns.split("."),
				nsIndex = getStartIndex(nsSplit),
				winTemp = win,
                temp;
            
            for (nsIndex; nsIndex < nsSplit.length; nsIndex += 1) {
                
                temp = winTemp[nsSplit[nsIndex]];
                
                if (temp !== un) {
                    winTemp = temp;
                } else {
                    nsIndex = nsSplit.length;
                    return false;
                }
                
            }
            
            return true;
            
		}(ns)) : false;
    }
    
    
    /*
        @desc Create's a Namespace object
        @param string or array - eg: "my.namespace.abc" or ["my.namespace.abc","my.namespace.def",..]
        @return object
    */
    NameSpace.ns = function (ns) {
        
        return (typeof ns === "string") ? (function (ns) {
            
            var nsName = 0;
            
            if (ns instanceof Array) {
                
                for (nsName; nsName < ns.length; nsName += 1) {
                    create(ns[nsName]);
                }
                
                return true;
                
            } else if (typeof ns === "string") {
                
                return (typeof create(ns) === "object");
                
            }
            
        }(ns)) : false;
    };
    
    /*
        @desc Create's a Namespace module with asignee
        @param string eg: "my.namespace.abc"
        @param2 Any datatype
        @return object
    */
	NameSpace.nsModule = function (ns, asignee) {
		return (ns === un) ? false : createNameSpaceModule(ns, asignee);
	};

	/*
        @desc Verify if a Namespace exist
        @param string - eg: "my.namespace.abc"
        @return boolean
    */
	NameSpace.nsExist = function (ns) {
		return (ns === un) ? false : verifyNameSpace(ns);
	};
    
    /*
        @desc Assign NameSpace object to global window object
    */
    win.Simbly = Object.create(NameSpace);

}(window));
