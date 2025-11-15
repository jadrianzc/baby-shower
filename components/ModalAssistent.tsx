import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Button, Form, FormProps, Input, message, Modal, Radio, RadioChangeEvent } from 'antd';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

interface ModalAssistentProps {
	isOpen: boolean;
	setIsModalAssistent: Dispatch<SetStateAction<boolean>>;
}

interface IForm {
	guest: string;
	attending: boolean;
}
const TARGET_DATE = dayjs('2025-11-18');

export const ModalAssistent = ({ isOpen, setIsModalAssistent }: ModalAssistentProps) => {
	const [isAccept, setIsAccept] = useState('');
	const siuuSoundRef = useRef<HTMLAudioElement | null>(null);
	const [form] = Form.useForm<IForm>();
	const [messageApi, contextHolder] = message.useMessage();

	const now = dayjs();
	const isAcceptValid = now.isSameOrBefore(TARGET_DATE, 'day');

	useEffect(() => {
		if (typeof Audio !== 'undefined') {
			siuuSoundRef.current = new Audio('/siuu.mp3');
		}
	}, []);

	const closeModal = () => {
		setIsModalAssistent(false);

		form.resetFields();
		setIsAccept('');
	};

	const onFinish: FormProps<IForm>['onFinish'] = async ({ guest }) => {
		try {
			if (isAccept === 'no') {
				success('¡Muchas gracias!');
				return;
			}

			const payload = {
				name: guest,
				// attending: isAccept === 'si',
			};

			const res = await fetch('/api/guest', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			if (!res.ok) throw new Error('Error al guardar en BD');

			const data = await res.json();

			if (data?.message) {
				messageApi.open({
					type: data.success ? 'success' : 'error',
					content: data.message,
				});

				if (!data.success) return;
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			messageApi.error('Error guardando información');
		} finally {
			closeModal();
		}
	};

	const onFinishFailed: FormProps<IForm>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const onChangeRadio = ({ target }: RadioChangeEvent) => {
		const value = target.value;
		setIsAccept(value);

		if (value === 'si' && siuuSoundRef.current) {
			try {
				siuuSoundRef.current.currentTime = 0;
				siuuSoundRef.current.play();
			} catch (error) {
				console.error('Error playing siuu sound:', error);
			}
		}
	};

	const success = (message: string) => {
		messageApi.open({
			type: 'success',
			content: message,
		});
	};

	return (
		<Modal
			title={<span className='text-[#a3b4da] text-xl font-bold'>Confirme su asistencia</span>}
			closable={{ 'aria-label': 'Custom Close Button' }}
			centered
			open={isOpen}
			onCancel={closeModal}
			footer={null}>
			{contextHolder}

			{isAcceptValid ? (
				<Form
					name='FormAsistencia'
					form={form}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'>
					<Form.Item<IForm>
						name='attending'
						valuePropName='checked'
						className='flex justify-center items-center mt-6!'
						rules={[{ required: true, message: '* Campo requerido.' }]}>
						<Radio.Group
							onChange={onChangeRadio}
							optionType='button'
							buttonStyle='solid'
							className='flex! justify-center! items-center! gap-4!'>
							<Radio
								value={'si'}
								className='w-20 text-center rounded-md! border-[#a3b4da]!'>
								SI
							</Radio>
							<Radio
								value={'no'}
								className='w-20 text-center rounded-md! border-[#a3b4da]!'>
								NO
							</Radio>
						</Radio.Group>
					</Form.Item>

					{isAccept === 'si' ? (
						<>
							<Form.Item<IForm>
								label={<span className='text-[#787878]'>Nombre de invitado:</span>}
								name='guest'
								layout='vertical'
								rules={[{ required: true, message: '* Campo requerido.' }]}>
								<Input className='text-[#787878]!' />
							</Form.Item>

							<Form.Item className='flex justify-center items-center m-0!'>
								<Button type='primary' htmlType='submit' className='rounded-lg!'>
									Guardar
								</Button>
							</Form.Item>
						</>
					) : (
						isAccept === 'no' && (
							<Form.Item className='flex justify-center items-center m-0!'>
								<Button type='primary' htmlType='submit' className='rounded-lg!'>
									Guardar
								</Button>
							</Form.Item>
						)
					)}
				</Form>
			) : (
				<div className='text-[#787878] text-center'>
					El período de confirmación ha concluido. Agradecemos su interés.
				</div>
			)}
		</Modal>
	);
};
