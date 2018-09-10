"use strict";
class Jahrgangneu {
    constructor(studiengang, jahrgang, standort, anzahl, hochschule) {
        this.studiengang = studiengang;
        this.jahrgang = jahrgang;
        this.standort = standort;
        this.anzahl = anzahl;
        this.hochschule = hochschule;

    }

    toString() {
        return (this.studiengang + " " + this.jahrgang + " " + this.standort + " " + this.anzahl + " " + this.hochschule + ".");
    }
}

class Phase {
    constructor(numerierung, phasen, startDatum, endDatum) {
        this.numerierung = numerierung;
        this.phasen = phasen;
        this.startDatum = startDatum;
        this.endDatum = endDatum;
    }

    toString() {
        return (this.numerierung+ " " +this.phasen + " " + this.startDatum + " " + this.endDatum + ".");
    }
}

let arrayJahrgang = new Array();
let arrayPhase = new Array();

function jahrgangHinzufuegen() {
    let jahrgangneu = auslesenUndJahrgangErzeugen();
    arrayJahrgang.push(jahrgangneu);
    resetFormJahrgang();
    generiereStringForHTMLJahrgang();
}

function auslesenUndJahrgangErzeugen() {
    let txtfeldStudiengang = $("#studiengang").val();
    let txtfeldJahrgang = $("#jahrgang").val();
    let txtfeldStandort = $("#standort").val();
    let txtfeldAnzahl = $("#anzahl").val();
    let boxSchule = $("input[name='hochschule']:checked").val();

    let jahrgangneu = new Jahrgangneu(txtfeldStudiengang, txtfeldJahrgang, txtfeldStandort, txtfeldAnzahl, boxSchule);
    return jahrgangneu;
}
function resetFormJahrgang() {
    $("#studiengang").val("");
    $("#jahrgang").val("");
    $("#standort").val("");
    $("#anzahl").val("");
    $("input[name='hochschule']:checked").prop("checked", false);
}

function loescheAusarrayJahrgang(number) {
    arrayJahrgang.splice(number, 1);
    generiereStringForHTMLJahrgang();

}

function generiereStringForHTMLJahrgang() {
    let stringForHtml = "";
    for (let i = 0; i < arrayJahrgang.length; i++) {
        stringForHtml = stringForHtml + arrayJahrgang[i].toString() + "  <Button onclick='loescheAusarrayJahrgang(" + i + ")'>Loeschen</Button>" + "<Button onclick='bearbeitenAusarrayJahrgang(" + i + ")'>Bearbeiten</Button>" + "<br>";
    }

    $("#ausgabe").html(stringForHtml);
}

function bearbeitenAusarrayJahrgang(number) {
    let jahrgangneu = new Jahrgangneu();
    jahrgangneu = arrayJahrgang[number];

    $("#studiengang").val(jahrgangneu.studiengang);
    $("#jahrgang").val(jahrgangneu.jahrgang);
    $("#standort").val(jahrgangneu.standort);
    $("#anzahl").val(jahrgangneu.anzahl);
    $("input[name='hochschule'][value='" + jahrgangneu.hochschule + "']").prop("checked", true);

    $("#buttons").html(" <Button onclick='bearbeitungSpeichernJahrgang(" + number + ")'>Speichern</Button>");
}

function setButtons(value) {
    $("input[name='hochschule']:checked").prop("checked", false);
    $(`#${value}`).prop("checked", true);
}

function bearbeitungSpeichernJahrgang(number) {
    let jahrgangneu = auslesenUndJahrgangErzeugen();
    arrayJahrgang[number] = jahrgangneu;
    resetFormJahrgang();
    $("#buttons").html("<button onclick='jahrgangHinzufuegen()' class='btn btn-primary'>Jahrgang hinzufuegen</button>" + " " + "<button onclick='phaseHinzufuegen' class='btn btn-primary'>Phase hinzufuegen</button>");
    generiereStringForHTML();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function phaseHinzufuegen() {
    let phase = auslesenUndPhaseErzeugen();
    arrayPhase.push(phase);
    resetFormPhase();
    generiereStringForHTMLPhase();

}

function auslesenUndPhaseErzeugen() {
    let txtfeldNumerierung = $("#numerierung").val();
    let txtfeldPhase = $("#phasen").val();
    let txtfeldStart = $("#startDatum").val();
    let txtfeldEnde = $("#endDatum").val();

    let phase = new Phase(txtfeldNumerierung, txtfeldPhase, txtfeldStart, txtfeldEnde);
    return phase;
}

function resetFormPhase() {
    $("#numerierung").val("");
    $("#phasen").val("");
    $("#startDatum").val("");
    $("#endDatum").val("");
}

function bearbeitenAusarrayPhase(number) {
    let phase = new Phase();
    phase = arrayPhase[number];

    $("#numerierung").val(phase.numerierung);
    $("#phasen").val(phase.phasen);
    $("#startDatum").val(phase.startDatum);
    $("#endDatum").val(phase.endDatum);

    $("#buttons").html(" <Button onclick='bearbeitungSpeichernPhase(" + number + ")'>Speichern</Button>");
}

function bearbeitungSpeichernPhase(number) {
    let phase = auslesenUndPhaseErzeugen();
    arrayPhase[number] = phase;
    resetFormPhase();
    $("#buttons").html("<button onclick='jahrgangHinzufuegen()' class='btn btn-primary'>Jahrgang hinzufuegen</button>" + " " + "<button onclick='phaseHinzufuegen' class='btn btn-primary'>Phase hinzufuegen</button>");
    generiereStringForHTMLPhase();
}
function loescheAusarrayPhase(number) {
    arrayPhase.splice(number, 1);
    generiereStringForHTMLPhase();

}

function generiereStringForHTMLPhase() {
    let stringForHtmlPhase = "";
    for (let i = 0; i < arrayPhase.length; i++) {
        stringForHtmlPhase = stringForHtmlPhase + arrayPhase[i].toString() + "  <Button onclick='loescheAusarrayPhase(" + i + ")'>Loeschen</Button>" + "<Button onclick='bearbeitenAusarrayPhase(" + i + ")'>Bearbeiten</Button>" + "<br>";
    }

    $("#ausgabePhase").html(stringForHtmlPhase);
}
