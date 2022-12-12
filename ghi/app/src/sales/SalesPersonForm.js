import React from 'react';
import { useNavigate } from "react-router-dom";

function withExtras(Component) {
    return (props) => (
        <Component {...props} useNavigate={useNavigate()} />
    );
}

class SalespersonForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            emplid: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmplidChange = this.handleEmplidChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };

        const salespersonUrl = 'http://localhost:8090/api/salespersons/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(salespersonUrl, fetchConfig);
        if (response.ok) {
            const salespersonResponse = await response.json();
            console.log(salespersonResponse);

            const cleared = {
                name: '',
                emplid: '',
            };
            this.setState(cleared);
            this.props.useNavigate(`/salespersons`);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }
    handleEmplidChange(event) {
        const value = event.target.value;
        this.setState({ emplid: value })
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Salesperson</h1>
                        <form onSubmit={this.handleSubmit} id="create-location-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label>Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.emplid} onChange={this.handleEmplidChange} placeholder="Emplid" required type="text" name="emplid" id="emplid" className="form-control" />
                                <label>Emplid</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withExtras(SalespersonForm);
