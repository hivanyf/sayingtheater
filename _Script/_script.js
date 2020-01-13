
    //var seatStatus = json_data; // json data would be replaced by python
    console.log("HERE")

var selectedId = []
var jsonFile = {}

    //google.script.run.withSuccessHandler(loadSelectedSeats).seatsTaken();
    window.addEventListener('load', function() {
     console.log('Page is loaded');
    });
    
   /*
     This function is called when the web app first executed
    */
    function loadSelectedSeats(selectedSeats){
      console.log("selectedSeatLoaded");
      console.log(selectedSeats);
      if(selectedSeats != ""){
        let selectedSeatsArray = stringToArray(selectedSeats);
        for(let i = 0; i < selectedSeatsArray.length; i++){
          let seatLabel = selectedSeatsArray[i];
          console.log(seatLabel);
          let seat = document.getElementById(seatLabel);
          seat.setAttribute("r", "3");
          seat.setAttribute("fill-opacity", "0.5");
          seat.setAttribute("fill", "#c44747");
          $(seat).removeClass("emptySeat");
          $(seat).addClass("takenSeat");
        }
      }
    }
    
    /*
     * hide an element
     */
    function hide(e){
      var myElement = document.getElementById(e);
      myElement.style.display = "none";
      selectionClear(document.getElementById(e + "Letter"));
      selectionClear(document.getElementById(e + "Number"));
    }
    
    /*
     * Show an element
     */
    function show(e){
       var myElement = document.getElementById(e);
       myElement.style.display = "block";
       selectionClear(document.getElementById(e + "Letter"));
       selectionClear(document.getElementById(e + "Number"));
    }
    
    function stringToArray(string){
     var array = string.split(",");
     return array;
    }

    function arrayToString(array){
     var string = "";
     for(var j = 0; j < array.length ; j++){
     string += array[j] + ",";
    }
      return string.substring(0, string.length - 1);
    }
    
    /*
     * Detect if the user's seat selection has reached maximum
     */
    function ifReachSelectionMax(){
      var seatNum = document.getElementById("selectedSeatNum").textContent;
      var seatNum2 = parseInt(seatNum);
      if (seatNum2 >= 7){
        return false;
      }
      return true;
    }
    /*
     * Actions when the user select/deselect a seat. Change seat color and update the color
     */
    function chooseSeat(e){
    //if the seat is avaliable and not chosen
    if(e.getAttribute("fill") === "#D5F3BC"){
      //if the user has reached reservation maximum, give a warning and do nothing
        if(ifReachSelectionMax() == false){
          window.alert("You can only choose maximum 7 seats");
        return;
        }
      let seatNumLabel  = document.getElementById("selectedSeatNum");//get the number of user's current chosen seats
    let seatLabel = e.getAttribute("id");
        selectedId.push(seatLabel);
    document.getElementById("selectedSeat").innerHTML = selectedId;
    
      let updatedSeatNum = increaseSelectedSeat(seatNumLabel);//string
      seatNumLabel.textContent = updatedSeatNum;
      e.setAttribute("fill", "#FF8383");
      $(e).addClass("selectedSeat");
      $(e).removeClass("emptySeat");
      }
    //if the seat is avaliable and chosen
    else if(e.getAttribute("fill") === "#FF8383"){
      e.setAttribute("fill", "#D5F3BC");
      let seatNumLabel  = document.getElementById("selectedSeatNum");//get the number of user's current chosen seats
        let seatLabel = e.getAttribute("id")
        for (let i = 0; i < selectedId.length; i++) {
            if (seatLabel === selectedId[i]) {
                selectedId.splice(i, 1);
                break;
            }
        }
        document.getElementById("selectedSeat").innerHTML = selectedId;
      let updatedSeatNum = decreaseSelectedSeat(seatNumLabel);//string
      seatNumLabel.textContent = updatedSeatNum;
      $(e).addClass("emptySeat");
      $(e).removeClass("selectedSeat");
      }
      //if the seat is not avaliable, will not do anything
    }
    
   /*
    * Return the string of updated seat number after user select a seat
    */
    function increaseSelectedSeat(e){
      var numSeatChosen = parseInt(e.textContent) + 1;//int
      return numSeatChosen.toString();
    }
    
   /*
    * Return the string of updated seat number after user de-select a seat
    */
    function decreaseSelectedSeat(e){
      var numSeatChosen = parseInt(e.textContent) - 1;//int
      return numSeatChosen.toString();
    }


// Get the information when you hit submit, whihc is the POST part
/*function getInfo() {
    let name =  document.getElementById("exampleInputName1").innerHTML;
    let email = document.getElementById("exampleInputEmail1").innerHTML;
    let seatNum = document.getElementById("selectedSeatNum").textContent;
    let seatNum2 = parseInt(seatNum);
    if (name === "" && email === "" && seatNum2 === 0) {
        alert("Please complete your info!");
    } else if (name === "") {
        alert("Pleast input your name!");
        
    } else if (email === "") {
        alert ("Please input your email address!");
    } else if (seatNum2 === 0) {
         alert ("Please select seats!");
        } else {
            jsonFile = {
                "name": name,
                "seats": selectedId,
                "email": email,
            }
        }
        
        
    }*/
    
    
    
