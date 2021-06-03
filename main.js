
var textDeutsch = '<p id="textParagraph">	Die Wurzeln unserer Kapelle liegen in Niederlindhart. Das dort alljährlich stattfindende Stadlfest wurde von den Bläsern der Enzianschützen seit dem Jahr 2015 musikalisch umrahmt. Aus dieser Formation entwickelte sich Schritt für Schritt die Kapelle „Blechschinda“, mit der wir seit Anfang 2019 in unserer Blechbesetzung unterwegs sind. <br><br>' +
				"Um unsere Truppe optisch wie auch musikalisch aufzufrischen, entzücken uns seit Sommer 2019 unsere beiden „Holzhexen“ an den Klarinetten." +
				"Seither begleiten wir Veranstaltungen jeglicher Art mit bayerisch-böhmischer Blasmusik. So erfreuen wir das Gemüt vieler Gäste unter anderem auf Geburtstagen, Festumzügen, Vereins- und Volksfesten oder Hochzeiten. Ob Poolparty oder Scheidungsfeier – wir verleihen jedem Fest eine besondere Note. <br>" +
				"Je nach Wunsch und Getränkevorrat des Veranstalters spielen wir in flexiblen Besetzungen von 6-10 Musikanten. <br><br>" +
				"Auf Ihre Anfrage freuen wir uns! <br><br>" +
				"Eure Blechschinda<br>" +
				"</p>";

var textBayrisch = "<p>Ogfangt hod‘s mit unsara Kapelln z‘Lindad. Do hama de Leid im Stodlfest vo de Enzianschützen seit 2015 sauba afgspuit. Aus dera Gruppn ham se noch a bo gmiatlichen Abenden d‘„Blechschinda“ gfundn.<br><br> Und wos soi ma song… seit Ofang 2019 sama in unsara Blechbesetzung af da Roas. "+
                "Dass de ganze Gaude scheena zum Oschaun und Ohern is, hoazt uns seit‘m Summa 2019 unsa Brennhoiz – d‘Klarinettn – sauba ei. "+
                "Seit dera Zeit spui ma a jeds Festl, wo ma a gscheide Blosmuse braucha ko. Ganz wuascht wo, – Gebuatsdog, Festumzug, Vereins- und Voixfest oda Houzad – mia schindn unsa Blech gscheid her. Ob Poolparty oder Scheidungsfeier – mia zind ma überoi af. " +
                "Soll ma spuin? Na kemma mit 6 bis 10 durschtige Musikanten zu eiam Festl.<br>"+
                "<br>"+
                "Riahts eich – dann blos‘ ma eich an gscheidn Marsch!<br>"+
                "<br>"+
                "Eure Blechschinda"+
                "</p>";

// =============================================================================
var spr = document.getElementById("sprache");
var link = spr.children[0];
var isBayrisch = false;
link.onclick = function (){
    if(isBayrisch==true)
    {
        document.getElementById("textParagraph").innerHTML = textDeutsch;
        document.getElementById("aboutText").textContent = "Über uns";
        this.textContent = "BAY";
        isBayrisch=false;
    }
    else{
        document.getElementById("textParagraph").innerHTML = textBayrisch;
        document.getElementById("aboutText").textContent = "Des san mia";
        this.textContent = "DE";
        isBayrisch=true;
    }
} 
