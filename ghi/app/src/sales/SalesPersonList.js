import { Link } from 'react-router-dom';
import React from 'react';


class SalesPersonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SalespersonArray: [],
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/salespersons/';

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                this.setState({ SalespersonArray: data.salespersons });
            }
        } catch (e) {

            console.error(e);
        }
    }

    render() {
        return (
            <div className="container">
                <h2>All The Salespeople</h2>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-left">
                    <Link to="new" className="btn btn-outline-success btn-lg btn-sm px-4 gap-3">Add A Salesperson</Link>
                    <Link to="history" className="btn btn-outline-success btn-lg btn-sm px-4 gap-3">See sales filtered by salesperson</Link>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>EMPLID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.SalespersonArray.map((salesperson) => {
                                return (
                                    <tr key={salesperson.emplid}>
                                        <td>{salesperson.name}</td>
                                        <td>{salesperson.emplid}</td>
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

export default SalesPersonList;
