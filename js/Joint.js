var Joint = function(){
    this.localMatrix = new THREE.Matrix4(); 
    this.worldMatrix = new THREE.Matrix4(); 
    this.parent = 0; 
    this.offset = new THREE.Vector3(); 
    this.boxmin = new THREE.Vector3(); 
    this.boxmax = new THREE.Vector3(); 
    this.rotxlimit = new DOF(); 
    this.rotylimit = new DOF(); 
    this.rotzlimit = new DOF(); 
    this.pose = new THREE.Vector3();
    this.children = []; 
}

Joint.prototype.load = function(tokenizer){
    console.log("do stuff"); 
}

