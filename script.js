const STORAGE_KEY = 'virtualDogParkPetV1';

const breeds = [
  {
    name: 'Beagle',
    image: 'assets/beagle.svg',
    alt: 'Illustration of a Beagle.',
    size: 'Size: Small to medium.',
    personality: 'Personality: Curious, friendly, and playful.',
    care: 'Everyday care: Long walks, puzzle toys, and regular brushing.'
  },
  {
    name: 'Golden Retriever',
    image: 'assets/golden-retriever.svg',
    alt: 'Illustration of a Golden Retriever.',
    size: 'Size: Medium to large.',
    personality: 'Personality: Gentle, loyal, and eager to please.',
    care: 'Everyday care: Daily exercise, brushing, and lots of attention.'
  },
  {
    name: 'Poodle',
    image: 'assets/poodle.svg',
    alt: 'Illustration of a Poodle.',
    size: 'Size: Small to large, depending on type.',
    personality: 'Personality: Smart, lively, and affectionate.',
    care: 'Everyday care: Grooming, training, and playtime with mental challenges.'
  }
];

const breedGrid = document.getElementById('breed-grid');
const adoptionForm = document.getElementById('adoption-form');
const dogNameInput = document.getElementById('dog-name');
const breedSelect = document.getElementById('breed-select');
const nameError = document.getElementById('name-error');
const petCard = document.getElementById('pet-card');
const petName = document.getElementById('pet-name');
const petBreed = document.getElementById('pet-breed');
const petDay = document.getElementById('pet-day');
const petStage = document.getElementById('pet-stage');
const petHappiness = document.getElementById('pet-happiness');
const feedButton = document.getElementById('feed-button');
const playButton = document.getElementById('play-button');
const nextDayButton = document.getElementById('next-day-button');
const startOverButton = document.getElementById('start-over-button');
const petIllustration = document.getElementById('pet-illustration');
const growthFill = document.getElementById('growth-fill');

const dogState = {
  name: '',
  breed: 'Beagle',
  day: 1,
  stage: 'Puppy',
  happiness: 50
};

if (breedGrid) {
  breedGrid.innerHTML = breeds
    .map(
      (breed) => `
        <article class="breed-card">
          <img src="${breed.image}" alt="${breed.alt}">
          <div class="breed-content">
            <h3>${breed.name}</h3>
            <ul class="breed-list">
              <li>${breed.size}</li>
              <li>${breed.personality}</li>
              <li>${breed.care}</li>
            </ul>
          </div>
        </article>
      `
    )
    .join('');
}

function getGrowthStage(day) {
  if (day <= 1) {
    return 'Puppy';
  }

  if (day <= 3) {
    return 'Young Dog';
  }

  return 'Adult Dog';
}

function getGrowthBarPercent(day) {
  if (day <= 1) {
    return 25;
  }

  if (day <= 3) {
    return 60;
  }

  return 100;
}

function getBreedByName(breedName) {
  return breeds.find((breed) => breed.name === breedName) || breeds[0];
}

function validateDogName(name) {
  const trimmedName = name.trim();

  if (trimmedName.length === 0) {
    return 'Please enter a name for your dog.';
  }

  if (trimmedName.length > 20) {
    return 'The name must be 20 characters or fewer.';
  }

  return '';
}

function setMessage(message, type) {
  if (!nameError) {
    return;
  }

  nameError.textContent = message;
  nameError.classList.remove('error', 'success');

  if (type) {
    nameError.classList.add(type);
  }
}

function saveDogState() {
  if (!dogState.name) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }

  const dogToSave = {
    name: dogState.name,
    breed: dogState.breed,
    day: dogState.day,
    happiness: dogState.happiness
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(dogToSave));
}

function loadSavedDog() {
  try {
    const savedValue = localStorage.getItem(STORAGE_KEY);

    if (!savedValue) {
      return null;
    }

    const savedDog = JSON.parse(savedValue);

    if (!savedDog || typeof savedDog !== 'object') {
      return null;
    }

    const name = typeof savedDog.name === 'string' ? savedDog.name.trim() : '';
    const breed = typeof savedDog.breed === 'string' ? savedDog.breed : 'Beagle';
    const day = Number(savedDog.day);
    const happiness = Number(savedDog.happiness);

    if (!name || name.length > 20 || !breeds.some((breedInfo) => breedInfo.name === breed)) {
      return null;
    }

    if (!Number.isFinite(day) || !Number.isFinite(happiness)) {
      return null;
    }

    return {
      name,
      breed,
      day: Math.max(1, Math.round(day)),
      happiness: Math.min(100, Math.max(0, Math.round(happiness)))
    };
  } catch (error) {
    console.warn('Saved dog data could not be read.', error);
    return null;
  }
}

function updateDogVisual() {
  if (!petIllustration) {
    return;
  }

  const breedInfo = getBreedByName(dogState.breed);
  petIllustration.src = breedInfo.image;
  petIllustration.alt = breedInfo.alt;

  if (dogState.stage === 'Puppy') {
    petIllustration.style.transform = 'scale(0.9)';
  } else if (dogState.stage === 'Young Dog') {
    petIllustration.style.transform = 'scale(1.1)';
  } else {
    petIllustration.style.transform = 'scale(1.3)';
  }

  if (growthFill) {
    growthFill.style.width = `${getGrowthBarPercent(dogState.day)}%`;
  }
}

function updatePetCard() {
  if (!petCard || !petName || !petBreed || !petDay || !petStage || !petHappiness) {
    return;
  }

  dogState.stage = getGrowthStage(dogState.day);

  petName.textContent = dogState.name;
  petBreed.textContent = dogState.breed;
  petDay.textContent = String(dogState.day);
  petStage.textContent = dogState.stage;
  petHappiness.textContent = `${dogState.happiness}%`;
  updateDogVisual();
}

function restoreSavedDog() {
  const savedDog = loadSavedDog();

  if (!savedDog) {
    return;
  }

  dogState.name = savedDog.name;
  dogState.breed = savedDog.breed;
  dogState.day = savedDog.day;
  dogState.happiness = savedDog.happiness;

  if (breedSelect) {
    breedSelect.value = dogState.breed;
  }

  if (dogNameInput) {
    dogNameInput.value = dogState.name;
  }

  updatePetCard();

  if (petCard) {
    petCard.classList.remove('hidden');
  }
}

function clearAdoptionForm() {
  if (adoptionForm) {
    adoptionForm.reset();
  }

  if (breedSelect) {
    breedSelect.value = 'Beagle';
  }

  if (dogNameInput) {
    dogNameInput.value = '';
  }

  if (petCard) {
    petCard.classList.add('hidden');
  }
}

function adoptDog(event) {
  event.preventDefault();

  const candidateName = dogNameInput ? dogNameInput.value : '';
  const errorMessage = validateDogName(candidateName);

  if (errorMessage) {
    setMessage(errorMessage, 'error');
    dogNameInput?.focus();
    return;
  }

  dogState.name = candidateName.trim();
  dogState.breed = breedSelect ? breedSelect.value : dogState.breed;
  dogState.day = 1;
  dogState.happiness = 50;
  dogState.stage = 'Puppy';

  updatePetCard();
  petCard.classList.remove('hidden');
  saveDogState();
  setMessage(`${dogState.name} is ready for a happy day!`, 'success');
}

function increaseHappiness(amount) {
  if (!dogState.name) {
    setMessage('Adopt a dog before feeding or playing with it.', 'error');
    return;
  }

  dogState.happiness = Math.min(100, Math.max(0, dogState.happiness + amount));
  updatePetCard();
  saveDogState();
}

function feedDog() {
  if (!dogState.name) {
    setMessage('Adopt a dog before feeding it.', 'error');
    return;
  }

  increaseHappiness(10);
  setMessage(`${dogState.name} enjoyed a tasty snack!`, 'success');
}

function playWithDog() {
  if (!dogState.name) {
    setMessage('Adopt a dog before playing with it.', 'error');
    return;
  }

  increaseHappiness(10);
  setMessage(`${dogState.name} had a playful time!`, 'success');
}

function nextDay() {
  if (!dogState.name) {
    setMessage('Adopt a dog before moving to the next day.', 'error');
    return;
  }

  dogState.day += 1;
  dogState.happiness = Math.max(0, dogState.happiness - 5);
  updatePetCard();
  saveDogState();
  setMessage(`${dogState.name} is now a ${dogState.stage}.`, 'success');
}

function startOver() {
  const confirmed = window.confirm('Start over and delete your saved dog?');

  if (!confirmed) {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  dogState.name = '';
  dogState.breed = 'Beagle';
  dogState.day = 1;
  dogState.happiness = 50;
  dogState.stage = 'Puppy';

  clearAdoptionForm();
  setMessage('Saved progress was cleared. You can adopt a new dog.', 'success');
}

if (adoptionForm) {
  adoptionForm.addEventListener('submit', adoptDog);
}

if (feedButton) {
  feedButton.addEventListener('click', feedDog);
}

if (playButton) {
  playButton.addEventListener('click', playWithDog);
}

if (nextDayButton) {
  nextDayButton.addEventListener('click', nextDay);
}

if (startOverButton) {
  startOverButton.addEventListener('click', startOver);
}

restoreSavedDog();
