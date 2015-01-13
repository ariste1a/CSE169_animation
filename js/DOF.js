var DOF = function() {}; 
var DOF = function() {
    DOF.prototype.value = 0; 
    DOF.prototype.value.min  = -999999; 
    DOF.prototype.valuemax = 999999;
}; 


DOF.prototype.setMin = function(val){
    this.min = val; 
}

DOF.prototype.setMax = function(val){
    this.max= val; 
}

DOF.prototype.setMinMax = function(min, max){
    this.min = min; 
    this.max = max; 
}