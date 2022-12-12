import React from 'react';
import { useNavigate } from "react-router-dom";

function withExtras(Component) {
    return (props) => (
        <Component {...props} useNavigate={useNavigate()} />
    );
}

class CustomersForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            number: '',
            address: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };

        const customerUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            const customerResponse = await response.json();
            console.log(customerResponse);

            const cleared = {
                name: '',
                number: '',
                address: '',
            };
            this.setState(cleared);
            this.props.useNavigate(`/customers`);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }
    handleNumberChange(event) {
        const value = event.target.value;
        this.setState({ number: value })
    }
    handleAddressChange(event) {
        const value = event.target.value;
        this.setState({ address: value })
    }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Customer</h1>
                        <form onSubmit={this.handleSubmit} id="create-location-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label>Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.emplid} onChange={this.handleNumberChange} placeholder="Number" required type="text" name="number" id="number" className="form-control" />
                                <label>Phone Number</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.emplid} onChange={this.handleAddressChange} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                                <label>Address</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withExtras(CustomersForm);
