// Welcome flow: visitors can personalize the site or browse Orlando immediately.
const overlay = document.getElementById('shade');
const welcomeScreen = document.getElementById('welcome');
const onboardingScreen = document.getElementById('onboarding');
const onboardingReminder = document.getElementById('reminder');
const popup = document.querySelector('.modal');

function closePopup() {
  overlay.classList.add('hidden');
  onboardingReminder.style.display = 'block';
}

function openOnboarding() {
  welcomeScreen.classList.add('hidden');
  onboardingScreen.classList.remove('hidden');
  overlay.classList.remove('hidden');
  popup.setAttribute('aria-labelledby', 'onboardTitle');
  document.getElementById('zip').focus();
}

// Interest selections are kept in the interface for this first prototype.
document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    const isSelected = chip.classList.toggle('selected');
    chip.setAttribute('aria-pressed', String(isSelected));
  });
});

function savePreferences() {
  const zipCode = document.getElementById('zip').value.trim();
  if (zipCode && !/^\d{5}$/.test(zipCode)) {
    alert('Please enter a five-digit ZIP code or leave it blank.');
    return;
  }

  closePopup();
  onboardingReminder.style.display = 'none';
  // Persistence and personalized recommendations belong to a later milestone.
  alert('Preferences saved for this prototype!');
}

function filterCards(category) {
  document.querySelectorAll('.card').forEach((card) => {
    const categories = card.dataset.tags.split(' ');
    card.hidden = category !== 'All' && !categories.includes(category);
  });

  document.querySelectorAll('.filter').forEach((button) => {
    button.classList.toggle('active', button.textContent.trim() === category);
  });

  document.getElementById('featured').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

// Escape provides a quick way to dismiss the welcome or onboarding dialog.
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !overlay.classList.contains('hidden')) {
    closePopup();
  }
});
