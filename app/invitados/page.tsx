import Image from 'next/image';
import { FaCircle } from 'react-icons/fa';

interface Guest {
	id: string;
	name: string;
}

interface GuestResponse {
	success: boolean;
	guests: Guest[];
}

export default async function Invitados() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/guest`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) throw new Error('Error al obtener la lista de invitados');

	const allData: GuestResponse = await res.json();

	return (
		<main
			className='flex h-dvh flex-col items-center justify-center bg-cover bg-center px-4 py-8'
			style={{ backgroundImage: "url('/bg_main.jpeg')" }}>
			<div
				className={`max-w-md w-full ${
					allData.guests.length > 0 ? 'h-[612px]' : 'h-auto'
				} h-auto! bg-white/90 rounded-2xl border-4 border-[#c39f81] px-1 py-2 shadow-xl text-center`}>
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

				<div className='-translate-y-12 flex flex-col h-[calc(100%-140px)]'>
					<div>
						<p className='text-[#c39f81] text-5xl font-light mb-8 font-railey'>
							Lista de invitados
						</p>
					</div>

					{allData.guests.length > 0 && (
						<div className='h-80 overflow-y-auto px-5 scrollbar-thin scrollbar-thumb-[#c39f81] scrollbar-track-transparent'>
							<div className='text-[#a3b4da] text-sm grid grid-cols-2 gap-x-6 gap-y-4 auto-rows-min'>
								{allData.guests.map((guest) => (
									<div
										key={guest.id}
										className='w-full flex items-center gap-2 min-h-7'>
										<div className='w-3'>
											<FaCircle className='w-2 h-2' />
										</div>

										<p className='font-bree text-left uppercase'>
											{guest.name}
										</p>
									</div>
								))}
							</div>
						</div>
					)}

					<div className='grow flex justify-center items-end pb-2'>
						<p className='text-[#c39f81] text-2xl font-light font-railey'>
							Total de invitados: <span className=''>{allData.guests.length}</span>
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
