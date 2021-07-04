var dog,dogImg,happyDog,database,foodS,foodStock;
var feed,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
dogImg=loadImage("images/dogImg.png")
 happyDog=loadImage("images/happydogImg.png")
}

function setup() {
	createCanvas(1000,500);
  database=firebase.database();

  foodObj =  new Food();

  foodStock=database.ref('Food')
  foodStock.on("value",readStock);
  foodStock.set(20);

  dog=createSprite(800,220,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);


  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoodS);

}


function draw() {  
background(46,139,87);

fedTime = database.ref("Feed Time");
fedTime.on("value",function(data){
lastFed= data.val();
})


fill(255);
textSize(20);
if(lastFed>=12){
  text("Last Feed : "+lastFed%12+"PM",350,30);
}else if(lastFed== 0){
  text("Last Feed :"+lastFed+"AM",350,30)
}else{
  text("Last Feed :"+ lastFed + "AM",350,30);
}

foodObj.display();
drawSprites();


}



function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  
}


function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


function addFoodS(){
  foodS++;
  database.ref("/").update({
Food:foodS
  })
}










