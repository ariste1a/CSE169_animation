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
            this.offset.setX(Number(tokenizer.getToken())); 
            this.offset.setY(Number(tokenizer.getToken())); 
            this.offset.setZ(Number(tokenizer.getToken())); 
            console.log(this.offset); 
		}				        
		if (tok == "boxmin") {
            this.boxmin = new THREE.Vector3(); 
			this.boxmin.setX(Number(tokenizer.getToken())); 
            this.boxmin.setY(Number(tokenizer.getToken())); 
            this.boxmin.setZ(Number(tokenizer.getToken())); 
            console.log(this.boxmin); 
		}
		if (tok == "boxmax") {
            this.boxmax = new THREE.Vector3(); 
			this.boxmax.setX(Number(tokenizer.getToken()));
            this.boxmax.setY(Number(tokenizer.getToken())); 
            this.boxmax.setZ(Number(tokenizer.getToken())); 
            console.log(this.boxmax); 
		}
		if (tok == "rotxlimit") {
            this.rotxlimit = new DOF(); 
			var min = Number(tokenizer.getToken()); 
			var max = Number(tokenizer.getToken()); 			
			this.rotxlimit.setMinMax(min, max);
            console.log(this.rotxlimit); 
		}
		if (tok == "rotylimit") {
            this.rotylimit = new DOF(); 
			var min = Number(tokenizer.getToken());
			var max = Number(tokenizer.getToken());			
			this.rotylimit.setMinMax(min, max);
            console.log(this.rotylimit); 
		}
		if (tok == "rotzlimit") {
            this.rotzlimit = new DOF(); 
			var min = Number(tokenizer.getToken()); 
			var max = Number(tokenizer.getToken()); 
			this.rotzlimit.setMinMax(min, max);
            console.log(this.rotzlimit); 
		}		
		if (tok == "pose") {            
            this.pose = new THREE.Vector3(); 
			this.pose.setX(Number(tokenizer.getToken())); 
            this.pose.setY(Number(tokenizer.getToken())); 
            this.pose.setZ(Number(tokenizer.getToken())); 
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
        var local = new THREE.Matrix4();         
        trans.setPosition(this.offset);         
        var matrix = new THREE.Matrix4();        
        trans.multiply(matrix);
        //local.multiplyMatrices(trans, this.doPose());
        trans.multiply(this.doPose()); 
        return trans;   
} 

Joint.prototype.computeWorldMatrix = function(parentMtx){
    this.localMatrix = this.computeLocalMatrix(); 
    this.worldMatrix = new THREE.Matrix4();       
    this.worldMatrix.multiplyMatrices(parentMtx, this.localMatrix);
    console.log(this.name, this.children);
    //this.worldMatrix.multiplyMatrices(this.localMatrix, parentMtx);      
    //this.worldMatrix = newWorldMatrix;
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

		this.pose.x = this.rotxlimit.getMin();
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
    var euler = new THREE.Euler(this.pose.x, this.pose.y, this.pose.z, 'ZYX');
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
//problem is that it's not drawing it the correc way
Joint.prototype.drawWireBox = function(xmin, ymin, zmin, xmax, ymax, zmax, scene){    
    var geometry = new THREE.BoxGeometry(xmax-xmin,ymax-ymin,zmax-zmin);
    var material = new THREE.MeshBasicMaterial( { color: '0x00ff00', wireframe:true});
    var mesh = new THREE.Mesh( geometry, material );
    this.mesh = mesh; 
    
    //mesh.matrixAutoUpdate = false;
    //glTranslatef(0.5f*(xmin+xmax),0.5f*(ymin+ymax),0.5f*(zmin+zmax));    
    //var drawTranslate = new THREE.Vector3(
    /*
    mesh.translateX(0.5*(xmin+xmax));
    mesh.translateY(0.5*(ymin+ymax));
    mesh.translateZ(0.5*(zmin+zmax));
    */ 
    var matrix = new THREE.Matrix4();
    matrix.makeTranslation(0.5*(xmin+xmax), 0.5*(ymin+ymax), 0.5*(zmin+zmax));    
    this.worldMatrix.multiply(matrix);    
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