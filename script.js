horario_requirido = ['8:30', '12:00', '13:00', '18:18'];

function PressButton() {
	Input = document.querySelectorAll('input');

	meu_horario_hoje = [Input[0].value, Input[1].value, Input[2].value, Input[3].value];

	if (!Input[0].value || !Input[1].value || !Input[2].value || !Input[3].value) {
		return alert('Por favor, complete todos os horários abaixo.');
	}

	Hoje = CalcularHorasTrabalhadas(meu_horario_hoje);
	Padrao = CalcularHorasTrabalhadas(horario_requirido);

	console.log({
		FIZ_HOJE: Hoje,
		NECESSARIO: Padrao
	});

	alert(`Você trabalhou (${Hoje.hours} horas e ${Hoje.minutes} minutos) de (${Padrao.hours} horas e ${Padrao.minutes} minutos).`);

	if (Hoje.hours < Padrao.hours) {
		return alert(`Ainda faltam ${Padrao.hours - Padrao.hours} hora(s) de trabalho para concluir o seu expediente.`);
	} else if (Hoje.hours == Padrao.hours && Hoje.minutes < Padrao.minutes) {
		return alert(`Ainda faltam ${Padrao.minutes - Hoje.minutes} minuto(s) de trabalho para concluir o seu expediente.`);
	}

	if (Hoje.hours > Padrao.hours) {
		return alert(`Você trabalhou ${Hoje.hours - Padrao.hours} hora(s) a mais do que o necessário.`);
	} else if (Hoje.hours == Padrao.hours && Hoje.minutes > Padrao.minutes) {
		return alert(`Você trabalhou ${Hoje.minutes - Padrao.minutes} minuto(s) a mais do que o necessário.`);
	}

	else {
		return alert('Você cumpriu com o horário certinho!');
	}
}

function CalcularHorasTrabalhadas(horario) {
	Minutes = Object.assign([], horario);

	Minutes = Minutes.map((Number, n) => {
		Number = Number.split(':');
		Number = Number.map(Int => { return parseInt(Int); });
		Number = Number.reduce((Atual, Soma) => {
			return Atual * 60 + Soma;
		});
		return Number;
	});

	Minutes = Minutes[1]-Minutes[0] + Minutes[3]-Minutes[2];
	Minutes = {
		hours: parseInt(Minutes / 60),
		minutes: Minutes % 60
	}

	return Minutes;
}