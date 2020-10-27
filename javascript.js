var Heroes = [{Name:"Yrgel", FK:20}, {Name:"Yzabilla", FK:16}]; //List of Heroes with Name, FK-Wert, Weapons
var Marks = {Hero:0};
var IsMain = false;

function main() {
  //Check if run as part of index.html Creation or as main
  try {
    document.getElementById("ScriptedHTML").innerHTML = "Testing"
  } catch (ReferenceError) {
    IsMain = true
  };
  Marks = LoadSavedData();
  RefreshHTML()
};

function changeMark(Key, Value) {
  Marks[`${Key}`] = Value;
  UpdateSavedData();
  RefreshHTML()
};

function UpdateSavedData() {
  if (IsMain == false) {
    sessionStorage.setItem("savedMarks", Marks)
  }
};

function LoadSavedData() {
  if (IsMain == false) {
    let Load = sessionStorage.getItem("savedMarks")
    if (typeof(Load) == object) {
      return Load
    } else {
      return Marks
    }
  } else {
    return Marks
  }
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

main();
