# React Native Engineer Challenge (2-5 hrs)

## Grading Rubric

- **Adherence to Challenge Requirements (40%)**:
  - 🟢 React Native Application Features:
    - Search Github repositories and display in a dropdown.
    - Dropdown items: Repository name, description, programming language, and star count.
    - Save and manage repositories using the reposerver API.
    - List view with sorting and management options.
    - App behavior on refresh.
  - 🟢 User Interface:
    - Autocomplete dropdown for Github repository search.
  - 🟢 Server Interactions:
    - Understand and adhere to server limitations (e.g., in-memory storage).
    - Correct use of provided API endpoints.
  - 🟢 Repository Object Structure:
    - Proper adherence to the expected data structure for repositories.
  - 🟢 App Usage and Setup:
    - Proper setup, starting of the API server, and development commands.
- **Clarity and Conciseness of the Code (20%)**:
  - 🟢 Code readability.
  - 🟢 Proper naming conventions.
  - 🟢 Avoidance of overly complex solutions when simpler ones suffice.
- **Avoidance of Common Mistakes (20%)**:
  - 🟢 Proper error handling.
  - 🟢 Efficient data structures and algorithms.
  - 🟢 Avoidance of known anti-patterns.
- **Testing (10%)**:
  - 🔴 Implementation of unit tests.
  - 🔴 Test coverage for core functionalities.
    - _(Note: This criterion may be waived depending on the context.)_
- **Logical Code Organization (10%)**:
  - 🟢 Structuring of components, modules, or functions.
  - 🟢 Clear separation of concerns.
  - 🟢 Intuitive directory and file naming.
- **Bonus Points**:
  - Design-oriented enhancements such as:
    - 🟢 Animations.
    - 🟢 Visual cues or feedback mechanisms.
- **Optional Integration**:
  - If the developer wishes to incorporate state management:
    - 🟢 Use of Jotai, but open to other state management.

## Developer Notes

- Jotai is awesome this is my first time using it, and I will be suggesting it for smaller projects in the future. MOBX was an absolute pain to try to get working from scratch (you can see it in my commit history)
- I was clear to use the requirements type description even if the naming scheme was different than what github gives you
  - full_name vs fullName
  - stargazers_count vs stargazersCount
  - created_at vs createdAt
- ID (string) vs ID (number) mismatch: For quite a while I was getting errors regarding string vs numbers for IDs, and I was confused because I was using the same data structure as the example. I eventually realized that the example id and github id differ in type.

////////////////////////////////////////////

# React Native Engineer Challenge (2-5 hrs)

Thanks for trying our development challenge! Let's get started.

### The Challenge

We ask that you write a React Native application capable of the following:

- Search your favorite repositories from Github and select them from a dropdown
  - List item should have name, description, language, and stars visible
- Save them to the server by using the `reposerver` API
- App should have a list view where you are able to sort your favorites by stars (`stargazers_count`)
  - Up to 10 repositories may be saved for a user
  - Repositories should be removable or added
- If the app is refreshed, the saved repositories should populate the list so long as the server is running.

GitHub API (https://developer.github.com/v3/)

UX Requirements:

- Search input for Github repositories should be an autocomplete dropdown

**NOTE** Please treat this as an opportunity to show off, and let us see how you would write and visually present something that you'd be proud of! There is no one "correct" answer.

### The Server

**IMPORTANT**: The server is written to store repositories in memory; as such, should you restart/kill the Docker container you will lose your "database"!

#### A few endpoints

- `GET health` health check
- `GET repo` list all repositories
- `DELETE repo/[repoID]` delete a repo
- `POST repo` create a repository

_Please make sure to add a trailing forward slash (`/`) at the end of every point except for /health (e.g. `curl http://localhost:8080/repo/`)_

#### The Repository object

- id: 1 (string, required) - The unique identifier for a product
- fullName: ethereum/go-ethereum (string, required) - Name of the repository
- stargazersCount: 12 (number, required) - Number of stargazers
- language: ethereum/go-ethereum (string, required) - Programing language
- url: https://api.github.com/repos/ethereum/go-ethereum (string, required) - URL of the repository
- createdAt: 2013-12-26T13:05:46Z (string, required) - CreatedAt of repository

#### JSON

```json
{
  "id": "15452919",
  "fullName": "ethereum/go-ethereum",
  "createdAt": "2013-12-26T13:05:46Z",
  "stargazersCount": 26012,
  "language": "Go",
  "url": "https://api.github.com/repos/ethereum/go-ethereum"
}
```

## Using this app

### Prereqs

- Docker
- Ruby (built-in mac default, 2.6, should be sufficient)

### Setup

```
npm i
npm run ios:setup
```

### Start the API server

In a separate terminal:

```
npm run dev:server
```

```bash
2020/02/05 11:09:44 listening on port 8080
```

### Development

```
npm run ios
```

## Your Solution

Your code should build and run on a Mac (or GNU/Linux machine) running a recent OS.

Please push it to a fresh repository and submit a link to that repository.

Third-party libraries are permitted; however, as our intent is to come to understand your design choices, we ask for a short description of the rationale of your choices.

### Before submitting your code

**IMPORTANT**: To help keep code reviews anonymous, please be sure to remove any sensitive information about yourself from your deliverable.

**We expect you to make sure that your solution works with `reposerver` and the Github v3 API before sending it to us**.

### Acceptance Criteria

We expect you to write **code you would consider production-ready**. This can mean a variety of things, but most importantly we look for code to be well-factored, follow good practices, and be tested.

What we will look for:

- Does your code fulfill the requirement and successfully run against both `reposerver` and the Github v3 API?
- How clean is your design? How easy is it to understand, maintain, or extend your code?
- How did you verify your software, if by automated tests or by other means? How much application code is covered?
- How did you handle empty data states?
- What kind of documentation did you ship with your code?

### Housekeeping notes

- If you run into any issues building the GCR image, **please contact us immediately**
- Please feel free to make assumptions, but ensure to note what they were and how you adapted to them.

Good luck!
