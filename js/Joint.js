var Joint = function(){}
Joint.prototype.localMatrix = new THREE.Matrix4(); 
Joint.prototype.worldMatrix = new THREE.Matrix4(); 
Joint.prototype.parent = 0; 
Joint.prototype.offset = new THREE.Vector3(); 
Joint.prototype.boxmin = new THREE.Vector3(); 
Joint.prototype.boxmax = new THREE.Vector3(); 
Joint.prototype.rotxlimit = new DOF(); 
Joint.prototype.rotylimit = new DOF(); 
Joint.prototype.rotzlimit = new DOF(); 
Joint.prototype.pose = new THREE.Vector3();
Joint.prototype.children = []; 

Joint.prototype.load = function(tokenizer){    
    var name = tokenizer.getToken();    
    console.log(name); 
    tokenizer.findToken("{");
	while (1) {
		var tok = tokenizer.getToken();
		if (tok == "offset") {						
            this.offset.setX(tokenizer.getToken()); 
            this.offset.setY(tokenizer.getToken()); 
            this.offset.setZ(tokenizer.getToken()); 
            console.log(this.offset); 
		}				        
		if (tok == "boxmin") {
			this.boxmin.setX(tokenizer.getToken()); 
            this.boxmin.setY(tokenizer.getToken()); 
            this.boxmin.setZ(tokenizer.getToken()); 
            console.log(this.boxmin); 
		}
		if (tok == "boxmax") {
			this.boxmax.setX(tokenizer.getToken()); 
            this.boxmax.setY(tokenizer.getToken()); 
            this.boxmax.setZ(tokenizer.getToken()); 
            console.log(this.boxmax); 
		}
		if (tok == "rotxlimit") {
			var min = tokenizer.getToken(); 
			var max = tokenizer.getToken(); 			
			this.rotxlimit.setMinMax(min, max);
            console.log(this.rotxlimit); 
		}
		if (tok == "rotylimit") {
			var min = tokenizer.getToken(); 
			var max = tokenizer.getToken(); 			
			this.rotylimit.setMinMax(min, max);
            console.log(this.rotylimit); 
		}
		if (tok == "rotzlimit") {			
			var min = tokenizer.getToken(); 
			var max = tokenizer.getToken(); 
			this.rotzlimit.setMinMax(min, max);
            console.log(this.rotzlimit); 
		}		
		if (tok == "pose") {
			this.pose.setX(tokenizer.getToken()); 
            this.pose.setY(tokenizer.getToken()); 
            this.pose.setZ(tokenizer.getToken()); 
            console.log(this.pose); 
		}
		if (tok == "balljoint") {
            var jnt = new Joint();
            console.log("recursive call"); 
            jnt.load(tokenizer);             
            this.addChild(jnt);
            jnt.parent = this; 
		}
		if (tok == "}")
		{
			return true;
		}
		else 
			;//tokenizer.getToken(); // Unrecognized token
    }
}
    
Joint.prototype.addChild = function(child){
    this.children.push(child); 
}
