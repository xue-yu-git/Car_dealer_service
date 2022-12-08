import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function withExtras(Component) {
    return (props) => (
        <Component {...props} params={useParams()} useNavigate={useNavigate()} />
    );
}

class ModelForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture_url: "",
            name: "",
            manufacturer_id: "",
            manufacturers: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangename = this.handleChangename.bind(this);
        this.handleChangePictureUrl = this.handleChangePictureUrl.bind(this);
        this.handleChangeManufacturer = this.handleChangeManufacturer.bind(this);
    }

    async componentDidMount() {
        const url = "http://localhost:8100/api/manufacturers/";

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ manufacturers: data.manufacturers });
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.manufacturers;
        const ModelUrl = "http://localhost:8100/api/models/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(ModelUrl, fetchConfig);

        if (response.ok) {
            let model_response = await response.json();

            this.setState({
                picture_url: "",
                name: "",
                manufacturer_id: "",
            });
            this.props.useNavigate(`/models/`);
        }
    }


    handleChangename(event) {
        const value = event.target.value;
        this.setState({ name: value });
    }

    handleChangePictureUrl(event) {
        const value = event.target.value;
        this.setState({ picture_url: value });
    }
    handleChangeManufacturer(event) {
        const value = event.target.value;
        this.setState({ manufacturer_id: value });
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Model</h1>
                        <form onSubmit={this.handleSubmit} id="create-model-form">
                            <div className="form-floating mb-3">
                                <input
                                    onChange={this.handleChangePictureUrl}

                                    value={this.state.picture_url}
                                    placeholder="Name"
                                    required
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control"
                                />
                                <label htmlFor="name">Picture Url</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    onChange={this.handleChangename}
                                    value={this.state.name}
                                    placeholder="name"
                                    required
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control"
                                />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="mb-3">
                                <select
                                    onChange={this.handleChangeManufacturer}
                                    value={this.state.manufacturer_id}
                                    required
                                    name="manufacturer"
                                    id="manufacturer"
                                    className="form-select"
                                >
                                    <option value="">Choose a Manufacturer</option>
                                    {this.state.manufacturers.map((manufacturer) => {
                                        return (
                                            <option key={manufacturer.id} value={manufacturer.id}>
                                                {manufacturer.name}
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

export default withExtras(ModelForm);
