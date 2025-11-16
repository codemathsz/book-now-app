import { useState } from 'react';
import { AlertCircle, Loader2, Check, X } from 'lucide-react';
import { Button } from '../Button';
import { Modal } from '../Modal';

interface CancelReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    reservationDate: string;
    reservationTime: string;
}

type ModalStep = 'confirmation' | 'loading' | 'success' | 'error';

export function CancelReservationModal({
    isOpen,
    onClose,
    onConfirm,
    reservationDate,
    reservationTime,
}: CancelReservationModalProps) {
    const [step, setStep] = useState<ModalStep>('confirmation');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleConfirm = async () => {
        setStep('loading');
        try {
            await onConfirm();
            setStep('success');
            setTimeout(() => {
                handleClose();
            }, 2000);
        } catch (error: any) {
            setErrorMessage(error?.response?.data?.message || 'Erro ao cancelar reserva. Tente novamente.');
            setStep('error');
        }
    };

    const handleClose = () => {
        setStep('confirmation');
        setErrorMessage('');
        onClose();
    };

    const canCloseOnOverlay = step === 'confirmation' || step === 'error' || step === 'success';

    return (
        <Modal isOpen={isOpen} onClose={handleClose} closeOnOverlay={canCloseOnOverlay}>
            {step === 'confirmation' && (
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Cancelar Reserva?
                    </h2>

                    <p className="text-gray-600 mb-6">
                        Esta ação não pode ser desfeita.
                    </p>

                    <div className="mb-6 p-4 bg-gray-50 rounded-lg w-full">
                        <p className="text-gray-600 mb-1 text-sm">Data e Horário</p>
                        <p className="text-base font-semibold text-gray-900">
                            {reservationDate} • {reservationTime}
                        </p>
                    </div>

                    <div className="flex gap-3 w-full">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={handleClose}
                        >
                            Voltar
                        </Button>
                        <Button
                            variant="primary"
                            className="flex-1 bg-red-500 hover:bg-red-600"
                            onClick={handleConfirm}
                        >
                            Sim, Cancelar
                        </Button>
                    </div>
                </div>
            )}

            {step === 'loading' && (
                <div className="flex flex-col items-center text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Cancelando...
                    </h2>
                    <p className="text-gray-600">
                        Aguarde um momento
                    </p>
                </div>
            )}

            {step === 'success' && (
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <Check className="w-8 h-8 text-green-500" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Reserva Cancelada!
                    </h2>

                    <p className="text-gray-600 mb-8">
                        Sua reserva foi cancelada com sucesso.
                    </p>
                </div>
            )}

            {step === 'error' && (
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <X className="w-8 h-8 text-red-500" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Erro ao Cancelar
                    </h2>

                    <p className="text-gray-600 mb-8">
                        {errorMessage}
                    </p>

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
