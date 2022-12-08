import { Link } from 'react-router-dom';
import React from 'react';


class CustomersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CustomerArray: [],
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/customers/';

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                this.setState({ CustomerArray: data.customers });
            }
        } catch (e) {

            console.error(e);
        }
    }

    render() {
        return (
            <div className="container">
                <h2>All The Customer</h2>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-left">
                    <Link to="new" className="btn btn-primary btn-lg px-4 gap-3">Add A Customer</Link>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>PN</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.CustomerArray.map((customer) => {
                                return (
                                    <tr key={customer.id}>
                                        <td>{customer.name}</td>
                                        <td>{customer.number}</td>
                                        <td>{customer.address}</td>
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

export default CustomersList;
