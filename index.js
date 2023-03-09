$( document ).ready(function() {
    getCurrencyRates();
    $('#input1').on('input', calculateForInput2);
    $('#select1').on('change',calculateForInput2);
    $('#input2').on('input', calculateForInput1);
    $('#select2').on('change',calculateForInput1);

});

let usdRate;
let eurRate;

function getCurrencyRates(){
    $.get("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json", function( data ) {
        usdRate = data.find(x => x.cc === 'USD').rate;
        eurRate = data.find(x => x.cc === 'EUR').rate;

        $('#usd').text(usdRate)
        $('#eur').text(eurRate)
    });
}

function calculateForInput2() {
    let convertFrom =  $('#select1').val();
    let convertTo =  $('#select2').val();
    let amount = $('#input1').val();
    if(!isNaN(amount)) {
        let converted = convert(convertFrom, convertTo, amount)
        $('#input2').val(converted);
    }
    else
    {
        $('#input1').val('');
    }
}

function calculateForInput1() {
    let convertFrom =  $('#select2').val();
    let convertTo =  $('#select1').val();
    let amount = $('#input2').val();
    if(!isNaN(amount)) {
        let converted = convert(convertFrom, convertTo, amount)
        $('#input1').val(converted);
    }
    else
    {
        $('#input2').val('');
    }
}



function convert(from, to, amount){
if (from == to){
    return amount;
}

if(from == 'usd'){
    let convertedToUah = amount * usdRate;

    if(to == 'uah') {
        return convertedToUah;
    }

    if(to == 'eur')
    {
        return convertedToUah/eurRate;
    }

}

if(from == 'eur'){
        let convertedToUah = amount * eurRate;

        if(to == 'uah') {
            return convertedToUah;
        }

        if(to == 'usd')
        {
            return convertedToUah/usdRate;
        }

    }

if (from == 'uah') {
 if(to == 'usd'){
     return amount/ usdRate
 }
 if(from == 'eur'){
     return amount/eurRate;
 }
}
}