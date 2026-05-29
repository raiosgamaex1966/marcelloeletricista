import { useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Phone,
  Loader2,
  CalendarDays,
  Shield,
  Lock,
  Zap,
  Building,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import {
  useScheduleWizard,
  SERVICES,
} from '@/hooks/useScheduleWizard';

const SERVICE_ICONS: Record<string, typeof Shield> = {
  seguranca: Shield,
  automacao: Lock,
  'eletrica-res': Zap,
  'eletrica-ind': Building,
};

const TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00',
];

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function formatDateBR(date: Date): string {
  const days = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

function CalendarComponent({
  selectedDate,
  onSelect,
}: {
  selectedDate: Date | null;
  onSelect: (d: Date) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();

    const daysArr: (Date | null)[] = [];
    for (let i = 0; i < startDay; i++) daysArr.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) daysArr.push(new Date(year, month, d));

    return daysArr;
  }, [currentMonth]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const prevMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const monthLabel = currentMonth.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      className="rounded-xl p-5"
      style={{ border: '1px solid rgba(11,31,63,0.1)' }}
    >
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={20} style={{ color: 'var(--navy)' }} />
        </button>
        <span className="font-bold text-lg capitalize" style={{ color: 'var(--navy)' }}>
          {monthLabel}
        </span>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight size={20} style={{ color: 'var(--navy)' }} />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-semibold py-1"
            style={{ color: 'rgba(11,31,63,0.4)' }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          if (!day) return <div key={idx} className="h-9" />;

          const isToday = day.getTime() === today.getTime();
          const isSelected =
            selectedDate?.getDate() === day.getDate() &&
            selectedDate?.getMonth() === day.getMonth();
          const isPast = day < today;

          return (
            <button
              key={idx}
              disabled={isPast}
              onClick={() => onSelect(day)}
              className={`h-9 rounded-lg text-sm font-medium transition-all ${
                isSelected
                  ? 'text-white'
                  : isToday
                  ? 'text-white'
                  : isPast
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'hover:bg-gray-100'
              }`}
              style={
                isSelected
                  ? { background: 'var(--electric)' }
                  : isToday
                  ? {
                      background: 'var(--electric)',
                      boxShadow: '0 0 0 2px rgba(26,115,232,0.3)',
                    }
                  : { color: isPast ? '#ccc' : 'var(--navy)' }
              }
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

import { useState } from 'react';

export function SchedulingSection() {
  const wiz = useScheduleWizard();

  return (
    <section
      id="agendar"
      className="section-padding"
      style={{ background: '#FFFFFF' }}
    >
      <div className="content-container">
        <SectionHeader
          label="AGENDAMENTO ONLINE"
          heading={
            <span style={{ color: '#0B1F3F' }}>Agende sua Visita</span>
          }
          subtitle="Escolha o serviço, selecione a data e receba a confirmação."
          light
        />

        {wiz.submitStatus === 'success' ? (
          /* Success State */
          <div className="max-w-md mx-auto text-center py-12">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(46, 204, 113, 0.1)' }}
            >
              <Check size={40} style={{ color: 'var(--success)' }} strokeWidth={3} />
            </div>
            <h3
              className="font-bold text-2xl lg:text-[28px] mb-3"
              style={{ color: '#0B1F3F' }}
            >
              Agendamento Confirmado!
            </h3>
            <p className="text-base" style={{ color: 'rgba(11,31,63,0.5)' }}>
              Entraremos em contato pelo WhatsApp para confirmar os detalhes.
            </p>
            <button
              onClick={wiz.reset}
              className="mt-8 px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 hover:bg-[var(--electric)] hover:text-white"
              style={{
                border: '1px solid var(--electric)',
                color: 'var(--electric)',
              }}
            >
              Novo Agendamento
            </button>
          </div>
        ) : (
          /* Wizard */
          <div className="max-w-[1000px] mx-auto">
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-4 mb-10">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      s < wiz.step
                        ? 'text-white'
                        : s === wiz.step
                        ? 'text-white'
                        : ''
                    }`}
                    style={
                      s < wiz.step
                        ? { background: 'var(--success)' }
                        : s === wiz.step
                        ? { background: 'var(--electric)' }
                        : {
                            background: 'rgba(11,31,63,0.08)',
                            color: 'rgba(11,31,63,0.3)',
                          }
                    }
                  >
                    {s < wiz.step ? <Check size={18} strokeWidth={3} /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className="w-16 h-0.5 rounded-full"
                      style={{
                        background:
                          s < wiz.step
                            ? 'var(--success)'
                            : 'rgba(11,31,63,0.1)',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Service Selection */}
            {wiz.step === 1 && (
              <div>
                <h3
                  className="font-bold text-xl text-center mb-8"
                  style={{ color: '#0B1F3F' }}
                >
                  Escolha o tipo de serviço
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICES.map((svc) => {
                    const Icon = SERVICE_ICONS[svc.id];
                    const isSelected = wiz.selectedService === svc.id;
                    return (
                      <button
                        key={svc.id}
                        onClick={() => wiz.selectService(svc.id)}
                        className="text-left p-7 rounded-xl transition-all duration-300"
                        style={
                          isSelected
                            ? {
                                border: '2px solid var(--electric)',
                                background: 'rgba(26, 115, 232, 0.04)',
                                boxShadow:
                                  '0 0 0 3px rgba(26,115,232,0.15)',
                              }
                            : {
                                border: '2px solid rgba(11,31,63,0.1)',
                                background: '#fff',
                              }
                        }
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.borderColor =
                              'rgba(26,115,232,0.3)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.borderColor =
                              'rgba(11,31,63,0.1)';
                          }
                        }}
                      >
                        <Icon
                          size={32}
                          style={{ color: 'var(--electric)' }}
                        />
                        <div
                          className="font-bold text-base mt-4"
                          style={{ color: '#0B1F3F' }}
                        >
                          {svc.title}
                        </div>
                        <div
                          className="text-sm mt-1"
                          style={{ color: 'rgba(11,31,63,0.5)' }}
                        >
                          {svc.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {wiz.step === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3
                    className="font-bold text-xl mb-6"
                    style={{ color: '#0B1F3F' }}
                  >
                    Selecione a data
                  </h3>
                  <CalendarComponent
                    selectedDate={wiz.selectedDate}
                    onSelect={wiz.selectDate}
                  />
                </div>
                <div>
                  <h3
                    className="font-bold text-xl mb-6"
                    style={{ color: '#0B1F3F' }}
                  >
                    Horário disponível
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TIME_SLOTS.map((time) => {
                      const isSelected = wiz.selectedTime === time;
                      return (
                        <button
                          key={time}
                          onClick={() => wiz.selectTime(time)}
                          className="py-3 px-5 rounded-lg text-sm font-semibold transition-all duration-200"
                          style={
                            isSelected
                              ? {
                                  background: 'var(--electric)',
                                  color: '#fff',
                                }
                              : {
                                  border: '1px solid rgba(11,31,63,0.15)',
                                  color: '#0B1F3F',
                                }
                          }
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>

                  {wiz.canGoToStep3 && (
                    <button
                      onClick={() => wiz.goToStep(3)}
                      className="w-full mt-6 py-3.5 rounded-xl text-white font-bold transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
                      style={{ background: 'var(--electric)' }}
                    >
                      Continuar
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Form */}
            {wiz.step === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left - Summary */}
                <div className="lg:col-span-2">
                  <div
                    className="rounded-xl p-6"
                    style={{
                      background: 'rgba(26, 115, 232, 0.04)',
                      border: '1px solid rgba(26,115,232,0.15)',
                    }}
                  >
                    <h4
                      className="font-bold text-base mb-4 flex items-center gap-2"
                      style={{ color: '#0B1F3F' }}
                    >
                      <CalendarDays
                        size={20}
                        style={{ color: 'var(--electric)' }}
                      />
                      Resumo do Agendamento
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <span
                          className="text-xs uppercase tracking-wider font-semibold"
                          style={{ color: 'rgba(11,31,63,0.4)' }}
                        >
                          Serviço
                        </span>
                        <p
                          className="font-semibold text-sm mt-0.5"
                          style={{ color: '#0B1F3F' }}
                        >
                          {SERVICES.find((s) => s.id === wiz.selectedService)
                            ?.title || ''}
                        </p>
                      </div>
                      <div>
                        <span
                          className="text-xs uppercase tracking-wider font-semibold"
                          style={{ color: 'rgba(11,31,63,0.4)' }}
                        >
                          Data
                        </span>
                        <p
                          className="font-medium text-sm mt-0.5 font-mono-display"
                          style={{ color: '#0B1F3F' }}
                        >
                          {wiz.selectedDate
                            ? formatDateBR(wiz.selectedDate)
                            : ''}
                        </p>
                      </div>
                      <div>
                        <span
                          className="text-xs uppercase tracking-wider font-semibold"
                          style={{ color: 'rgba(11,31,63,0.4)' }}
                        >
                          Horário
                        </span>
                        <p
                          className="font-medium text-sm mt-0.5 font-mono-display"
                          style={{ color: '#0B1F3F' }}
                        >
                          {wiz.selectedTime || ''}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => wiz.goToStep(1)}
                    className="mt-4 text-sm font-semibold transition-colors hover:underline"
                    style={{ color: 'var(--electric)' }}
                  >
                    ← Voltar ao início
                  </button>
                </div>

                {/* Right - Form */}
                <div className="lg:col-span-3">
                  <h3
                    className="font-bold text-xl mb-6"
                    style={{ color: '#0B1F3F' }}
                  >
                    Seus Dados
                  </h3>

                  <div className="space-y-5">
                    <div>
                      <label
                        className="block text-xs font-semibold uppercase tracking-[0.05em] mb-2"
                        style={{ color: 'rgba(11,31,63,0.5)' }}
                      >
                        Nome completo
                      </label>
                      <input
                        type="text"
                        value={wiz.formData.name}
                        onChange={(e) =>
                          wiz.updateFormField('name', e.target.value)
                        }
                        placeholder="Seu nome completo"
                        className="w-full px-4 py-3 rounded-lg text-base transition-all duration-200 outline-none"
                        style={{
                          border: `1px solid ${wiz.errors.name ? '#E74C3C' : 'rgba(11,31,63,0.15)'}`,
                          color: '#0B1F3F',
                        }}
                        onFocus={(e) => {
                          if (!wiz.errors.name)
                            e.currentTarget.style.borderColor =
                              'var(--electric)';
                          e.currentTarget.style.boxShadow =
                            '0 0 0 3px rgba(26,115,232,0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = wiz.errors.name
                            ? '#E74C3C'
                            : 'rgba(11,31,63,0.15)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                      {wiz.errors.name && (
                        <span className="text-xs mt-1 block" style={{ color: '#E74C3C' }}>
                          {wiz.errors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        className="block text-xs font-semibold uppercase tracking-[0.05em] mb-2"
                        style={{ color: 'rgba(11,31,63,0.5)' }}
                      >
                        Telefone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={wiz.formData.phone}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.length > 11) val = val.slice(0, 11);
                          if (val.length > 7) {
                            val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
                          } else if (val.length > 2) {
                            val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
                          }
                          wiz.updateFormField('phone', val);
                        }}
                        placeholder="(22) 98169-7377"
                        className="w-full px-4 py-3 rounded-lg text-base transition-all duration-200 outline-none"
                        style={{
                          border: `1px solid ${wiz.errors.phone ? '#E74C3C' : 'rgba(11,31,63,0.15)'}`,
                          color: '#0B1F3F',
                        }}
                        onFocus={(e) => {
                          if (!wiz.errors.phone)
                            e.currentTarget.style.borderColor =
                              'var(--electric)';
                          e.currentTarget.style.boxShadow =
                            '0 0 0 3px rgba(26,115,232,0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = wiz.errors.phone
                            ? '#E74C3C'
                            : 'rgba(11,31,63,0.15)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                      {wiz.errors.phone && (
                        <span className="text-xs mt-1 block" style={{ color: '#E74C3C' }}>
                          {wiz.errors.phone}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        className="block text-xs font-semibold uppercase tracking-[0.05em] mb-2"
                        style={{ color: 'rgba(11,31,63,0.5)' }}
                      >
                        Endereço do serviço
                      </label>
                      <textarea
                        rows={3}
                        value={wiz.formData.address}
                        onChange={(e) =>
                          wiz.updateFormField('address', e.target.value)
                        }
                        placeholder="Rua, número, bairro, cidade"
                        className="w-full px-4 py-3 rounded-lg text-base transition-all duration-200 outline-none resize-none"
                        style={{
                          border: `1px solid ${wiz.errors.address ? '#E74C3C' : 'rgba(11,31,63,0.15)'}`,
                          color: '#0B1F3F',
                        }}
                        onFocus={(e) => {
                          if (!wiz.errors.address)
                            e.currentTarget.style.borderColor =
                              'var(--electric)';
                          e.currentTarget.style.boxShadow =
                            '0 0 0 3px rgba(26,115,232,0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = wiz.errors.address
                            ? '#E74C3C'
                            : 'rgba(11,31,63,0.15)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                      {wiz.errors.address && (
                        <span className="text-xs mt-1 block" style={{ color: '#E74C3C' }}>
                          {wiz.errors.address}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        className="block text-xs font-semibold uppercase tracking-[0.05em] mb-2"
                        style={{ color: 'rgba(11,31,63,0.5)' }}
                      >
                        Observações (opcional)
                      </label>
                      <textarea
                        rows={2}
                        value={wiz.formData.notes}
                        onChange={(e) =>
                          wiz.updateFormField('notes', e.target.value)
                        }
                        placeholder="Descreva detalhes sobre o serviço..."
                        className="w-full px-4 py-3 rounded-lg text-base transition-all duration-200 outline-none resize-none"
                        style={{
                          border: '1px solid rgba(11,31,63,0.15)',
                          color: '#0B1F3F',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'var(--electric)';
                          e.currentTarget.style.boxShadow =
                            '0 0 0 3px rgba(26,115,232,0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor =
                            'rgba(11,31,63,0.15)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    <button
                      onClick={wiz.submit}
                      disabled={!wiz.isFormValid || wiz.submitStatus === 'submitting'}
                      className="w-full py-4 rounded-xl text-white font-bold text-base transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
                      style={{
                        background: 'var(--electric)',
                        opacity:
                          !wiz.isFormValid || wiz.submitStatus === 'submitting'
                            ? 0.5
                            : 1,
                      }}
                    >
                      {wiz.submitStatus === 'submitting' ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        'Confirmar Agendamento'
                      )}
                    </button>

                    <p
                      className="text-xs text-center flex items-center justify-center gap-1.5"
                      style={{ color: 'rgba(11,31,63,0.4)' }}
                    >
                      <Phone size={14} style={{ color: 'var(--success)' }} />
                      Você receberá uma confirmação por WhatsApp
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
