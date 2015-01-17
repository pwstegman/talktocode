var functions = {};

function processString(str){
	str = str.split(" ");
	if(str.indexOf("parameter") != -1 && str.indexOf("function") != -1){
		addParameter(str[str.indexOf("function")+1],str[str.indexOf("parameter")+1])
		return;
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
	functions[func]["params"].push(name);
}

function addLine(func,line){
	functions[func]["lines"].push(line);
}

function addReturn(func,line){
	functions[func]["re"] = line;
}

function compile(){
	var result = "";
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
	return result;
}
