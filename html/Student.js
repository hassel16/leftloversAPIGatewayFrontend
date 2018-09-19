"use strict";
class Student {
    constructor(name,vorname,hochschule,standort,studiengang,semester){
        this.name=name;
        this.vorname=vorname;
        this.standort=standort;
        this.hochschule=hochschule;
        this.studiengang=studiengang;
        this.semester=semester;
    }

    toString(){
        return (this.name+" "+this.vorname+" "+this.standort+" "+this.studiengang+" "+this.semester+" "+this.hochschule);
    }
}

let array= new Array(); 

function TestAuslesen(){ 

    if(auslesenUndStudentErzeugen() != false){
        let student = auslesenUndStudentErzeugen(); 
    
        array.push(student); 
    
        resetForm(); 
    
        generiereStringForHTML(); 
    }else{
        alert("Fehlerhafte Eingabe! Bitte überprüfen!");
    }

}

function auslesenUndStudentErzeugen(){
    let txtfeldName=$("#name").val();
    let txtfeldVorname=$("#vorname").val();
    let txtfeldStandort=$("#standort").val();
    let boxSchule=$("input[name='hochschule']:checked").val();
    let txtfeldStudiengang=$("#studiengang").val();
    let txtfeldSemester=$("#semester").val();
    
    if (txtfeldName == "" || txtfeldVorname == "" || txtfeldStandort == "" || boxSchule == undefined || txtfeldStudiengang == "" || txtfeldSemester == ""){
        return false;
    }

    let student = new Student(txtfeldName, txtfeldVorname, boxSchule,txtfeldStandort,  txtfeldStudiengang, txtfeldSemester);
    return student;
}
function resetForm () {
    $("#name").val("");
    $("#vorname").val("");
    $("#standort").val("");
    $("input[name='hochschule']:checked").prop("checked",false);
    $("#studiengang").val("");
    $("#semester").val("");
}

function loescheAusArray(number){
            array.splice(number, 1);
            generiereStringForHTML();

}

function generiereStringForHTML(){
    let stringForHtml="";
    for(let i=0;i<array.length;i++){
        stringForHtml = stringForHtml + array[i].toString() + "  <Button onclick='loescheAusArray("+i+")'>Loeschen</Button>"+"  "+"  <Button onclick='bearbeitenAusArray("+i+")'>Bearbeiten</Button>"+"<br>";
    }

    $("#ausgabe").html(stringForHtml);
}

function bearbeitenAusArray(number){
    let student = new Student();
    student = array[number];

    $("#name").val(student.name);
    $("#vorname").val(student.vorname);
    $("#standort").val(student.standort);
    $("input[name='hochschule'][value='"+student.hochschule+"']").prop("checked",true);
    $("#studiengang").val(student.studiengang);
    $("#semester").val(student.semester);

    $("#buttons").html(" <Button onclick='bearbeitungSpeichern("+number+")'>Speichern</Button>");
}

function setButtons(value){
    $("input[name='hochschule']:checked").prop("checked",false);
    $(`#${value}`).prop("checked",true);
}

function setButtons2(value){
    $("input[name='hochschule2']:checked").prop("checked",false);
    $(`#${value}`).prop("checked",true);
}


function bearbeitungSpeichern(number){
    if(auslesenUndStudentErzeugen() != false){
    let student = auslesenUndStudentErzeugen();
    array[number] = student;
    resetForm();
    $("#buttons").html("<button onclick='TestAuslesen()' class='btn btn-primary'>Student hinzufuegen</button>");
    generiereStringForHTML();
    }else{
        alert("Fehlerhafte Eingabe! Bitte überprüfen!")
    }
}