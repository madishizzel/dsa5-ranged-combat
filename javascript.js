var Helden = [
  {Name:"Yrgel",
  Waffen:[{Name:"Balestrina", TP:3, Reichweite:[5, 25, 40], FK:20},
    {Name:"Ball&auml;ster", TP:4, Reichweite:[20, 60, 100], FK:20}],
  KSF:{PraeziserSchuss:2,
    GezielterSchuss:1,
    ArmbrustUeberdrehen:1,
    Rueckendeckung:1,
    Scharfschuetze:1,
    IrbraschStil:1}
  },
  {Name:"Yzabilla",
  Waffen:[{Name:"Jagdbolzen", TP:6, Reichweite:[7, 31, 48], FK:16},
    {Name:"Kettenbrecherbolzen", TP:7, Reichweite:[7, 31, 48], FK:16},
    {Name:"Panzerbrecherbolzen", TP:7, Reichweite:[7, 31, 48], FK:16},
    {Name:"Kriegsbolzen", TP:8, Reichweite:[6, 28, 44], FK:16},
    {Name:"Singende Bolzen", TP:4, Reichweite:[6, 28, 44], FK:16}],
  KSF:{}
  }
];
var Marks = {Hero:0, Weapon:0, Range:1, TargetSize:2, TargetZone:0, TargetSurprise:0, TargetMovement:1, SelfMovement:0, Vision:0, TargetCombat:0, Overwind:0, PreciseShot:0, Aiming:0};
var Reichweite = [["Nah", 2, 1], ["Mittel", 0, 0], ["Weit", -2, -1]];
var Zielgroesse = [["Winzig", -8], ["Klein", -4], ["Mittel", 0], ["Gro&szlig;", 4], ["Riesig", 8]];
var Zielzone = [["ungezielt", 0], ["Kopf", -10], ["Torso", -4], ["Arme", -8], ["Beine", -8]];
var Zielueberrascht = [["Nein", 0], ["Ja", 2]];
var Zielbewegung = [["Steht", 2], ["Leicht: &le;4", 0], ["Schnell: &ge;5", -2], ["Leicht &amp; schl&auml;gt Haken", -4], ["Schnell &amp; schl&auml;gt Haken", -6]];
var Schuetzenbewegung = [["Steht", 0], ["Geht: &le;4", -2], ["Rennt: &ge;5", -4], ["Pferd im Schritt", -4], ["Pferd im Galopp", -8]];
var Sicht = [["Stufe 0", 0], ["Stufe 1", -2], ["Stufe 2", -4], ["Stufe 3", -6]];
var Zielkampfgetuemmel = [["Nein", 0], ["Ja", -2]];
var ArmbrustUeberdrehen = [["Nein", 0], ["Ja", 1]];
var PraeziserSchuss = [["Nein", 0, 0], ["Stufe 1", -2, 2], ["Stufe 2", -4, 4], ["Stufe 3", -6, 6]];
var Zielen = [["Nein", 0], ["1 Aktion", 2], ["2 Aktionen", 4]];
var IsMain = false;

function main() {
  try {document.getElementById("ScriptedHTML").innerHTML = "Testing"} catch (ReferenceError) {IsMain = true};//Check if run as part of index.html Creation or as main
  RefreshHTML()
};

function changeMark(Key, Value) {
  if (Key == "Hero") {
    Marks = {Weapon:0, Range:1, TargetSize:2, TargetZone:0, TargetSurprise:0, TargetMovement:1, SelfMovement:0, Vision:0, TargetCombat:0, Overwind:0, PreciseShot:0, Aiming:0};
  };
  Marks[`${Key}`] = Value;
  RefreshHTML()
};

function printValue(Value) {
  let Output = "";
  if (Value > 0) {
    Output += "+" + Value
  } else if (Value == 0) {
    Output += "&plusmn;0"
  } else {
    Output += Value
  }
  return Output
};

function createButton(Action, Text, Clicked) {
  let Output = "";
  Output += ` <button class="`;
  if (Clicked == 1) {
    Output += "buttonPressed"
  } else {
    Output += "button"
  }
  Output += `" onclick="${Action}">${Text}</button>\n`;
  return Output
};

function RefreshHTML() {
  let OutputHTML = "";
  OutputHTML += "<ul>\n";
  //Wahl des Helden
  OutputHTML += `<li class="textBlock"><b>Held:</b><br>\n`;
  for (i in Helden) {
    if (i == Marks.Hero){
      OutputHTML += createButton(`changeMark('Hero',${i})`, `${Helden[i].Name}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('Hero',${i})`, `${Helden[i].Name}`, 0)
    };
  };
  OutputHTML += "</li>\n"
  //Wahl der Waffe bzw. Munition
  let FK_Hero = Helden[Marks.Hero].Waffen[Marks.Weapon].FK;
  let TP_Weapon = Helden[Marks.Hero].Waffen[Marks.Weapon].TP;
  OutputHTML += `<li class="textBlock"><b>Waffe bzw. Munition:</b> (FK = ${FK_Hero} / TP = W6${printValue(TP_Weapon)})<br>\n`;
  for (i in Helden[Marks.Hero].Waffen) {
    if (i == Marks.Weapon) {
      OutputHTML += createButton(`changeMark('Weapon',${i})`, `${Helden[Marks.Hero].Waffen[i].Name}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('Weapon',${i})`, `${Helden[Marks.Hero].Waffen[i].Name}`, 0)
    };
  };
  OutputHTML += "</li>\n"
  //Entfernung zum Ziel
  let FK_Range = Reichweite[Marks.Range][1];
  let TP_Range = Reichweite[Marks.Range][2];
  OutputHTML += `<li class="textBlock"><b>Entfernung in Schritt:</b> (FK: ${printValue(FK_Range)} / TP: ${printValue(TP_Range)})<br>\n`;
  for (i = 0; i < Reichweite.length; i++) {
    if (i == Marks.Range) {
      OutputHTML += createButton(`changeMark('Range',${i})`, `${Reichweite[i][0]}: &le;${Helden[Marks.Hero].Waffen[Marks.Weapon].Reichweite[i]}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('Range',${i})`, `${Reichweite[i][0]}: &le;${Helden[Marks.Hero].Waffen[Marks.Weapon].Reichweite[i]}`, 0)
    };
  };
  OutputHTML += "</li>\n"
  //Größe des Ziels
  let FK_TargetSize = Zielgroesse[Marks.TargetSize][1];
  OutputHTML += `<li class="textBlock"><b>Ziel-Gr&ouml;&szlig;e:</b> (FK: ${printValue(FK_TargetSize)})<br>\n`;
  for (i = 0; i < Zielgroesse.length; i++) {
    if (i == Marks.TargetSize) {
      OutputHTML += createButton(`changeMark('TargetSize',${i})`, `${Zielgroesse[i][0]}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('TargetSize',${i})`, `${Zielgroesse[i][0]}`, 0)
    };
  };
  OutputHTML += "</li>\n"
  //Trefferzone anvisieren
  let FK_TargetZone = Zielzone[Marks.TargetZone][1];
  let FK_TargetZone2 = FK_TargetZone;
  if (Helden[Marks.Hero].KSF.GezielterSchuss == 1) {
    FK_TargetZone2 = Math.round(FK_TargetZone/2);
    OutputHTML += `<li class="textBlock"><b>Zielzone:</b> (FK: ${printValue(FK_TargetZone2)}) <i>halbiert durch KSF Gezielter Schuss</i><br>\n`
  } else {
    OutputHTML += `<li class="textBlock"><b>Zielzone:</b> (FK: ${printValue(FK_TargetZone2)})<br>\n`
  }
  for (i = 0; i < Zielzone.length; i++) {
    if (i == Marks.TargetZone) {
      OutputHTML += createButton(`changeMark('TargetZone',${i})`, `${Zielzone[i][0]}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('TargetZone',${i})`, `${Zielzone[i][0]}`, 0)
    };
  };
  OutputHTML += "</li>\n"
  //Trefferzone anvisieren erleichtert bei überraschtem Ziel
  let FK_TargetSurprise = Zielueberrascht[Marks.TargetSurprise][1];
  if (Marks.TargetZone == 0) {
    FK_TargetSurprise = 0
  };
  OutputHTML += `<li class="textBlock"><b>Ziel &uuml;berrascht:</b> (FK: ${printValue(FK_TargetSurprise)})<br>\n`;
  for (i = 0; i < Zielueberrascht.length; i++) {
    if (i == Marks.TargetSurprise) {
      OutputHTML += createButton(`changeMark('TargetSurprise',${i})`, `${Zielueberrascht[i][0]}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('TargetSurprise',${i})`, `${Zielueberrascht[i][0]}`, 0)
    };
  };
  OutputHTML += "</li>\n"
  //Bewegung des Ziels
  let FK_TargetMovement = Zielbewegung[Marks.TargetMovement][1];
  OutputHTML += `<li class="textBlock"><b>Bewegung des Ziels (Schritt in letzter Handlung):</b> (FK: ${printValue(FK_TargetMovement)})<br>\n`;
  for (i = 0; i < Zielbewegung.length; i++) {
    if (i == Marks.TargetMovement) {
      OutputHTML += createButton(`changeMark('TargetMovement',${i})`, `${Zielbewegung[i][0]}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('TargetMovement',${i})`, `${Zielbewegung[i][0]}`, 0)
    };
  };
  OutputHTML += "</li>\n"
  //Bewegung des Schützen
  let FK_SelfMovement = Schuetzenbewegung[Marks.SelfMovement][1];
  OutputHTML += `<li class="textBlock"><b>Bewegung des Sch&uuml;tzen (Schritt in letzter Handlung):</b> (FK: ${printValue(FK_SelfMovement)})<br>\n`;
  for (i = 0; i < Schuetzenbewegung.length; i++) {
    if (i == Marks.SelfMovement) {
      OutputHTML += createButton(`changeMark('SelfMovement',${i})`, `${Schuetzenbewegung[i][0]}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('SelfMovement',${i})`, `${Schuetzenbewegung[i][0]}`, 0)
    };
  };
  OutputHTML += "</li>\n"
  //Sichtverhältnisse
  let FK_Vision = Sicht[Marks.Vision][1];
  OutputHTML += `<li class="textBlock"><b>Sicht:</b> (FK: ${printValue(FK_Vision)})<br>\n`;
  for (i = 0; i < Sicht.length; i++) {
    if (i == Marks.Vision) {
      OutputHTML += createButton(`changeMark('Vision',${i})`, `${Sicht[i][0]}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('Vision',${i})`, `${Sicht[i][0]}`, 0)
    };
  };
  OutputHTML += "</li>\n"
  //Schuss ins Zielkampfgetümmel
  let FK_TargetCombat = Zielkampfgetuemmel[Marks.TargetCombat][1];
  let FK_TargetCombat2 = FK_TargetCombat;
  if (Helden[Marks.Hero].KSF.Rueckendeckung == 1) {
    FK_TargetCombat2 = 0;
    OutputHTML += `<li class="textBlock"><b>Schuss ins Kampfget&uuml;mmel:</b> (FK: ${printValue(FK_TargetCombat2)}) <i>ignoriert durch eKSF R&uuml;ckendeckung</i><br>\n`
  } else {
    OutputHTML += `<li class="textBlock"><b>Schuss ins Kampfget&uuml;mmel:</b> (FK: ${printValue(FK_TargetCombat2)})<br>\n`
  };
  for (i = 0; i < Zielkampfgetuemmel.length; i++) {
    if (i == Marks.TargetCombat) {
      OutputHTML += createButton(`changeMark('TargetCombat',${i})`, `${Zielkampfgetuemmel[i][0]}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('TargetCombat',${i})`, `${Zielkampfgetuemmel[i][0]}`, 0)
    };
  };
  OutputHTML += "</li>\n"
  //KSF Scharfschütze
  let FK_Sniper = 0;
  if (Helden[Marks.Hero].KSF.Scharfschuetze >= 1) {
    let SniperBonus = Helden[Marks.Hero].KSF.Scharfschuetze*2;
    let SniperSum = FK_Range + FK_TargetSize + FK_TargetZone2 + FK_TargetSurprise + FK_TargetMovement + FK_SelfMovement;
    if (SniperSum <= -SniperBonus) {
      FK_Sniper = SniperBonus
    } else if (SniperSum < 0) {
      FK_Sniper = -SniperSum
    };
    OutputHTML += `<li class="textBlock"><b>KSF Scharfsch&uuml;tze:</b> (FK: ${printValue(FK_Sniper)})</li>\n`
  };
  //KSF Armbrust überdrehen
  let TP_Overwind = 0;
  if (Helden[Marks.Hero].KSF.ArmbrustUeberdrehen == 1) {
    TP_Overwind = ArmbrustUeberdrehen[Marks.Overwind][1];
    OutputHTML += `<li class="textBlock"><b>KSF Armbrust &Uuml;berdrehen:</b> (TP: ${TP_Overwind})<br>\n`;
    for (i = 0; i < ArmbrustUeberdrehen.length; i++) {
      if (i == Marks.Overwind) {
        OutputHTML += createButton(`changeMark('Overwind',${i})`, `${ArmbrustUeberdrehen[i][0]}`, 1)
      } else {
        OutputHTML += createButton(`changeMark('Overwind',${i})`, `${ArmbrustUeberdrehen[i][0]}`, 0)
      };
    };
  };
  OutputHTML += "</li>\n"
  //KSF Präziser Schuss
  let FK_PreciseShot = 0;
  let TP_PreciseShot = 0;
  if (Helden[Marks.Hero].KSF.PraeziserSchuss >= 1) {
    FK_PreciseShot = PraeziserSchuss[Marks.PreciseShot][1];
    TP_PreciseShot = PraeziserSchuss[Marks.PreciseShot][2];
    OutputHTML += `<li class="textBlock"><b>KSF Pr&auml;ziser Schuss:</b> (FK: ${printValue(FK_PreciseShot)} / TP: ${TP_PreciseShot})<br>\n`;
    for (i = 0; i < Helden[Marks.Hero].KSF.PraeziserSchuss+1; i++) {
      if (i == Marks.PreciseShot) {
        OutputHTML += createButton(`changeMark('PreciseShot',${i})`, `${PraeziserSchuss[i][0]}`, 1)
      } else {
        OutputHTML += createButton(`changeMark('PreciseShot',${i})`, `${PraeziserSchuss[i][0]}`, 0)
      };
    };
  };
  OutputHTML += "</li>\n"
  //Zielen
  let FK_Aiming = Zielen[Marks.Aiming][1];
  OutputHTML += `<li class="textBlock"><b>Zielen:</b> (FK: ${printValue(FK_Aiming)})<br>\n`;
  for (i = 0; i < Zielen.length; i++) {
    if (i == Marks.Aiming) {
      OutputHTML += createButton(`changeMark('Aiming',${i})`, `${Zielen[i][0]}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('Aiming',${i})`, `${Zielen[i][0]}`, 0)
    };
  };
  OutputHTML += "</li>\n"
  //Summieren
  OutputHTML += "</ul>";
  let FK_Sum = FK_Hero + FK_Range + FK_TargetSize + FK_TargetZone2 + FK_TargetSurprise + FK_TargetMovement + FK_SelfMovement + FK_Vision + FK_TargetCombat2 + FK_Sniper + FK_PreciseShot + FK_Aiming;
  let TP_Sum = TP_Weapon + TP_Range + TP_Overwind + TP_PreciseShot;
  OutputHTML += `\n<div class="sum">Summe: FK = ${FK_Sum} / TP = W6${printValue(TP_Sum)}</div>`;
  if(IsMain) {
    console.log(OutputHTML)
  } else {
    document.getElementById("ScriptedHTML").innerHTML = OutputHTML;
  }
};

main();
