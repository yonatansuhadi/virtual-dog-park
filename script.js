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
