'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

// Fecha objetivo: 22 de noviembre de 2025
const TARGET_DATE = dayjs('2025-11-22T00:00:00');

export const CountDown = () => {
	// null mientras se calcula por primera vez en el efecto
	const [daysLeft, setDaysLeft] = useState<number | null>(null);

	useEffect(() => {
		const updateDays = () => {
			const now = dayjs();

			// const diff = TARGET_DATE.diff(now, 'day'); // diferencia en días completos
			const diff = TARGET_DATE.date() - now.date();

			setDaysLeft(diff);
		};

		// Calcular inmediatamente al montar
		updateDays();

		// Actualizar cada hora (suficiente, ya que solo mostramos días)
		const intervalId = setInterval(updateDays, 1000 * 60 * 60);

		return () => clearInterval(intervalId);
	}, []);

	const label =
		daysLeft === null
			? 'Cargando...'
			: daysLeft === 0
			? 'Es hoy'
			: daysLeft > 0
			? `Falta${daysLeft === 1 ? '' : 'n'} ${daysLeft} día${daysLeft === 1 ? '' : 's'}`
			: 'Ya nació CR7';

	return (
		<div className='bg-[#5672a6] text-white text-xl font-mono rounded-lg py-1 px-10 inline-block font-bree'>
			<span>{label}</span>
		</div>
	);
};
