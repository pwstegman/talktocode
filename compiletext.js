var functions = {};
var raw = [];
var imports = [];

function processString(str){
        str = str.toLowerCase();
        replaces = {
        	equals: "=",
        	plus: "+",
        	minus: "-",
        	"divided by": "/",
        	"over": "/",
        	"times": "*",
        	one: "1",
        	two: "2",
        	three: "3",
        	four: "4",
        	five: "5",
        	six: "6",
        	seven: "7",
        	eight: "8",
        	nine: "9",
        	ten: "10",
        	asterisk: "*",
        	"  ":" ",
        };
        
        for (var key in replaces) {
	 		if (replaces.hasOwnProperty(key)) {
	 			str = str.split(key).join(replaces[key]);
	 		}
	 	}

	 	str = str.split(" ");
	
	 	if(str.indexOf("import") != -1 && str.indexOf("from") != -1){
	 		imports.push("from "+str[str.indexOf("from")+1]+" import "+str[str.indexOf("import")+1]);
	 		return;
	 	}
	 	if(str.indexOf("import") != -1){
	 		imports.push("import "+str[str.indexOf("import")+1]);
	 		return;
	 	}

        if(str.indexOf("function") == -1 && str.indexOf("execute") != -1){
            var ta = str[str.indexOf("execute")+1]+"(";
            if(str.indexOf("argument") != -1){
                ta += str[str.indexOf("argument")+1]+")";
                raw.push(ta);
                return;
            }
            var args = [];
            if(str.indexOf("arguments") != -1){
                for(var i=str.indexOf("arguments")+1;i<str.length;i++){
                    if(str[i] != "and" && str[i] != "&"){
                        args.push(str[i]);
                    }
                }
            }
            ta += args.join(", ");
            ta += ")";
            raw.push(ta);
            return;
        }
        if(str.indexOf("argument") != -1 && str.indexOf("function") != -1){
		addParameter(str[str.indexOf("function")+1],str[str.indexOf("argument")+1])
		return;
	}
	if(str.indexOf("function") == -1 && str.indexOf("line") != -1){
		var line = "";
		for(var i=str.indexOf("line")+1;i<str.length;i++){
			line += str[i]+" ";
		}
		raw.push(line);
	}
	if(str.indexOf("define") != -1){
		addFunction(str[str.indexOf("define")+1]);
		return;
	}
	if(str.indexOf("function") != -1 && str.indexOf("return") != -1){
		addReturn(str[str.indexOf("function")+1], str[str.indexOf("return")+1]);
	}
	if(str.indexOf("line") != -1 && str.indexOf("function") != -1){
		var line = "";
		for(var i=str.indexOf("line")+1;i<str.length;i++){
			line += str[i]+" ";
		}
		addLine(str[str.indexOf("function")+1],line);
	}
}

function addFunction(name){
	functions[name] = {params:[],lines:[],re:""};
}

function addParameter(func,name){
	if(functions[func] == null){
		addFunction(func);
	}
	functions[func]["params"].push(name);
}

function addLine(func,line){
	if(functions[func] == null){
		addFunction(func);
	}
	functions[func]["lines"].push(line);
}

function addReturn(func,line){
	if(functions[func] == null){
		addFunction(func);
	}
	functions[func]["re"] = line;
}

function compile(){
	var result = "";
	for(var i=0;i<imports.length;i++){
		result += imports[i]+"\n";
	}
	for (var key in functions) {
	  if (functions.hasOwnProperty(key)) {
	    result += "def "+key+"("+functions[key].params.join(", ")+"):\n";
	    for(var i=0;i<functions[key].lines.length;i++){
	    	result += "  "+functions[key].lines[i]+"\n";
	    }
	    if(functions[key].re != ""){
	    	result += "  return "+functions[key].re+"\n";
	    }
	  }
	}
        result += raw.join("\n");
	return result;
}
