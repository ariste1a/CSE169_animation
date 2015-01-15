    //should have a filereader object and a file object in here that is grabbed by the UI instead. 

var Skeleton = function() { 
    this.local = new THREE.Matrix4(); 
    this.root = new Joint();
    this.tokenizer = new Tokenizer();
    this.tokens = [];      
} 

Skeleton.prototype.local = new THREE.Matrix4(); 
Skeleton.prototype.tokenizer = new Tokenizer(); 
Skeleton.prototype.root = new Joint(); 
Skeleton.prototype.finish = function(){};
Skeleton.prototype.joints = [];

Skeleton.prototype.load = function() {            
    this.root = new Joint();
    this.tokenizer.findToken("balljoint");
    //call recurisve load on joints
    this.root.name = this.tokenizer.getToken(); 
    this.root.load(this.tokenizer);
    console.log("finished loading: ", this.tokenizer.tokens);
    //console.log(this.root.name);                                                                         
    this.root.printChildren(this.joints); 
    this.update();
    this.draw(this.scene);  //need to call init when loading is done. using a callback?         
    this.finish();
} 

Skeleton.prototype.update = function() {
    this.root.computeWorldMatrix(this.local); 
}

Skeleton.prototype.draw = function(scene) { 
    //console.log(scene);
    this.root.draw(scene);
} 

Skeleton.prototype.reset = function() { 
    
} 


Skeleton.prototype.open =  function (evt) { 
    var files = evt.target.files; // FileList object
    
    // Loop through the FileList and render image files as thumbnails.
    var file = files[0]; 

    var reader = new FileReader();
    // Closure to capture the file information. 
    reader.onload = function(e) { 
        this.text = e.target.result; 
        Skeleton.prototype.text = this.text;
        Skeleton.prototype.tokenizer.tokens = this.text.split(/\s+/);
        Skeleton.prototype.load(); 
    }
    reader.readAsText(file);    
} 

Skeleton.prototype.setScene = function (scene) { 
    Skeleton.prototype.scene = scene;
    console.log("setting scene ", scene);
} 

Skeleton.prototype.setSuccessCallback = function (callback) {       
    this.finish = callback;
    Skeleton.prototype.finish = callback; //not the right thing but w/e    
}