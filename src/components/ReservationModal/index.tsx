import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { useReservations } from '@/hooks/useReservations';

interface ReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
    date: string;
    time: number;
    table: number;
    onConfirm: () => Promise<void>;
    onSuccess?: () => Promise<void>;
}

type ModalStep = 'confirmation' | 'loading' | 'success' | 'error';

export function ReservationModal({
    isOpen,
    onClose,
    date,
    time,
    table,
    onConfirm,
    onSuccess
}: ReservationModalProps) {
    const [step, setStep] = useState<ModalStep>('confirmation');
    const { timeSlots } = useReservations();
    const navigate = useNavigate();

    const timeSlot = useMemo(() =>{
        return timeSlots.find(slot => slot.id === time);
    }, [timeSlots, time]);

    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleConfirm = async () => {
        setStep('loading');
        try {
            await onConfirm();
            if (onSuccess) {
                await onSuccess();
            }
            setStep('success');
        } catch (error: any) {
            setErrorMessage(error?.response?.data?.error || 'Erro ao criar reserva. Tente novamente.');
            setStep('error');
        }
    };

    const handleClose = () => {
        if (step === 'success') {
            setStep('confirmation');
            onClose();
            navigate('/dashboard');
        } else {
            setStep('confirmation');
            onClose();
        }
    };

    const handleSuccessClose = () => {
        setStep('confirmation');
        onClose();
        navigate('/reservations');
    };

    const handleMakeAnother = () => {
        setStep('confirmation');
        onClose();
    };

    const canCloseOnOverlay = step === 'confirmation';

    return (
        <Modal isOpen={isOpen} onClose={handleClose} closeOnOverlay={canCloseOnOverlay}>
            {step === 'confirmation' && (
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                        <span className="text-3xl">❓</span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Confirmar Reserva?
                    </h2>

                    <div className="mb-6">
                        <p className="text-gray-600 mb-2">{date}</p>
                        <p className="text-lg font-semibold text-gray-900">
                            {timeSlot?.label} • {table}
                        </p>
                    </div>

                    {/* Botões */}
                    <div className="flex gap-3 w-full">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={handleClose}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="primary"
                            className="flex-1"
                            onClick={handleConfirm}
                        >
                            Sim, Confirmar
                        </Button>
                    </div>
                </div>
            )}

            {step === 'loading' && (
                <div className="flex flex-col items-center text-center py-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Processando...
                    </h2>
                    <p className="text-gray-600">
                        Aguarde enquanto confirmamos sua reserva
                    </p>
                </div>
            )}

            {step === 'success' && (
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <Check className="w-8 h-8 text-green-500" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Reserva Confirmada!
                    </h2>

                    <div className="mb-8">
                        <p className="text-gray-600 mb-2">{date}</p>
                        <p className="text-lg font-semibold text-gray-900">
                            {timeSlot?.label} • {table}
                        </p>
                    </div>

                    {/* Botões */}
                    <div className="flex flex-col gap-3 w-full">
                        <Button
                            variant="primary"
                            className="w-full"
                            onClick={handleSuccessClose}
                        >
                            Ver Minhas Reservas
                        </Button>
                        <button
                            onClick={handleMakeAnother}
                            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Fazer Outra Reserva
                        </button>
                    </div>
                </div>
            )}

            {step === 'error' && (
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Erro ao Confirmar
                    </h2>

                    <p className="text-gray-600 mb-8">
                        {errorMessage}
                    </p>

                    {/* Botões */}
                    <div className="flex gap-3 w-full">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={handleClose}
                        >
                            Fechar
                        </Button>
                        <Button
                            variant="primary"
                            className="flex-1"
                            onClick={() => setStep('confirmation')}
                        >
                            Tentar Novamente
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
}