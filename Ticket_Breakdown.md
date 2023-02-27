# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

#### Overview

I would break down this task into 3 tickets:

* (Assuming there is already a UpdateAgentsAsFacility endpoint) Add externalId to endpoint and dataModel, Adding Coloumn to database and create migration/update migration tools.
- Add `externalId` to the UI Form That handles Updating Agents. 

- Show `externalId` on Agent Details Screen.

- Modify `getShiftsByFacility` endpoint to return `externalId` as a part of the results.

- Modify `generateReport` to show the `externalId` if provided.

I am also making an assumption that if the `externalId` is not update for an agent that the internal id should still be used. The ticket didn't not mention it as a required fields and we would have to consider so data migration action if it was. 

#### Breakdown of tickets

##### Add `externalId` To Agents Table And Update `UpdateAgentAsFacility` Endpoint

Assumptions: 

* There is already an endpoint that Facility members call to update agent's details related to the facility. 

* The team uses some migration tool like EF Core Migrations to automate updating the database in production.

Implementation Details:

* Add `externalId` to the Agent table by adding a migration.

* `externalId` should be a nullable string. 

* Add validation to ensure `externalId` is unique for that agent for that Facility. 

* Add `externalId` to the `Agent`  ORM model. 

* Add `externalId` to the `UpdateAgentAsFacility` endpoint model. 

Time / Effort Estimate:  3 Hours . The direct effort may take around 1 hour, but time is given for possible issue and testing to ensure the endpoint still works correctly.

Acceptance criteria: 

* Must be able to store `externalId` directly to the database.

* `UpdateAgentAsFacility` endpoint must accept `externalId` as an optional property.

* Setting `externalId` on `UpdateAgentAsFacility` should update the database. 

* Not setting `externalId`  on `UpdateAgentAsFacility` should not cause an error.

##### Accept `externalId` on Agent Update Form

Assumptions: 

* There is an Agent Update Form

* The design of the new screen has already been done and passed to the developer 

Implementation Details:

* Add Textbox UI Widget to Screen

* Modify client could calling `UpdateAgentAsFacility` to supply `externalId` if provided.

* Update UI test related to screen.

Time / Effort Estimate: 5 Hours. Modifying UI Elements can be challenge especially to get it just right, so I would allot 2 hour for that. Update test can be even more challenging so I would allot 3 hour for that too. 

##### Show `externalId` on Agent Details Screen

Assumptions: 

* There is an Agent Details Screen

* It calls an `GetAgentDetails` endpoint.

Implementation Details:

* Add `externalId` to the `GetAgentDetails` endpoint model.

* Update query for `GetAgentDetails` to return `externalId`.

* Add `externalId` to the Agent Details Screen

* Update UI test related to the screen.

Time / Effort Estimate: 6 Hours. 2 hours for the UI work. 2 hour to add and test the `GetAgentDetails` endpoint. 2 hours for the UI test.

##### Modify `getShiftsByFacility` endpoint to return `externalId` as a part of the results.

Implementation Details:

* Add `externalId` to the `getShiftsByFacility` response model.
* Update query for `getShiftsByFacility` to return `externalId`. 

Time / Effort Estimate: 2 Hours. This is to add and test the `getShiftsByFacility` endpoint. 

##### Modify `generateReport` to show the `externalId` if provided.

Implementation Details: 

* Update query for `generateReport` to return `externalId`.

* Update PDF report to show `externalId` if supplied. 

Time / Error Estimate: 4 Hours. I am allot 1 hour to updating and testing the endpoint and I am assuming that updating the PDF layout is at least as challenging than as updating a web component because the feedback loop would be longer.  