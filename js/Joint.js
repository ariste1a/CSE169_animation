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
Joint.prototype.name = ""; 

Joint.prototype.load = function(tokenizer){    
    var name = tokenizer.getToken();    
    this.name = name; 
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

Joint.prototype.computeLocalMatrix = function(){
        var trans = new THREE.Matrix4();           
        this.localMatrix.setPosition(this.offset);
        return this.localMatrix;
} 

Joint.prototype.computeWorldMatrix = function(parentMtx){
    this.localMatrix = this.computeLocalMatrix(); 
    this.worldMatrix.multiplyMatrices(parentMtx, this.localMatrix);     
    for(var i = 0; i < this.children.length; i++){
        this.children[i].computeWorldMatrix(this.worldMatrix);        
    }
}

Joint.prototype.doPose = function(){
    var rot = new THREE.Matrix4(); 
    if (this.pose.x > this.rotxlimit.getMax())
	{
		this.pose.x = rotxlimit.getMax();
	}
	else if (this.pose.x < this.rotxlimit.getMin())
	{

		this.pose.x = rotxlimit.getMin();
	}
 
	if (this.pose.y > this.rotylimit.getMax())
	{
		this.pose.y = this.rotylimit.getMax();
	}
	else if (this.pose.y < this.rotylimit.getMin())
	{
		this.pose.y = this.rotylimit.getMin();
	}

	if (this.pose.z > this.rotzlimit.getMax())
	{
		this.pose.z = this.rotzlimit.getMax();
	}
	else if (this.pose.z < this.rotzlimit.getMin())
	{
		this.pose.z = this.rotzlimit.getMin();
	}
    var euler = new THEE.Euler(this.pose.x, this.pose.y, this.pose.z, 'XYZ');
    rot.makeRotationFromEuler(euler); 
    return rot; 
}

Joint.prototype.draw = function(scene) { 
    this.drawWireBox(this.boxmin.x, this.boxmin.y, this.boxmin.z, this.boxmax.x, this.boxmax.y, this.boxmax.z, scene);
    for(var i = 0; i < this.children.length; i++){
        this.children[i].draw(scene); 
    }
} 

Joint.prototype.drawWireBox = function(xmin, ymin, zmin, xmax, ymax, zmax, scene){
    var geometry = new THREE.BoxGeometry( xmax-xmin,ymax-ymin,zmax-zmin);
    var material = new THREE.MeshBasicMaterial( { color: 'blue', wireframe: true     } );
    var mesh = new THREE.Mesh( geometry, material );
    this.mesh = mesh; 
    mesh.matrix = this.worldMatrix;
    scene.add( mesh );    
}


//is the first object the root?
Joint.prototype.printChildren = function(){
    for(var i = 0; i< this.children.length; i++){
        console.log(this.children[i].name); 
        this.children[i].printChildren(); 
    }
    this.children
    return;
}