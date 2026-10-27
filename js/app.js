/**
 * WALBABER - SISTEMA DE AGENDAMENTO ONLINE & CONTROLE DA AGENDA
 * Acesso Restrito para Alterar Agenda:
 * LOGIN: WALBABER | SENHA: 123456
 */

// ========================================================
// 1. DADOS DOS SERVIÇOS & BARBEIROS DA WALBABER
// ========================================================

const SERVICES_DATA = [
  {
    id: 'corte-classico',
    category: 'cabelo',
    name: 'Corte Tradicional / Fade',
    price: 60.00,
    duration: 45,
    icon: 'fa-scissors',
    badge: 'Popular',
    desc: 'Lavagem especial, corte na tesoura ou máquina degrade/fade e finalização com pomada modeladora matte.'
  },
  {
    id: 'barboterapia',
    category: 'barba',
    name: 'Barboterapia Completa',
    price: 50.00,
    duration: 35,
    icon: 'fa-user-ninja',
    badge: 'Relax',
    desc: 'Esfoliação, toalha quente com óleos essenciais, massagem facial relaxante e navalha de fio duplo afiada.'
  },
  {
    id: 'combo-mestre',
    category: 'combo',
    name: 'Combo Mestre (Cabelo + Barba)',
    price: 95.00,
    duration: 75,
    icon: 'fa-crown',
    badge: 'Mais Pedido',
    desc: 'O pacote clássico definitivo: corte com visagismo completo e alinhamento de barba com direito a chopp duplo.'
  },
  {
    id: 'platinado-luzes',
    category: 'tratamentos',
    name: 'Platinado / Luzes Globais',
    price: 150.00,
    duration: 120,
    icon: 'fa-wand-magic-sparkles',
    badge: 'Estilo',
    desc: 'Descoloração segura com produtos anti-danos, matização platinada/acinzentada e hidratação profunda.'
  },
  {
    id: 'pigmentacao-barba',
    category: 'barba',
    name: 'Pigmentação de Barba',
    price: 40.00,
    duration: 30,
    icon: 'fa-paint-roller',
    badge: null,
    desc: 'Disfarce de falhas e fios brancos com efeito natural e definição milimétrica das linhas da barba.'
  },
  {
    id: 'sobrancelha-navalha',
    category: 'tratamentos',
    name: 'Design de Sobrancelha na Navalha',
    price: 25.00,
    duration: 20,
    icon: 'fa-eye',
    badge: null,
    desc: 'Alinhamento e limpeza do excesso de pelos faciais com navalha mantendo o aspecto masculino natural.'
  },
  {
    id: 'dia-do-noivo',
    category: 'combo',
    name: 'Dia do Noivo VIP',
    price: 240.00,
    duration: 150,
    icon: 'fa-champagne-glasses',
    badge: 'Exclusivo',
    desc: 'Atendimento VIP completo com cabelo, barba, limpeza de pele, massagem, manicure e brindes com whisky.'
  },
  {
    id: 'detox-capilar',
    category: 'tratamentos',
    name: 'Tratamento Detox & Antiqueda',
    price: 70.00,
    duration: 40,
    icon: 'fa-shield-halved',
    badge: 'Saúde',
    desc: 'Esfoliação do couro cabeludo, estimulação de circulação sanguínea com alta frequência e tônico de biotina.'
  }
];

const BARBERS_DATA = [
  {
    id: 'qualquer',
    name: 'Primeiro Disponível',
    role: 'Qualquer Barbeiro',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    specialty: 'Sem preferência de barbeiro'
  },
  {
    id: 'carlos-silva',
    name: 'Carlos "Navalha" Silva',
    role: 'Mestre Barbeiro',
    avatar: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=400&q=80',
    specialty: 'Fade & Degradê Cirúrgico',
    rating: '5.0 (420+ cortes)'
  },
  {
    id: 'marcos-vinicius',
    name: 'Marcos Vinícius',
    role: 'Especialista em Barba',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    specialty: 'Barboterapia & Visagismo',
    rating: '4.9 (310+ barbas)'
  },
  {
    id: 'andre-costa',
    name: 'André "Diguinho" Costa',
    role: 'Colorista & Freestyle',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    specialty: 'Platinados & Riscos Criativos',
    rating: '4.9 (280+ transformações)'
  }
];

const DEFAULT_TIME_SLOTS = [
  '09:00', '09:45', '10:30', '11:15', '12:00',
  '13:30', '14:15', '15:00', '15:45', '16:30',
  '17:15', '18:00', '18:45', '19:30'
];

// Credenciais de Acesso Exclusivo para Alterar a Agenda
const AGENDA_AUTH = {
  user: 'WALBABER',
  pass: '123456'
};

// Dados da Barbearia
const STORE_CONFIG = {
  name: 'WALBABER',
  whatsapp: '5522992653627',
  address: 'Rua Recife, 1071, Casa 4 - Rio das Ostras - RJ'
};

// ========================================================
// 2. PERSISTÊNCIA DE HORÁRIOS DA AGENDA
// ========================================================

function getTimeSlots() {
  const data = localStorage.getItem('walbaber_agenda_slots');
  return data ? JSON.parse(data) : DEFAULT_TIME_SLOTS;
}

function saveTimeSlots(slots) {
  localStorage.setItem('walbaber_agenda_slots', JSON.stringify(slots));
  renderTimeSlots();
  renderAgendaManagerSlots();
}

function isAgendaAuth() {
  return sessionStorage.getItem('walbaber_agenda_session') === 'true';
}

// ========================================================
// 3. ESTADO DO AGENDAMENTO (CLIENTE)
// ========================================================

const appState = {
  selectedServices: [],
  selectedBarber: BARBERS_DATA[0],
  selectedDate: '',
  selectedTime: '',
  currentStep: 1
};

// ========================================================
// 4. INICIALIZAÇÃO
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  renderServicesCatalog('all');
  renderBookingServices();
  renderBarbersCatalog();
  renderBookingBarbers();
  renderTimeSlots();
  setupEventListeners();
  setupDatePickerConstraints();
  updateAppointmentsCountBadge();
  setupPhoneMask();
});

// ========================================================
// 5. RENDERIZAÇÃO CLIENTE
// ========================================================

// Catálogo de Serviços
function renderServicesCatalog(filter = 'all') {
  const container = document.getElementById('servicesGrid');
  if (!container) return;

  const filtered = filter === 'all' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(s => s.category === filter);

  container.innerHTML = filtered.map(service => {
    const isSelected = appState.selectedServices.some(s => s.id === service.id);
    return `
      <div class="service-card ${isSelected ? 'selected' : ''}" data-service-id="${service.id}">
        ${service.badge ? `<span class="service-badge">${service.badge}</span>` : ''}
        <div class="service-icon-box">
          <i class="fa-solid ${service.icon}"></i>
        </div>
        <h3 class="service-title">${service.name}</h3>
        <p class="service-description">${service.desc}</p>
        <div class="service-footer">
          <div class="service-meta">
            <span class="service-price">R$ ${service.price.toFixed(2).replace('.', ',')}</span>
            <span class="service-duration"><i class="fa-regular fa-clock"></i> ${service.duration} min</span>
          </div>
          <button type="button" class="btn-select-service" onclick="handleQuickSelectService('${service.id}')">
            ${isSelected ? '<i class="fa-solid fa-check"></i> Selecionado' : '+ Agendar'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Catálogo de Barbeiros
function renderBarbersCatalog() {
  const container = document.getElementById('barbersGrid');
  if (!container) return;

  const barbers = BARBERS_DATA.filter(b => b.id !== 'qualquer');

  container.innerHTML = barbers.map(barber => `
    <div class="barber-card">
      <div class="barber-img-container">
        <img src="${barber.avatar}" alt="${barber.name}" class="barber-img">
        <span class="barber-specialty-tag">${barber.specialty}</span>
      </div>
      <div class="barber-info">
        <h3 class="barber-name">${barber.name}</h3>
        <p class="barber-role">${barber.role}</p>
        <div class="barber-rating">
          <i class="fa-solid fa-star"></i>
          <span>${barber.rating}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Passo 1: Seleção de Serviços
function renderBookingServices() {
  const container = document.getElementById('bookingServicesPicker');
  if (!container) return;

  container.innerHTML = SERVICES_DATA.map(service => {
    const isChecked = appState.selectedServices.some(s => s.id === service.id);
    return `
      <div class="picker-service-item ${isChecked ? 'selected' : ''}" onclick="toggleServiceSelection('${service.id}')">
        <div class="picker-service-info">
          <input type="checkbox" class="service-checkbox" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation(); toggleServiceSelection('${service.id}')">
          <div>
            <span class="picker-service-name">${service.name}</span>
            <span class="picker-service-duration"><i class="fa-regular fa-clock"></i> ${service.duration} minutos</span>
          </div>
        </div>
        <span class="picker-service-price">R$ ${service.price.toFixed(2).replace('.', ',')}</span>
      </div>
    `;
  }).join('');

  updateBookingSummary();
}

// Passo 2: Seleção de Barbeiro
function renderBookingBarbers() {
  const container = document.getElementById('bookingBarbersPicker');
  if (!container) return;

  container.innerHTML = BARBERS_DATA.map(barber => {
    const isSelected = appState.selectedBarber && appState.selectedBarber.id === barber.id;
    return `
      <div class="picker-barber-item ${isSelected ? 'selected' : ''}" onclick="selectBarber('${barber.id}')">
        <img src="${barber.avatar}" alt="${barber.name}" class="picker-barber-avatar">
        <span class="picker-barber-name">${barber.name}</span>
        <span class="picker-barber-role">${barber.role}</span>
      </div>
    `;
  }).join('');
}

// Passo 3: Horários Disponíveis para o Cliente (Dinâmicos da Agenda)
function renderTimeSlots() {
  const container = document.getElementById('timeSlotsContainer');
  if (!container) return;

  const slots = getTimeSlots();
  if (slots.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; color: var(--text-muted); font-size: 0.9rem;">Nenhum horário disponível no momento.</p>`;
    return;
  }

  container.innerHTML = slots.map(time => {
    const isSelected = appState.selectedTime === time;
    return `
      <button type="button" class="time-slot-btn ${isSelected ? 'selected' : ''}" onclick="selectTime('${time}')">
        ${time}
      </button>
    `;
  }).join('');
}

// ========================================================
// 6. NAVEGAÇÃO & SELEÇÕES DO WIZARD
// ========================================================

function goToStep(stepNumber) {
  if (stepNumber === 2 && appState.selectedServices.length === 0) {
    showToast('Selecione pelo menos um serviço para continuar!', 'warning');
    return;
  }

  if (stepNumber === 4 && (!appState.selectedDate || !appState.selectedTime)) {
    showToast('Por favor, escolha uma data e um horário disponível!', 'warning');
    return;
  }

  appState.currentStep = stepNumber;

  document.querySelectorAll('.form-step').forEach(stepEl => stepEl.classList.remove('active'));
  const currentStepEl = document.getElementById(`step${stepNumber}`);
  if (currentStepEl) currentStepEl.classList.add('active');

  document.querySelectorAll('.step-indicator-item').forEach(indicator => {
    const target = parseInt(indicator.getAttribute('data-step-target'), 10);
    indicator.classList.remove('active');
    if (target === stepNumber) indicator.classList.add('active');
  });

  updateBookingSummary();
}

function updateBookingSummary() {
  const summaryService = document.getElementById('summaryService');
  const summaryDuration = document.getElementById('summaryDuration');
  const summaryBarber = document.getElementById('summaryBarber');
  const summaryDateTime = document.getElementById('summaryDateTime');
  const summaryTotal = document.getElementById('summaryTotal');

  if (appState.selectedServices.length > 0) {
    const names = appState.selectedServices.map(s => s.name).join(', ');
    const totalDuration = appState.selectedServices.reduce((acc, s) => acc + s.duration, 0);
    const totalPrice = appState.selectedServices.reduce((acc, s) => acc + s.price, 0);

    if (summaryService) summaryService.textContent = names;
    if (summaryDuration) summaryDuration.textContent = `${totalDuration} min`;
    if (summaryTotal) summaryTotal.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
  } else {
    if (summaryService) summaryService.textContent = 'Nenhum selecionado';
    if (summaryDuration) summaryDuration.textContent = '-- min';
    if (summaryTotal) summaryTotal.textContent = 'R$ 0,00';
  }

  if (summaryBarber) {
    summaryBarber.textContent = appState.selectedBarber ? appState.selectedBarber.name : 'Qualquer';
  }

  if (summaryDateTime) {
    if (appState.selectedDate && appState.selectedTime) {
      const [year, month, day] = appState.selectedDate.split('-');
      summaryDateTime.textContent = `${day}/${month}/${year} às ${appState.selectedTime}`;
    } else if (appState.selectedDate) {
      const [year, month, day] = appState.selectedDate.split('-');
      summaryDateTime.textContent = `${day}/${month}/${year}`;
    } else {
      summaryDateTime.textContent = 'Não definido';
    }
  }
}

function toggleServiceSelection(serviceId) {
  const service = SERVICES_DATA.find(s => s.id === serviceId);
  if (!service) return;

  const existingIndex = appState.selectedServices.findIndex(s => s.id === serviceId);
  if (existingIndex > -1) {
    appState.selectedServices.splice(existingIndex, 1);
  } else {
    appState.selectedServices.push(service);
  }

  renderBookingServices();
  renderServicesCatalog();
}

function handleQuickSelectService(serviceId) {
  const service = SERVICES_DATA.find(s => s.id === serviceId);
  if (!service) return;

  const exists = appState.selectedServices.some(s => s.id === serviceId);
  if (!exists) {
    appState.selectedServices.push(service);
  }

  renderBookingServices();
  renderServicesCatalog();

  const bookingSection = document.getElementById('agendamento');
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
  }

  showToast(`"${service.name}" adicionado ao agendamento!`);
}

function selectBarber(barberId) {
  const barber = BARBERS_DATA.find(b => b.id === barberId);
  if (barber) {
    appState.selectedBarber = barber;
    renderBookingBarbers();
    updateBookingSummary();
  }
}

function selectTime(time) {
  appState.selectedTime = time;
  renderTimeSlots();
  updateBookingSummary();
}

// ========================================================
// 7. FINALIZAR AGENDAMENTO & TICKET
// ========================================================

function handleClientFormSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById('clientName');
  const phoneInput = document.getElementById('clientPhone');
  const notesInput = document.getElementById('clientNotes');

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const notes = notesInput ? notesInput.value.trim() : '';

  if (!name || phone.length < 14) {
    showToast('Por favor, preencha seu nome e um WhatsApp válido!', 'error');
    return;
  }

  if (appState.selectedServices.length === 0) {
    showToast('Selecione pelo menos um serviço!', 'warning');
    goToStep(1);
    return;
  }

  if (!appState.selectedDate || !appState.selectedTime) {
    showToast('Selecione uma data e horário!', 'warning');
    goToStep(3);
    return;
  }

  const totalPrice = appState.selectedServices.reduce((acc, s) => acc + s.price, 0);
  const totalDuration = appState.selectedServices.reduce((acc, s) => acc + s.duration, 0);

  const newAppointment = {
    id: 'AGD-' + Date.now().toString().slice(-6),
    createdAt: new Date().toISOString(),
    status: 'Confirmado',
    client: { name, phone, notes },
    services: appState.selectedServices.map(s => ({ name: s.name, price: s.price })),
    barber: appState.selectedBarber.name,
    date: appState.selectedDate,
    time: appState.selectedTime,
    duration: totalDuration,
    totalPrice: totalPrice
  };

  saveAppointmentToLocalStorage(newAppointment);
  showTicketModal(newAppointment);
  resetBookingForm();
}

function saveAppointmentToLocalStorage(appointment) {
  const list = getStoredAppointments();
  list.unshift(appointment);
  localStorage.setItem('barbearia_agendamentos', JSON.stringify(list));
  updateAppointmentsCountBadge();
  if (isAgendaAuth()) {
    renderAgendaManagerBookings();
  }
}

function getStoredAppointments() {
  const data = localStorage.getItem('barbearia_agendamentos');
  return data ? JSON.parse(data) : [];
}

function updateAppointmentsCountBadge() {
  const countBadge = document.getElementById('appointmentsCount');
  if (countBadge) {
    const list = getStoredAppointments();
    countBadge.textContent = list.length;
    countBadge.style.display = list.length > 0 ? 'inline-block' : 'none';
  }
}

function showTicketModal(appointment) {
  const modal = document.getElementById('confirmationModal');
  const detailsContainer = document.getElementById('ticketDetails');
  const btnShareWhatsApp = document.getElementById('btnShareWhatsApp');

  if (!modal || !detailsContainer) return;

  const [year, month, day] = appointment.date.split('-');
  const formattedDate = `${day}/${month}/${year}`;
  const servicesListStr = appointment.services.map(s => s.name).join(', ');

  detailsContainer.innerHTML = `
    <div class="ticket-row">
      <span>Código da Reserva:</span>
      <strong>#${appointment.id}</strong>
    </div>
    <div class="ticket-row">
      <span>Cliente:</span>
      <strong>${appointment.client.name}</strong>
    </div>
    <div class="ticket-row">
      <span>WhatsApp:</span>
      <strong>${appointment.client.phone}</strong>
    </div>
    <div class="ticket-row">
      <span>Serviço(s):</span>
      <strong>${servicesListStr}</strong>
    </div>
    <div class="ticket-row">
      <span>Barbeiro:</span>
      <strong>${appointment.barber}</strong>
    </div>
    <div class="ticket-row">
      <span>Data & Hora:</span>
      <strong class="gold-text">${formattedDate} às ${appointment.time}</strong>
    </div>
    <div class="ticket-row">
      <span>Duração Estimada:</span>
      <strong>${appointment.duration} minutos</strong>
    </div>
    <div class="ticket-row" style="margin-top: 14px; border-top: 1px dashed var(--border-color); padding-top: 10px;">
      <span>Valor Total:</span>
      <strong class="gold-text" style="font-size: 1.15rem;">R$ ${appointment.totalPrice.toFixed(2).replace('.', ',')}</strong>
    </div>
  `;

  if (btnShareWhatsApp) {
    const message = encodeURIComponent(
      `💈 *NOVO AGENDAMENTO - ${STORE_CONFIG.name}*\n\n` +
      `👤 *Cliente:* ${appointment.client.name}\n` +
      `✂️ *Serviço(s):* ${servicesListStr}\n` +
      `💈 *Barbeiro:* ${appointment.barber}\n` +
      `📅 *Data:* ${formattedDate} às ${appointment.time}\n` +
      `💰 *Total:* R$ ${appointment.totalPrice.toFixed(2).replace('.', ',')}\n` +
      `🔖 *Código:* #${appointment.id}\n\n` +
      `Por favor, confirmem meu horário!`
    );
    btnShareWhatsApp.href = `https://wa.me/${STORE_CONFIG.whatsapp}?text=${message}`;
  }

  modal.classList.add('open');
}

function closeConfirmationModal() {
  const modal = document.getElementById('confirmationModal');
  if (modal) modal.classList.remove('open');
}

function resetBookingForm() {
  appState.selectedServices = [];
  appState.selectedBarber = BARBERS_DATA[0];
  appState.selectedTime = '';
  
  const clientName = document.getElementById('clientName');
  const clientPhone = document.getElementById('clientPhone');
  const clientNotes = document.getElementById('clientNotes');
  if (clientName) clientName.value = '';
  if (clientPhone) clientPhone.value = '';
  if (clientNotes) clientNotes.value = '';

  goToStep(1);
  renderBookingServices();
  renderServicesCatalog();
  renderBookingBarbers();
  renderTimeSlots();
}

// "Meus Agendamentos" para o Cliente
function openMyAppointmentsModal() {
  const modal = document.getElementById('myAppointmentsModal');
  const listContainer = document.getElementById('myAppointmentsList');
  if (!modal || !listContainer) return;

  const appointments = getStoredAppointments();

  if (appointments.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 30px 10px; color: var(--text-muted);">
        <i class="fa-regular fa-calendar-xmark" style="font-size: 3rem; margin-bottom: 12px; color: var(--gold);"></i>
        <p>Você ainda não possui nenhum agendamento salvo neste dispositivo.</p>
      </div>
    `;
  } else {
    listContainer.innerHTML = appointments.map(item => {
      const [year, month, day] = item.date.split('-');
      const formattedDate = `${day}/${month}/${year}`;
      const servicesStr = item.services.map(s => s.name).join(' + ');

      return `
        <div style="background: var(--bg-dark); border: 1px solid var(--border-light); border-radius: 10px; padding: 16px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="color: var(--gold);">#${item.id}</strong>
            <span style="font-size: 0.82rem; color: var(--text-dim);">${formattedDate} às ${item.time}</span>
          </div>
          <div style="font-size: 0.95rem; font-weight: 600; margin-bottom: 4px;">${servicesStr}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 10px;">
            Barbeiro: <strong>${item.barber}</strong> • R$ ${item.totalPrice.toFixed(2).replace('.', ',')}
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <button class="btn btn-outline" style="padding: 6px 12px; font-size: 0.78rem; color: #ff5555; border-color: rgba(255,85,85,0.3);" onclick="clientCancelAppointment('${item.id}')">
              <i class="fa-solid fa-trash"></i> Cancelar
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  modal.classList.add('open');
}

function closeMyAppointmentsModal() {
  const modal = document.getElementById('myAppointmentsModal');
  if (modal) modal.classList.remove('open');
}

function clientCancelAppointment(id) {
  if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
    let list = getStoredAppointments();
    list = list.filter(item => item.id !== id);
    localStorage.setItem('barbearia_agendamentos', JSON.stringify(list));
    updateAppointmentsCountBadge();
    openMyAppointmentsModal();
    if (isAgendaAuth()) renderAgendaManagerBookings();
    showToast('Agendamento cancelado com sucesso.', 'info');
  }
}

// ========================================================
// 8. CONTROLE DA AGENDA (EXCLUSIVO: LOGIN WALBABER / SENHA 123456)
// ========================================================

// Abre Login ou Direto o Painel se já estiver autenticado
function handleOpenAgendaManagerClick() {
  if (isAgendaAuth()) {
    openAgendaManagerModal();
  } else {
    openAgendaLoginModal();
  }
}

function openAgendaLoginModal() {
  const modal = document.getElementById('agendaLoginModal');
  const userInput = document.getElementById('agendaUserInput');
  const passInput = document.getElementById('agendaPassInput');
  if (userInput) userInput.value = '';
  if (passInput) passInput.value = '';
  if (modal) modal.classList.add('open');
}

function closeAgendaLoginModal() {
  const modal = document.getElementById('agendaLoginModal');
  if (modal) modal.classList.remove('open');
}

function handleAgendaLoginSubmit(e) {
  e.preventDefault();
  const userInput = document.getElementById('agendaUserInput');
  const passInput = document.getElementById('agendaPassInput');

  const enteredUser = userInput ? userInput.value.trim().toUpperCase() : '';
  const enteredPass = passInput ? passInput.value.trim() : '';

  // VALIDAÇÃO ESTRITA: LOGIN WALBABER E SENHA 123456
  if (enteredUser === AGENDA_AUTH.user && enteredPass === AGENDA_AUTH.pass) {
    sessionStorage.setItem('walbaber_agenda_session', 'true');
    closeAgendaLoginModal();
    openAgendaManagerModal();
    showToast('Acesso autorizado! Você agora pode alterar horários e a agenda.');
  } else {
    showToast('Login ou senha incorretos! Somente WALBABER com a senha correta pode alterar a agenda.', 'error');
  }
}

function openAgendaManagerModal() {
  if (!isAgendaAuth()) {
    openAgendaLoginModal();
    return;
  }
  const modal = document.getElementById('agendaManagerModal');
  if (!modal) return;

  renderAgendaManagerSlots();
  renderAgendaManagerBookings();
  modal.classList.add('open');
}

function closeAgendaManagerModal() {
  const modal = document.getElementById('agendaManagerModal');
  if (modal) modal.classList.remove('open');
}

function handleAgendaLogout() {
  sessionStorage.removeItem('walbaber_agenda_session');
  closeAgendaManagerModal();
  showToast('Sessão encerrada. A agenda foi bloqueada contra alterações.', 'info');
}

// Renderiza os chips de horários no painel do administrador
function renderAgendaManagerSlots() {
  const container = document.getElementById('agendaManagerSlotsContainer');
  if (!container) return;

  const slots = getTimeSlots();
  container.innerHTML = slots.map(time => `
    <div class="agenda-slot-chip">
      <i class="fa-regular fa-clock gold-text"></i>
      <strong>${time}</strong>
      <button type="button" class="del-slot-btn" onclick="agendaRemoveTimeSlot('${time}')" title="Excluir este horário">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `).join('');
}

// Adiciona novo horário (SOMENTE AUTORIZADO)
function handleAddAgendaSlotSubmit(e) {
  e.preventDefault();
  if (!isAgendaAuth()) {
    showToast('Acesso negado! Faça login como WALBABER para alterar a agenda.', 'error');
    openAgendaLoginModal();
    return;
  }

  const input = document.getElementById('newSlotInput');
  const time = input ? input.value : '';
  if (!time) return;

  let slots = getTimeSlots();
  if (slots.includes(time)) {
    showToast('Este horário já está cadastrado na agenda!', 'warning');
    return;
  }

  slots.push(time);
  slots.sort((a, b) => a.localeCompare(b));
  saveTimeSlots(slots);

  input.value = '';
  showToast(`Horário ${time} adicionado à agenda com sucesso!`);
}

// Remove horário da agenda (SOMENTE AUTORIZADO)
function agendaRemoveTimeSlot(time) {
  if (!isAgendaAuth()) {
    showToast('Acesso negado! Faça login como WALBABER para alterar a agenda.', 'error');
    openAgendaLoginModal();
    return;
  }

  let slots = getTimeSlots();
  if (slots.length <= 1) {
    showToast('Mantenha pelo menos um horário ativo na agenda!', 'warning');
    return;
  }

  slots = slots.filter(t => t !== time);
  saveTimeSlots(slots);
  showToast(`Horário ${time} removido da agenda.`, 'info');
}

// Restaura horários padrão (SOMENTE AUTORIZADO)
function handleResetDefaultAgendaSlots() {
  if (!isAgendaAuth()) {
    showToast('Acesso negado! Faça login como WALBABER para alterar a agenda.', 'error');
    openAgendaLoginModal();
    return;
  }

  if (confirm('Deseja restaurar a grade de horários padrão da barbearia?')) {
    saveTimeSlots([...DEFAULT_TIME_SLOTS]);
    showToast('Horários padrão restaurados na agenda!');
  }
}

// Renderiza a lista de agendamentos dentro do painel
function renderAgendaManagerBookings() {
  const container = document.getElementById('agendaManagerBookingsContainer');
  const countEl = document.getElementById('agendaTotalBookingsCount');
  if (!container) return;

  const bookings = getStoredAppointments();
  if (countEl) countEl.textContent = `${bookings.length} agendamento(s)`;

  if (bookings.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 25px; color: var(--text-muted);">
        <i class="fa-solid fa-calendar-check" style="font-size: 2rem; margin-bottom: 8px; color: var(--gold);"></i>
        <p>Nenhum cliente agendou horários ainda.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <table class="agenda-table">
      <thead>
        <tr>
          <th>Código</th>
          <th>Cliente</th>
          <th>Serviço(s)</th>
          <th>Barbeiro</th>
          <th>Data/Hora</th>
          <th>Valor</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        ${bookings.map(item => {
          const [year, month, day] = item.date.split('-');
          const formattedDate = `${day}/${month}/${year}`;
          const cleanPhone = item.client.phone.replace(/\D/g, '');
          const servicesList = item.services.map(s => s.name).join(', ');
          const waMsg = encodeURIComponent(
            `Olá ${item.client.name}! Sou da Barbearia WALBABER referente ao seu agendamento (#${item.id}) no dia ${formattedDate} às ${item.time}. Tudo confirmado!`
          );

          return `
            <tr>
              <td><strong class="gold-text">#${item.id}</strong></td>
              <td>
                <strong>${item.client.name}</strong><br>
                <small style="color: var(--text-muted);">${item.client.phone}</small>
              </td>
              <td><small>${servicesList}</small></td>
              <td><strong>${item.barber}</strong></td>
              <td><strong>${formattedDate}</strong><br><small class="gold-text">${item.time}</small></td>
              <td><strong>R$ ${item.totalPrice.toFixed(2).replace('.', ',')}</strong></td>
              <td>
                <select class="form-control" style="padding: 4px 8px; font-size: 0.8rem; width: auto;" onchange="agendaUpdateBookingStatus('${item.id}', this.value)">
                  <option value="Confirmado" ${item.status === 'Confirmado' ? 'selected' : ''}>Confirmado</option>
                  <option value="Concluído" ${item.status === 'Concluído' ? 'selected' : ''}>Concluído</option>
                  <option value="Cancelado" ${item.status === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
                </select>
              </td>
              <td>
                <div style="display: flex; gap: 6px;">
                  <a href="https://wa.me/55${cleanPhone}?text=${waMsg}" target="_blank" class="btn-sm-wa" title="Chamar cliente no WhatsApp">
                    <i class="fa-brands fa-whatsapp"></i>
                  </a>
                  <button type="button" class="btn-sm-del" onclick="agendaDeleteBooking('${item.id}')" title="Excluir">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

function agendaUpdateBookingStatus(id, newStatus) {
  if (!isAgendaAuth()) {
    showToast('Acesso negado! Faça login como WALBABER.', 'error');
    return;
  }
  let list = getStoredAppointments();
  list = list.map(item => {
    if (item.id === id) {
      return { ...item, status: newStatus };
    }
    return item;
  });
  localStorage.setItem('barbearia_agendamentos', JSON.stringify(list));
  showToast(`Status da reserva #${id} atualizado para ${newStatus}!`);
}

function agendaDeleteBooking(id) {
  if (!isAgendaAuth()) {
    showToast('Acesso negado! Faça login como WALBABER.', 'error');
    return;
  }
  if (confirm(`Deseja excluir a reserva #${id} da agenda?`)) {
    let list = getStoredAppointments();
    list = list.filter(item => item.id !== id);
    localStorage.setItem('barbearia_agendamentos', JSON.stringify(list));
    updateAppointmentsCountBadge();
    renderAgendaManagerBookings();
    showToast(`Reserva #${id} removida da agenda.`);
  }
}

// ========================================================
// 9. EVENT LISTENERS GERAIS
// ========================================================

function setupEventListeners() {
  // Wizard Cliente
  document.getElementById('btnGoToStep2')?.addEventListener('click', () => goToStep(2));
  document.getElementById('btnBackToStep1')?.addEventListener('click', () => goToStep(1));
  document.getElementById('btnGoToStep3')?.addEventListener('click', () => goToStep(3));
  document.getElementById('btnBackToStep2')?.addEventListener('click', () => goToStep(2));
  document.getElementById('btnGoToStep4')?.addEventListener('click', () => goToStep(4));
  document.getElementById('btnBackToStep3')?.addEventListener('click', () => goToStep(3));

  document.querySelectorAll('.step-indicator-item').forEach(item => {
    item.addEventListener('click', () => {
      const targetStep = parseInt(item.getAttribute('data-step-target'), 10);
      goToStep(targetStep);
    });
  });

  // Filtros de Serviços
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const filter = e.target.getAttribute('data-filter');
      renderServicesCatalog(filter);
    });
  });

  // Menu Mobile
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Submissão do Agendamento pelo Cliente
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleClientFormSubmit);
  }

  // Modais de Agendamento do Cliente
  document.getElementById('closeConfirmationBtn')?.addEventListener('click', closeConfirmationModal);
  document.getElementById('btnFinishTicket')?.addEventListener('click', closeConfirmationModal);

  document.getElementById('openMyAppointmentsBtn')?.addEventListener('click', openMyAppointmentsModal);
  document.getElementById('closeMyAppointmentsBtn')?.addEventListener('click', closeMyAppointmentsModal);
  document.getElementById('btnCloseMyAppointments')?.addEventListener('click', closeMyAppointmentsModal);

  // CONTROLE DA AGENDA (RESTRIÇÃO WALBABER / 123456)
  document.getElementById('openAgendaManagerBtn')?.addEventListener('click', handleOpenAgendaManagerClick);
  document.getElementById('closeAgendaLoginBtn')?.addEventListener('click', closeAgendaLoginModal);
  document.getElementById('agendaLoginForm')?.addEventListener('submit', handleAgendaLoginSubmit);

  document.getElementById('closeAgendaManagerBtn')?.addEventListener('click', closeAgendaManagerModal);
  document.getElementById('btnAgendaLogout')?.addEventListener('click', handleAgendaLogout);

  document.getElementById('formAddAgendaSlot')?.addEventListener('submit', handleAddAgendaSlotSubmit);
  document.getElementById('btnResetDefaultSlots')?.addEventListener('click', handleResetDefaultAgendaSlots);
}

// Configuração do Seletor de Data
function setupDatePickerConstraints() {
  const dateInput = document.getElementById('bookingDate');
  if (!dateInput) return;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
  
  dateInput.value = `${yyyy}-${mm}-${dd}`;
  appState.selectedDate = dateInput.value;

  dateInput.addEventListener('change', (e) => {
    appState.selectedDate = e.target.value;
    updateBookingSummary();
  });

  const triggerCalendar = () => {
    try {
      if (typeof dateInput.showPicker === 'function') {
        dateInput.showPicker();
      }
    } catch (err) {}
  };

  dateInput.addEventListener('click', triggerCalendar);

  const dateWrapper = dateInput.closest('.date-picker-group');
  if (dateWrapper) {
    const label = dateWrapper.querySelector('label');
    if (label) {
      label.style.cursor = 'pointer';
      label.addEventListener('click', () => {
        dateInput.focus();
        triggerCalendar();
      });
    }
  }
}

// Máscara para WhatsApp
function setupPhoneMask() {
  const phoneInput = document.getElementById('clientPhone');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      e.target.value = `(${value}`;
    }
  });
}

// Toasts de Notificação
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let icon = 'fa-circle-check';
  if (type === 'warning') icon = 'fa-triangle-exclamation';
  if (type === 'error') icon = 'fa-circle-xmark';
  if (type === 'info') icon = 'fa-circle-info';

  toast.innerHTML = `
    <i class="fa-solid ${icon} gold-text"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-20px)';
    toast.style.transition = '0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
