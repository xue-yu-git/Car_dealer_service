import React from 'react';
import { useNavigate } from "react-router-dom";

function withExtras(Component) {
    return (props) => (
        <Component {...props} useNavigate={useNavigate()} />
    );
}


class AppointmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vin: '',
            name_customer: '',
            date: '',
            time: '',
            technician_id: '',
            technicians: [],
            reason: '',
            status: "submitted",
            sold_here: false,
        };
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const technicianUrl = 'http://localhost:8080/api/technicians/';

        const response = await fetch(technicianUrl);

        if (response.ok) {
            const data = await response.json();
            this.setState({ technicians: data.technician });
        }
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.technicians;
        const appUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(appUrl, fetchConfig);
        if (response.ok) {
            // const response = await promises.all.response.json();

            const cleared = {
                vin: '',
                name_customer: '',
                date: '',
                time: '',
                technician_id: '',
                reason: '',
            };
            this.setState(cleared);
            this.props.useNavigate(`/appointments`);
        }
    }

    handleVinChange(event) {
        const value = event.target.value;
        this.setState({ vin: value })
    }
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name_customer: value })
    }
    handleDateChange(event) {
        const value = event.target.value;
        this.setState({ date: value })
    }
    handleTimeChange(event) {
        const value = event.target.value;
        value = value + ":ss"
        this.setState({ time: value })
    }
    handleTechnicianChange(event) {
        const value = event.target.value;
        this.setState({ technician_id: parseInt(value) })
    }
    handleReasonChange(event) {
        const value = event.target.value;
        this.setState({ reason: value })
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Appointment</h1>
                        <form onSubmit={this.handleSubmit} id="create-location-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.vin} onChange={this.handleVinChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="vin">VIN</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.name_customer} onChange={this.handleNameChange} placeholder="Customer Name" required type="text" name="name_customer" id="name_customer" className="form-control" />
                                <label htmlFor="name_customer">Customer Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.date} onChange={this.handleDateChange} placeholder="yyyy-mm-dd" required type="text" name="date" id="date" className="form-control" />
                                <label htmlFor="date">Date(yyyy-mm-dd)</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.time} onChange={this.handleTimeChange} placeholder="hh:mm" required type="text" name="time" id="time" className="form-control" />
                                <label htmlFor="time">Time(hh:mm)</label>
                            </div>
                            <div className="mb-3">
                                <select value={this.state.technician_id} onChange={this.handleTechnicianChange} id="technician" className="form-select"  >
                                    <option value="" >Choose a technician</option>
                                    {this.state.technicians.map(technician => {
                                        return (
                                            <option key={technician.id} value={technician.id}>{technician.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.reason} onChange={this.handleReasonChange} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
                                <label htmlFor="reason">Reason</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withExtras(AppointmentForm);
