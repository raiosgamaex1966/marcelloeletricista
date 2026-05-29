import { useState, useCallback } from 'react';

export interface ServiceOption {
  id: string;
  title: string;
  description: string;
}

export const SERVICES: ServiceOption[] = [
  {
    id: 'seguranca',
    title: 'Segurança Eletrônica',
    description: 'CFTV, alarmes, cercas elétricas',
  },
  {
    id: 'automacao',
    title: 'Automação Residencial',
    description: 'Fechaduras, portões, controle de acesso',
  },
  {
    id: 'eletrica-res',
    title: 'Elétrica Residencial',
    description: 'Instalações, reformas, iluminação',
  },
  {
    id: 'eletrica-ind',
    title: 'Elétrica Industrial',
    description: 'Painéis, manutenção, diagnósticos',
  },
];

export type SubmitStatus = 'idle' | 'submitting' | 'success';

export interface FormData {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

export function useScheduleWizard() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const selectService = useCallback((id: string) => {
    setSelectedService(id);
    setStep(2);
  }, []);

  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const selectTime = useCallback((time: string) => {
    setSelectedTime(time);
  }, []);

  const goToStep = useCallback((targetStep: number) => {
    setStep(targetStep);
  }, []);

  const updateFormField = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [errors]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\)\s?\d{5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Formato inválido. Use (XX) XXXXX-XXXX';
    }
    if (!formData.address.trim()) newErrors.address = 'Endereço é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const submit = useCallback(() => {
    if (!validateForm()) return;
    setSubmitStatus('submitting');

    const serviceLabel = selectedService ? (SERVICES.find(s => s.id === selectedService)?.title || selectedService) : '';
    const formattedDate = selectedDate ? selectedDate.toLocaleDateString('pt-BR') : '';
    
    const message = `Olá Marcello! Gostaria de agendar uma visita técnica:
- *Serviço:* ${serviceLabel}
- *Data:* ${formattedDate}
- *Horário:* ${selectedTime}
- *Nome:* ${formData.name}
- *Telefone:* ${formData.phone}
- *Endereço:* ${formData.address}
${formData.notes.trim() ? `- *Observações:* ${formData.notes.trim()}` : ''}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5522981697377?text=${encodedMessage}`;

    setTimeout(() => {
      setSubmitStatus('success');
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 1500);
  }, [validateForm, selectedService, selectedDate, selectedTime, formData]);

  const reset = useCallback(() => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ name: '', phone: '', address: '', notes: '' });
    setErrors({});
    setSubmitStatus('idle');
  }, []);

  const canGoToStep3 = selectedDate && selectedTime;

  const isFormValid =
    formData.name.trim() &&
    formData.phone.trim() &&
    formData.address.trim();

  return {
    step,
    selectedService,
    selectedDate,
    selectedTime,
    formData,
    errors,
    submitStatus,
    canGoToStep3,
    isFormValid,
    selectService,
    selectDate,
    selectTime,
    goToStep,
    updateFormField,
    submit,
    reset,
  };
}
