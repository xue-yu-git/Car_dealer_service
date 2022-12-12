import { Link } from 'react-router-dom';
import React from 'react';


class SalesHistoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            salespersons: [],
            SaleHistoryArray: [],
            FilteredHis: [],
        };
        this.handleChangeName = this.handleChangeName.bind(this);
    }

    async componentDidMount() {
        const soldUrl = 'http://localhost:8090/api/sales/';
        const salespersonUrl = 'http://localhost:8090/api/salespersons/'

        try {
            const soldResponse = await fetch(soldUrl);
            const salesPersonResponse = await fetch(salespersonUrl);
            if (soldResponse.ok) {
                const soldData = await soldResponse.json();
                const salesPersonData = await salesPersonResponse.json();
                this.setState({ SaleHistoryArray: soldData.sales, });
                this.setState({ salespersons: salesPersonData.salespersons, });
            }
        } catch (e) {
            console.error(e);
        }
    }


    handleChangeName(searchName) {
        const name_input = searchName.target.value;
        const sales = this.state.SaleHistoryArray;
        const name_sale_array = [];
        for (let sale of sales) {
            if (sale.salesperson.name === name_input) {
                name_sale_array.push(sale);
            };
        }
        this.setState({
            FilteredHis: name_sale_array,
        });
    }


    render() {
        return (
            <div>
                <div>
                    <h1>Sale history</h1>
                </div>
                <div className="row">
                    <select value={this.searchName} onChange={this.handleChangeName} id="header-search" placeholder="Search Sale history" name="s" className="form-select">
                        <option value="">Choose a Salesperson</option>
                        {this.state.salespersons.map((salesperson) => {
                            return (
                                <option key={salesperson.id} value={salesperson.name}>
                                    {salesperson.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="container">
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Salesperson</th>
                                    <th>VIN</th>
                                    <th>Customer Name</th>
                                    <th>Price</th>
                                    <th>Commission</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.state.FilteredHis.map((sale) => {
                                    return (
                                        <tr key={sale.id}>
                                            <td>{sale.salesperson.name}</td>
                                            <td>{sale.automobile.vin}</td>
                                            <td>{sale.customer.name}</td>
                                            <td>${sale.price}</td>
                                            <td>${sale.price * .01}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

}

export default SalesHistoryList;
