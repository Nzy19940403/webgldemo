function openDoor(axis,point,speed,obj){   
    obj.rotateAroundWorldAxis(point,axis,speed)
    
};

export {openDoor}

function closeDoor(axis,point,speed,obj){
    obj.rotateAroundWorldAxis(point,axis,speed)
}
export {closeDoor}