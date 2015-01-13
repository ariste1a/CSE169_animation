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
    console.log(tokenizer.tokens);
    var name = tokenizer.getToken();    
    console.log(name); 
    //tokenizer.findToken("{");
	while (1) {		
		var tok = tokenizer.getToken();
		if (tok == "offset") {						
            this.offset.setX(tokenizer.getToken()); 
            this.offset.setY(tokenizer.getToken()); 
            this.offset.setZ(tokenizer.getToken()); 
            console.log(this.offset); 
		}				
        /*
		if (tok == "boxmin") {
			boxmin[0] = tokenizer.getToken();
			boxmin[1] = tokenizer.getToken();
			boxmin[2] = tokenizer.getToken();
		}
		if (tok == "boxmax") {
			boxmax[0] = tokenizer.getToken();
			boxmax[1] = tokenizer.getToken();
			boxmax[2] = tokenizer.getToken();
		}
		if (tok == "rotxlimit") {
			float min = tokenizer.getToken(); 
			float max = tokenizer.getToken(); 			
			rotxlimit.setMinMax(min, max);
		}
		if (tok == "rotylimit") {
			//rotylimit.setMinMax(tokenizer.GetFloat(), tokenizer.GetFloat());
			float min = tokenizer.GetFloat();
			float max = tokenizer.GetFloat();
			rotylimit.setMinMax(min, max);
		}
		if (tok == "rotylimit") == 0) {
			//rotzlimit.setMinMax(tokenizer.GetFloat(), tokenizer.GetFloat());
			float min = tokenizer.GetFloat();
			float max = tokenizer.GetFloat();
			rotzlimit.setMinMax(min, max);
		}
		//degrees for each axis right?
		if (tok == "pose") {
			pose[0] = tokenizer.GetFloat(); 
			pose[1] = tokenizer.GetFloat();
			pose[2] = tokenizer.GetFloat();
		}
		if (tok == "balljoint") {
					joint *jnt = new joint;					
					jnt->load(tokenizer);
					addChild(jnt);
					jnt->setParent(this); 
		}*/ 
		if (tok == "}")
		{

			return true;
		}
		else 
			tokenizer.getToken(); // Unrecognized token
    }
}


