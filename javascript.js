var Helden = [
  {Name:"Yrgel",
  Waffen:[{Name:"Balestrina", Typ:"Balestrina", TP:3, Reichweite:[5, 25, 40], FK:20},
    {Name:"Ball&auml;ster", Typ:"Balläster", TP:4, Reichweite:[20, 60, 100], FK:20}],
  KSF:{PraeziserSchuss:2,
    GezielterSchuss:1,
    ArmbrustUeberdrehen:1,
    Rueckendeckung:1,
    Scharfschuetze:1,
    IrbraschStil:1}
  },
  {Name:"Yzabilla",
  Waffen:[{Name:"Jagdbolzen", Typ:"Balestrina", TP:6, Reichweite:[7, 31, 48], FK:16},
    {Name:"Kettenbr.-/Panzerbr.-Bolzen", Typ:"Balestrina", TP:7, Reichweite:[7, 31, 48], FK:16},
    {Name:"Kriegsbolzen", Typ:"Balestrina", TP:8, Reichweite:[6, 28, 44], FK:16},
    {Name:"Singende Bolzen", Typ:"Balestrina", TP:4, Reichweite:[6, 28, 44], FK:16}],
  KSF:{}
  }
];
var Marks = {Hero:0, Weapon:0, Range:1, TargetSize:2, TargetZone:0, TargetSurprise:0, TargetMovement:1, SelfMovement:0, Vision:0, TargetCombat:0, Overwind:0, PreciseShot:0, Aiming:0};
var Reichweite = [["Nah", 2, 1], ["Mittel", 0, 0], ["Weit", -2, -1]];
var Zielgroesse = [["Winzig", -8], ["Klein", -4], ["Mittel", 0], ["Gro&szlig;", 4], ["Riesig", 8]];
var Zielzone = [["ungezielt", 0], ["Kopf", -10], ["Torso", -4], ["Arme / Beine", -8]];
var Zielueberrascht = [["Nein", 0], ["Ja", 2]];
var Zielbewegung = [["Steht", 2], ["Leicht: &le;4", 0], ["Schnell: &ge;5", -2], ["&le;4 &amp; schl&auml;gt Haken", -4], ["&ge;5 &amp; schl&auml;gt Haken", -6]];
var Schuetzenbewegung = [["Steht", 0], ["Geht: &le;4", -2], ["Rennt: &ge;5 / Pferd im Schritt", -4], ["Pferd im Galopp", -8]];
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
  //Berechnung der einzelnen Erschwernisse/Erleichterungen
  let FK_Hero = Helden[Marks.Hero].Waffen[Marks.Weapon].FK;
  let FK_Weapon = 0;
  let TP_Weapon = Helden[Marks.Hero].Waffen[Marks.Weapon].TP;
  let FK_Range = Reichweite[Marks.Range][1];
  let TP_Range = Reichweite[Marks.Range][2];
  let FK_TargetSize = Zielgroesse[Marks.TargetSize][1];
  let FK_TargetZone = Zielzone[Marks.TargetZone][1];
  if (Helden[Marks.Hero].Waffen[Marks.Weapon].Typ == "Balestrina") {
    if (FK_TargetSize + FK_TargetZone <= -4) {
      FK_Weapon = 1 //Waffenvorteil der Balestrina: Kleine/Winzige Ziele: Erschw. -1
    }
  };
  if (Marks.TargetZone != 0 && Helden[Marks.Hero].KSF.GezielterSchuss == 1) {
    FK_TargetZone = FK_TargetZone/2 // KSF Gezielter Schuss halbiert Erschwernisse für das Anvisieren von Trefferzonen
  };
  let FK_TargetSurprise = 0;
  if (Marks.TargetZone != 0) {
    FK_TargetSurprise = Zielueberrascht[Marks.TargetSurprise][1]
  };
  if (FK_TargetSize + FK_TargetZone + FK_TargetSurprise + FK_Weapon > 0) {
    FK_Weapon = 0 //reduziert maximal um Größe der Erschwernisse
  };
  let FK_TargetMovement = Zielbewegung[Marks.TargetMovement][1];
  let FK_SelfMovement = Schuetzenbewegung[Marks.SelfMovement][1];
  let FK_Vision = Sicht[Marks.Vision][1];
  let FK_TargetCombat = Zielkampfgetuemmel[Marks.TargetCombat][1];
  if (Marks.TargetCombat != 0 && Helden[Marks.Hero].KSF.Rueckendeckung == 1) {
    FK_TargetCombat = 0
  };
  let FK_Sniper = 0;
  if (Helden[Marks.Hero].KSF.Scharfschuetze == 1 || Helden[Marks.Hero].KSF.Scharfschuetze == 2) {
    let SniperBonus = Helden[Marks.Hero].KSF.Scharfschuetze*2;
    let SniperSum = FK_Weapon + FK_Range + FK_TargetSize + FK_TargetZone + FK_TargetSurprise + FK_TargetMovement + FK_SelfMovement;
    if (SniperSum <= -SniperBonus) {
      FK_Sniper = SniperBonus
    } else if (SniperSum < 0) {
      FK_Sniper = -SniperSum //reduziert maximal um Größe der Erschwernisse
    }
  };
  let TP_Overwind = 0;
  if (Helden[Marks.Hero].KSF.ArmbrustUeberdrehen == 1) {
    TP_Overwind = ArmbrustUeberdrehen[Marks.Overwind][1]
  };
  let FK_PreciseShot = 0;
  let TP_PreciseShot = 0;
  if (Helden[Marks.Hero].KSF.PraeziserSchuss == 1 || Helden[Marks.Hero].KSF.PraeziserSchuss == 2 || Helden[Marks.Hero].KSF.PraeziserSchuss == 3) {
    FK_PreciseShot = PraeziserSchuss[Marks.PreciseShot][1];
    TP_PreciseShot = PraeziserSchuss[Marks.PreciseShot][2]
  };
  let FK_Aiming = Zielen[Marks.Aiming][1];
  if (Marks.Aiming != 0 && Helden[Marks.Hero].Waffen[Marks.Weapon].Typ == "Balläster" && Helden[Marks.Hero].KSF.IrbraschStil == 1) {
    FK_Aiming = FK_Aiming*2; //Irbrasch Stil verdoppelt Erleichterung durch Zielen mit der Balläster
  };
  //Erzeugung der Ausgabe
  let OutputHTML = "";
  OutputHTML += `<ul class="list">\n`;
  OutputHTML += `<li class="listItem">Held: (FK = ${FK_Hero})<br>\n`;
  for (i in Helden) {
    if (i == Marks.Hero){
      OutputHTML += createButton(`changeMark('Hero',${i})`, `${Helden[i].Name}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('Hero',${i})`, `${Helden[i].Name}`, 0)
    }
  };
  OutputHTML += `</li>\n<li class="listItem">Waffe bzw. Munition: (FK: ${printValue(FK_Weapon)} / TP = W6${printValue(TP_Weapon)})<br>\n`;
  for (i in Helden[Marks.Hero].Waffen) {
    if (i == Marks.Weapon) {
      OutputHTML += createButton(`changeMark('Weapon',${i})`, `${Helden[Marks.Hero].Waffen[i].Name}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('Weapon',${i})`, `${Helden[Marks.Hero].Waffen[i].Name}`, 0)
    }
  };
  OutputHTML += `</li>\n<li class="listItem">Entfernung zum Ziel: (FK: ${printValue(FK_Range)} / TP: ${printValue(TP_Range)})<br>\n`;
  for (i = 0; i < Reichweite.length; i++) {
    if (i == Marks.Range) {
      OutputHTML += createButton(`changeMark('Range',${i})`, `${Reichweite[i][0]}: &le;${Helden[Marks.Hero].Waffen[Marks.Weapon].Reichweite[i]}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('Range',${i})`, `${Reichweite[i][0]}: &le;${Helden[Marks.Hero].Waffen[Marks.Weapon].Reichweite[i]}`, 0)
    }
  };
  OutputHTML += `</li>\n<li class="listItem">Ziel-Gr&ouml;&szlig;e: (FK: ${printValue(FK_TargetSize)})<br>\n`;
  for (i = 0; i < Zielgroesse.length; i++) {
    if (i == Marks.TargetSize) {
      OutputHTML += createButton(`changeMark('TargetSize',${i})`, `${Zielgroesse[i][0]}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('TargetSize',${i})`, `${Zielgroesse[i][0]}`, 0)
    }
  };
  OutputHTML += `</li>\n<li class="listItem">Zielzone: (FK: ${printValue(FK_TargetZone)})<br>\n`;
  if (Marks.TargetZone != 0 && Helden[Marks.Hero].KSF.GezielterSchuss == 1) {
    OutputHTML += `<i>halbiert durch KSF Gezielter Schuss</i><br>\n`
  };
  for (i = 0; i < Zielzone.length; i++) {
    if (i == Marks.TargetZone) {
      OutputHTML += createButton(`changeMark('TargetZone',${i})`, `${Zielzone[i][0]}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('TargetZone',${i})`, `${Zielzone[i][0]}`, 0)
    }
  };
  OutputHTML += `</li>\n<li class="listItem">Ziel &uuml;berrascht: (FK: ${printValue(FK_TargetSurprise)})<br>\n`;
  for (i = 0; i < Zielueberrascht.length; i++) {
    if (i == Marks.TargetSurprise) {
      OutputHTML += createButton(`changeMark('TargetSurprise',${i})`, `${Zielueberrascht[i][0]}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('TargetSurprise',${i})`, `${Zielueberrascht[i][0]}`, 0)
    }
  };
  OutputHTML += `</li>\n<li class="listItem">Bewegung des Ziels: (FK: ${printValue(FK_TargetMovement)})<br>\n`;
  for (i = 0; i < Zielbewegung.length; i++) {
    if (i == Marks.TargetMovement) {
      OutputHTML += createButton(`changeMark('TargetMovement',${i})`, `${Zielbewegung[i][0]}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('TargetMovement',${i})`, `${Zielbewegung[i][0]}`, 0)
    }
  };
  OutputHTML += `</li>\n<li class="listItem">Bewegung des Sch&uuml;tzen: (FK: ${printValue(FK_SelfMovement)})<br>\n`;
  for (i = 0; i < Schuetzenbewegung.length; i++) {
    if (i == Marks.SelfMovement) {
      OutputHTML += createButton(`changeMark('SelfMovement',${i})`, `${Schuetzenbewegung[i][0]}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('SelfMovement',${i})`, `${Schuetzenbewegung[i][0]}`, 0)
    }
  };
  OutputHTML += `</li>\n<li class="listItem">Sicht: (FK: ${printValue(FK_Vision)})<br>\n`;
  for (i = 0; i < Sicht.length; i++) {
    if (i == Marks.Vision) {
      OutputHTML += createButton(`changeMark('Vision',${i})`, `${Sicht[i][0]}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('Vision',${i})`, `${Sicht[i][0]}`, 0)
    }
  };
  OutputHTML += `</li>\n<li class="listItem">Schuss ins Kampfget&uuml;mmel: (FK: ${printValue(FK_TargetCombat)})<br>\n`;
  if (Helden[Marks.Hero].KSF.Rueckendeckung == 1) {
    OutputHTML += ` <i>ignoriert durch eKSF R&uuml;ckendeckung</i>\n`
  } else {
    for (i = 0; i < Zielkampfgetuemmel.length; i++) {
      if (i == Marks.TargetCombat) {
        OutputHTML += createButton(`changeMark('TargetCombat',${i})`, `${Zielkampfgetuemmel[i][0]}`, 1)
      } else {
        OutputHTML += createButton(`changeMark('TargetCombat',${i})`, `${Zielkampfgetuemmel[i][0]}`, 0)
      }
    }
  };
  if (Helden[Marks.Hero].KSF.Scharfschuetze == 1 || Helden[Marks.Hero].KSF.Scharfschuetze == 2) {
    OutputHTML += `</li>\n<li class="listItem">KSF Scharfsch&uuml;tze: (FK: ${printValue(FK_Sniper)})\n`
  };
  if (Helden[Marks.Hero].KSF.ArmbrustUeberdrehen == 1) {
    OutputHTML += `</li>\n<li class="listItem">KSF Armbrust &Uuml;berdrehen: (TP: ${printValue(TP_Overwind)})<br>\n`;
    for (i = 0; i < ArmbrustUeberdrehen.length; i++) {
      if (i == Marks.Overwind) {
        OutputHTML += createButton(`changeMark('Overwind',${i})`, `${ArmbrustUeberdrehen[i][0]}`, 1)
      } else {
        OutputHTML += createButton(`changeMark('Overwind',${i})`, `${ArmbrustUeberdrehen[i][0]}`, 0)
      }
    }
  };
  if (Helden[Marks.Hero].KSF.PraeziserSchuss == 1 || Helden[Marks.Hero].KSF.PraeziserSchuss == 2 || Helden[Marks.Hero].KSF.PraeziserSchuss == 3) {
    OutputHTML += `</li>\n<li class="listItem">KSF Pr&auml;ziser Schuss: (FK: ${printValue(FK_PreciseShot)} / TP: ${printValue(TP_PreciseShot)})<br>\n`;
    for (i = 0; i < Helden[Marks.Hero].KSF.PraeziserSchuss+1; i++) {
      if (i == Marks.PreciseShot) {
        OutputHTML += createButton(`changeMark('PreciseShot',${i})`, `${PraeziserSchuss[i][0]}`, 1)
      } else {
        OutputHTML += createButton(`changeMark('PreciseShot',${i})`, `${PraeziserSchuss[i][0]}`, 0)
      }
    }
  };
  OutputHTML += `</li>\n<li class="listItem">Zielen: (FK: ${printValue(FK_Aiming)})<br>\n`;
  if (Marks.Aiming != 0 && Helden[Marks.Hero].Waffen[Marks.Weapon].Typ == "Balläster" && Helden[Marks.Hero].KSF.IrbraschStil == 1) {
    OutputHTML += `<i>verdoppelt durch Irbrasch-Stil</i><br>\n`
  };
  for (i = 0; i < Zielen.length; i++) {
    if (i == Marks.Aiming) {
      OutputHTML += createButton(`changeMark('Aiming',${i})`, `${Zielen[i][0]}`, 1)
    } else {
      OutputHTML += createButton(`changeMark('Aiming',${i})`, `${Zielen[i][0]}`, 0)
    };
  };
  OutputHTML += "</li>\n</ul>";
  //Aufsummieren
  let FK_Sum = FK_Hero + FK_Weapon + FK_Range + FK_TargetSize + FK_TargetZone + FK_TargetSurprise + FK_TargetMovement + FK_SelfMovement + FK_Vision + FK_TargetCombat + FK_Sniper + FK_PreciseShot + FK_Aiming;
  let TP_Sum = TP_Weapon + TP_Range + TP_Overwind + TP_PreciseShot;
  OutputHTML += `\n<div class="sum">Summe: FK = ${FK_Sum} / TP = W6${printValue(TP_Sum)}</div>`;
  if (Helden[Marks.Hero].Waffen[Marks.Weapon].Typ == "Balläster") {
    OutputHTML += `\ngegen V&ouml;gel: TP +1`;
    if (Marks.Range == 0) {
      OutputHTML += ` / bei Entfernung &le;5 Schritt: TP +2`
    }
  };
  if(IsMain) {
    console.log(OutputHTML)
  } else {
    document.getElementById("ScriptedHTML").innerHTML = OutputHTML;
  }
};

main();
