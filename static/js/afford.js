$(document).ready(function() {
    $('#sipForm').submit(function(event) {
      event.preventDefault();
      var initialInvestment = parseFloat($('#investmentAmount').val());
      var monthlyInvestment = parseFloat($('#monthlyInvestment').val());
      var rateOfReturn = parseFloat($('#rateOfReturn').val()) / 100;
      var investmentPeriod = parseFloat($('#investmentPeriod').val());
      
      var labels = [];
      var data = [];
      var totalInvestment = initialInvestment;
      
      for (var i = 1; i <= investmentPeriod * 12; i++) {
        totalInvestment += monthlyInvestment;
        var futureValue = totalInvestment * Math.pow((1 + rateOfReturn / 12), i);
        labels.push(i);
        data.push(futureValue.toFixed(2));
      }
      
      var ctx = document.getElementById('sipChart').getContext('2d');
      var chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'SIP Growth',
            data: data,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Years'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Value'
              }
            }
          }
        }
      });
    });
    
    // Reset form fields
    $('#sipForm').on('reset', function() {
      // Clear all input fields
      $('#investmentAmount, #monthlyInvestment, #rateOfReturn, #investmentPeriod').val('');
      // Clear chart
      var ctx = document.getElementById('sipChart').getContext('2d');
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });
  });
  