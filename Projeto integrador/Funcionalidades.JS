document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const service = document.getElementById('service').value;
    const barber = document.getElementById('barber').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
  
    if (name && service && barber && date && time) {
      alert(`Agendamento feito com sucesso para ${name} no dia ${date} às ${time}.`);
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  });
  