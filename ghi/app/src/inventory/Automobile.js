import React from 'react';
import { Link } from 'react-router-dom';

class AutomobileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AutomobileArray: [],
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/automobiles/';

        try {
            const response = await fetch(url);
            if (response.ok) {
                // Get the list
                const data = await response.json();

                // Create a list of for all the requests and
                // add all of the requests to it
                const requests = [];
                for (let automobile of data.autos) {
                    const detailUrl = `http://localhost:8100${automobile.href}`;
                    requests.push(fetch(detailUrl));
                }

                const responses = await Promise.all(requests);
                const AutomobileArray = [];
                for (const AutomobileResponse of responses) {
                    if (AutomobileResponse.ok) {
                        const details = await AutomobileResponse.json();
                        AutomobileArray.push(details);
                    } else {
                        console.error(AutomobileResponse);
                    }
                }

                this.setState({ AutomobileArray: AutomobileArray });
            }
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <div className="container">
                <h2>All The Automobile</h2>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-left">
                    <Link to="new" className="btn btn-primary btn-lg px-4 gap-3">Add A Automobile</Link>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Color</th>
                                <th>Year</th>
                                <th>Model</th>
                                <th>Manufacturer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.AutomobileArray.map((auto) => {
                                return (
                                    <tr key={auto.href}>
                                        <td>{auto.vin}</td>
                                        <td>{auto.color}</td>
                                        <td>{auto.year}</td>
                                        <td>{auto.model.name}</td>
                                        <td>{auto.model.manufacturer.name}</td>
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

export default AutomobileList;
