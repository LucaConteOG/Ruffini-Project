function cHTML(polinomioInserito, polinomioTradotto, CronologiaBottoni, TabellaRuffini, PolinomioScompostoBase, PolinomioScomposto, zeri, Prefix) {
  this.polinomioInserito = polinomioInserito;
  this.polinomioTradotto = polinomioTradotto;
  this.CronologiaBottoni = CronologiaBottoni;
  this.TabellaRuffini = TabellaRuffini;
  this.PolinomioScompostoBase = PolinomioScompostoBase;
  this.PolinomioScomposto = PolinomioScomposto;
  this.zeri = zeri;
  this.Prefix = Prefix;
  
  this.Dati = new cDati();
  
  
  this.lettera = "";
  this.vetRuffini =  [];


  this.Show = function() {
    var i, v=[], zeriVet = [], bottone;
    this.CronologiaBottoni.innerHTML = this.TabellaRuffini.innerHTML = "";
    this.zeri.innerHTML = "&nbsp;Zeri del polinomio&nbsp;";
    this.PolinomioScompostoBase.innerHTML = "&nbsp;Polinomio&nbsp;";
    this.PolinomioScomposto.innerHTML = "&nbsp;Scomposto&nbsp;";

    v = this.polinomioInserito.value;
    v = v.replace(/ /g, "")
    v = v.replace(/&nbsp;/g, "");

    //CONTROLLI
    if(v=="" || v.indexOf(" ") != -1 || v.indexOf("&nbsp;") != -1 || v.indexOf("<") != -1 || v.indexOf(">") != -1 || v.indexOf("&lt;") != -1 || v.indexOf("&gt;") != -1 || v.indexOf("^()") != -1 || v.length == 1) {alert("L'input richiede di inserire un polinomio contenente come lettera solo quella usata per l'incognita, i coefficienti, gli esponenti e i caratteri '^', '(', ')', '+' e '-'.\nEsempio: 4x^(3)-8x^(2)-11x-3."); 
    this.svuota(); return;}
    
    if(v.indexOf("+") == -1 && v.indexOf("-") == -1) {alert("L'input richiede di inserire un polinomio contenente come lettera solo quella usata per l'incognita, i coefficienti, gli esponenti e i caratteri '^', '(', ')', '+' e '-'.\nEsempio: 4x^(3)-8x^(2)-11x-3"); 
    this.svuota(); return;}

    this.lettera = cHTML.EstraiLettera(v);

    //console.log(this.lettera)
    if(this.lettera==undefined){alert("Il polinomio deve contenere numeri, somme e/o sottrazioni e una e una sola lettera come incognita!"); 
    this.svuota(); return;}
    
    v = cHTML.tradSup(v, this.polinomioTradotto, this.lettera);
    if(v == undefined) {alert("L'input richiede di inserire un polinomio contenente come lettera solo quella usata per l'incognita, i coefficienti, gli esponenti e i caratteri '^', '(', ')', '+' e '-'.\nEsempio: 4x^(3)-8x^(2)-11x-3"); 
    this.svuota(); return;}

    //console.log(v)

    zeriVet = this.Dati.trovaZeri(v);
    if(zeriVet.length == 0){this.zeri.innerHTML = "&nbsp;Non sono stati trovati zeri razionali o interi attinenti alla regola di Ruffini.&nbsp;"; return;}

    cHTML.creaRuffini(v, zeriVet);

    for(i = 0, this.zeri.innerHTML = "&nbsp;Zeri del polinomio: "; i < zeriVet.length; i++){
            if(i == 0) this.zeri.innerHTML += zeriVet[i].str;
            else if (i==zeriVet.length-1) this.zeri.innerHTML += ", " + zeriVet[i].str + "&nbsp;";
            else this.zeri.innerHTML += ", " + zeriVet[i].str;
            bottone = "&nbsp;<input type='button' value='Zero: " +  zeriVet[i].str + "' onclick='cHTML.assegnaRuffini(" + this.TabellaRuffini.id +", "+ this.PolinomioScomposto.id + ", " + i + ", " + zeriVet[i].str + ", " + this.PolinomioScompostoBase.id + ")'>";
                //console.log(bottone)
            this.CronologiaBottoni.innerHTML += bottone;
    }
  } 

  this.svuota = function(){
    this.polinomioInserito.value = cHTML.Default.polinomioInserito;
    this.polinomioTradotto.innerHTML = cHTML.Default.polinomioTradotto;
    this.CronologiaBottoni.innerHTML = cHTML.Default.CronologiaBottoni;
    this.TabellaRuffini.innerHTML = cHTML.Default.TabellaRuffini;
    this.PolinomioScompostoBase.innerHTML = cHTML.Default.PolinomioScompostoBase;
    this.PolinomioScomposto.innerHTML = cHTML.Default.PolinomioScomposto;
    this.zeri.innerHTML = cHTML.Default.zeri;
  }
  
  return this;
}

var lettera = "";
var vetRuffini =  [];

cHTML.Default = { 
  polinomioInserito : "x^(n)",
  polinomioTradotto : "&nbsp;x<sup>n</sup>&nbsp;", 
  CronologiaBottoni :  "", 
  TabellaRuffini : "", 
  PolinomioScompostoBase : "&nbsp;Polinomio&nbsp;", 
  PolinomioScomposto : "&nbsp;Scomposto&nbsp;", 
  zeri : "&nbsp;Zeri del polinomio&nbsp;"
};

cHTML.tradSup = function(v, polinomioTradotto, lettera) {
  var i, polinomioStr, dati = [];

  dati = cHTML.raccoltaDati(v, lettera);
  if(dati == undefined) return undefined;

  for(i = 0, polinomioStr = ""; i < dati.length; i++){
      if(dati[i].esponente == 0) polinomioStr += dati[i].coefficiente;
      else if(dati[i].esponente == 1) {
          if(dati[i].coefficiente == +1) polinomioStr += "+" + "x";
          else if(dati[i].coefficiente == -1) polinomioStr += "-" + "x";
          else polinomioStr += dati[i].coefficiente + "x";
      }

      else {
          if(dati[i].coefficiente == +1) polinomioStr += "+" + "x" + "<sup style='font-size:10px'>" + dati[i].esponente + "</sup>";
          else if(dati[i].coefficiente == -1) polinomioStr += "-" + "x" + "<sup style='font-size:10px'>" + dati[i].esponente + "</sup>";
          else polinomioStr += dati[i].coefficiente + "x" + "<sup style='font-size:10px'>" + dati[i].esponente + "</sup>";
      }
  }

  polinomioTradotto.innerHTML = "&nbsp;" + polinomioStr + "&nbsp;";
  return dati;
}

cHTML.assegnaRuffini = function(idTab, idScomp, i, zero, idScompBase){
  var nuoviCoeff = [], j, k;
  idTab.innerHTML = this.vetRuffini[i].tabella;
  nuoviCoeff = this.vetRuffini[i].scomposizione;

  //scomposizione
  idScomp.innerHTML = "&nbsp;(x";
  if(-zero >= 0) idScomp.innerHTML += "+"+ -zero +")(";
  else idScomp.innerHTML += -zero +")(";
  idScompBase.innerHTML = idScomp.innerHTML;

  for(j = nuoviCoeff.length-1, k=0; j >= 0; j--, k++){
      if(j-1 >1 && parseFloat(nuoviCoeff[k]) != 0) {
          if(nuoviCoeff[k]>0 && k != 0 && nuoviCoeff[k] != 1) idScomp.innerHTML += "+" + nuoviCoeff[k] +"x<sup>"+parseFloat(j-1)+"</sup>";
          else if(nuoviCoeff[k]>0 && nuoviCoeff[k] == 1) idScomp.innerHTML += "+x<sup>"+parseFloat(j-1)+"</sup>";
          else if(parseFloat(nuoviCoeff[k]) == -1) idScomp.innerHTML += "-x<sup>"+parseFloat(j-1)+"</sup>";
          else idScomp.innerHTML += parseFloat(nuoviCoeff[k])+"x<sup>"+parseFloat(j-1)+"</sup>";
      }
      else if(j-1==1 && nuoviCoeff[k] != 0) {
          if(nuoviCoeff[k]>0 && k != 0 && nuoviCoeff[k] != 1) idScomp.innerHTML += "+" +nuoviCoeff[k]+"x";
          else if(nuoviCoeff[k]>0 && nuoviCoeff[k] == 1) idScomp.innerHTML += "+x";
          else if(parseFloat(nuoviCoeff[k]) == -1) idScomp.innerHTML += "+x"
          else idScomp.innerHTML += nuoviCoeff[k]+"x";
      }
      else if(j-1==0 && nuoviCoeff[k] != 0) {
          if(nuoviCoeff[k]>0 && k != 0) idScomp.innerHTML += "+" + nuoviCoeff[k];
          else idScomp.innerHTML += nuoviCoeff[k];
      } 
  }
  idScomp.innerHTML+=")&nbsp;"

  for(j = nuoviCoeff.length-1, k=0; j >= 0; j--, k++){
      if(j-1 >1 && parseFloat(nuoviCoeff[k]) != 0) {
          if(nuoviCoeff[k]>0 && k != 0 && nuoviCoeff[k] != 1) idScompBase.innerHTML += "+" + nuoviCoeff[k] +"x^("+parseFloat(j-1)+")";
          else if(nuoviCoeff[k]>0 && nuoviCoeff[k] == 1) idScompBase.innerHTML += "+x^("+parseFloat(j-1)+")";
          else if(parseFloat(nuoviCoeff[k]) == -1) idScompBase.innerHTML += "-x^("+parseFloat(j-1)+")";
          else idScompBase.innerHTML += parseFloat(nuoviCoeff[k])+"x^("+parseFloat(j-1)+")";
      }
      else if(j-1==1 && nuoviCoeff[k] != 0) {
          if(nuoviCoeff[k]>0 && k != 0 && nuoviCoeff[k] != 1) idScompBase.innerHTML += "+" +nuoviCoeff[k]+"x";
          else if(nuoviCoeff[k]>0 && nuoviCoeff[k] == 1) idScompBase.innerHTML += "+x";
          else if(parseFloat(nuoviCoeff[k]) == -1) idScompBase.innerHTML += "+x"
          else idScompBase.innerHTML += nuoviCoeff[k]+"x";
      }
      else if(j-1==0 && nuoviCoeff[k] != 0) {
          if(nuoviCoeff[k]>0 && k != 0) idScompBase.innerHTML += "+" + nuoviCoeff[k];
          else idScompBase.innerHTML += nuoviCoeff[k];
      } 
  }
  idScompBase.innerHTML+=")&nbsp;"
}

cHTML.EstraiLettera = function(polinomio){
  var i, letteraIncognita;
  for(i = 0; i < polinomio.length; i++){
      if(isNaN(polinomio[i]) == true && polinomio[i] != "+" && polinomio[i] != "-" && polinomio[i] != "^" && polinomio[i] != "(" && polinomio[i] != ")" && polinomio[i] != "." && polinomio[i] != ",") {letteraIncognita = polinomio[i]; break}
  }

  for(i = 0; i < polinomio.length; i++){
      if(isNaN(polinomio[i]) == true && polinomio[i] != "+" && polinomio[i] != "-" && polinomio[i] != "^" && polinomio[i] != "(" && polinomio[i] != ")" && polinomio[i] != letteraIncognita && polinomio[i] != "." && polinomio[i] != ",") {return undefined}
  }

  for(i = 0; i < polinomio.length; i++){
      if(polinomio[i] == letteraIncognita){
          if(polinomio[i+1] != "+" && polinomio[i+1] != "-" && polinomio[i+1] != "^" && polinomio[i+1] != undefined) {return undefined}
      }
  }
  return cHTML.lettera = letteraIncognita;
}

cHTML.raccoltaDati = function(polinomio, lettera){
  var v=[], i, j , vetDati = [], esp, coef, coefInPiu, vetCoefinPiu = [];       //il vetDati è un vettore di oggetti contenete
  //console.log(polinomio)
  v = polinomio.split(lettera);
  for(i = 1, coef = v[0]; i < v.length; i++){
      vetDati[i-1] = {
          coefficiente : undefined,
          esponente : undefined
      }
      if(coef != ""){
          for(j = 1, coefInPiu = coef[0]; j < coef.length ; j++){
              if(coef[j]=="-" || coef[j]=="+" ){
                  vetCoefinPiu.push(coefInPiu);
                  coefInPiu = coef[j];
              }
              else{
                  coefInPiu += coef[j];
              }
          }
          coef = coefInPiu;
      }

      vetDati[i-1].coefficiente = coef;
      if(v[i][0]!="^") { //5x^(7)+9x^(32)-5.2
          coef = v[i];
          esp = "1";
      }
      else{
          if(v[i][1]=="("){
              if(v[i].split("^(")[1].indexOf(")") > -1){
                  esp = v[i].split("^(")[1].split(")")[0];
                  coef = v[i].split("^(")[1].split(")")[1];
              }
              else return undefined;
          }
          else return undefined;
      }
      vetDati[i-1].esponente = esp;

      if(coef != ""){
          for(j = 1, coefInPiu = coef[0]; j < coef.length ; j++){
              if(coef[j]=="-" || coef[j]=="+" ){
                  vetCoefinPiu.push(coefInPiu);
                  coefInPiu = coef[j];
              }
              else{
                  coefInPiu += coef[j];
              }
          }
          coef = coefInPiu;
      }
  }
  if(coef != ""){
      vetDati.push({coefficiente: coef, esponente: "0"})
  }
  for(j = 0; j < vetCoefinPiu.length; j++){
      vetDati.push({coefficiente: vetCoefinPiu[j], esponente: "0"})
  }
  return vetDati = cHTML.sortVetDati(vetDati);
}

  /* --- SORT PER IL VETTORE DI OGGETTI DI COEFFICIENTI ED ESPONENTI CREATO IN PRECEDENZA --- */
cHTML.sortVetDati = function(v){
  var i, j, coef, k; //k is the array pivot

  for(i = 0; i< v.length; i++){
      if(v[i].coefficiente == "") v[i].coefficiente = 1;
      else if(v[i].coefficiente == "+") v[i].coefficiente = 1;
      else if(v[i].coefficiente == "-") v[i].coefficiente = -1;
  }

  for(i = 0; i< v.length; i++){
      for(j = i; j < v.length; j++){
          //console.log("Esponenti in gioco ", ": ", v[i].esponente, " : ", v[j].esponente);
          if(parseFloat(v[i].esponente) < parseFloat(v[j].esponente)){ k = v[i]; v[i] = v[j]; v[j] = k;}
          //console.log("pivot: ", k)
      }
  }
          //console.log("Dopo Sort: ", v);        

  for(i = 0; i<v.length; i++){
      for(j = i+1; j < v.length; j++){
          v[i].coefficiente = parseFloat(v[i].coefficiente); 
          v[j].coefficiente = parseFloat(v[j].coefficiente); 
          if(v[i].esponente == v[j].esponente){ 
              v[i].coefficiente += v[j].coefficiente; 
              v.splice(j, 1); --j;}
      }
  }

  for(i = 0, coef = ""; i<v.length; i++){
      coef = v[i].coefficiente.toString();
      if(v[i].coefficiente == "0") v.splice(i, 1);
      else if(coef.split("")[0] != "+" && coef.split("")[0] != "-") v[i].coefficiente = "+" + v[i].coefficiente;
  }
  //console.log("Dopo Sort e somma coefficienti di gradi uguali: ", v);        
  //console.log("Dopo sortVetDati(vetDati): ", v);

  return v;
}

cHTML.creaRuffini = function(vet, zeri){
  var i, j, n, tableRuffini, vetRuffini = [], coefficienti = [], terzaRiga, quartaRiga;
  tableRuffini = "<br><table align=center cellpadding=20 border=1 cellspacing = 0 style='font-size:5' class='tableNoBorder'>\n<tr><td class='borderRight'></td>";
  for(i = j = 0; i <= vet[0].esponente; i++){
      if(i == vet[0].esponente-1){
          if(vet[j] != undefined){
              if(vet[j].esponente == vet[0].esponente-i){ tableRuffini += "<td class='borderRight'>" + vet[j].coefficiente + "</td>"; coefficienti[i] = vet[j].coefficiente; j++;}
              else { tableRuffini += "<td class='borderRight'>0</td>"; coefficienti[i] = 0;}
          }
          else { tableRuffini += "<td class='borderRight'>0</td>"; coefficienti[i] = 0;}
      }
      else {
          if(vet[j] != undefined){
              if(vet[j].esponente == vet[0].esponente-i){ tableRuffini += "<td class='noborder'>" + vet[j].coefficiente + "</td>"; coefficienti[i] = vet[j].coefficiente; j++;}
              else { tableRuffini += "<td class='noborder'>0</td>"; coefficienti[i] = 0;}
          }
          else { tableRuffini += "<td class='noborder'>0</td>"; coefficienti[i] = 0;}
      }
  }
  tableRuffini += "</tr>\n<tr><td class='borderRight'></td>";
  for(i = 0; i <= vet[0].esponente; i++){
      if(i == vet[0].esponente-1) tableRuffini += "<td class='borderRight'>&nbsp;</td>";
      else tableRuffini += "<td class='noborder'>&nbsp;</td>";
  }
  tableRuffini += "</tr>\n";
  //console.log(tableRuffini)
  for(i = 0; i < zeri.length; i++){
      vetRuffini[i] = {
          tabella: "",
          scomposizione: []
      }
      n = coefficienti[0];
      vetRuffini[i].scomposizione.push(n);
          //console.log(n + "*" + zeri[i].rapp)
      quartaRiga = "<tr><td class='borderCorner'></td>" + "<td class='borderTop'>" + n + "</td>"; 
      terzaRiga = "<tr><td class='borderRight'>"+ zeri[i].str +"</td><td class='noborder'></td>";
      for(j = 0; j < vet[0].esponente; j++){ 
          n = n* zeri[i].rapp;
              //console.log("n dopo moltiplicazione: ", n)
          if(j+2 == vet[0].esponente) terzaRiga += "<td class='borderRight'>" + n + "</td>";
          else terzaRiga += "<td class='noborder'>" + n + "</td>";
          n += parseFloat(coefficienti[j+1]);
              //console.log("n dopo somma: ", n)
          if(j+2 == vet[0].esponente) quartaRiga += "<td class='borderCorner'>" + n + "</td>";
          else quartaRiga += "<td class='borderTop'>" + n + "</td>";
          vetRuffini[i].scomposizione.push(n);
      }
          //console.log("terzaRiga: ", terzaRiga);
          //console.log("quartaRiga: ", quartaRiga);
      vetRuffini[i].tabella = tableRuffini + terzaRiga + "</tr>" + quartaRiga + "</tr></table>";
  }
  return this.vetRuffini = vetRuffini;
  }