'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import { ModalAssistent } from './ModalAssistent';

export const Actions = () => {
	const [isModalAssistent, setIsModalAssistent] = useState(false);

	const openModal = () => setIsModalAssistent(true);

	return (
		<>
			<ModalAssistent isOpen={isModalAssistent} setIsModalAssistent={setIsModalAssistent} />

			<div className='flex justify-center items-center gap-2 mb-4 font-bree'>
				{/* <Link
					href='#'
					className='bg-[#a7be9b] text-white px-1 py-2 rounded-2xl text-sm font-light w-[180px] outline-none!'>
					Ver ubicación aquí
				</Link> */}

				<Link
					href="https://www.google.com/maps/place/0%C2%B057'47.1%22S+80%C2%B040'28.2%22W/@-0.963093,-80.6770749,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-0.963093!4d-80.6745?entry=ttu&g_ep=EgoyMDI1MTExMS4wIKXMDSoASAFQAw%3D%3D"
					target='_blank'>
					<Button className='bg-[#a7be9b]! text-white! px-1! py-2! rounded-2xl! text-sm! font-bree! font-light! w-[180px]! h-9! outline-none! border-[]'>
						Ver ubicación aquí
					</Button>
				</Link>

				<Button
					className='bg-[#a7be9b]! text-white! px-1! py-2! rounded-2xl! text-sm! font-bree! font-light! w-[180px]! h-9! outline-none! border-[]'
					onClick={openModal}>
					Confirme su asistencia
				</Button>
			</div>
		</>
	);
};
