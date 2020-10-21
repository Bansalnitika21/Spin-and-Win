let prizes_config={
    count:12,
    prize_names: ["01","02","03","04","05","06","07","08","09","10","11","12"],
    
}
let config=
{
    type: Phaser.CANVAS,
width:800,
height:600,
backgroundColor :0xffcc00,

scene:{
preload: preload,
create: create,
update: update,
}
};
let game = new Phaser.Game(config);
function preload(){
this.load.image('background','background.jpg');
console.log(this);
this.load.image('wheel','wheel.png');
console.log(this);
this.load.image('pin','pin.png');
console.log(this);
this.load.image('stand','stand.png');
console.log(this);
}
function create(){
let W=game.config.width;
let H= game.config.height;
//create background
let background = this.add.sprite(0,0,'background');
background.setPosition(W/2,H/2);
background.setScale(1);
//create stand
let stand= this.add.sprite(W/2,H/2+180,'stand');

stand.setScale(0.25);
//create pin
let pin = this.add.sprite(W/2,H/2-180,'pin');
pin.setScale(0.25);
pin.depth=1;
//using this.wheel we can use wheel object in other functions too..but with let it will not be available in other functions
//create wheel
this.wheel = this.add.sprite(W/2,H/2,'wheel');
this.wheel.setScale(0.5);
//event listener for mouse click
this.input.on("pointerdown",spinwheel,this);
font_style={
   font: "bold 30px Roboto",
align:"center",
color:"red",
}
this.game_text=this.add.text(10,10,"Welcome to spin and win",font_style)
}
function update(){
//this.wheel.angle+=1;wheel rotates
//this.wheel.alpha -=0.01 //wheel will disappear slowly
//this.wheel.alpha=0.5;//makes wheel translucent
//this.wheel.scaleX+=0.01;
//this.wheel.scaleY+=0.01;//zoom in

}
function spinwheel(){
console.log("you clicked the mouse");
console.log("start spinning");
this.game_text.setText("You clicked the mouse!");
    let rounds=Phaser.Math.Between(2,4);
    console.log(rounds);
    let degrees=Phaser.Math.Between(0,11)*30;
    let total_angle= rounds*360+degrees;
    console.log(total_angle);
    
    let idx = prizes_config.count - Math.floor(degrees/(360/prizes_config.count));//-1;since my pin is at some angle it will point one prize backward
    tween= this.tweens.add({
        targets: this.wheel,
        angle:total_angle,    //800,//random
        ease: "Cubic.easeOut",
        //scaleX=0.5,
        //scaleY=0.5,
        duration:6000,
        callbackScope: this,
        onComplete:function(){
         this.game_text.setText("You Won "+prizes_config.prize_names[idx]);
        },
            //console.log("You won something!"+prizes_config.prize_names[idx ]);
        
    });
}
