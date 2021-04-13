from flask import Flask, redirect, render_template, url_for, flash, request, jsonify

app = Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True

@app.route('/')
@app.route('/index', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html')
    
    '''DrDocker BX13W kostenberekening'''
    # Afzet, cost, sell-price
    # Q = request.form.get('quantity')
    # P = request.form.get('prijs') # break even prijs is €45.50

    # print(Q)
    # Shipping = request.form.get('verzendkosten')
    # C_eur = request.form.get('kostprijs')
    # Extra_costs = request.form.get('extrakosten')

    # # Kosten in euro en rechten
    # Total_C_eur = C_eur * Q
    
    # invoer = request.form.get('invoerrechten')
    # douane = request.form.get('douane')
    # invoerrechten = Total_C_eur * invoer
    # douanerechten = Total_C_eur * douane

    # # Totale kosten
    # Kosten = round(Total_C_eur + invoerrechten + douanerechten + Shipping + Extra_costs, 2)

    # # Bruto omzet
    # B_O = P * Q

    # Perc_retouren = request.form.get('retour')
    # Afscriften = request.form.get('afschrift')

    # # Verzendkosten en retourkosten; bedrijfskosten
    # verzendkosten = request.form.get('verzend')
    # Verzendkosten_totaal = Q * Verzendkosten
    # Retour_kosten = Q * Perc_retouren * (Verzendkosten * 2)
    # Verwachte_afschriften = (Q  * Afschriften) * C_eur

    # # Netto omzet
    # N_O = B_O - Kosten 

    # bol_percentage = request.form.get('bolperc')
    # bol_vast_tarief = request.form.get('bolvast')
    # bol_commissie = ((P * bol_percentage + bol_vast_tarief) * Q) * 1.21

    # # Netto omzet - bedrijfskosten
    # Bruto_winst = N_O - Verzendkosten_totaal - Retour_kosten - Verwachte_afschriften - bol_commissie

    # # Kleine ondernemersregeling ja of nee
    # # if KOR == True:
    # #     Inkomstenbelasting = 0
    # # else:

    #     # Bereken inkomstenbelasting rekening houdend met aftrekposten
    # Zelfstandigen_aftrek = 6670
    # Starters_aftrek = 2123
    # Belastbaar_inkomen = (Bruto_winst - Zelfstandigen_aftrek - Starters_aftrek)

    # if Belastbaar_inkomen < 0:
    #     Belastbaar_inkomen = 0

    # MKB_regel = Belastbaar_inkomen * 0.14
    # Belastbaar_inkomen -= MKB_regel

    # if Belastbaar_inkomen > 68508:
    #     perc_tarief = 0.4950
    # else:
    #     perc_tarief = 0.3710

    # Belasting = Belastbaar_inkomen * perc_tarief

    # if Belastbaar_inkomen <= 21043:
    #     Heffingskorting = 2837
    # elif Belastbaar_inkomen <= 68507:
    #     Heffingskorting = 2837 - (0.05977 * Belastbaar_inkomen - 21043)
    # else:
    #     Heffingskorting = 0

    # if Bruto_winst <= 10108:
    #     Arbeidskorting = 0.04581 * Bruto_winst
    # elif Bruto_winst <= 21835:
    #     Arbeidskorting = 463 + 0.28771 * (Bruto_winst - 10108)
    # elif Bruto_winst <= 35652:
    #     Arbeidskorting = 3837 + 0.02663 * (Bruto_winst - 21835)
    # elif Bruto_winst <= 105736:
    #     Arbeidskorting = 4205 - 0.06 * (Bruto_winst - 35652)
    # else: 
    #     Arbeidskorting = 0

    # Inkomstenbelasting = Belasting - Heffingskorting - Arbeidskorting                

    # if Belasting <= 0:
    #     Inkomstenbelasting = 0

    # # Bereken netto winst
    # BTW = Bruto_winst * 0.21    
    # Netto_winst = round(Bruto_winst - BTW - Inkomstenbelasting, 2)
    
    # return jsonify(data={
    #     'costs': Total_C_eur,
    #     'Invoer': invoerrechten,
    #     'Douane': douanerechten,
    #     'Ship': Shipping,
    #     'Overig': Extra_costs,
    #     'Total_c': Kosten,
    #     'B_omzet': B_O,
    #     'N_omzet': N_O,
    #     'bol_com': bol_commissie,
    #     'B_winst': Bruto_winst,
    #     'N_winst': Netto_winst
    # })



if __name__ == '__main__':
    app.run(debug=True)