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
  let output = "";
  if (Value > 0) {
    output += "+" + Value
  } else if (Value == 0) {
    output += "&plusmn;0"
  } else {
    output += Value
  }
  return output
};

function RefreshHTML() {
  let OutputHTML = "";
  OutputHTML += "<ul>";
  OutputHTML += `\n<li><b>Held:</b><br>\n`;
  for (i in Helden) {
    OutputHTML += `<button onclick='changeMark("Hero",${i})'>`;
    if (i == Marks.Hero){
      OutputHTML += `<mark>${Helden[i].Name}</mark>`
    } else {
      OutputHTML += `${Helden[i].Name}`
    };
    OutputHTML += `</button>`
  };
  let FK_Hero = Helden[Marks.Hero].Waffen[Marks.Weapon].FK;
  let TP_Weapon = Helden[Marks.Hero].Waffen[Marks.Weapon].TP;
  OutputHTML += `\n<li><b>Waffe bzw. Munition:</b> (FK = ${FK_Hero} / TP = W6${printValue(TP_Weapon)})<br>\n`;
  for (i in Helden[Marks.Hero].Waffen) {
    OutputHTML += `<button onclick='changeMark("Weapon",${i})'>`;
    if (i == Marks.Weapon) {
      OutputHTML += `<mark>${Helden[Marks.Hero].Waffen[i].Name}</mark>`
    } else {
      OutputHTML += `${Helden[Marks.Hero].Waffen[i].Name}`
    };
    OutputHTML += `</button>`
  };
  let FK_Range = Reichweite[Marks.Range][1];
  let TP_Range = Reichweite[Marks.Range][2];
  OutputHTML += `\n<li><b>Entfernung in Schritt:</b> (FK: ${printValue(FK_Range)} / TP: ${printValue(TP_Range)})<br>\n`;
  for (i = 0; i < Reichweite.length; i++) {
    OutputHTML += `<button onclick='changeMark("Range",${i})'>`;
    if (i == Marks.Range) {
      OutputHTML += `<mark>${Reichweite[i][0]}: &le;${Helden[Marks.Hero].Waffen[Marks.Weapon].Reichweite[i]}</mark>`
    } else {
      OutputHTML += `${Reichweite[i][0]}: &le;${Helden[Marks.Hero].Waffen[Marks.Weapon].Reichweite[i]}`
    };
    OutputHTML += `</button>`
  };
  let FK_TargetSize = Zielgroesse[Marks.TargetSize][1];
  OutputHTML += `\n<li><b>Ziel-Gr&ouml;&szlig;e:</b> (FK: ${printValue(FK_TargetSize)})<br>\n`;
  for (i = 0; i < Zielgroesse.length; i++) {
    OutputHTML += `<button onclick='changeMark("TargetSize",${i})'>`;
    if (i == Marks.TargetSize) {
      OutputHTML += `<mark>${Zielgroesse[i][0]}</mark>`
    } else {
      OutputHTML += `${Zielgroesse[i][0]}`
    };
    OutputHTML += `</button>`
  };
  let FK_TargetZone = Zielzone[Marks.TargetZone][1];
  let FK_TargetZone2 = FK_TargetZone;
  if (Helden[Marks.Hero].KSF.GezielterSchuss == 1) {
    FK_TargetZone2 = Math.round(FK_TargetZone/2);
    OutputHTML += `\n<li><b>Zielzone:</b> (FK: ${printValue(FK_TargetZone2)}) <i>halbiert durch KSF Gezielter Schuss</i><br>\n`
  } else {
    OutputHTML += `\n<li><b>Zielzone:</b> (FK: ${printValue(FK_TargetZone2)})<br>\n`
  }
  for (i = 0; i < Zielzone.length; i++) {
    OutputHTML += `<button onclick='changeMark("TargetZone",${i})'>`;
    if (i == Marks.TargetZone) {
      OutputHTML += `<mark>${Zielzone[i][0]}</mark>`
    } else {
      OutputHTML += `${Zielzone[i][0]}`
    };
    OutputHTML += `</button>`
  };
  let FK_TargetSurprise = Zielueberrascht[Marks.TargetSurprise][1];
  if (Marks.TargetZone == 0) {
    FK_TargetSurprise = 0
  };
  OutputHTML += `\n<li><b>Ziel &uuml;berrascht:</b> (FK: ${printValue(FK_TargetSurprise)})<br>\n`;
  for (i = 0; i < Zielueberrascht.length; i++) {
    OutputHTML += `<button onclick='changeMark("TargetSurprise",${i})'>`;
    if (i == Marks.TargetSurprise) {
      OutputHTML += `<mark>${Zielueberrascht[i][0]}</mark>`
    } else {
      OutputHTML += `${Zielueberrascht[i][0]}`
    };
    OutputHTML += `</button>`
  };
  let FK_TargetMovement = Zielbewegung[Marks.TargetMovement][1];
  OutputHTML += `\n<li><b>Bewegung des Ziels (Schritt in letzter Handlung):</b> (FK: ${printValue(FK_TargetMovement)})<br>\n`;
  for (i = 0; i < Zielbewegung.length; i++) {
    OutputHTML += `<button onclick='changeMark("TargetMovement",${i})'>`;
    if (i == Marks.TargetMovement) {
      OutputHTML += `<mark>${Zielbewegung[i][0]}</mark>`
    } else {
      OutputHTML += `${Zielbewegung[i][0]}`
    };
    OutputHTML += `</button>`
  };
  let FK_SelfMovement = Schuetzenbewegung[Marks.SelfMovement][1];
  OutputHTML += `\n<li><b>Bewegung des Sch&uuml;tzen (Schritt in letzter Handlung):</b> (FK: ${printValue(FK_SelfMovement)})<br>\n`;
  for (i = 0; i < Schuetzenbewegung.length; i++) {
    OutputHTML += `<button onclick='changeMark("SelfMovement",${i})'>`;
    if (i == Marks.SelfMovement) {
      OutputHTML += `<mark>${Schuetzenbewegung[i][0]}</mark>`
    } else {
      OutputHTML += `${Schuetzenbewegung[i][0]}`
    };
    OutputHTML += `</button>`
  };
  let FK_Vision = Sicht[Marks.Vision][1];
  OutputHTML += `\n<li><b>Sicht:</b> (FK: ${printValue(FK_Vision)})<br>\n`;
  for (i = 0; i < Sicht.length; i++) {
    OutputHTML += `<button onclick='changeMark("Vision",${i})'>`;
    if (i == Marks.Vision) {
      OutputHTML += `<mark>${Sicht[i][0]}</mark>`
    } else {
      OutputHTML += `${Sicht[i][0]}`
    };
    OutputHTML += `</button>`
  };
  let FK_TargetCombat = Zielkampfgetuemmel[Marks.TargetCombat][1];
  let FK_TargetCombat2 = FK_TargetCombat;
  if (Helden[Marks.Hero].KSF.Rueckendeckung == 1) {
    FK_TargetCombat2 = 0;
    OutputHTML += `\n<li><b>Schuss ins Kampfget&uuml;mmel:</b> (FK: ${printValue(FK_TargetCombat2)}) <i>ignoriert durch eKSF R&uuml;ckendeckung</i><br>\n`
  } else {
    OutputHTML += `\n<li><b>Schuss ins Kampfget&uuml;mmel:</b> (FK: ${printValue(FK_TargetCombat2)})<br>\n`
  };
  for (i = 0; i < Zielkampfgetuemmel.length; i++) {
    OutputHTML += `<button onclick='changeMark("TargetCombat",${i})'>`;
    if (i == Marks.TargetCombat) {
      OutputHTML += `<mark>${Zielkampfgetuemmel[i][0]}</mark>`
    } else {
      OutputHTML += `${Zielkampfgetuemmel[i][0]}`
    };
    OutputHTML += `</button>`
  };
  let FK_Sniper = 0;
  if (Helden[Marks.Hero].KSF.Scharfschuetze >= 1) {
    let SniperBonus = Helden[Marks.Hero].KSF.Scharfschuetze*2;
    let SniperSum = FK_Range + FK_TargetSize + FK_TargetZone2 + FK_TargetSurprise + FK_TargetMovement + FK_SelfMovement;
    if (SniperSum <= -SniperBonus) {
      FK_Sniper = SniperBonus
    } else if (SniperSum < 0) {
      FK_Sniper = -SniperSum
    };
    OutputHTML += `\n<li><b>KSF Scharfsch&uuml;tze:</b> (FK: ${printValue(FK_Sniper)})`
  };
  let TP_Overwind = 0;
  if (Helden[Marks.Hero].KSF.ArmbrustUeberdrehen == 1) {
    TP_Overwind = ArmbrustUeberdrehen[Marks.Overwind][1];
    OutputHTML += `\n<li><b>KSF Armbrust &Uuml;berdrehen:</b> (TP: ${TP_Overwind})<br>\n`;
    for (i = 0; i < ArmbrustUeberdrehen.length; i++) {
      OutputHTML += `<button onclick='changeMark("Overwind",${i})'>`;
      if (i == Marks.Overwind) {
        OutputHTML += `<mark>${ArmbrustUeberdrehen[i][0]}</mark>`
      } else {
        OutputHTML += `${ArmbrustUeberdrehen[i][0]}`
      };
      OutputHTML += `</button>`
    };
  };
  let FK_PreciseShot = 0;
  let TP_PreciseShot = 0;
  if (Helden[Marks.Hero].KSF.PraeziserSchuss >= 1) {
    FK_PreciseShot = PraeziserSchuss[Marks.PreciseShot][1];
    TP_PreciseShot = PraeziserSchuss[Marks.PreciseShot][2];
    OutputHTML += `\n<li><b>KSF Pr&auml;ziser Schuss:</b> (FK: ${printValue(FK_PreciseShot)} / TP: ${TP_PreciseShot})<br>\n`;
    for (i = 0; i < Helden[Marks.Hero].KSF.PraeziserSchuss+1; i++) {
      OutputHTML += `<button onclick='changeMark("PreciseShot",${i})'>`;
      if (i == Marks.PreciseShot) {
        OutputHTML += `<mark>${PraeziserSchuss[i][0]}</mark>`
      } else {
        OutputHTML += `${PraeziserSchuss[i][0]}`
      };
      OutputHTML += `</button>`
    };
  };
  let FK_Aiming = Zielen[Marks.Aiming][1];
  OutputHTML += `\n<li><b>Zielen:</b> (FK: ${printValue(FK_Aiming)})<br>\n`;
  for (i = 0; i < Zielen.length; i++) {
    OutputHTML += `<button onclick='changeMark("Aiming",${i})'>`;
    if (i == Marks.Aiming) {
      OutputHTML += `<mark>${Zielen[i][0]}</mark>`
    } else {
      OutputHTML += `${Zielen[i][0]}`
    };
    OutputHTML += `</button>`
  };
  OutputHTML += "</ul>";
  let FK_Sum = FK_Hero + FK_Range + FK_TargetSize + FK_TargetZone2 + FK_TargetSurprise + FK_TargetMovement + FK_SelfMovement + FK_Vision + FK_TargetCombat2 + FK_Sniper + FK_PreciseShot + FK_Aiming;
  let TP_Sum = TP_Weapon + TP_Range + TP_Overwind + TP_PreciseShot;
  OutputHTML += `\n<h2>Summe: FK = ${FK_Sum} / TP = W6${printValue(TP_Sum)}</h2>`;
  if(IsMain) {
    console.log(OutputHTML)
  } else {
    document.getElementById("ScriptedHTML").innerHTML = OutputHTML;
  }
};

main();
