$(document).ready(function() {
	let socket = io();

	$('.btn-primary').click(function() {
		socket.emit('added');
	});

	socket.on('update', function(docs) {
		let stocks = docs.data;
		let type = 'line';
		let dbData = {};
		let options = {
			legend: {
				position: 'bottom',
				display: true,
				labels: {
					boxHeight: 2,
					fontColor: 'red'
				}
			},
			tooltips: {
				enabled: true,
				mode: 'nearest'
			},
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: false
						}
					}
				],
				xAxes: [
					{
						ticks: {
							beginAtZero: false
						},
						type: 'time',
						time: {
							displayFormats: {
								day: 'MMM D'
							}
						}
					}
				]
			}
		};
		let allDatasets = [];
		for (i = 0; i < stocks.length; i++) {
			let hold = [];
			for (j = 0; j < stocks[i].data.length; j++) {
				let priceOBJ = {
					x: stocks[i].data[j][0],
					y: stocks[i].data[j][1]
				};

				hold.push(priceOBJ);
			}
			let colorPool = ['red', 'blue', 'green', 'black', 'purple', 'yellow'];
			let lineColor = colorPool[Math.floor(Math.random() * 5)];

			let stockData = {
				label: stocks[i].symbol,
				fill: false,
				data: hold,
				borderColor: [lineColor],
				borderWidth: 1
			};

			allDatasets.push(stockData);
		}

		dbData.datasets = allDatasets;
		let ctx = document.getElementById('myChartTwo');
		let myChartTwo = new Chart(ctx, {
			type: type,
			data: dbData,
			options: options
		});

		$('.theStocks').empty();
		for (var i = 0; i < dbData.datasets.length; i++) {
			$('.theStocks').append(
				'<span class="symbolSpan">' +
					dbData.datasets[i].label +
					'<span id=' +
					dbData.datasets[i].label +
					'check' +
					'class="glyphicon glyphicon-remove"></span></span>'
			);
		}
	});

	$('.symbolSpan').click(function decreaseGoing() {
		let id = this.id;
		$.ajax({
			url: '/remove/' + id,
			type: 'POST',
			success: function(result) {
				console.log('Item deleted');
				socket.emit('remove');
			},
			error: function() {
				alert('Cannot delete stock.');
			}
		});
	});

	$('form').submit(function() {
		let searchTerm = document.forms['searchForm']['search'].value;
		let stock = document.getElementById(searchTerm);
		console.log(stock);
		if (stock != null) {
			alert('Stock already exists');
			return false;
		}
	});
});
