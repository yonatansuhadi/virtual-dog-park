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

function updatePetCard() {
  if (!petCard || !petName || !petBreed || !petDay || !petStage || !petHappiness) {
    return;
  }

  petName.textContent = dogState.name;
  petBreed.textContent = dogState.breed;
  petDay.textContent = String(dogState.day);
  petStage.textContent = dogState.stage;
  petHappiness.textContent = `${dogState.happiness}%`;
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
  dogState.stage = 'Puppy';
  dogState.happiness = 50;

  updatePetCard();
  petCard.classList.remove('hidden');
  setMessage(`${dogState.name} is ready for a happy day!`, 'success');
}

function increaseHappiness(amount) {
  if (!dogState.name) {
    setMessage('Adopt a dog before feeding or playing with it.', 'error');
    return;
  }

  dogState.happiness = Math.min(100, dogState.happiness + amount);
  updatePetCard();
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

if (adoptionForm) {
  adoptionForm.addEventListener('submit', adoptDog);
}

if (feedButton) {
  feedButton.addEventListener('click', feedDog);
}

if (playButton) {
  playButton.addEventListener('click', playWithDog);
}
