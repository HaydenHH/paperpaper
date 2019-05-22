paper.install(window)
window.onload=()=>{
    paper.setup('myCanvas');
    
    function drawCircleDivided(){
        let count = 20
    const distance = 150
    const radius =150
    const group = new Group()
    const exGroup = new Group()

    for(let i=0;i<count;i++){
        for(let row=0;row<count;row++){
            
            var cir = new Path.Circle({
                center:ptCalc({x:radius/2,y:radius/2},{x:1,y:1},'%'),
                radius:radius,
                opacity:0.65,
                blendMode:'overlay'
            })

            cir.position.x += i*distance
            cir.position.y += row*distance

            // if(row % 2 == 0) group.addChild(cir) || group.addChild(rect) 
            group.addChild(cir)
        }
    }

    for(let [i,ele] of group.children.entries()){
        let divided = group.children[i].divide(group.children[i+1],false)
        exGroup.addChild(divided)
    }
    group.removeChildren()

    for(let [i,ele] of exGroup.children.entries()){
        if(!ele.children){
            continue
        }
        for(let [ii,seg] of ele.children.entries()){
            seg.style = {
                fillColor: 'grey'
            }
            seg.position.x += Math.random()*10
            seg.position.y += Math.random()*10
            if(ii%2 == 1){
                console.log(seg);
                seg.rotation += Math.random()*90*pn()
                ele.children[ii].style={
                    fillColor: Color.random()
                }
            }
        }
    }
    let [w,h] = [window.innerWidth,window.innerHeight]
    let mask = new Path.Rectangle(new Point(w*0.1,h*0.1),new Size(w*0.8,h*0.8))
    exGroup.insertChild(0,mask)
    exGroup.clipped = true

    let mouseIsDown = false

    view.onMouseDown =(e)=>{
        mouseIsDown = true
        view.onMouseUp=(ee)=>{
            mouseIsDown = !mouseIsDown
        }
    }

    view.onFrame = function (time) {
        if(mouseIsDown){
            for(let [index,ele] of exGroup.children.entries()){
                if(ele.children){
                    for(let [i,seg] of ele.children.entries()){
                        if(i%2==1){
                            seg.rotation += index/10
                            
                        }
                    }
                }
            }
        }
    }
    
    }

    function drawRect(){

        const count = 10
        const size = 100
        const distanceX = 15
        const distanceY = 5

        for (let i = 0; i < count; i++) {
            for (let row = 0; row < count*count; row++) {
                let from = new Point(row*size/2,i*size/2)
                let rectSize = new Size(size,size)
                let rect = new Path.Rectangle(from,size)
                rect.opacity = 0.1+ Math.random()
                rect.position.x += Math.random()*10
                rect.position.y += Math.random()*10
                rect.style = {
                    fillColor:Color.random(),
                    blendMode:'overlay'
                }
                console.log(rect)
            }
            
        }

    }

    // drawRect()
    drawCircleDivided()


}




// +++ tool +++

const ptCalc = (t, pt, method)=>{
    if(!Array.isArray(pt)){
        if(method == '+'){
            t.x += pt.x
            t.y += pt.y
            return t
        }else if(method == '-'){
            t.x -= pt.x
            t.y -= pt.y
            return t
        }else if(method == '*'){
            t.x *= pt.x
            t.y *= pt.y
            return t
        }else if(method == '%'){
            t.x /= pt.x
            t.y /= pt.y
            return t
        }
    }else{
        let [x,y] = pt
        if(method == '+'){
            t.x += x
            t.y += y
            return t
        }else if(method == '-'){
            t.x -= x
            t.y -= y
            return t
        }else if(method == '*'){
            t.x *= x
            t.y *= y
            return t
        }else if(method == '%'){
            t.x /= x
            t.y /= y
            return t
        }
    }


}

const pn =()=>{
    return Math.random()>0.5 ? -1 : 1
}

// +++ tool +++

const ptTopt = (p1,p2)=>{
    let x,y
    x = p1.x + p2.x
    y = p1.y + p2.y
    return {x,y}
}