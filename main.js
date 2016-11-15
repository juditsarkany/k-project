$(document).ready(function() {

	/*
	 * Constants
	 */
	var STUNDEN_DIGITAL_DATA = [0.0, 0.0, 0.0, 0.0, 0.0, 0.2];
	var STUNDEN_KREATIZE_DATA = [0.0, 4.0, 0.0, 0.166666666666667, 0.0, 0.0];
	var TOTAL_OFFER_TIME_KREATIZE = STUNDEN_KREATIZE_DATA.reduce((a, b) => a + b, 0);
	var TOTAL_OFFER_TIME_DIGITAL = STUNDEN_DIGITAL_DATA.reduce((a, b) => a + b, 0);
	var HR_MANUAL_QUOTING_KREATIZE = 0;
	var ONLINE_QUOTING_KREATIZE = 500;
	var DIGITAL_PRODUCTION_KREATIZE = 1500;


	$('.calculator-widget input').on('input change', function() {
		// Calculate results when inputs receive input/change.
		calculate('.results');
	});

	function calculate(divClass) {

		var $div = $(divClass);

		// Clear each time to avoid showing incorrect data.
		$div.find('.online-quoting .amount').text('');
		$div.find('.digital-production .amount').text('');
		$div.find('.online-quoting-2 .amount').text('');
		$div.find('.digital-production-2 .amount').text('');
		$div.find('.online-quoting-3 .amount').text('');
		$div.find('.digital-production-3 .amount').text('');
		$div.find('.online-quoting-4 .amount').text('');
		$div.find('.digital-production-4 .amount').text('');
		$div.find('.online-quoting-5 .amount').text('');
		$div.find('.digital-production-5 .amount').text('');		
		
		/*
		 * New variables from input
		 */
		var totalOfferTime = parseFloat($('.quote-check').val()) + parseFloat($('.price').val()) + 
							parseFloat($('.nda').val()) + parseFloat($('.offers-create').val()) + 
							parseFloat($('.emails-time').val()) + parseFloat($('.call-time').val());
		var amountOfSalesEmp = parseFloat($('.employees').val());
		var quotesPerMonthEmp = parseFloat($('.quotes').val());
		var sundensatz = parseFloat($('.sundensatz').val());

		if (isNaN(totalOfferTime) || isNaN(amountOfSalesEmp) || isNaN(quotesPerMonthEmp) || isNaN(sundensatz)) {
			// Form is not completely filled by user yet.
			return;
		}

		/*
		 * Make calculations from input + constants
		 */
		var costPerQuote = totalOfferTime * sundensatz;
		var costPerQuoteKreatize = TOTAL_OFFER_TIME_KREATIZE * sundensatz;
		var costPerQuoteKreatizeDigital = TOTAL_OFFER_TIME_DIGITAL * sundensatz;
		var hrManualQuoting = quotesPerMonthEmp * costPerQuote * amountOfSalesEmp;
		var onlineQuoting = quotesPerMonthEmp * costPerQuoteKreatize * amountOfSalesEmp;
		var digitalProduction = quotesPerMonthEmp * amountOfSalesEmp * costPerQuoteKreatizeDigital;
		var totalCostPerMonth = hrManualQuoting + HR_MANUAL_QUOTING_KREATIZE;
		var totalCostPerMonthOnline = onlineQuoting + ONLINE_QUOTING_KREATIZE;
		var totalCostPerMonthDigital = digitalProduction + DIGITAL_PRODUCTION_KREATIZE;
		var onlineQuotingMonth1 = (totalCostPerMonth - totalCostPerMonthOnline) * 1;
		var digitalProductionMonth1 = totalCostPerMonth - totalCostPerMonthDigital;
		var onlineQuotingMonth2 = onlineQuotingMonth1 * 2;
		var digitalProductionMonth2 = digitalProductionMonth1 * 2;
		var onlineQuotingMonth3 = onlineQuotingMonth1 * 3;
		var digitalProductionMonth3 = digitalProductionMonth1 * 3;
		var onlineQuotingMonth4 = onlineQuotingMonth1 * 4;
		var digitalProductionMonth4 = digitalProductionMonth1 * 4;
		var onlineQuotingMonth5 = onlineQuotingMonth1 * 12;
		var digitalProductionMonth5 = digitalProductionMonth1 * 12;

		/*
		 * Insert results in table.
		 */
		$div.find('.online-quoting .amount').text(onlineQuotingMonth1);
		$div.find('.digital-production .amount').text(digitalProductionMonth1);
		$div.find('.online-quoting-2 .amount').text(onlineQuotingMonth2);
		$div.find('.digital-production-2 .amount').text(digitalProductionMonth2);
		$div.find('.online-quoting-3 .amount').text(onlineQuotingMonth3);
		$div.find('.digital-production-3 .amount').text(digitalProductionMonth3);
		$div.find('.online-quoting-4 .amount').text(onlineQuotingMonth4);
		$div.find('.digital-production-4 .amount').text(digitalProductionMonth4);
		$div.find('.online-quoting-5 .amount').text(onlineQuotingMonth5);
		$div.find('.digital-production-5 .amount').text(digitalProductionMonth5);

		/*
		 * Show results table that there are results to show.
		 */
		$div.fadeIn().removeClass('hidden');		
	}

	// Kick off the first calculation with the default values.
	calculate('.results');
});