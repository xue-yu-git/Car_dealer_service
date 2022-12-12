# CarCar

Team:

Service - Xue
Sales - Jeffery

## How to Run this Application:

    ■ docker volume create beta-data

    ■ docker-compose build

    ■ docker-compose up


## Application Diagram

[a relative link](diagram.png)

## Services

GHI: localhost:3000 (React Front End)
All the page navigations are included in the navbar. There are also extra navigation buttons in the list pages for convenience.

### Inventory microservice
○  The urls and ports

   Manufacturer:

    ■ The list of all manufacturers: http://localhost:3000/manufacturers
        - It has a table to show detailed information of all technicians.
        - It has an "Add a manufacturer" button that navigates to the form page to create a new manufacturer.

    ■ The form to add a new manufacturer: http://localhost:3000/manufacturers/new
        - Users can add a new manufacturer here. When clicking the "Create" button, it will navigate to the manufacturer list page, where the new manufacturer information will show up.

   Vehicle Model:

    ■ The list of all models: http://localhost:3000/models
        - It has a table to show detailed information of all models.
        - It has an "Add a model" button that navigates to the form page to create a new model.

    ■ The form to add a new model: http://localhost:3000/models/new
        - User can add a new model here. When clicking "Create" button, it will navigate to the model list page, where the new model information will show up.

   Automobile:

    ■ The list of all automobiles: http://localhost:3000/automobiles
        - It has a table to show detailed information of all automobiles.
        - It has an "Add an Automobile" button that navigates to the form page to create a new automobile.

    ■ The form to add a new automobile: http://localhost:3000/automobiles/new
        - User can add a new automobile here. When clicking the "Create" button, it will navigate to the automobile list page, where the new automobile information will show up.

### Service microservice
○  The urls and ports

    Appointment:

    ■ The list of all current appointments: http://localhost:3000/appointments
        - It has a table to show detailed information about all current appointments, with a cancel and a finished button at the end of each row.
        - If a car is bought from here, "VIP" will be shown in the VIP column.
        - Clicking a cancel button will change the appointment status to "canceled". The record will disappear immediately on the page.
        - Clicking a finished button will change the appointment status to "finished". The record will disappear immediately on the page.
        - The page has an "Add an Appointment" button that navigates to the form page to create a new appointment.
        - The page has a "Check Appointment Records for a Car" button that navigates to the form page to create a new appointment.

    ■ The form to create a new appointment: http://localhost:3000/appointments/new
        - User can create a new appointment here. When clicking the "Create" button, it will navigate to the list page, where the new appointment information will show up.

    ■ The list of appointment records for a specific car: http://localhost:3000/appointments/history
        - It has a search bar at the top. Put in the VIN of a car, all the appointment records for this car will show up in the table below.

   Technician:

    ■ The list of all technicians: http://localhost:3000/technicians
        - It has a table to show detailed information of all technicians.
        - It has an "Add a technician" button that navigates to the form page to create a new technician.

    ■ The form to add a new technician: http://localhost:3000/technicians/new
        - User can add a new technician here. When clicking "Create" button, it will navigate to the technician list page, where the new technician information will show up.

○  API Documentation (CRUD routes)
   Appointment:

    Note: All appointment records are saved for checking history. There is no "DELETE" feature for appointment.

    ■ GET the list of appointments: http://localhost:8080/api/appointments/

    ■ POST a new appointment: http://localhost:8080/api/appointments/
        example:
        {
            "name_customer": "Mary",
            "vin":"1C3CC5FB2A20176",
            "date": "2022-12-14",
            "technician_id":1,
            "reason": "repair window",
            "status": "submitted",
            "sold_here": false
        }

    ■ GET the detail of an appointment, e.g. appointment with href "/api/appointment/1/": http://localhost:8080/api/appointment/1/

    ■ PUT part of the information of an appointment: http://localhost:8080/api/appointment/1/
        example:
        {
            "date": "2022-12-14",
            "technician_id":1,
        }
   Technician:

    ■ GET the list of technicians: http://localhost:8080/api/technicians/

    ■ POST a new technician: http://localhost:8080/api/technicians/
    example:
        {
            "name":"Jerry",
            "employee_num":"2"
        }


### Sales microservice




## API Documentation

Document the endpoints of your API for each of the methods you implement (GET, POST, etc..)
Provide sample success responses and sample request body data for the post requests.

You could theoretically screenshot insomnia.
