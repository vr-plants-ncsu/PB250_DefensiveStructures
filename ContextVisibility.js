var crossSection = null;
var activeModel = null;
AFRAME.registerComponent('contextvisible',{
  schema: {
    gltfName:{type: 'string', default: ""},
    hideOriginal:{type: 'bool', default: false},
    crossSectionIsVisible:{type: 'bool', default: false},
    crossSectionIsActive:{type: 'bool', default: false}
  },
 init: function(){
  var comp = this;

   let contextButton = document.querySelector('[ContextButton]');
   contextButton.addEventListener('context_activate', function(fevent){
    if(comp.data.crossSectionIsActive){
      console.log(fevent.state);
      if(!comp.data.crossSectionIsVisible && !fevent.detail.state){
        crossSection.setAttribute('visible',true);
        //if hideOriginal set visible of original to false
        if(comp.data.hideOriginal === true){
          activeModel.setAttribute('visible', false);
        }
        comp.data.crossSectionIsVisible = true;
        return;
      }
      if(comp.data.crossSectionIsVisible && fevent.detail.state){
        crossSection.setAttribute('visible',false);
        if(comp.data.hideOriginal === true){
          activeModel.setAttribute('visible', true);
        }
        comp.data.crossSectionIsVisible = false;
        return;
      }
    }
   });
   let examBoxComp = document.querySelector('[ExamBox]');
   crossSection = null;
   activeModel = null;
   examBoxComp.addEventListener('associated', function(event){
    if(event.detail.associatedEntity.components.contextvisible){
      activeModel = document.querySelector('#examModelChild');
      crossSection = document.createElement('a-entity');
      crossSection.setAttribute('id', 'crosssection')
      crossSection.setAttribute('gltf-model',comp.data.gltfName);
      crossSection.setAttribute('visible',false);
      crossSection.setAttribute('scale', {x:0.1, y:0.1, z:0.1});
      crossSection.setAttribute('animation-mixer', {clip: '*'});
      crossSection.setAttribute('contextanimplay',{animName: '*'});
      event.detail.cloneEntity.appendChild(crossSection);
      event.detail.associatedEntity.components.contextvisible.data.crossSectionIsActive = true;
      }
   });
   examBoxComp.addEventListener('disassociated', function(event){
      comp.data.crossSectionIsActive = false;
      activeModel = null;
   });
   //this.makeModel();
 },
  whenCVisAssociated: function(event){
      if(event.detail.associatedEntity.components.contextvisible){
      activeModel = document.querySelector('#examModelChild');
      event.detail.associatedEntity.components.contextvisible.makeModel();
      event.detail.cloneEntity.appendChild(crossSection);
      crossSectionIsActive = true;
      }
  },
  whenCVisDisassociated: function(event){
    if(event.detail.disassociatedEntity.components.contextvisible){
      event.detail.disassociatedEntity.components.contextvisible.removeModel();
      crossSectionIsActive = false;
      activeModel = null;
    }
  },
  makeModel: function(crossSection){
    //make the cross section object
   
  },
  removeModel: function(crossSection){
    
  }
});