AFRAME.registerComponent('contextanimplay',{
  schema: {
    animName:{type: 'string', default: ""},
    isActive:{type: 'bool', default: false}
  },
 init: function(){
  let comp = this;

   let contextButton = document.querySelector('[ContextButton]');
   contextButton.addEventListener('context_activate', function(){
     if(comp.data.isActive){
       console.log("play the thing");
      this.el.components["animation-mixer"].playAction();
     }
   });
   let examBoxComp = document.querySelector('[ExamBox]');
   examBoxComp.addEventListener('associated', this.whenCAnimAssociated);
   examBoxComp.addEventListener('disassociated', this.whenCAnimDisassociated);
   this.el.components["animation-mixer"].stopAction();
 },
  onContext: function(){
    if(isActive){
      //we assume any entity with this component will also have an animation-mixer from a-frame-extras
        this.el.components["animation-mixer"].playAction();
        return;
    }
  },
  whenCAnimAssociated: function(event){
    if(event.detail.associatedEntity === this.el){
      console.log("got it");
      event.detail.associatedEntity.components["contextanimplay"].data.isActive = true;
    }
  },
  whenCAnimDisassociated: function(event){
        if(event.detail.disassociatedEntity === this.el){
          event.detail.disassociatedEntity.components["animation-mixer"].stopAction();
          event.detail.disassociatedEntity.components["contextanimplay"].data.isActive = false;
    }
  }
});