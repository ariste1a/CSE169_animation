//rename this to me; 
var Joint = function(){

}
/*
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
Joint.prototype.children = []; */ 

Joint.prototype.rotxlimit = new DOF(); 
Joint.prototype.rotylimit = new DOF(); 
Joint.prototype.rotzlimit = new DOF(); 
Joint.prototype.pose = new THREE.Vector3(); 

Joint.prototype.load = function(tokenizer){    
    var name = tokenizer.getToken();    
    this.name = name; 
    this.children = []; 
    console.log(name);    
    tokenizer.findToken("{");
	while (1) {
        //have to remake it every single time...don't put it in the prototype.... 
		var tok = tokenizer.getToken();
		if (tok == "offset") {	
            this.offset = new THREE.Vector3(); 
            this.offset.setX(tokenizer.getToken()); 
            this.offset.setY(tokenizer.getToken()); 
            this.offset.setZ(tokenizer.getToken()); 
            console.log(this.offset); 
		}				        
		if (tok == "boxmin") {
            this.boxmin = new THREE.Vector3(); 
			this.boxmin.setX(tokenizer.getToken()); 
            this.boxmin.setY(tokenizer.getToken()); 
            this.boxmin.setZ(tokenizer.getToken()); 
            console.log(this.boxmin); 
		}
		if (tok == "boxmax") {
            this.boxmax = new THREE.Vector3(); 
			this.boxmax.setX(tokenizer.getToken()); 
            this.boxmax.setY(tokenizer.getToken()); 
            this.boxmax.setZ(tokenizer.getToken()); 
            console.log(this.boxmax); 
		}
		if (tok == "rotxlimit") {
            this.rotxlimit = new DOF(); 
			var min = tokenizer.getToken(); 
			var max = tokenizer.getToken(); 			
			this.rotxlimit.setMinMax(min, max);
            console.log(this.rotxlimit); 
		}
		if (tok == "rotylimit") {
            this.rotylimit = new DOF(); 
			var min = tokenizer.getToken(); 
			var max = tokenizer.getToken(); 			
			this.rotylimit.setMinMax(min, max);
            console.log(this.rotylimit); 
		}
		if (tok == "rotzlimit") {
            this.rotzlimit = new DOF(); 
			var min = tokenizer.getToken(); 
			var max = tokenizer.getToken(); 
			this.rotzlimit.setMinMax(min, max);
            console.log(this.rotzlimit); 
		}		
		if (tok == "pose") {            
            this.pose = new THREE.Vector3(); 
			this.pose.setX(tokenizer.getToken()); 
            this.pose.setY(tokenizer.getToken()); 
            this.pose.setZ(tokenizer.getToken()); 
            console.log(this.pose); 
		}
		if (tok == "balljoint") {
            var jnt = new Joint();  
            jnt.children = new Array();
            jnt.load(tokenizer);             
            this.children.push(jnt);
            jnt.parent = this;
		}
		if (tok == "}")
		{
			return true;
		}
		/*else 
            ;//tokenizer.getToken(); // Unrecognized token*/ 
    }
}
    
Joint.prototype.addChild = function(child){
    this.children.push(child); 
}

Joint.prototype.computeLocalMatrix = function(){
        var trans = new THREE.Matrix4();           
        //this.localMatrix.setPosition(this.offset);
        trans.setPosition(this.offset);
        trans.multiplyMatrices(trans, this.doPose()); 
        return trans;
} 

Joint.prototype.computeWorldMatrix = function(parentMtx){
    this.localMatrix = this.computeLocalMatrix(); 
    var newWorldMatrix = new THREE.Matrix4();    
    newWorldMatrix.multiplyMatrices(parentMtx, this.localMatrix);     
    this.worldMatrix = newWorldMatrix;
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
    var euler = new THREE.Euler(this.pose.x, this.pose.y, this.pose.z, 'ZXY');
    rot.makeRotationFromEuler(euler); 
    return rot; 
}

Joint.prototype.draw = function(scene) { 
    
    this.drawWireBox(this.boxmin.x, this.boxmin.y, this.boxmin.z, this.boxmax.x, this.boxmax.y, this.boxmax.z, scene);
    for(var i = 0; i < this.children.length; i++){
        this.children[i].draw(scene); 
    }
} 

//shits exploding into space.
/*
Joint.prototype.update = function(scene) {     
    for(var i = 0; i < this.children.length; i++){
        this.children[i].mesh.applyMatrix(this.worldMatrix);
        this.children[i].mesh.updateMatrix();
        this.children[i].update();
    }
} */

//need to update the scene every frame instead? after placing it......
Joint.prototype.drawWireBox = function(xmin, ymin, zmin, xmax, ymax, zmax, scene){
    console.log("drawing...",this.name);
    var geometry = new THREE.BoxGeometry( xmax-xmin,ymax-ymin,zmax-zmin);
    var material = new THREE.MeshBasicMaterial( { color: '0x00ff00', wireframe:true});
    var mesh = new THREE.Mesh( geometry, material );
    this.mesh = mesh; 
    
    mesh.matrixAutoUpdate = false;
    mesh.applyMatrix(this.worldMatrix);
    mesh.updateMatrix();
    
    scene.add( mesh );    
}


//is the first object the root?
Joint.prototype.printChildren = function(){
    for(var i = 0; i< this.children.length; i++){
        console.log(this.children[i]); 
        this.children[i].printChildren(); 
    }    
    return;
}