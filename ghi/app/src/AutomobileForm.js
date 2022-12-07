import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function withExtras(Component) {
    return (props) => (
        <Component {...props} params={useParams()} useNavigate={useNavigate()} />
    );
}

class AutomobileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: "",
            vin: "",
            color: "",
            model: "",
            models: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleChangeVIN = this.handleChangeVIN.bind(this);
        this.handleChangeModel = this.handleChangeModel.bind(this);
    }

    async componentDidMount() {
        const url = "http://localhost:8100/api/models/";

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ models: data.models });
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.models;

        const AutomobileUrl = "http://localhost:8090/api/automobiles/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(AutomobileUrl, fetchConfig);

        if (response.ok) {
            let automobile_response = await response.json();

            this.setState({
                year: "",
                vin: "",
                color: "",
                model: "",
            });
            this.props.useNavigate(`/automobiles/`);
        }
    }


    handleChangeColor(event) {
        const value = event.target.value;
        this.setState({ color: value });
    }

    handleChangeYear(event) {
        const value = event.target.value;
        this.setState({ year: value });
    }

    handleChangeVIN(event) {
        const value = event.target.value;
        this.setState({ vin: value });
    }
    handleChangeModel(event) {
        const value = event.target.value;
        this.setState({ model: value });
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Automobile</h1>
                        <form onSubmit={this.handleSubmit} id="create-automobile-form">
                            <div className="form-floating mb-3">
                                <input
                                    onChange={this.handleChangeYear}
                                    value={this.state.year}
                                    placeholder="Name"
                                    required
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control"
                                />
                                <label htmlFor="name">Year</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    onChange={this.handleChangeVIN}
                                    value={this.state.vin}
                                    placeholder="VIN"
                                    required
                                    type="text"
                                    name="vin"
                                    id="vin"
                                    className="form-control"
                                />
                                <label htmlFor="vin">VIN</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    onChange={this.handleChangeColor}
                                    value={this.state.color}
                                    placeholder="Color"
                                    required
                                    type="text"
                                    name="color"
                                    id="color"
                                    className="form-control"
                                />
                                <label htmlFor="color">Color</label>
                            </div>
                            <div className="mb-3">
                                <select
                                    onChange={this.handleChangeModel}
                                    value={this.state.model}
                                    required
                                    name="model"
                                    id="model"
                                    className="form-select"
                                >
                                    <option value="">Choose a manufacturer</option>
                                    {this.state.models.map((model) => {
                                        return (
                                            <option key={model.id} value={model.id}>
                                                {model.name}
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

export default withExtras(AutomobileForm);
