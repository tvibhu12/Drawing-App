$(document).ready(function () {
    //slider
    $("#slider").slider(
        {
            min:3,
        max:30,
        slide: function(event,ui){
            $('#circle').height(ui.value);
            $('#circle').width(ui.value);
          ctx.lineWidth=ui.value;
        }
        }
    ); 

    //declare variable
    let paint=false; //painting or not
    let paint_erase="paint"; //painting or eraseing
    let canvas=document.getElementById("paint");// get the canvas context
    //get the context method
    let ctx=canvas.getContext("2d");
    //get the canvas container
    let container=$('#container');
    //mouse postion
    let mouse={x:0,y:0};
    //set drawing parameter
        ctx.lineWidth=3;
        ctx.lineJoin="round";
        ctx.lineCap="round";

        //click inside container
        container.mousedown(function(e){
            //painting
            paint=true;
            ctx.beginPath();
            mouse.x=e.pageX-this.offsetLeft;
            mouse.Y=e.pageY-this.offsetTop;
            ctx.moveTo(mouse.x,mouse.y);

        }) 

        container.mousemove(function(e){
            mouse.x=e.pageX-this.offsetLeft;
            mouse.y=e.pageY-this.offsetTop;
            if(paint==true)
            {
                if(paint_erase=="paint")
                {
                    //painting
                    //get color input
                   
                }
                else
                {
                    //eraseing
                    //white color
                    ctx.strokeStyle="white";
                }
                ctx.lineTo(mouse.x,mouse.y);
                ctx.stroke();

            }
        });
        container.mouseup(function()
        {
            paint=false;
        })
        container.mouseleave(function(){
            paint=false;
        })

        //click on erase button
        $('#erase').click(function(){
            if(paint_erase=="paint")
            {
                paint_erase="erase";
            }else{
                paint_erase="paint";
            }
            $(this).toggleClass("er_button");
        })
// click on Reset button
        $('#reset').click(function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            paint_erase="paint";
            $("#erase").removeClass("er_button");
        })
//click on Save button
        $('#save').click(function(){
            localStorage.setItem("imgCanvas",canvas.toDataURL());
        })

// onload saved canvas load
        let img=new Image();
        img.onload=function(){
            ctx.drawImage(img,0,0);
        }
        img.src=localStorage.getItem("imgCanvas");

//choose color value and change color
$("#paintColor").change(function (e) { 
    $("#circle").css("background-color",$(this).val());
    ctx.strokeStyle=$(this).val();
});  
//touch event
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
    var touch = e.touches[0];
    console.log(touch.pageX + " - " + touch.pageY);
}, false); 
});