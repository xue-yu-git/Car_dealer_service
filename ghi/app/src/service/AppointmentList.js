import { Link } from 'react-router-dom';
import React from 'react';


class AppointmentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AppointmentArray: [],
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
    }

    async componentDidMount() {
        const url = 'http://localhost:8080/api/appointments/';
        const soldcarurl = `http://localhost:8080/api/soldcars/`;
        try {
            const response = await fetch(url);
            const soldcarresponse = await fetch(soldcarurl);
            if (response.ok) {
                const data = await response.json();
                const soldcar = await soldcarresponse.json();

                const appointmentsarray = data.appointments;
                const appointments = appointmentsarray.filter(appoint => appoint.status === "submitted");

                const soldcararray = soldcar.soldcars;
                // get all the vins of the soldcars in an array
                let soldvin = [];
                for (let car of soldcararray) {
                    soldvin.push(car.vin)
                }
                for (let app of appointments) {
                    console.log(app.vin)
                    if (soldvin.includes(app.vin)) {
                        app["vip"] = "VIP"
                    } else {
                        app["vip"] = ""
                    }
                }
                this.setState({ AppointmentArray: appointments });
            }
        } catch (e) {
            console.error(e);
        }
    }

    async handleCancel(appointment, event) {
        event.preventDefault();
        const data = { "status": "canceled" };
        const url = `http://localhost:8080${appointment.href}`;

        const fetchConfig = {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const putResponse = await fetch(url, fetchConfig)
        if (putResponse.ok) {
            this.componentDidMount()
        }
    }
    async handleFinish(appointment, event) {
        event.preventDefault();
        const data = { "status": "finished" };
        const url = `http://localhost:8080${appointment.href}`;

        const fetchConfig = {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const putResponse = await fetch(url, fetchConfig)
        if (putResponse.ok) {
            this.componentDidMount()
        }
    }

    render() {
        return (
            <div className="container">
                <h2>All The Appointments</h2>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-left">
                    <Link to="/appointments/new" className="btn btn-primary btn-lg px-4 gap-3">Add An Appointment</Link>
                </div>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-left">
                    <Link to="/appointments/history" className="btn btn-primary btn-lg px-4 gap-3">Check Appointment History for a Car</Link>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Vin</th>
                                <th>Customer Name</th>
                                <th>Date</th>
                                <th>Technician</th>
                                <th>Reason</th>
                                <th>VIP</th>
                                <th>status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.AppointmentArray.map((appointment) => {
                                return (
                                    <tr key={appointment.id}>
                                        <td>{appointment.vin}</td>
                                        <td>{appointment.name_customer}</td>
                                        <td>{appointment.date}</td>
                                        <td>{appointment.technician.name}</td>
                                        <td>{appointment.reason}</td>
                                        <td>{appointment.vip}</td>
                                        <td>
                                            <button onClick={this.handleCancel.bind(this, appointment)}>Cancel</button>
                                            <button onClick={this.handleFinish.bind(this, appointment)}>Finished</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default AppointmentList;
