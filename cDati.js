function cDati() {

  this.possibiliZeri = function (v) {
    var a, c, i, j, k, at = [], ct = [], t = []; // c = termine noto, a = primo coefficiente
    a = v[0].coefficiente;   //vado a ricavare i due coefficienti necessari
    c = v[v.length - 1].coefficiente;
    if (a < 0) a = -a;
    if (c < 0) c = -c;
    for (i = 1; i <= a; i++) {        //controllo quali numeri diano resto zero, questi sono i divisori e li aggiungo alla lista di divisori del corrispettivo coefficiente
      if (a % i == 0) at.push(i);
    }
    for (i = 1; i <= c; i++) {
      if (c % i == 0) ct.push(i);
    }
  
    //ora creo un ciclo nidificato per creare un vettore con ogni singola possibilità di rapporto
    for (i = 0, k = 0; i < ct.length; i++) {
      for (j = 0; j < at.length; j++) {
        t[k] = {
          rapp: ct[i] / at[j],
          str: ct[i] + "/" + at[j]
        };
        k++;
      }
    }
    return t;
  }
  
  
  this.trovaZeri = function (v) {
    var i, j, verifica, t = [], zeri = [];
    //console.log(v)
    t = this.possibiliZeri(v);
    //console.log(t)
    for (i = 0; i < t.length; i++) {
      for (j = verifica = 0; j < v.length; j++) {
        verifica += Math.pow(t[i].rapp, v[j].esponente) * v[j].coefficiente;
      }
      if (verifica == 0) zeri.push(t[i])
      for (j = verifica = 0; j < v.length; j++) {
        verifica += Math.pow(-t[i].rapp, v[j].esponente) * v[j].coefficiente;
      }
      if (verifica == 0) zeri.push({ rapp: -t[i].rapp, str: "-" + t[i].str });
    }
    for (j = verifica = 0; j < v.length; j++) {
      verifica += Math.pow(0, v[j].esponente) * v[j].coefficiente;
    }
    if (verifica == 0) zeri.push({ rapp: 0, str: "0" });
  
    for (i = 0; i < zeri.length; i++) {
      if (zeri[i].rapp % 1 == 0) { zeri[i].str = "" + zeri[i].rapp };
    }
  
    for (i = 0; i < zeri.length; i++) {
      for (j = i + 1; j < zeri.length; j++) {
        if (zeri[i].rapp == zeri[j].rapp) { zeri.splice(j, 1) };
      }
    }
    //console.log(zeri)
    return zeri;
  }

  return this;
}


