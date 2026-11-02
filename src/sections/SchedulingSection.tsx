import { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Phone,
  Loader2,
  CalendarDays,
  Compass,
  HardHat,
  Zap,
  Camera,
  Shield,
  Instagram,
  Sparkles,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import {
  useScheduleWizard,
  SERVICES,
} from '@/hooks/useScheduleWizard';

const SERVICE_ICONS: Record<string, typeof Shield> = {
  projeto: Compass,
  acompanhamento: HardHat,
  eletrica: Zap,
  cftv: Camera,
  seguranca: Shield,
};

const TIME_SLOTS = [
  '08:30',
  '10:00',
  '11:30',
  '14:00',
  '15:30',
  '17:00',
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
      className="rounded-2xl p-5 bg-[#11231C] border border-[#D4AF37]/25 shadow-xl"
    >
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
          aria-label="Mês anterior"
        >
          <ChevronLeft size={20} className="text-[#D4AF37]" />
        </button>
        <span className="font-bold text-base sm:text-lg capitalize text-white font-brand-display">
          {monthLabel}
        </span>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
          aria-label="Próximo mês"
        >
          <ChevronRight size={20} className="text-[#D4AF37]" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-semibold py-1 text-[#DEC196]/70"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          if (!day) return <div key={idx} className="h-10" />;

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
              className={`h-10 rounded-xl text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-[#F3E2B8] to-[#D4AF37] text-[#0C1814] font-black shadow-[0_0_15px_rgba(212,175,55,0.5)]'
                  : isToday
                  ? 'border border-[#D4AF37] text-[#D4AF37]'
                  : isPast
                  ? 'text-white/20 cursor-not-allowed'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SchedulingSection() {
  const wiz = useScheduleWizard();

  return (
    <section
      id="agendar"
      className="section-padding relative"
      style={{
        background: 'linear-gradient(180deg, #0C1814 0%, #10231C 50%, #0C1814 100%)',
      }}
    >
      <div className="content-container">
        <SectionHeader
          label="ORÇAMENTO & AGENDAMENTO"
          heading={
            <>
              Solicite seu Orçamento ou{' '}
              <span className="text-gradient-gold">Agende uma Visita</span>
            </>
          }
          subtitle="Escolha o serviço desejado, selecione a data mais conveniente ou fale diretamente conosco pelo Direct e WhatsApp."
        />

        {/* Quick Direct Banner */}
        <div className="max-w-3xl mx-auto mb-10 p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Sparkles size={22} className="text-[#D4AF37] flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">
                Prefere atendimento imediato sem preencher formulário?
              </p>
              <p className="text-xs text-[#DEC196]">
                Envie uma mensagem pelo Direct do Instagram ou WhatsApp agora mesmo!
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <a
              href="https://www.instagram.com/cordeiroconstrucoeseletrica/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold bg-[#D4AF37] text-[#0C1814] hover:bg-[#F3E2B8] transition-colors flex items-center justify-center gap-1.5"
            >
              <Instagram size={14} />
              Direct
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=5522997298782&text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20com%20a%20Cordeiro%20Constru%C3%A7%C3%B5es%20e%20El%C3%A9trica.&type=phone_number&app_absent=0&utm_source=ig"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-1.5"
            >
              <Phone size={14} />
              WhatsApp
            </a>
          </div>
        </div>

        {wiz.submitStatus === 'success' ? (
          /* Success State */
          <div className="max-w-md mx-auto text-center py-12 p-8 rounded-2xl bg-[#11231C] border border-[#D4AF37]/30 shadow-2xl">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#25D366]/20 border border-[#25D366]/40"
            >
              <Check size={40} className="text-[#25D366]" strokeWidth={3} />
            </div>
            <h3 className="font-brand-display font-bold text-2xl text-white mb-3">
              Solicitação Enviada!
            </h3>
            <p className="text-base text-white/70">
              Recebemos seus dados e abrimos seu WhatsApp para confirmação do atendimento pela Cordeiro Construções e Elétrica.
            </p>
            <button
              onClick={wiz.reset}
              className="mt-8 px-8 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#F3E2B8] to-[#D4AF37] text-[#0C1814] shadow-lg hover:shadow-xl transition-all"
            >
              Fazer Nova Solicitação
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
                        ? 'bg-[#25D366] text-white'
                        : s === wiz.step
                        ? 'bg-gradient-to-r from-[#F3E2B8] to-[#D4AF37] text-[#0C1814] font-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                        : 'bg-white/10 text-white/40 border border-white/10'
                    }`}
                  >
                    {s < wiz.step ? <Check size={18} strokeWidth={3} /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-12 sm:w-16 h-0.5 rounded-full ${
                        s < wiz.step ? 'bg-[#25D366]' : 'bg-white/10'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Service Selection */}
            {wiz.step === 1 && (
              <div>
                <h3 className="font-brand-display font-bold text-xl sm:text-2xl text-center text-white mb-8">
                  1. Escolha o serviço que você precisa
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {SERVICES.map((svc) => {
                    const Icon = SERVICE_ICONS[svc.id] || Shield;
                    const isSelected = wiz.selectedService === svc.id;
                    return (
                      <button
                        key={svc.id}
                        onClick={() => wiz.selectService(svc.id)}
                        className={`text-left p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between group ${
                          isSelected
                            ? 'bg-[#18352A] border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.3)]'
                            : 'bg-[#11231C]/90 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:bg-[#152C22]'
                        }`}
                      >
                        <div>
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                            isSelected ? 'bg-[#D4AF37] text-[#0C1814]' : 'bg-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37]/20'
                          }`}>
                            <Icon size={26} strokeWidth={2.2} />
                          </div>
                          <div className="font-bold text-base text-white mb-1.5 leading-snug">
                            {svc.title}
                          </div>
                          <div className="text-xs text-white/60 leading-relaxed">
                            {svc.description}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#DEC196]">
                          <span>Selecionar</span>
                          <span className="text-sm">→</span>
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
                  <h3 className="font-brand-display font-bold text-xl text-white mb-4">
                    2. Selecione a data ideal
                  </h3>
                  <CalendarComponent
                    selectedDate={wiz.selectedDate}
                    onSelect={wiz.selectDate}
                  />
                  <button
                    onClick={() => wiz.goToStep(1)}
                    className="mt-4 text-xs font-semibold text-[#DEC196] hover:text-white transition-colors"
                  >
                    ← Alterar serviço selecionado
                  </button>
                </div>

                <div>
                  <h3 className="font-brand-display font-bold text-xl text-white mb-4">
                    Horários disponíveis
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TIME_SLOTS.map((time) => {
                      const isSelected = wiz.selectedTime === time;
                      return (
                        <button
                          key={time}
                          onClick={() => wiz.selectTime(time)}
                          className={`py-3.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#F3E2B8] to-[#D4AF37] text-[#0C1814] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                              : 'bg-[#11231C] border border-white/10 text-white/80 hover:border-[#D4AF37]/50 hover:text-white'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>

                  {wiz.canGoToStep3 && (
                    <button
                      onClick={() => wiz.goToStep(3)}
                      className="w-full mt-8 py-4 rounded-xl text-[#0C1814] font-black text-base bg-gradient-to-r from-[#F3E2B8] via-[#D4AF37] to-[#B89230] shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] active:scale-[0.98] transition-all"
                    >
                      Avançar para Dados do Contato →
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
                  <div className="rounded-2xl p-6 bg-[#11231C] border border-[#D4AF37]/30 shadow-xl">
                    <h4 className="font-brand-display font-bold text-base text-white mb-4 flex items-center gap-2">
                      <CalendarDays size={20} className="text-[#D4AF37]" />
                      Resumo do Pedido
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#DEC196]/70">
                          Serviço Selecionado
                        </span>
                        <p className="font-bold text-sm text-white mt-1 leading-snug">
                          {SERVICES.find((s) => s.id === wiz.selectedService)?.title || ''}
                        </p>
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#DEC196]/70">
                          Data Sugerida
                        </span>
                        <p className="font-medium text-sm text-white mt-1">
                          {wiz.selectedDate ? formatDateBR(wiz.selectedDate) : ''}
                        </p>
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#DEC196]/70">
                          Horário
                        </span>
                        <p className="font-bold text-sm text-[#D4AF37] mt-1">
                          {wiz.selectedTime || ''}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => wiz.goToStep(2)}
                      className="mt-6 text-xs font-semibold text-[#DEC196] hover:text-white transition-colors block"
                    >
                      ← Mudar data e horário
                    </button>
                  </div>
                </div>

                {/* Right - Form */}
                <div className="lg:col-span-3">
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#11231C] border border-white/10 shadow-xl">
                    <h3 className="font-brand-display font-bold text-xl text-white mb-6">
                      3. Seus Dados para Contato
                    </h3>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-[0.05em] text-[#DEC196] mb-2">
                          Seu Nome Completo *
                        </label>
                        <input
                          type="text"
                          value={wiz.formData.name}
                          onChange={(e) => wiz.updateFormField('name', e.target.value)}
                          placeholder="Ex: João da Silva"
                          className="w-full px-4 py-3 rounded-xl bg-[#0C1814] text-white border border-white/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-sm transition-all"
                        />
                        {wiz.errors.name && (
                          <span className="text-xs text-red-400 mt-1 block">
                            {wiz.errors.name}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-[0.05em] text-[#DEC196] mb-2">
                          Telefone / WhatsApp *
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
                          className="w-full px-4 py-3 rounded-xl bg-[#0C1814] text-white border border-white/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-sm transition-all"
                        />
                        {wiz.errors.phone && (
                          <span className="text-xs text-red-400 mt-1 block">
                            {wiz.errors.phone}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-[0.05em] text-[#DEC196] mb-2">
                          Endereço / Cidade da Obra *
                        </label>
                        <textarea
                          rows={2}
                          value={wiz.formData.address}
                          onChange={(e) => wiz.updateFormField('address', e.target.value)}
                          placeholder="Ex: Rua das Flores, 120 - Centro"
                          className="w-full px-4 py-3 rounded-xl bg-[#0C1814] text-white border border-white/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-sm resize-none transition-all"
                        />
                        {wiz.errors.address && (
                          <span className="text-xs text-red-400 mt-1 block">
                            {wiz.errors.address}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-[0.05em] text-[#DEC196] mb-2">
                          Observações ou Dúvidas (opcional)
                        </label>
                        <textarea
                          rows={2}
                          value={wiz.formData.notes}
                          onChange={(e) => wiz.updateFormField('notes', e.target.value)}
                          placeholder="Ex: Preciso de projeto estrutural e muro de arrimo para terreno em declive..."
                          className="w-full px-4 py-3 rounded-xl bg-[#0C1814] text-white border border-white/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-sm resize-none transition-all"
                        />
                      </div>

                      <button
                        onClick={wiz.submit}
                        disabled={!wiz.isFormValid || wiz.submitStatus === 'submitting'}
                        className="w-full py-4 rounded-xl text-[#0C1814] font-black text-base bg-gradient-to-r from-[#F3E2B8] via-[#D4AF37] to-[#B89230] shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {wiz.submitStatus === 'submitting' ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            <span>Enviando solicitação...</span>
                          </>
                        ) : (
                          <span>Enviar Solicitação de Orçamento</span>
                        )}
                      </button>

                      <p className="text-xs text-center text-white/50 flex items-center justify-center gap-1.5 pt-1">
                        <Phone size={14} className="text-[#25D366]" />
                        Retornamos com orçamento detalhado via WhatsApp ou Direct
                      </p>
                    </div>
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
