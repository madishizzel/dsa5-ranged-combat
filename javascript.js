var Heroes = [{Name:"Yrgel", FK:20}, {Name:"Yzabilla", FK:16}]; //List of Heroes with Name, FK-Wert, Weapons
var Marks = {Hero:0};

//Check if run as part of index.html Creation or as main
var IsMain = false;
try {
  document.getElementById("ScriptedHTML").innerHTML = "Testing"
} catch (ReferenceError) {
  IsMain = true
};

function main() {
  Marks = LoadSavedData();
  RefreshHTML()
};

function changeMark(Key, Value) {
  Marks[`${Key}`] = Value;
  UpdateSavedData();
  RefreshHTML()
};

function UpdateSavedData() {
  sessionStorage.setItem("savedMarks", Marks)
};

function LoadSavedData() {
  return sessionStorage.getItem("savedMarks")
};

function RefreshHTML () {
  let OutputHTML = "";
  OutputHTML += "<ul>";
  OutputHTML += "<li><b>Helden:</b><ul>";
  for (Hero in Heroes) {
    if (Hero == Marks.Hero){
      OutputHTML += `<li oncklick="changeMark("Hero",${Hero})"><mark>${Heroes[Hero].Name}</mark>`
    } else {
      OutputHTML += `<li oncklick="changeMark("Hero",${Hero})">${Heroes[Hero].Name}`
    };
    if (Hero+1 == Heroes.length) {
      OutputHTML += "</ul>"
    }
  };
  OutputHTML += "</ul>";
  if(IsMain) {
    console.log(OutputHTML)
  } else {
    document.getElementById("ScriptedHTML").innerHTML = OutputHTML;
  }
};

//Run and display result or pass to index.html
main();
