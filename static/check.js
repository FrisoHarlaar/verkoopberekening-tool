function enable_bol(check) {
    var perc = document.getElementById('bolperc')
    var vast = document.getElementById('bolvast')
    perc.disabled = !check;
    vast.disabled = !check;
    if (check == false) {
        perc.value = 0;
        perc.placeholder = 0;
        vast.value = 0;
        vast.placeholder = 0;
    }
}

function incoterm_check() {
    let opt = document.getElementById('Incoterm');
    let val = opt.options[opt.selectedIndex].text;
    var invoer = document.getElementById('invoerrechten')
    var douane = document.getElementById('douane')
    if (val == "DDP") {
        invoer.disabled = true;
        invoer.placeholder = 0;
        invoer.value = 0;
        douane.disabled = true;
        douane.value = 0;
        douane.placeholder = 0;
    }
    else {
        document.getElementById('invoerrechten').disabled = false;
        document.getElementById('douane').disabled = false;
    }
}

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

$('#home-button').click(function() {
    $('.transform').toggleClass('transform-active')
})

$("form").submit(function( event ) {
    //  Afzet, cost, sell-price
    var form_data = {
        'Q': parseFloat(document.getElementById('quantity').value),
        'P': parseFloat(document.getElementById('prijs').value),
        'Ship': parseFloat(document.getElementById('verzendkosten').value),
        'Cost': parseFloat(document.getElementById('kostprijs').value),
        'Extra': parseFloat(document.getElementById('extrakosten').value),
        'Invoer': parseFloat(document.getElementById('invoerrechten').value),
        'Douane': parseFloat(document.getElementById('douane').value),
        'Retour': parseFloat(document.getElementById('retour').value),
        'Afschrift': parseFloat(document.getElementById('afschrift').value),
        'Verzend': parseFloat(document.getElementById('verzend').value),
        'BolP': parseFloat(document.getElementById('bolperc').value),
        'BolV': parseFloat(document.getElementById('bolvast').value)
    }

    // replace NaN values with zeros
    for (var x in form_data) {
        if (isNaN(form_data[x])) {
            form_data[x] = 0;
        }
    }

    console.log(form_data);

    // Kosten in euro en rechten
    var Total_C_eur = form_data['Cost'] * form_data['Q'];
    
    var invoerrechten = Total_C_eur * form_data['Invoer'];
    var douanerechten = Total_C_eur * form_data['Douane'];

    // Totale kosten
    var Kosten = round(Total_C_eur + invoerrechten + douanerechten + form_data['Ship'] + form_data['Extra'], 2);

    // Bruto omzet
    var B_O = form_data['P'] * form_data['Q'];

    // Verzendkosten en retourkosten; bedrijfskosten
    var Verzendkosten_totaal = form_data['Q'] * form_data['Verzend'];
    var Retour_kosten = form_data['Q'] * form_data['Retour'] * (form_data['Verzend'] * 2);
    var Verwachte_afschriften = (form_data['Q']  * form_data['Afschrift']) * form_data['Cost'];

    // Netto omzet
    var N_O = B_O - Kosten;

    var bol_commissie = ((form_data['P'] * form_data['BolP'] + form_data['BolV']) * form_data['Q']) * 1.21;

    // Netto omzet - bedrijfskosten
    var Bruto_winst = N_O - Verzendkosten_totaal - Retour_kosten - Verwachte_afschriften - bol_commissie;

    // Kleine ondernemersregeling ja of nee
    //if KOR == True:
    //    Inkomstenbelasting = 0
    //else:

    // Bereken inkomstenbelasting rekening houdend met aftrekposten
    var Zelfstandigen_aftrek = 6670;
    var Starters_aftrek = 2123;
    var Belastbaar_inkomen = (Bruto_winst - Zelfstandigen_aftrek - Starters_aftrek);

    if (Belastbaar_inkomen < 0) {
        Belastbaar_inkomen = 0;
    }
    var MKB_regel = Belastbaar_inkomen * 0.14;
    var Belastbaar_inkomen = Belastbaar_inkomen - MKB_regel;

    if (Belastbaar_inkomen > 68508) {
        var perc_tarief = 0.4950
    }
    else{
        var perc_tarief = 0.3710
    }

    Belasting = Belastbaar_inkomen * perc_tarief;

    if (Belastbaar_inkomen <= 21043) {
        var Heffingskorting = 2837
    }
    else if (Belastbaar_inkomen <= 68507) {
        var Heffingskorting = 2837 - (0.05977 * Belastbaar_inkomen - 21043);
    }
    else {
        varHeffingskorting = 0
    }

    if (Bruto_winst <= 10108) {
        var Arbeidskorting = 0.04581 * Bruto_winst;
    }
    else if (Bruto_winst <= 21835) {
        var Arbeidskorting = 463 + 0.28771 * (Bruto_winst - 10108);
    }
    else if (Bruto_winst <= 35652) {
        var Arbeidskorting = 3837 + 0.02663 * (Bruto_winst - 21835);
    }
    else if (Bruto_winst <= 105736) {
        var Arbeidskorting = 4205 - 0.06 * (Bruto_winst - 35652);
    }
    else { 
        var Arbeidskorting = 0;
    }

    var Inkomstenbelasting = Belasting - Heffingskorting - Arbeidskorting;                

    if (Belasting <= 0) {
        var Inkomstenbelasting = 0;
    }

    // Bereken netto winst;
    var BTW = Bruto_winst * 0.21;
    var Netto_winst = round(Bruto_winst - BTW - Inkomstenbelasting, 2);

    if (bol_commissie > 0) {
        var bol = `<p>Bol commissie: € ${round(bol_commissie, 2)}</p>`
    }
    else {
        var bol = ""
    }

    if (invoerrechten + douanerechten > 0) {
        var inv = `<p>Invoerrechten + Douanekosten: € ${round(douanerechten + invoerrechten,2)}</p>`
    }
    else {
        var inv = ""
    }

    document.getElementById('results').innerHTML = `
    <h4>Bij een afzet van ${form_data['Q']} en verkoopprijs € ${round(form_data['P'],2)} met kostprijs € ${round(form_data['Cost'],2)}:</h4>
    <div class="row pt-3">
        <div class="col">
            <p>Directe kosten: € ${round(Total_C_eur,2)}</p>
            ${inv}
            <p>Shipping: € ${round(form_data['Ship'], 2)} </p>
            <p>Overige kosten:  € ${round(form_data['Extra'],2)}</p>
            <h3>Kosten totaal: € ${round(Kosten, 2)} </h3>
        </div>
        <div class="col"> 
            <p>Bruto omzet: € ${round(B_O, 2)}</p>
            <p>Netto omzet: € ${round(N_O, 2)}</p>
            ${bol}           
            <p>Bruto winst: € ${round(Bruto_winst, 2)}</p>
            <h3>Netto winst: € ${round(Netto_winst, 2)}</h3>
        </div>
    </div>
    `;
    document.getElementById('results').scrollIntoView();
    event.preventDefault();
});