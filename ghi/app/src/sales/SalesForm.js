import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function withExtras(Component) {
    return (props) => (
        <Component {...props} params={useParams()} useNavigate={useNavigate()} />
    );
}

class SaleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: "",
            customer_id: "",
            customers: [],
            salesperson_id: "",
            salespersons: [],
            automobile_id: '',
            automobiles: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleChangeCustomer = this.handleChangeCustomer.bind(this);
        this.handleChangeSalesperson = this.handleChangeSalesperson.bind(this);
        this.handleChangeAutomobile = this.handleChangeAutomobile.bind(this);

    }

    async componentDidMount() {
        const customerUrl = "http://localhost:8090/api/customers/";
        const salespersonUrl = "http://localhost:8090/api/salespersons/";
        const automobileUrl = "http://localhost:8100/api/automobiles/";

        const customerResponse = await fetch(customerUrl);
        const salespersonResponse = await fetch(salespersonUrl);
        const automobileResponse = await fetch(automobileUrl);

        if (customerResponse.ok && salespersonResponse.ok && automobileResponse.ok) {
            const customerData = await customerResponse.json();
            const salespersonData = await salespersonResponse.json();
            const automobileData = await automobileResponse.json();

            this.setState({ customers: customerData.customers });
            this.setState({ salespersons: salespersonData.salespersons });
            this.setState({ automobiles: automobileData.autos });
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.customers;
        delete data.salespersons
        delete data.automobiles

        const saleUrl = "http://localhost:8090/api/sales/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const salePostResponse = await fetch(saleUrl, fetchConfig);

        if (salePostResponse.ok) {

            let sale_response = await salePostResponse.json();
            let vin = sale_response.automobile.vin

            const deleteURL = `http://localhost:8100/api/automobiles/${vin}`;
            const fetchConfig = { method: "delete", };
            const inventoryDeleteResponse = await fetch(deleteURL, fetchConfig);

            if (inventoryDeleteResponse.ok) {

                this.setState({
                    price: "",
                    customer_id: "",
                    salesperson_id: "",
                    automobile_id: "",
                });
                this.props.useNavigate(`/sales/`);
            }


        }
    }


    handleChangePrice(event) {
        const value = event.target.value;
        this.setState({ price: value });
    }
    handleChangeCustomer(event) {
        const value = event.target.value;
        this.setState({ customer_id: value });
    }
    handleChangeSalesperson(event) {
        const value = event.target.value;
        this.setState({ salesperson_id: value });
    }
    handleChangeAutomobile(event) {
        const value = event.target.value;
        this.setState({ automobile_id: value });
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Sale</h1>
                        <form onSubmit={this.handleSubmit} id="create-sale-form">
                            <div className="form-floating mb-3">
                                <input
                                    onChange={this.handleChangePrice}
                                    value={this.state.price}
                                    placeholder="Number"
                                    required
                                    type="number"
                                    name="number"
                                    id="number"
                                    className="form-control"
                                />
                                <label>Price</label>
                            </div>
                            <div className="mb-3">
                                <select
                                    onChange={this.handleChangeCustomer}
                                    value={this.state.customer_id}
                                    required
                                    name="customer"
                                    id="customer"
                                    className="form-select"
                                >
                                    <option value="">Choose a customer</option>
                                    {this.state.customers.map((customer) => {
                                        return (
                                            <option key={customer.id} value={customer.id}>
                                                {customer.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select
                                    onChange={this.handleChangeSalesperson}
                                    value={this.state.salesperson_id}
                                    required
                                    name="customer"
                                    id="customer"
                                    className="form-select"
                                >
                                    <option value="">Choose a salesperson</option>
                                    {this.state.salespersons.map((salesperson) => {
                                        return (
                                            <option key={salesperson.id} value={salesperson.id}>
                                                {salesperson.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select
                                    onChange={this.handleChangeAutomobile}
                                    value={this.state.automobile_id}
                                    required
                                    name="customer"
                                    id="customer"
                                    className="form-select"
                                >
                                    <option value="">Choose a Automobile</option>
                                    {this.state.automobiles.map((automobile) => {
                                        return (
                                            <option key={automobile.id} value={automobile.id}>
                                                {automobile.vin}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withExtras(SaleForm);
