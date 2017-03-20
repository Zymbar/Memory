/* This function creates dynamically two tables. The first table contains randomly distributed pairs of identical elements. It is
hidden at the beginning and becomes displayed only after the game is completed.
The second table is consisted of background tiles (green tiles), each of the tiles occupies one table cell.
All tiles in this table have onclick function assigned - after a green tile is hit, it shows an image assigned to this cell
from the first table. When two identical images are revealed, their visibility in the table is hidden
After the game is completed, it reveales the placement of all tiles*/

function gameSetup(){
  var numberOfPairs=document.setup.selectSize[document.setup.selectSize.selectedIndex].value; //number of pairs, which depends on the value chosen by a player
  var availableTiles=40;        //Number of pairs in the biggest available board
  var widthOfTable=0;           //Number of columns in a table with tiles
  var heightOfTable=0;          //Number of rows in a table with tiles
  var pairsSelection=[];        //An array in which randomly chosen names of jpg's will be stored
  var clickTimes=0;             //This variable will take values 0, 1 or 2 depending on how many clicks will be done in one backgroundBack
  var clickedPics="";           //A variable to store a reference to the cell which was clicked first in a round
  var totalOnclick=0;           //Counts total number of clicking on the tiles
  var totalPoints=0;            //Counts a number of pairs guessed so far
  var paddingValue="0px";      //A default value of spacing between the tiles



    switch(numberOfPairs){      //This switch sets the number of rows and columns in a table which will be created later on, 
      case "6":                 //as well as sets the spacing between the tiles (the bigger the board is, the beigger are the
      widthOfTable=4;           //dimensions of a table to be created and the smaller is the padding).
      heightOfTable=3;
      paddingValue="15px";
      break;

      case "10":
      widthOfTable=5;
      heightOfTable=4;
      paddingValue="12px";
      break;

      case "15":
      widthOfTable=6;
      heightOfTable=5;
      paddingValue="10px";
      break;

      case "24":
      widthOfTable=8;
      heightOfTable=6;
      paddingValue="8px";
      break;

      case "40":
      widthOfTable=10;
      heightOfTable=8;
      paddingValue="5px";
      break;

      default:
      alert("Something went wrong");  //Hopefully this will not happen
    }

  var pairsCounter=0;
  
  while (pairsCounter<numberOfPairs){                            //This loop creates an array of random pics (chosen out of
    var randomNumber=Math.floor(availableTiles*Math.random()+1); //40 available pics) which will be used as tiles in the game
    
    if(pairsSelection.indexOf(randomNumber)==-1){                //A new pic is added to the array if it has not been selected yet
      pairsSelection[pairsCounter]=randomNumber;
      pairsCounter++
      }
    }
  
  var tableOfTiles=document.createElement("table");             //We create a table which will contain randomly distributed tiles
  tableOfTiles.setAttribute("id","mainTable");
  
  for (var rowCounter=0;rowCounter<heightOfTable;rowCounter++){    //This loop creates rows in a table and appends it to the table
    var row1=document.createElement("tr");
    row1.setAttribute("id","row"+rowCounter);
    tableOfTiles.appendChild(row1);
    
    for (var columnCounter=0;columnCounter<widthOfTable;columnCounter++){  //This loop creates cells and adds them to the rows
      var cell1=document.createElement("td");
        cell1.setAttribute("id","cell"+rowCounter+"."+columnCounter);
     
        if (heightOfTable>8){                                     //If the size of the board is quite big, we set the class of all
          cell1.setAttribute("class","smallCell");                //cells into "smallCell" (tiles are smaller)
        }

        else{                                                    //In other case the size of cells is standard
          cell1.setAttribute("class","normalCell");
        }

      row1.appendChild(cell1);
     }  
  }  

  document.getElementById("gameTableContainer").appendChild(tableOfTiles);  //We add a newly created table to a suitable div
  /*This loop places randomly as many pairs of tiles as chosen by a player two new (and the same) images are created,
  which will be later placed in two unoccupied places in a table*/

  for (var picCounter=0;picCounter<numberOfPairs;picCounter++){  
    var img=document.createElement("img");                       
    img.src=pairsSelection[picCounter]+".jpg";                   
    var img2=document.createElement("img");
    img2.src=pairsSelection[picCounter]+".jpg";
    
    var numberOfTilesAdded=0;                           //Counts how many copies of the same pic has been already distributed
  
  while (numberOfTilesAdded<2){
    
    var randX=Math.floor(Math.random()*heightOfTable);  //We choose X and Y coordinates (corresponding to the column and row in a table)
    var randY=Math.floor(Math.random()*widthOfTable);   //where a tile will be placed
    
    if (numberOfTilesAdded==0){
    
      if (document.getElementById("cell"+randX+"."+randY).style.padding!=paddingValue){ //If a randomly chosen cell of a table is 
        document.getElementById("cell"+randX+"."+randY).appendChild(img);               //free, then a pic is added to this cell
        document.getElementById("cell"+randX+"."+randY).style.padding=paddingValue;     //Otherwise new X and Y coordinates
        numberOfTilesAdded++;                                                           //are randomly chosen
      }
    }
    
    else{                                                                               //This "else" is triggerred when the first
      if (document.getElementById("cell"+randX+"."+randY).style.padding!=paddingValue){  //copy of an image has been added and
        document.getElementById("cell"+randX+"."+randY).appendChild(img2);               //the second copy of an image needs to be 
        document.getElementById("cell"+randX+"."+randY).style.padding=paddingValue;      //placed somwhere else in a free cell
        numberOfTilesAdded++;                                                            //of a table
        }                                                                                //Algorithm of adding the second image is 
      }                                                                                  //the same as for the first one
    }
  }

    function onclickFunction(){              //This function will be called when a player clicks on a green tile and it shows
                                            //to the user a picture which is on the face-up side of this tile
      

      if (clickTimes==1){                   //This "if" is triggerred when we choose the second pic in a round
        var thisid1=this.parentNode.id;
        idIndex1="cell"+thisid1;
        var secondCell=document.getElementById(thisid1);       //Similarly, if a green tile is clicked, it is replaced by
        secondCell.removeChild(secondCell.childNodes[0]);      //a tile of a picture
        var replacedImage=document.getElementById(idIndex1).firstChild.cloneNode(true);
        secondCell.appendChild(replacedImage);
        var secondSrc=secondCell.firstChild.src;
        firstSrcAgain=clickedPics.firstChild.src;
        clickTimes++;                          //Number of clicks in this round is modified
        totalOnclick++;                        //Number of clicks in the game is modified
        var counterRef=document.getElementById("counter")
        var newCounter=document.createTextNode("All clicks: "+totalOnclick);  //a suitable message with new onclicks number is modified
        document.getElementById("counter").innerHTML="";                      
        document.getElementById("counter").appendChild(newCounter);
      
      /*Since this is the second tile in a round which has been clicked, both revealed images must be turned face-down
       again after a certain period of time (1 sec in this case)*/
       
        setTimeout(function() {              
          if (firstSrcAgain==secondSrc){     //If both revealed tiles have the same picture on them, then they are removed from
            secondCell.firstChild.style.visibility="hidden";   //the board (by setting their visibility)
            clickedPics.firstChild.style.visibility="hidden";
            clickTimes=0;                     //Number of clicks in a round is set back to 0 to prepare before the next round
            totalPoints++;                    //Since a pair of identical tiles was found, the number of points is increased by 1
            document.getElementById("pointsCounter").innerHTML="Points: "+totalPoints;  //A suitable message with the number of pts appears
            if (totalPoints==numberOfPairs){  //If all pairs have already been guessed, the table (which is blang to the user) is taken
              document.getElementById("visibleTableContainer").style.display="none"; //out of a page
              document.getElementById("gameTableContainer").style.visibility="visible"; //After the game is completed, a user can see
                                                                                        //how all pairs were distributed
              }
            }
          
          else{                                 //This "else" triggerrs when tho clicked images are different
            secondCell.removeChild(secondCell.childNodes[0]);  //In this case we replace both revealed pictures with a face-down tile
            var backgroundBack=document.createElement("img");  //i.e. with a green background
            backgroundBack.src="background.jpg";
            backgroundBack.addEventListener("click", onclickFunction); //We must add again onclick function to these tiles
            secondCell.appendChild(backgroundBack);
            thatCell=clickedPics;
            thatCell.removeChild(thatCell.childNodes[0]);
            var backgroundBack1=document.createElement("img"); //And we do the same for the second revealed picture
            backgroundBack1.src="background.jpg";
            backgroundBack1.addEventListener("click", onclickFunction);
            thatCell.appendChild(backgroundBack1);
            clickTimes=0;
            }
        }, 1000);
     } 
 if (clickTimes==0){                   //This condition means that in the current round no tile has been clicked so far
        var thisid=this.parentNode.id;
        idIndex="cell"+thisid;
        var firstCell=document.getElementById(thisid);  //In this part we exchange a picture of the green background into a 
        firstCell.removeChild(firstCell.childNodes[0]); //picture, which is a face-up side of a tile
        var replacedImage=document.getElementById(idIndex).firstChild.cloneNode(true);
        firstCell.appendChild(replacedImage);
        var firstSrc=firstCell.firstChild.src; 
        clickTimes++;                         //When the first tile is clicked, then the number of tiles clicked in this round, as
        totalOnclick++;                       //well as the total number of clicks is increased by one
        clickedPics=firstCell;                //We will need this reference in the next "if"
        var counterRef=document.getElementById("counter")                     
        var newCounter=document.createTextNode(" All clicks: "+totalOnclick);   //After the click, a new message with 
        document.getElementById("counter").innerHTML="";                        //the number of clicks appears
        document.getElementById("counter").appendChild(newCounter);
        }
  }  

  var visibleTable=document.createElement("table");     //we create a table which will be visible for a player
  visibleTable.setAttribute("id","visibleTable");       //at the beginning it will consist only of background

  for (var newRow=0;newRow<heightOfTable;newRow++){     //we create new rows of the table and append the to the table
    var row2=document.createElement("tr");
    row2.setAttribute("id","rowMain"+newRow);
    visibleTable.appendChild(row2);
   
    for (var newColumn=0;newColumn<widthOfTable;newColumn++){  //we create new cells (columns) and add them to the rows
      var imageBcg=document.createElement("img");              //each cell shows primarly a green back of a tile
      imageBcg.src="background.jpg";
      var cell2=document.createElement("td");
      cell2.setAttribute("id",newRow+"."+newColumn);
  
        if (heightOfTable==8){                           //as before, if there are many rows in the table, we set smaller sizes of tiles
          cell2.setAttribute("class","smallCell");
        }
        
        else{                                           //otherwise, sizes of tiles are normal
          cell2.setAttribute("class","normalCell");
        }
  
      row2.appendChild(cell2);                         //we append cells to the rows and add background to the cells
      cell2.appendChild(imageBcg);
      cell2.style.padding=paddingValue;
      imageBcg.addEventListener("click", onclickFunction, false)  //when a tile is clicked, onclickFunction is called and a picture 
     }                                                            //hidden under this tile is revealed
  }   

  document.getElementById("visibleTableContainer").appendChild(visibleTable);  //after js creates a table, it is appended to a div
  document.getElementById("setupBox").style.display="none";               //after "Start game" button is hit, the form disappears
  
}