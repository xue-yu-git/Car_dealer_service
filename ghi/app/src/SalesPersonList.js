// import { Link } from 'react-router-dom';
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
                <h2>All The Salesperson</h2>
                {/* <div className="d-grid gap-2 d-sm-flex justify-content-sm-left">
                    <Link to="/manufacturers/new" className="btn btn-primary btn-lg px-4 gap-3">Add A Salesperson</Link>
                </div> */}
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.SalespersonArray.map((salesperson) => {
                                return (
                                    <tr key={salesperson.name}>
                                        <td>{salesperson.name}</td>
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
