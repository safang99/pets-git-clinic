There are so many good pets out in the world, and we want to be able to see them all (and bring them all home)! Let's build a site where we can view pets that are up for adoption, and those people who have applied to adopt each pet.

## Introduction

You'll be building a website that helps us categorize our pets by species, view and add new pets for adoption, and keep track of who has applied for adoption of a particular pet!

This challenge is primarily focused on various aspects of Objection and Express backends, and the end result will be a full-fledged, database-backed web application with associated tables!

### Getting Started

When tackling any sizable body of work, it's important to break down that work into manageable chunks. To guide your progress, we've split out the work into three parts, with each part focusing on a different aspect of database associations and API endpoints.

Be sure to review the lessons on the relevant topics before diving into the work itself, and reference them as you go along.

To get started, run:

```no-highlight
et get pet-adoption-with-objection
cd pet-adoption-with-objection
createdb pet_adoptions_development
yarn install
yarn run dev
```

Your React frontend has been provided for you, and should not need to be updated.

### A Guide to Each Day

To start each day, read through all of the core user stories and instructions for that day to learn about what the app should do (both through the user experience, and behind the scenes).

For each user story, you will want to think about how to design and set up the schema for the app. You will need to plan out what tables you need, and what columns each one should have. Use a tool like [draw.io](https://www.draw.io/) to create/update an ER diagram for your schema.

When your ER diagram is finished for the day, create the migrations required to set up your database. Create a related model for each table you add to your database, and then build out the required API endpoint for your React frontend to interact with.

## Core User Stories

Each section contains user stories, acceptance criteria, and implementation details, with further instructions at the bottom of the section.

### Day One

#### Viewing Species

```no-highlight
As an employee at an adoption agency
I want to view a list of all species we have up for adoption
So that I can begin to track each of the available pets
```

**Acceptance Criteria**

- On the species index page at `/species`, I should see the name of each species.
- Each of the species should be retrieved from the database.

**Implementation Details**

- Create a migration for the "species" table. Each species should have a required name.
  - Remember to run your migration!
- Create a `Species` model with the necessary validations.
  - Once you've migrated and created your model, seed some species using either the Objection console or a seeder.
- Create an API endpoint at "/api/v1/species" which lists all of the species from your database.

**Hint: Note that "species" is the same word, whether it's singular or plural. As such, keep that in mind when creating both singular and plural names: e.g., both your table and your model will be called "Species" with an `s`!

#### Viewing Pets

```no-highlight
As a potential pet adopter
I want to view the pets of a particular species
So that I can see what pets are looking for a home
```

**Acceptance Criteria**

- On the species index page, the name of each species should be a link to the species' show page.
- On the show page, I should see the name of the species, as well as a list of all of the pets of that species up for adoption.

**Implementation Details**

- Create a migration for "pets". Each pet should have a required name (string),  required "available" status (boolean), optional weight (integer), optional estimated age (integer), and `speciesId` to connect it to its associated species.
  - Remember to run your migration!
- Create a `Pet` model with the necessary validations.
- Add the necessary `relationMappings` to your `Species` and `Pet` models to set up your associations.
  - Once you've migrated and finished up your models, seed some pets using either the Objection console or a seeder.
- Create an API endpoint at "/api/v1/species/:id" which lists the species information, including all related pets, from your database.

### Day Two

#### Adding Pets

```no-highlight
As an employee at an adoption agency
I want to be able to add a pet to the list of available pets
So that I can track the new pets that come in
```

**Acceptance Criteria**

- On the species show page at "/species/:id", I should see the name of the species, as well as a list of all of the pets of that species up for adoption.
- For each pet, I should see all provided details on the page.
- If I submit the form with the required information, the new pet is added to my page and the form is cleared.
- If I submit the form without required information, I see helpful error messages on my page.

**Implementation Details**

- Create a POST API endpoint at "/api/v1/species/:id/pets". Be sure to nest and namespace your API routers appropriately!
- This API endpoint should take the form data and create a new pet which is associated with the proper species.
- The API endpoint should also handle validation errors appropriately, to send error messages to the frontend for display.

#### Seeing Adoption Applicants

```no-highlight
As an employee at an adoption agency
I want to see who has applied to adopt a pet
So I can start to find them a forever home
```

**Acceptance Criteria**

- On the species show page, the name of each pet should be a link to the pet's show page.
- On the pet show page at "/pets/:id", I should see all of the details for the pet, and a list of the first and last name of the applicants who would like to adopt this pet.

**Implementation Details**

- Create a migration for "applicants". Each applicant should have a required string of first name and last name.
- Create a migration for an "applications" join table as well, to join the applicant with a particular pet.
  - Remember to run your migrations!
- Create an `Applicant` and `Application` model with the necessary validations.
- Add the necessary `relationMappings` to any necessary models to set up your many-to-many associations.
  - Once you've migrated and finished up your models, seed some applicants and applications using either the Objection console or a seeder.
- Create an API endpoint at "/api/v1/pets/:id" which lists the pet's information, including all related applicants, from your database.

### Day Three

#### Cleaning Up Your API Endpoints

```no-highlight
As a software developer
I want to implement serializers for my API endpoints
So that I can organize and speed up my backend code
```

**Implementation Details**

- Update your "/api/v1/species/:id" endpoint to use a `SpeciesSerializer` with a `showDetails` method.
- Only the attributes of `id` and `name` should be allowed for each species - timestamps should be disallowed.
- The related `pets` should be nested under the species via this serializer as well.
- Similarly, your "/api/v1/pets/:id" endpoint should use a `PetSerializer` `showDetails` method to disallow timestamps and nest related applicants.