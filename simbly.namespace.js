/***************************************************
    Author: Vijay S Nair
	URI: thewebstalker.tumblr.com
	Github: https://github.com/nairvijays/Simbly
***************************************************/

(function(daddy, undefined){

	var NameSpace = {};

	// Create NameSpace
	NameSpace.Create = function(nameSpace){
		var returnList = [];
		return (nameSpace === undefined) ? false :
					(nameSpace instanceof Array) ? (function(){
														for(var i in nameSpace) {
															if(typeof(nameSpace[i]) != "string") continue;
															create(nameSpace[i]);
														}
														return true;
													}()) : create(nameSpace);
	}

	// Create a NamseSpaced module
	NameSpace.CreateModule = function(nameSpace, newValue) {
		return (nameSpace === undefined || newValue === undefined) ? false : createModule(nameSpace, newValue);
	}

	// Verify NamseSpace
	NameSpace.Verify = function(nameSpace) {
		return (nameSpace === undefined) ? false : verify(nameSpace);
	}

	function create(nameSpace){
		return (typeof nameSpace === "string") ? (function(){
				var objectsList = nameSpace.split("."),
					startWith = getStartIndex(objectsList),
					current = daddy;
			        for (var i = startWith; i < objectsList.length; i++) {
						var objectName = objectsList[i];
			            current[objectName] = current[objectName] || {};
			            current = current[objectName];
			        }
			        return current;
			}()) : false;
	}

	function createModule(nameSpace, newValue){
		return (typeof nameSpace === "string")  ? (function(){
			var objectsList = nameSpace.split('.'),
				lastIndex = objectsList.length-1,
				objectName = objectsList[lastIndex];
				objectsList.splice(lastIndex, 1);
				objectsList = objectsList.join('.');
				finalObject = create(objectsList);
				finalObject[objectName] = newValue;
		}()) : false;
	}

	function verify(nameSpace){
		return (typeof nameSpace === "string")  ? (function(){
			var objectsList = nameSpace.split("."),
				startWith = getStartIndex(objectsList),
				current = daddy, prop;
				for (var i = startWith; i < objectsList.length; i++) {
					prop = current[objectsList[i]];
			        if(prop === undefined) {
			        	return false;
			        	break;
			        }
			        current = prop;
			    }
			    return true;
		}()) : false;
	}

	function getStartIndex(objectsList){
		return (objectsList[0] === "window") ? 1 : 0;
	}

	//publish
	daddy.Simbly = NameSpace;

}(window));

