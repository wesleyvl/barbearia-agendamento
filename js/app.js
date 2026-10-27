/**
 * WALBABER - SISTEMA DE AGENDAMENTO & CONTROLE MASTER
 * Arquitetura com Separação: Usuário Master vs Usuário Cliente
 * Persistência Total via LocalStorage
 */

// ========================================================
// 1. DADOS PADRÃO DE FÁBRICA (DEFAULT)
// ========================================================

const DEFAULT_SERVICES = [
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

const DEFAULT_BARBERS = [
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

const DEFAULT_STORE_CONFIG = {
  name: 'WALBABER',
  whatsapp: '5522992653627',
  address: 'Rua Recife, 1071, Casa 4 - Rio das Ostras - RJ',
  masterPassword: 'walbaber2026'
};

// ========================================================
// 2. CAMADA DE DADOS & PERSISTÊNCIA (LOCALSTORAGE)
// ========================================================

function getServices() {
  const data = localStorage.getItem('walbaber_services');
  return data ? JSON.parse(data) : DEFAULT_SERVICES;
}

function saveServices(services) {
  localStorage.setItem('walbaber_services', JSON.stringify(services));
  renderServicesCatalog();
  renderBookingServices();
  renderMasterServicesList();
}

function getBarbers() {
  const data = localStorage.getItem('walbaber_barbers');
  return data ? JSON.parse(data) : DEFAULT_BARBERS;
}

function saveBarbers(barbers) {
  localStorage.setItem('walbaber_barbers', JSON.stringify(barbers));
  renderBarbersCatalog();
  renderBookingBarbers();
  renderMasterBarbersList();
}

function getTimeSlots() {
  const data = localStorage.getItem('walbaber_time_slots');
  return data ? JSON.parse(data) : DEFAULT_TIME_SLOTS;
}

function saveTimeSlots(slots) {
  localStorage.setItem('walbaber_time_slots', JSON.stringify(slots));
  renderTimeSlots();
  renderMasterTimeSlots();
}

function getStoreConfig() {
  const data = localStorage.getItem('walbaber_store_config');
  return data ? JSON.parse(data) : DEFAULT_STORE_CONFIG;
}

function saveStoreConfig(config) {
  localStorage.setItem('walbaber_store_config', JSON.stringify(config));
  syncStoreDOM();
}

function getAllAppointments() {
  const data = localStorage.getItem('barbearia_agendamentos');
  return data ? JSON.parse(data) : [];
}

function saveAllAppointments(list) {
  localStorage.setItem('barbearia_agendamentos', JSON.stringify(list));
  updateAppointmentsCountBadge();
  renderMasterBookingsTable();
}

// Sincroniza informações da loja com o HTML da página
function syncStoreDOM() {
  const cfg = getStoreConfig();
  
  // Endereço
  const addressEl = document.getElementById('displayStoreAddress');
  if (addressEl) addressEl.textContent = cfg.address;

  // Telefone / WhatsApp
  const phoneEl = document.getElementById('displayStorePhone');
  if (phoneEl) {
    const raw = cfg.whatsapp.replace(/\D/g, '');
    if (raw.length >= 11) {
      const ddd = raw.slice(-11, -9);
      const numPart = raw.slice(-9);
      phoneEl.textContent = `(${ddd}) ${numPart.slice(0, 5)}-${numPart.slice(5)}`;
    } else {
      phoneEl.textContent = cfg.whatsapp;
    }
  }

  const phoneLink = document.getElementById('displayStorePhoneLink');
  if (phoneLink) {
    phoneLink.href = `https://wa.me/${cfg.whatsapp}`;
  }

  // Botão flutuante WhatsApp
  const floatingWa = document.querySelector('.floating-whatsapp');
  if (floatingWa) {
    floatingWa.href = `https://wa.me/${cfg.whatsapp}?text=Olá!%20Gostaria%20de%20tirar%20uma%20dúvida%20sobre%20a%20Barbearia%20${encodeURIComponent(cfg.name)}.`;
  }
}

// ========================================================
// 3. ESTADO DA SESSÃO E WIZARD CLIENTE
// ========================================================

const appState = {
  selectedServices: [],
  selectedBarber: null,
  selectedDate: '',
  selectedTime: '',
  currentStep: 1,
  isMasterAuth: sessionStorage.getItem('walbaber_master_session') === 'true'
};

// ========================================================
// 4. INICIALIZAÇÃO GERAL
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  const barbers = getBarbers();
  appState.selectedBarber = barbers[0] || null;

  syncStoreDOM();
  renderServicesCatalog('all');
  renderBookingServices();
  renderBarbersCatalog();
  renderBookingBarbers();
  renderTimeSlots();
  setupEventListeners();
  setupDatePickerConstraints();
  updateAppointmentsCountBadge();
  setupPhoneMask();

  checkMasterAuthStatus();
});

// ========================================================
// 5. RENDERIZAÇÃO CLIENTE
// ========================================================

function renderServicesCatalog(filter = 'all') {
  const container = document.getElementById('servicesGrid');
  if (!container) return;

  const services = getServices();
  const filtered = filter === 'all' 
    ? services 
    : services.filter(s => s.category === filter);

  container.innerHTML = filtered.map(service => {
    const isSelected = appState.selectedServices.some(s => s.id === service.id);
    return `
      <div class="service-card ${isSelected ? 'selected' : ''}" data-service-id="${service.id}">
        ${service.badge ? `<span class="service-badge">${service.badge}</span>` : ''}
        <div class="service-icon-box">
          <i class="fa-solid ${service.icon || 'fa-scissors'}"></i>
        </div>
        <h3 class="service-title">${service.name}</h3>
        <p class="service-description">${service.desc || 'Serviço de alta qualidade com os melhores produtos.'}</p>
        <div class="service-footer">
          <div class="service-meta">
            <span class="service-price">R$ ${parseFloat(service.price).toFixed(2).replace('.', ',')}</span>
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

function renderBarbersCatalog() {
  const container = document.getElementById('barbersGrid');
  if (!container) return;

  const barbers = getBarbers().filter(b => b.id !== 'qualquer');

  container.innerHTML = barbers.map(barber => `
    <div class="barber-card">
      <div class="barber-img-container">
        <img src="${barber.avatar || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80'}" alt="${barber.name}" class="barber-img">
        <span class="barber-specialty-tag">${barber.specialty}</span>
      </div>
      <div class="barber-info">
        <h3 class="barber-name">${barber.name}</h3>
        <p class="barber-role">${barber.role}</p>
        <div class="barber-rating">
          <i class="fa-solid fa-star"></i>
          <span>${barber.rating || '5.0 (Especialista)'}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function renderBookingServices() {
  const container = document.getElementById('bookingServicesPicker');
  if (!container) return;

  const services = getServices();
  container.innerHTML = services.map(service => {
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
        <span class="picker-service-price">R$ ${parseFloat(service.price).toFixed(2).replace('.', ',')}</span>
      </div>
    `;
  }).join('');

  updateBookingSummary();
}

function renderBookingBarbers() {
  const container = document.getElementById('bookingBarbersPicker');
  if (!container) return;

  const barbers = getBarbers();
  container.innerHTML = barbers.map(barber => {
    const isSelected = appState.selectedBarber && appState.selectedBarber.id === barber.id;
    return `
      <div class="picker-barber-item ${isSelected ? 'selected' : ''}" onclick="selectBarber('${barber.id}')">
        <img src="${barber.avatar || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80'}" alt="${barber.name}" class="picker-barber-avatar">
        <span class="picker-barber-name">${barber.name}</span>
        <span class="picker-barber-role">${barber.role}</span>
      </div>
    `;
  }).join('');
}

function renderTimeSlots() {
  const container = document.getElementById('timeSlotsContainer');
  if (!container) return;

  const slots = getTimeSlots();
  if (slots.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; color: var(--text-muted); font-size: 0.9rem;">Nenhum horário disponível para esta data.</p>`;
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
// 6. CONTROLE DO FLUXO DO CLIENTE (WIZARD & AGENDAMENTO)
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
    const totalDuration = appState.selectedServices.reduce((acc, s) => acc + parseInt(s.duration || 0), 0);
    const totalPrice = appState.selectedServices.reduce((acc, s) => acc + parseFloat(s.price || 0), 0);

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
  const services = getServices();
  const service = services.find(s => s.id === serviceId);
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
  const services = getServices();
  const service = services.find(s => s.id === serviceId);
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
  const barbers = getBarbers();
  const barber = barbers.find(b => b.id === barberId);
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

// Submissão do Formulário pelo Cliente
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

  const totalPrice = appState.selectedServices.reduce((acc, s) => acc + parseFloat(s.price), 0);
  const totalDuration = appState.selectedServices.reduce((acc, s) => acc + parseInt(s.duration), 0);
  const cfg = getStoreConfig();

  const newAppointment = {
    id: 'AGD-' + Date.now().toString().slice(-6),
    createdAt: new Date().toISOString(),
    status: 'Confirmado',
    client: { name, phone, notes },
    services: appState.selectedServices.map(s => ({ name: s.name, price: s.price })),
    barber: appState.selectedBarber ? appState.selectedBarber.name : 'Primeiro Disponível',
    date: appState.selectedDate,
    time: appState.selectedTime,
    duration: totalDuration,
    totalPrice: totalPrice
  };

  const currentList = getAllAppointments();
  currentList.unshift(newAppointment);
  saveAllAppointments(currentList);

  showTicketModal(newAppointment, cfg);
  resetBookingForm();
}

function showTicketModal(appointment, cfg) {
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
      `💈 *NOVO AGENDAMENTO - ${cfg.name}*\n\n` +
      `👤 *Cliente:* ${appointment.client.name}\n` +
      `✂️ *Serviço(s):* ${servicesListStr}\n` +
      `💈 *Barbeiro:* ${appointment.barber}\n` +
      `📅 *Data:* ${formattedDate} às ${appointment.time}\n` +
      `💰 *Total:* R$ ${appointment.totalPrice.toFixed(2).replace('.', ',')}\n` +
      `🔖 *Código:* #${appointment.id}\n\n` +
      `Por favor, confirmem meu horário!`
    );
    btnShareWhatsApp.href = `https://wa.me/${cfg.whatsapp}?text=${message}`;
  }

  modal.classList.add('open');
}

function closeConfirmationModal() {
  const modal = document.getElementById('confirmationModal');
  if (modal) modal.classList.remove('open');
}

function resetBookingForm() {
  appState.selectedServices = [];
  const barbers = getBarbers();
  appState.selectedBarber = barbers[0] || null;
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

function updateAppointmentsCountBadge() {
  const countBadge = document.getElementById('appointmentsCount');
  const dashCount = document.getElementById('dashAppointmentsCount');
  const list = getAllAppointments();

  if (countBadge) {
    countBadge.textContent = list.length;
    countBadge.style.display = list.length > 0 ? 'inline-block' : 'none';
  }
  if (dashCount) {
    dashCount.textContent = list.length;
  }
}

function openMyAppointmentsModal() {
  const modal = document.getElementById('myAppointmentsModal');
  const listContainer = document.getElementById('myAppointmentsList');
  if (!modal || !listContainer) return;

  const appointments = getAllAppointments();

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
            <span class="badge-status ${item.status ? item.status.toLowerCase() : 'confirmado'}">${item.status || 'Confirmado'}</span>
          </div>
          <div style="font-size: 0.95rem; font-weight: 600; margin-bottom: 4px;">${servicesStr}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 10px;">
            Barbeiro: <strong>${item.barber}</strong> • ${formattedDate} às ${item.time} • <strong>R$ ${item.totalPrice.toFixed(2).replace('.', ',')}</strong>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <button class="btn btn-outline" style="padding: 6px 12px; font-size: 0.78rem; color: #ff5555; border-color: rgba(255,85,85,0.3);" onclick="clientCancelAppointment('${item.id}')">
              <i class="fa-solid fa-trash"></i> Cancelar Agendamento
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  modal.classList.add('open');
}

function clientCancelAppointment(id) {
  if (confirm('Tem certeza que deseja cancelar o agendamento?')) {
    let list = getAllAppointments();
    list = list.map(item => {
      if (item.id === id) {
        return { ...item, status: 'Cancelado' };
      }
      return item;
    });
    saveAllAppointments(list);
    openMyAppointmentsModal();
    showToast('Agendamento marcado como Cancelado.', 'info');
  }
}

// ========================================================
// 7. FUNCIONALIDADES DO USUÁRIO MASTER (ADMINISTRADOR)
// ========================================================

function checkMasterAuthStatus() {
  const topbar = document.getElementById('adminTopbar');
  if (appState.isMasterAuth) {
    if (topbar) topbar.style.display = 'block';
  } else {
    if (topbar) topbar.style.display = 'none';
  }
}

function openMasterLoginModal() {
  if (appState.isMasterAuth) {
    openMasterDashboard();
    return;
  }
  const modal = document.getElementById('masterLoginModal');
  const passInput = document.getElementById('masterPasswordInput');
  if (passInput) passInput.value = '';
  if (modal) modal.classList.add('open');
}

function closeMasterLoginModal() {
  const modal = document.getElementById('masterLoginModal');
  if (modal) modal.classList.remove('open');
}

function handleMasterLogin(e) {
  e.preventDefault();
  const passInput = document.getElementById('masterPasswordInput');
  const enteredPass = passInput ? passInput.value.trim() : '';
  const currentConfig = getStoreConfig();

  if (enteredPass === currentConfig.masterPassword) {
    appState.isMasterAuth = true;
    sessionStorage.setItem('walbaber_master_session', 'true');
    closeMasterLoginModal();
    checkMasterAuthStatus();
    openMasterDashboard();
    showToast('Acesso Master autenticado com sucesso! Bem-vindo.');
  } else {
    showToast('Senha master incorreta! Tente novamente.', 'error');
  }
}

function handleMasterLogout() {
  appState.isMasterAuth = false;
  sessionStorage.removeItem('walbaber_master_session');
  checkMasterAuthStatus();
  closeMasterDashboard();
  showToast('Você saiu do Modo Master.', 'info');
}

function openMasterDashboard() {
  const modal = document.getElementById('masterDashboardModal');
  if (!modal) return;

  renderMasterBookingsTable();
  renderMasterTimeSlots();
  renderMasterServicesList();
  renderMasterBarbersList();
  populateMasterConfigForm();

  modal.classList.add('open');
}

function closeMasterDashboard() {
  const modal = document.getElementById('masterDashboardModal');
  if (modal) modal.classList.remove('open');
}

// ========================================================
// 8. TABS & GESTÃO MASTER (CRUD DE HORÁRIOS, SERVIÇOS, ETC.)
// ========================================================

// TAB 1: Agendamentos Gerais
function renderMasterBookingsTable() {
  const container = document.getElementById('masterBookingsTableContainer');
  const filterSelect = document.getElementById('filterBookingStatus');
  const selectedFilter = filterSelect ? filterSelect.value : 'all';
  
  if (!container) return;

  let appointments = getAllAppointments();

  const totalCount = appointments.length;
  const pendingCount = appointments.filter(a => a.status === 'Pendente').length;
  const totalRevenue = appointments
    .filter(a => a.status !== 'Cancelado')
    .reduce((sum, a) => sum + parseFloat(a.totalPrice || 0), 0);

  const elTotal = document.getElementById('metricTotalBookings');
  const elPending = document.getElementById('metricPendingCount');
  const elRev = document.getElementById('metricRevenueTotal');

  if (elTotal) elTotal.textContent = totalCount;
  if (elPending) elPending.textContent = pendingCount;
  if (elRev) elRev.textContent = `R$ ${totalRevenue.toFixed(2).replace('.', ',')}`;

  if (selectedFilter !== 'all') {
    appointments = appointments.filter(a => a.status === selectedFilter);
  }

  if (appointments.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-muted);">
        <i class="fa-solid fa-calendar-xmark" style="font-size: 2.5rem; margin-bottom: 12px; color: var(--gold);"></i>
        <p>Nenhum agendamento encontrado para este filtro.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <table class="dash-table">
      <thead>
        <tr>
          <th>Código</th>
          <th>Cliente / Contato</th>
          <th>Serviço(s)</th>
          <th>Barbeiro</th>
          <th>Data / Horário</th>
          <th>Valor</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        ${appointments.map(item => {
          const [year, month, day] = item.date.split('-');
          const formattedDate = `${day}/${month}/${year}`;
          const cleanPhone = item.client.phone.replace(/\D/g, '');
          const servicesText = item.services.map(s => s.name).join(', ');
          const waMessage = encodeURIComponent(
            `Olá ${item.client.name}! Sou da Barbearia WALBABER referente ao seu agendamento (#${item.id}) no dia ${formattedDate} às ${item.time}. Tudo confirmado!`
          );

          return `
            <tr>
              <td><strong class="gold-text">#${item.id}</strong></td>
              <td>
                <strong>${item.client.name}</strong><br>
                <small style="color: var(--text-muted);">${item.client.phone}</small>
              </td>
              <td>
                <span>${servicesText}</span><br>
                <small style="color: var(--text-dim);">${item.duration} min</small>
              </td>
              <td><strong>${item.barber}</strong></td>
              <td><strong>${formattedDate}</strong><br><small class="gold-text">${item.time}</small></td>
              <td><strong>R$ ${item.totalPrice.toFixed(2).replace('.', ',')}</strong></td>
              <td>
                <select class="form-select-sm" onchange="masterUpdateBookingStatus('${item.id}', this.value)">
                  <option value="Confirmado" ${item.status === 'Confirmado' ? 'selected' : ''}>Confirmado</option>
                  <option value="Pendente" ${item.status === 'Pendente' ? 'selected' : ''}>Pendente</option>
                  <option value="Concluído" ${item.status === 'Concluído' ? 'selected' : ''}>Concluído</option>
                  <option value="Cancelado" ${item.status === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
                </select>
              </td>
              <td>
                <div class="table-actions">
                  <a href="https://wa.me/55${cleanPhone}?text=${waMessage}" target="_blank" class="btn-icon-wa" title="Chamar no WhatsApp">
                    <i class="fa-brands fa-whatsapp"></i>
                  </a>
                  <button type="button" class="btn-icon-del" onclick="masterDeleteBooking('${item.id}')" title="Excluir Agendamento">
                    <i class="fa-solid fa-trash-can"></i>
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

function masterUpdateBookingStatus(id, newStatus) {
  let list = getAllAppointments();
  list = list.map(item => {
    if (item.id === id) {
      return { ...item, status: newStatus };
    }
    return item;
  });
  saveAllAppointments(list);
  showToast(`Status do agendamento #${id} atualizado para ${newStatus}!`);
}

function masterDeleteBooking(id) {
  if (confirm(`Deseja excluir permanentemente o agendamento #${id}?`)) {
    let list = getAllAppointments();
    list = list.filter(item => item.id !== id);
    saveAllAppointments(list);
    showToast(`Agendamento #${id} removido.`, 'info');
  }
}

function masterClearCancelledBookings() {
  let list = getAllAppointments();
  const countBefore = list.length;
  list = list.filter(item => item.status !== 'Cancelado');
  
  if (list.length === countBefore) {
    showToast('Não há agendamentos cancelados para remover.', 'info');
    return;
  }

  saveAllAppointments(list);
  showToast('Todos os agendamentos cancelados foram removidos!');
}

// TAB 2: Horários
function renderMasterTimeSlots() {
  const container = document.getElementById('masterSlotsChipsContainer');
  if (!container) return;

  const slots = getTimeSlots();
  container.innerHTML = slots.map(time => `
    <div class="master-slot-chip">
      <i class="fa-regular fa-clock gold-text"></i>
      <strong>${time}</strong>
      <button type="button" class="chip-del-btn" onclick="masterRemoveTimeSlot('${time}')" title="Remover horário">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `).join('');
}

function masterAddTimeSlot(time) {
  if (!time) return;
  let slots = getTimeSlots();

  if (slots.includes(time)) {
    showToast('Este horário já está cadastrado!', 'warning');
    return;
  }

  slots.push(time);
  slots.sort((a, b) => a.localeCompare(b));
  saveTimeSlots(slots);
  showToast(`Novo horário ${time} adicionado!`);
}

function masterRemoveTimeSlot(time) {
  let slots = getTimeSlots();
  slots = slots.filter(t => t !== time);
  saveTimeSlots(slots);
  showToast(`Horário ${time} removido.`, 'info');
}

function masterResetDefaultSlots() {
  if (confirm('Restaurar a grade de horários padrão?')) {
    saveTimeSlots([...DEFAULT_TIME_SLOTS]);
    showToast('Horários restaurados para o padrão.');
  }
}

// TAB 3: Serviços
function renderMasterServicesList() {
  const container = document.getElementById('masterServicesList');
  if (!container) return;

  const services = getServices();
  container.innerHTML = services.map(service => `
    <div class="master-item-row">
      <div style="flex-grow: 1;">
        <span class="master-item-title">${service.name}</span>
        <span class="master-item-subtitle">${service.category.toUpperCase()} • ${service.duration} min</span>
      </div>
      <div class="master-item-price-edit">
        <span style="font-size: 0.82rem; color: var(--text-muted);">R$</span>
        <input type="number" step="0.5" class="master-price-input" value="${service.price}" onchange="masterUpdateServicePrice('${service.id}', this.value)" title="Edite o preço e saia do campo">
      </div>
      <button type="button" class="btn-icon-del" onclick="masterDeleteService('${service.id}')" title="Excluir Serviço">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join('');
}

function masterUpdateServicePrice(id, newPrice) {
  const priceVal = parseFloat(newPrice);
  if (isNaN(priceVal) || priceVal < 0) {
    showToast('Valor de preço inválido!', 'error');
    renderMasterServicesList();
    return;
  }

  let services = getServices();
  services = services.map(s => {
    if (s.id === id) {
      return { ...s, price: priceVal };
    }
    return s;
  });

  saveServices(services);
  showToast('Preço do serviço atualizado com sucesso!');
}

function masterDeleteService(id) {
  let services = getServices();
  if (services.length <= 1) {
    showToast('Você deve manter pelo menos um serviço cadastrado!', 'warning');
    return;
  }

  if (confirm('Tem certeza que deseja excluir este serviço?')) {
    services = services.filter(s => s.id !== id);
    saveServices(services);
    showToast('Serviço removido com sucesso.', 'info');
  }
}

function handleAddServiceSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('newServiceName').value.trim();
  const price = parseFloat(document.getElementById('newServicePrice').value);
  const duration = parseInt(document.getElementById('newServiceDuration').value, 10);
  const category = document.getElementById('newServiceCategory').value;
  const desc = document.getElementById('newServiceDesc').value.trim();

  if (!name || isNaN(price) || isNaN(duration)) {
    showToast('Preencha os campos obrigatórios corretamente!', 'error');
    return;
  }

  const id = 'serv-' + Date.now().toString().slice(-5);
  const newService = {
    id,
    name,
    price,
    duration,
    category,
    desc,
    icon: category === 'barba' ? 'fa-user-ninja' : 'fa-scissors',
    badge: 'Novo'
  };

  const services = getServices();
  services.unshift(newService);
  saveServices(services);

  e.target.reset();
  showToast(`Serviço "${name}" cadastrado com sucesso!`);
}

// TAB 4: Barbeiros
function renderMasterBarbersList() {
  const container = document.getElementById('masterBarbersList');
  if (!container) return;

  const barbers = getBarbers();
  container.innerHTML = barbers.map(barber => `
    <div class="master-item-row">
      <img src="${barber.avatar || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80'}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover;">
      <div style="flex-grow: 1;">
        <span class="master-item-title">${barber.name}</span>
        <span class="master-item-subtitle">${barber.role} • ${barber.specialty}</span>
      </div>
      ${barber.id !== 'qualquer' ? `
        <button type="button" class="btn-icon-del" onclick="masterDeleteBarber('${barber.id}')" title="Excluir Barbeiro">
          <i class="fa-solid fa-trash"></i>
        </button>
      ` : '<span style="font-size: 0.75rem; color: var(--gold);">Padrão</span>'}
    </div>
  `).join('');
}

function masterDeleteBarber(id) {
  let barbers = getBarbers();
  if (confirm('Tem certeza que deseja remover este barbeiro?')) {
    barbers = barbers.filter(b => b.id !== id);
    saveBarbers(barbers);
    showToast('Barbeiro removido com sucesso.', 'info');
  }
}

function handleAddBarberSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('newBarberName').value.trim();
  const role = document.getElementById('newBarberRole').value.trim();
  const specialty = document.getElementById('newBarberSpecialty').value.trim();
  let avatar = document.getElementById('newBarberAvatar').value.trim();

  if (!avatar) {
    avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
  }

  const id = 'barber-' + Date.now().toString().slice(-5);
  const newBarber = {
    id,
    name,
    role,
    specialty,
    avatar,
    rating: '5.0 (Novo)'
  };

  const barbers = getBarbers();
  barbers.push(newBarber);
  saveBarbers(barbers);

  e.target.reset();
  showToast(`Barbeiro ${name} adicionado à equipe!`);
}

// TAB 5: Configurações Gerais
function populateMasterConfigForm() {
  const cfg = getStoreConfig();
  const nameInput = document.getElementById('configStoreName');
  const waInput = document.getElementById('configStoreWhatsApp');
  const addrInput = document.getElementById('configStoreAddress');
  const passInput = document.getElementById('configMasterPassword');

  if (nameInput) nameInput.value = cfg.name;
  if (waInput) waInput.value = cfg.whatsapp;
  if (addrInput) addrInput.value = cfg.address;
  if (passInput) passInput.value = '';
}

function handleSaveStoreConfig(e) {
  e.preventDefault();
  const cfg = getStoreConfig();

  const name = document.getElementById('configStoreName').value.trim();
  const whatsapp = document.getElementById('configStoreWhatsApp').value.replace(/\D/g, '');
  const address = document.getElementById('configStoreAddress').value.trim();
  const newPass = document.getElementById('configMasterPassword').value.trim();

  if (!name || !whatsapp || !address) {
    showToast('Preencha todos os campos obrigatórios!', 'error');
    return;
  }

  cfg.name = name;
  cfg.whatsapp = whatsapp;
  cfg.address = address;
  if (newPass.length >= 4) {
    cfg.masterPassword = newPass;
    showToast('Senha master atualizada!');
  }

  saveStoreConfig(cfg);
  showToast('Configurações da barbearia salvas com sucesso!');
}

function handleResetAllDefaults() {
  if (confirm('ATENÇÃO: Deseja resetar todos os horários, serviços, barbeiros e dados para o padrão de fábrica?')) {
    localStorage.removeItem('walbaber_services');
    localStorage.removeItem('walbaber_barbers');
    localStorage.removeItem('walbaber_time_slots');
    localStorage.removeItem('walbaber_store_config');
    
    syncStoreDOM();
    renderServicesCatalog();
    renderBookingServices();
    renderBarbersCatalog();
    renderBookingBarbers();
    renderTimeSlots();

    renderMasterBookingsTable();
    renderMasterTimeSlots();
    renderMasterServicesList();
    renderMasterBarbersList();
    populateMasterConfigForm();

    showToast('Todos os dados foram resetados para os padrões!');
  }
}

// ========================================================
// 9. EVENT LISTENERS E CONTROLES DE INTERFACE
// ========================================================

function setupEventListeners() {
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

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const filter = e.target.getAttribute('data-filter');
      renderServicesCatalog(filter);
    });
  });

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

  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleClientFormSubmit);
  }

  document.getElementById('closeConfirmationBtn')?.addEventListener('click', closeConfirmationModal);
  document.getElementById('btnFinishTicket')?.addEventListener('click', closeConfirmationModal);

  document.getElementById('openMyAppointmentsBtn')?.addEventListener('click', openMyAppointmentsModal);
  document.getElementById('closeMyAppointmentsBtn')?.addEventListener('click', closeMyAppointmentsModal);
  document.getElementById('btnCloseMyAppointments')?.addEventListener('click', closeMyAppointmentsModal);

  // ÁREA MASTER: Login & Dashboard
  document.getElementById('openMasterBtn')?.addEventListener('click', openMasterLoginModal);
  document.getElementById('btnAdminOpenPanel')?.addEventListener('click', openMasterDashboard);
  document.getElementById('closeMasterLoginBtn')?.addEventListener('click', closeMasterLoginModal);
  document.getElementById('closeMasterDashboardBtn')?.addEventListener('click', closeMasterDashboard);

  document.getElementById('masterLoginForm')?.addEventListener('submit', handleMasterLogin);
  document.getElementById('btnAdminLogout')?.addEventListener('click', handleMasterLogout);
  document.getElementById('btnAdminLogoutFromDash')?.addEventListener('click', handleMasterLogout);

  document.querySelectorAll('.dash-tab-btn').forEach(tabBtn => {
    tabBtn.addEventListener('click', (e) => {
      document.querySelectorAll('.dash-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.dash-tab-pane').forEach(p => p.classList.remove('active'));

      const targetBtn = e.currentTarget;
      targetBtn.classList.add('active');
      const targetPaneId = targetBtn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetPaneId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  document.getElementById('filterBookingStatus')?.addEventListener('change', renderMasterBookingsTable);
  document.getElementById('btnClearFinishedBookings')?.addEventListener('click', masterClearCancelledBookings);

  document.getElementById('formAddSchedule')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('newTimeSlotInput');
    if (input && input.value) {
      masterAddTimeSlot(input.value);
      input.value = '';
    }
  });
  document.getElementById('btnResetDefaultSlots')?.addEventListener('click', masterResetDefaultSlots);

  document.getElementById('formAddService')?.addEventListener('submit', handleAddServiceSubmit);
  document.getElementById('formAddBarber')?.addEventListener('submit', handleAddBarberSubmit);
  document.getElementById('formSaveStoreConfig')?.addEventListener('submit', handleSaveStoreConfig);
  document.getElementById('btnResetAllDefaults')?.addEventListener('click', handleResetAllDefaults);
}

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

  // Abre o calendário nativo ao clicar em qualquer parte do campo
  const triggerCalendar = () => {
    try {
      if (typeof dateInput.showPicker === 'function') {
        dateInput.showPicker();
      }
    } catch (err) {
      // Fallback para navegadores legados
    }
  };

  dateInput.addEventListener('click', triggerCalendar);

  // Permite clicar também no rótulo do campo para abrir o calendário
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
