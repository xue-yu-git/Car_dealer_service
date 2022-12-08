import React from 'react';

class AppointmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employee_num: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeenumChange = this.handleEmployeenumChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };

        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(technicianUrl, fetchConfig);
        if (response.ok) {
            const response = await response.json();
            console.log(response);

            const cleared = {
                name: '',
                employee_num: '',
            };
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }
    handleEmployeenumChange(event) {
        const value = event.target.value;
        this.setState({ employee_num: value })
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Technician</h1>
                        <form onSubmit={this.handleSubmit} id="create-location-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.employee_num} onChange={this.handleEmployeenumChange} placeholder="Employee Number" required type="text" name="employee_num" id="employee_num" className="form-control" />
                                <label htmlFor="employee_num">Employee Number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppointmentForm;
