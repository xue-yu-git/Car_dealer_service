# CarCar

Team:

Service - Xue
Sales - Jeffery

## How to Run this Application:

    ■ docker volume create beta-data

    ■ docker-compose build

    ■ docker-compose up


## Application Diagram

Put image or link to application diagram here. Identify your VOs here in the diagram.


## Services

This can either be a separate section with the services, their URLs, and ports listed here or you can include it in the application diagram
GHI: localhost:3000 (React Front End)

### Inventory microservice
○  The urls and ports

○  API Documentation (CRUD routes)

### Service microservice
○  The urls and ports

    ■ The list of all current apppointments: http://localhost:3000/appointments
        - It has a table to show detailed information about all current appointments, with a cancel and a finished button at the end of each row.
        - If a car is bought from here, "VIP" will be shown in the VIP column.
        - Clicking a cancel button will change the appointment status to "canceled". The record will disappear immediately on the page.
        - Clicking a finished button will change the appointment status to "finished". The record will disappear immediately on the page.
        - The page has an "Add an Appointment" button that navigates to the form page to create a new appointment.
        - The page has an "Check Appointment Records for a Car" button that navigates to the form page to create a new appointment.

    ■ The form to create a new apppointment: http://localhost:3000/appointments/new
        User can create a new apppointment here. When clicking "Create" button, it will navigate to the list page, where the new appointment information will be saved and show up.

    ■ The list of appointment records for a specific car: http://localhost:3000/appointments/history
        - It has a search bar at top. Put in the VIN of a car, all the appointment records for this car will show up at the table below.

○  API Documentation (CRUD routes)
Appointment:
    Note: All apppointment records are saved for checking history. There is no "DELETE" feature for appointment.

    ■ GET the list of apppointments: http://localhost:8080/api/appointments/

    ■ POST a new apppointment: http://localhost:8080/api/appointments/
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

    ■ GET the detail of an apppointment, e.g. apppointment with href "/api/appointment/1/": http://localhost:8080/api/appointment/1/

    ■ PUT part of the information of an apppointment: http://localhost:8080/api/appointment/1/
        example:
        {
            "date": "2022-12-14",
            "technician_id":1,
        }
Technician:

    ■ GET the list of technicians: http://localhost:8080/api/technicians/

    ■ POST a newtechnician: http://localhost:8080/api/technicians/
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
