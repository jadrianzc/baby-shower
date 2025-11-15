import Image from 'next/image';
import { Actions } from '@/components/Actions';
import { CountDown } from '@/components';
import { Divider } from 'antd';

export default function Home() {
	return (
		<main
			className='flex h-dvh flex-col items-center justify-center bg-cover bg-center px-4 py-8'
			style={{ backgroundImage: "url('/bg_main.jpeg')" }}>
			<div className='max-w-md w-full bg-white/90 rounded-2xl border-4 border-[#c39f81] px-1 py-2 shadow-xl text-center'>
				{/* Título */}
				<div className='relative w-full flex justify-center items-center gap-0 text-[75px] font-bold text-[#a3b4da] font-alice -translate-y-12'>
					<div className='tracking-widest translate-x-6'>BA</div>

					{/* Imagen central */}
					<div>
						<Image
							src='/conejo_flor.png'
							alt='Conejo'
							priority
							width={150}
							height={200}
							className='w-auto h-auto'
						/>
					</div>

					<div className='tracking-widest -translate-x-6'>BY</div>
				</div>

				{/* Nombre */}
				<h2 className='text-7xl text-[#5672a6] font-medium font-railey -translate-y-14'>
					Stefano
				</h2>

				{/* Texto principal */}
				<p className='text-[#a7be9b] font-light text-lg leading-5 font-bree -translate-y-8'>
					Cada día falta menos para conocer al amor más pequeño de nuestras vidas.
					<br />
					Te invitamos a compartir con nosotros esta dulce espera en el baby shower de
					Stefano.
				</p>

				{/* Fecha */}
				<div className='w-full flex justify-center items-center gap-5 mb-4'>
					<div className='text-[#5672a6] font-medium font-bree text-2xl w-20'>Sábado</div>
					<Divider
						type='vertical'
						className='h-12! border-[#a7be9b]! border-2 rounded-2xl m-0!'
					/>
					<div>
						<div className='text-[#5672a6] font-medium font-bree text-4xl font-railey'>
							Noviembre
						</div>
						<div className='text-[#c39f81] font-alice text-4xl'>22</div>
					</div>
					<Divider
						type='vertical'
						className='h-12! border-[#a7be9b]! border-2 rounded-2xl m-0!'
					/>
					<div className='text-[#5672a6] font-medium font-bree text-2xl w-20'>16:30</div>
				</div>

				{/* Botones */}
				<Actions />

				{/* Texto final */}
				<div className='relative'>
					<div className='absolute left-0 -translate-x-13 -top-9 pointer-events-none'>
						<Image
							src='/conejo2.png'
							alt='Conejo'
							priority
							width={200}
							height={200}
							className='w-40 h-[180px] object-contain'
						/>
					</div>

					<p className='text-[#c39f81] text-5xl font-light mb-4 font-railey'>
						Te esperamos
					</p>
				</div>

				{/* Contador */}
				<CountDown />
			</div>
		</main>
	);
}
