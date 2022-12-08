import { Link } from 'react-router-dom';
import React from 'react';


class SalesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saleArray: [],
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/sales/';

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                this.setState({ saleArray: data.sales });
            }
        } catch (e) {

            console.error(e);
        }
    }

    render() {
        return (
            <div className="container">
                <h2>All The Sales</h2>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-left">
                    <Link to="new" className="btn btn-primary btn-lg px-4 gap-3">Add A sale</Link>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>VIN</th>
                                <th>Customer</th>
                                <th>Salesperson</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.saleArray.map((sale) => {
                                return (
                                    <tr key={sale.id}>
                                        <td>${sale.price}</td>
                                        <td>{sale.automobile.vin}</td>
                                        <td>{sale.customer.name}</td>
                                        <td>{sale.salesperson.name}</td>
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

export default SalesList;
