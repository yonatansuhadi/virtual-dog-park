# Virtual Dog Park

Virtual Dog Park is a beginner-friendly website that combines a short dog encyclopedia with a simple virtual pet experience. Visitors can learn about three dog breeds and adopt one virtual companion to care for during the week.

## Features
- Dog encyclopedia with Beagle, Golden Retriever, and Poodle
- Breed selection and adoption form with simple name validation
- Feed and Play buttons that increase happiness
- Next Day button with growth stage tracking
- Growth bar and stage text so the dog clearly shows Puppy, Young Dog, or Adult Dog
- Local browser storage so pet progress stays available after refresh
- Start Over button with confirmation before deleting saved progress
- Responsive layout that works on phones and laptops

## Previewing the project
1. Open the project folder in VS Code.
2. Open the file `index.html` in the editor and use a local preview extension such as VS Code Live Server.
3. If you prefer a simple local server, run this command in the project folder:
   `python -m http.server 8000`
4. Then open `http://localhost:8000` in a browser.

## Growth and happiness rules
- Day 1 is "Puppy"
- Days 2 and 3 are "Young Dog"
- Day 4 and later are "Adult Dog"
- Each click on Next Day increases the day by 1 and decreases happiness by 5
- Happiness never goes below 0
- Feed and Play each increase happiness by 10
- Happiness never goes above 100

## Saved pet progress
Pet progress is stored locally in the browser using `localStorage` with the key `virtualDogParkPetV1`. This means the saved dog data stays on the visitor's device in the browser, not in a GitHub account, not in a database, and not on a remote server.

## Manual testing checklist
- [ ] Adopt a dog with a valid name and check that the pet card appears
- [ ] Try an empty or overly long name and confirm the helpful validation message appears
- [ ] Click Feed and verify happiness increases by 10 without going above 100
- [ ] Click Play and verify happiness increases by 10 without going above 100
- [ ] Click Next Day and confirm the day increases, growth stage changes as expected, and happiness decreases by 5 without dropping below 0
- [ ] Refresh the page and confirm the saved dog is restored
- [ ] Click Start Over, cancel the confirmation, and confirm the dog remains saved
- [ ] Click Start Over again and confirm the saved progress is deleted and the adoption form returns

> The SVG illustrations in this project are project-created illustrations, not real dog photographs.
