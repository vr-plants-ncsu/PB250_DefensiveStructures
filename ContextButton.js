var clickCooldownCounter = 0;

AFRAME.registerComponent('contextbutton',{
  schema: {
    clickCooldown:{type: 'float', default: 1},
    onGltfUrl:{type:'string', default: ""},
    offGltfUrl:{type:'string', default: ""},
    state:{type:'bool', default: false}
  },
 init: function(){
   let comp = this;
   let entity = this.el;
   this.el.addEventListener('mousedown', function(evt){
     if(clickCooldownCounter > 0){
       return;
     }
     this.components.contextbutton.resetCounter();
     entity.emit('context_activate',{state: comp.data.state},false);
     if(comp.data.state == false){
       //set the model to the alt
       entity.setAttribute('gltf-model',comp.data.onGltfUrl);
       comp.data.state = true;
       return;
     }
     if(comp.data.state == true){
       //set the model to the alt
       entity.setAttribute('gltf-model',comp.data.offGltfUrl);
       comp.data.state = false;
       return;
     }
   });
   
   window.addEventListener('keydown', function(evt){
      //the S key in decimol ascii
      var shortcutPressed = evt.keyCode === 83;
      if (!shortcutPressed){
        return;
      }
        if(clickCooldownCounter > 0){
       return;
     }
     entity.components.contextbutton.resetCounter();
     entity.emit('context_activate',{state: comp.data.state},false);
      
   if(comp.data.state == false){
       //set the model to the alt
       entity.setAttribute('gltf-model',comp.data.onGltfUrl);
       comp.data.state = true;
       return;
     }
     if(comp.data.state == true){
       //set the model to the alt
       entity.setAttribute('gltf-model',comp.data.offGltfUrl);
       comp.data.state = false;
       return;
     }
     });

     

     let examBoxComp = document.querySelector('[ExamBox]');

     examBoxComp.addEventListener('associated', function(evt){
      //determine if the object has a contextanimplay or contextvisibility component, if so make the button visible
      if(evt.detail.associatedEntity.components.contextanimplay !== undefined ||
        evt.detail.associatedEntity.components.contextvisible !== undefined){
          console.log("has the thing");
          console.log(evt.detail.associatedEntity.components.contextanimplay);
          console.log(evt.detail.associatedEntity.components.contextvisible);
          entity.setAttribute('visible', true);
        }
     });

     examBoxComp.addEventListener('disassociated', function(event){
      entity.setAttribute('gltf-model',comp.data.offGltfUrl);
      entity.setAttribute('visible', false);
      console.log("become invisible");
       comp.data.state = false;
   });
   entity.setAttribute('visible', false);
 },
  tick: function(time, timeDelta){
    if(clickCooldownCounter > 0){
    clickCooldownCounter -= timeDelta/1000;
    }
  },
    resetCounter: function(){
    clickCooldownCounter = this.data.clickCooldown;
  }
});