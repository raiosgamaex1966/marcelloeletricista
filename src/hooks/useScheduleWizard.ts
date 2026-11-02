import { useState, useCallback } from 'react';

export interface ServiceOption {
  id: string;
  title: string;
  description: string;
}

export const SERVICES: ServiceOption[] = [
  {
    id: 'projeto',
    title: 'Projeto Estrutural, Hidrossanitário, Elétrico e Muro de Arrimo',
    description: 'Projetos completos com cálculo e conformidade técnica',
  },
  {
    id: 'acompanhamento',
    title: 'Acompanhamento de Obra',
    description: 'Gestão, fiscalização técnica e economia inteligente',
  },
  {
    id: 'eletrica',
    title: 'Instalações e Reparos Elétricos',
    description: 'Quadros, fiação, reformas e iluminação segura',
  },
  {
    id: 'cftv',
    title: 'Câmera e CFTV',
    description: 'Instalação de câmeras Full HD e acesso no celular',
  },
  {
    id: 'seguranca',
    title: 'Segurança Eletrônica',
    description: 'Alarmes, sensores perimetrais e controle de acesso',
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

    const serviceLabel = selectedService
      ? SERVICES.find((s) => s.id === selectedService)?.title || selectedService
      : '';
    const formattedDate = selectedDate ? selectedDate.toLocaleDateString('pt-BR') : '';

    const message = `Olá! Gostaria de solicitar um orçamento / visita técnica com a *Cordeiro Construções e Elétrica*:
- *Serviço:* ${serviceLabel}
- *Data sugerida:* ${formattedDate}
- *Horário preferencial:* ${selectedTime}
- *Nome:* ${formData.name}
- *Telefone:* ${formData.phone}
- *Endereço/Cidade:* ${formData.address}
${formData.notes.trim() ? `- *Detalhes:* ${formData.notes.trim()}` : ''}

(Projetando Hoje, Construindo Amanhã)`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=5522997298782&text=${encodedMessage}&type=phone_number&app_absent=0&utm_source=ig`;

    setTimeout(() => {
      setSubmitStatus('success');
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 1200);
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
    formData.name.trim() && formData.phone.trim() && formData.address.trim();

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
