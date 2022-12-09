import { Link } from 'react-router-dom';
import React from 'react';


class ModelsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ModelsArray: [],
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/models/';

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();

                const requests = [];
                for (let models of data.models) {
                    const detailUrl = `http://localhost:8100${models.href}`;
                    requests.push(fetch(detailUrl));
                }

                const responses = await Promise.all(requests);
                const ModelsArray = [];
                for (const ModelsResponse of responses) {
                    if (ModelsResponse.ok) {
                        const details = await ModelsResponse.json();
                        ModelsArray.push(details);
                    } else {
                        console.error(ModelsResponse);
                    }
                }

                this.setState({ ModelsArray: ModelsArray });
            }
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <div className="container">
                <h2>All The Models</h2>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-left">
                    <Link to="/models/new" className="btn btn-outline-success btn-lg btn-sm px-4 gap-3">Add A Model</Link>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Manufacturer</th>
                                <th>Picture</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.ModelsArray.map((model) => {
                                return (
                                    <tr key={model.href}>
                                        <td>{model.name}</td>
                                        <td>{model.manufacturer.name}</td>
                                        <td><img src={model.picture_url} alt={model.name} style={{ maxHeight: "200px", maxWidth: "200px" }} /></td>

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

export default ModelsList;
