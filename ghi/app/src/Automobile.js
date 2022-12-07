import { Link } from 'react-router-dom';
import React from 'react';


class ManufacturersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ManufacturersArray: [],
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/manufacturers/';

        try {
            const response = await fetch(url);
            if (response.ok) {
                // Get the list
                const data = await response.json();

                // Create a list of for all the requests and
                // add all of the requests to it
                const requests = [];
                for (let manufacturers of data.manufacturers) {
                    const detailUrl = `http://localhost:8100${manufacturers.href}`;
                    requests.push(fetch(detailUrl));
                }

                const responses = await Promise.all(requests);
                const ManufacturersArray = [];
                for (const ManufacturersResponse of responses) {
                    if (ManufacturersResponse.ok) {
                        const details = await ManufacturersResponse.json();
                        ManufacturersArray.push(details);
                    } else {
                        console.error(ManufacturersResponse);
                    }
                }

                this.setState({ ManufacturersArray: ManufacturersArray });
            }
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <div className="container">
                <h2>All The Manufacturers</h2>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-left">
                    <Link to="/manufacturers/new" className="btn btn-primary btn-lg px-4 gap-3">Add A Manufacturers</Link>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.ManufacturersArray.map((manu) => {
                                return (
                                    <tr key={manu.href}>
                                        <td>{manu.name}</td>
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

export default ManufacturersList;
