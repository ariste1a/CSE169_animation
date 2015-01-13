var Joint = function(){
    
}
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
    name = tokenizer.getToken();
    console.log(name); 
}

