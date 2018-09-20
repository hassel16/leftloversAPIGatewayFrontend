"use strict";
class Jahrgangneu {
    constructor(studiengang, jahrgang, hochschule) {
        this.studiengang = studiengang;
        this.jahrgang = jahrgang;
        this.hochschule = hochschule;
        this.studienphasen = new Array();

    }

    toString() {
        return (this.studiengang + " " + this.jahrgang + " " + this.hochschule + this.studienphasen + ".");
    }
}

class Phase {
    constructor(phasen, startDatum, endDatum) {
        this.phasen = phasen;
        this.startDatum = startDatum;
        this.endDatum = endDatum;
        if (startDatum != undefined || endDatum != undefined) {
            this.startKW = this.berechneWochen(startDatum);
            this.endKW = this.berechneWochen(endDatum);
        }

    }

    berechneWochen(datumErsatz) {
        let datum = new Date(datumErsatz);

        let jh = datum.getFullYear() + 1;
        let kalwo = this.kaldiff(datum, jh);
        while (kalwo < 1) { jh--; kalwo = this.kaldiff(datum, jh); }
        return kalwo;
    }

    kaldiff(datum, jahr) {
        let d4j = new Date(jahr, 0, 4);
        let wt4j = (d4j.getDay() + 6) % 7;
        let m1wjT = Math.floor(0.01 + d4j.getTime() / 864e5 - wt4j);
        let datumT = Math.floor(0.01 + datum.getTime() / 864e5);
        return Math.floor(1 + (datumT - m1wjT) / 7);
    }

    toString() {
        return (this.phasen + " " + this.startDatum + " " + this.endDatum + "");
    }
}
    

    let arrayJahrgang = getFromStorage();
    let arrayPhase = new Array();

    function jahrgangHinzufuegen() {
        if (auslesenUndJahrgangErzeugen() != false) {
            let jahrgangneu = auslesenUndJahrgangErzeugen();
            jahrgangneu.studienphasen = arrayPhase;
            arrayPhase = new Array();
            arrayJahrgang.push(jahrgangneu);
            saveInStorage();
            resetFormJahrgang();
            generiereUebersichtstabelle();
            generiereStringForHTMLJahrgang();
        } else {
            alert("Fehlerhafte Eingabe! Bitte überprüfen");
        }
    }

    function saveInStorage() {
         $.post( "https://studentenuebersicht.herokuapp.com/storage/studiengang",arrayJahrgang );
        //$.post("http://127.0.0.1:8080/storage/studiengang", arrayJahrgang);
    }

    function getFromStorage() {
        jQuery.get("https://studentenuebersicht.herokuapp.com/storage/studiengang", function (data) {
            return data;
        });
    }

    function auslesenUndJahrgangErzeugen() {
        let txtfeldStudiengang = $("#studiengang").val();
        let txtfeldJahrgang = $("#jahrgang").val();
        let boxSchule = $("input[name='hochschule']:checked").val();

        if (txtfeldStudiengang == "" || txtfeldJahrgang == "" || boxSchule == undefined) {
            return false;
        }

        let jahrgangneu = new Jahrgangneu(txtfeldStudiengang, txtfeldJahrgang, boxSchule);
        return jahrgangneu;
    }
    function resetFormJahrgang() {
        $("#studiengang").val("");
        $("#jahrgang").val("");
        $("input[name='hochschule']:checked").prop("checked", false);
        $("#UebersichtPhase").html("");
    }

    function loescheAusarrayJahrgang(number) {
        arrayJahrgang.splice(number, 1);
        generiereStringForHTMLJahrgang();

    }

    function generiereStringForHTMLJahrgang() {

    }

    function bearbeitenAusarrayJahrgang(number) {
        let jahrgangneu = new Jahrgangneu();
        jahrgangneu = arrayJahrgang[number];

        $("#studiengang").val(jahrgangneu.studiengang);
        $("#jahrgang").val(jahrgangneu.jahrgang);
        $("input[name='hochschule'][value='" + jahrgangneu.hochschule + "']").prop("checked", true);

        $("#buttons").html(" <Button onclick='bearbeitungSpeichernJahrgang(" + number + ")'>Speichern</Button>");
    }

    function setButtons(value) {
        $("input[name='hochschule']:checked").prop("checked", false);
        $(`#${value}`).prop("checked", true);
    }

    function bearbeitungSpeichernJahrgang(number) {
        if (auslesenUndJahrgangErzeugen() != false) {
            let jahrgangneu = auslesenUndJahrgangErzeugen();
            arrayJahrgang[number] = jahrgangneu;
            resetFormJahrgang();
            $("#buttons").html("<button onclick='phaseHinzufuegen' class='btn btn-primary'>Phase hinzufügen</button>" + " " + "<button onclick='jahrgangHinzufuegen()' class='btn btn-primary'>Jahrgang hinzufügen</button>");
            generiereStringForHTMLJahrgang();
        } else {
            alert("Fehlerhafte Eingabe! Bitte überprüfen!");
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function phaseHinzufuegen() {
        if (auslesenUndPhaseErzeugen() != false) {
            let phase = auslesenUndPhaseErzeugen();
            arrayPhase.push(phase);
            resetFormPhase();
            generiereStringForHTMLPhase();
        } else {
            alert("Fehlerhafte Eingabe! Bitte überprüfen!");
        }
    }

    function auslesenUndPhaseErzeugen() {
        let txtfeldPhase = $("#phasen").val();
        let txtfeldStart = $("#startDatum").val();
        let txtfeldEnde = $("#endDatum").val();

        if (txtfeldPhase == "" || txtfeldStart == "" || txtfeldEnde == "") {
            return false;
        }

        let phase = new Phase(txtfeldPhase, txtfeldStart, txtfeldEnde);
        return phase;
    }

    function resetFormPhase() {
        $("#formIDStudiphase").html(generiereNeueForm());
    }

    function bearbeitenAusarrayPhase(number) {
        let phase = new Phase();
        phase = arrayPhase[number];

        $("#phasen").val(phase.phasen);
        $("#startDatum").val(phase.startDatum);
        $("#endDatum").val(phase.endDatum);

        $("#buttons").html(" <Button onclick='bearbeitungSpeichernPhase(" + number + ")' class='btn btn-primary'>Speichern</Button>");
    }

    function bearbeitungSpeichernPhase(number) {
        if (auslesenUndPhaseErzeugen() != false) {
            let phase = auslesenUndPhaseErzeugen();
            arrayPhase[number] = phase;
            resetFormPhase();
            $("#buttons").html("<button onclick='phaseHinzufuegen' class='btn btn-primary'>Phase hinzufügen</button>" + " " + "<button onclick='jahrgangHinzufuegen()' class='btn btn-primary'>Jahrgang hinzufügen</button>");
            generiereStringForHTMLPhase();
        } else {
            alert("Fehlerhafte Eingabe! Bitte überprüfen!");
        }
    }
    function loescheAusarrayPhase(number) {
        arrayPhase.splice(number, 1);
        generiereStringForHTMLPhase();

    }

    function generiereStringForHTMLPhase() {
        let stringForHtmlPhase = "<table class='table table-bordered'> \
    <thead>\
      <tr> \
        <th scope='col'>Phasenart</th>\
        <th scope='col'>Start</th>\
        <th scope='col'>Ende</th>\
        <th scope='col'>Start-KW</th>\
        <th scope='col'>End-KW</th>\
        <th scope='col'>Bearbeiten</th>\
        <th scope='col'>Löschen</th>\
        </thead><tbody>";
        for (let i = 0; i < arrayPhase.length; i++) {
            stringForHtmlPhase += "<tr>"
            stringForHtmlPhase += "<td>" + arrayPhase[i].phasen + "</td>";
            stringForHtmlPhase += "<td>" + arrayPhase[i].startDatum + "</td>";
            stringForHtmlPhase += "<td>" + arrayPhase[i].endDatum + "</td>";
            stringForHtmlPhase += "<td>" + arrayPhase[i].startKW + "</td>";
            stringForHtmlPhase += "<td>" + arrayPhase[i].endKW + "</td>";
            stringForHtmlPhase += "<td><Button class='btn btn-primary' onclick='bearbeitenAusarrayPhase(" + i + ")'>Bearbeiten</Button></td>";
            stringForHtmlPhase += "<td><Button class='btn btn-primary' onclick='loescheAusarrayPhase(" + i + ")'>Loeschen</Button></td>";
            //  <Button onclick='loescheAusarrayPhase(" + i + ")'>Loeschen</Button>" + "<Button onclick='bearbeitenAusarrayPhase(" + i + ")'>Bearbeiten</Button>" + "<br>";
            stringForHtmlPhase += "</tr>"
        }
        stringForHtmlPhase += "</tbody>"

        $("#UebersichtPhase").html(stringForHtmlPhase);
    }
    function generiereNeueForm() {
        let htmlforForm = "<form class='form-inline'> \
<select class='custom-select my-1 mr-sm-2' id='phasen' >\
  <option selected>Auswaehlen..</option>\
  <option value='Praxis'>Praxis</option>\
  <option value='Theorie'>Theorie</option>\
</select>\
<fieldset>\
  <div>\
    <label for='startDatum'>Start</label>\
    <input type='date' id='startDatum' name='trip' value='' min='2015-01-01' max='2080-12-31' />\
  </div>\
  <div>\
    <label for='endDatum'>Ende</label>\
    <input type='date' id='endDatum' name='trip' value='' min='2015-01-01' max='2080-12-31' />\
  </div>\
</fieldset>";
        return htmlforForm;
    }


    function generiereUebersichtstabelle() {
        let htmlAsString = "<table class='table table-bordered'> \
    <thead>\
      <tr> \
        <th scope='col'>HS</th>\
        <th scope='col'>SG</th>\
        <th scope='col'>JG</th>";
        //Speicher größte Anzahl Phasen eines Studiengangs
        let cacheSize = 0;
        for (let counter = 0; counter < arrayJahrgang.length; counter++) {
            if (cacheSize < arrayJahrgang[counter].studienphasen.length) {
                cacheSize = arrayJahrgang[counter].studienphasen.length;
            }
        }
        for (let counterPhasen = 1; counterPhasen <= cacheSize; counterPhasen++) {
            htmlAsString = htmlAsString + "<th scope='col'>" + counterPhasen + ". Phase</th>";
        }
        htmlAsString = htmlAsString + "</tr > </thead >";
        //Bis hierhin ist die überschrift


        htmlAsString = htmlAsString + "<tbody>";
        for (let counter = 0; counter < arrayJahrgang.length; counter++) {
            let jahrgang = new Jahrgangneu(arrayJahrgang[counter].studiengang, arrayJahrgang[counter].jahrgang, arrayJahrgang[counter].hochschule);
            jahrgang.studienphasen = arrayJahrgang[counter].studienphasen;

            //htmlAsString+="<tr>" gleich htmlAsString = htmlAsString +"<tr>"
            htmlAsString += "<tr>";
            htmlAsString += "<th>" + jahrgang.hochschule + "</th>";
            htmlAsString += "<td>" + jahrgang.studiengang + "</td>";
            htmlAsString += "<td>" + jahrgang.jahrgang + "</td>";
            for (let counterPhasenFromJahrgang = 0; counterPhasenFromJahrgang < jahrgang.studienphasen.length; counterPhasenFromJahrgang++) {
                htmlAsString += "<td>" + jahrgang.studienphasen[counterPhasenFromJahrgang].phasen + "<br>" + jahrgang.studienphasen[counterPhasenFromJahrgang].startDatum + " - " + jahrgang.studienphasen[counterPhasenFromJahrgang].endDatum + "</td>";
            }
            htmlAsString += "</tr>";
        }
        htmlAsString += "</tbody></table>";

        $("#tableJahrgaenge").html(htmlAsString);

    }