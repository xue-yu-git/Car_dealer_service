import { Link } from 'react-router-dom';
import React from 'react';


class SalesHistoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SaleHistoryArray: [],
            FilteredHis: [],
        };
        this.handleChangeVin = this.handleChangeVin.bind(this);
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/sales/';

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                this.setState({
                    SaleHistoryArray: data.sales,
                });
            }
        } catch (e) {
            console.error(e);
        }
    }


    handleChangeVin(searchName) {
        const name_input = searchName.target.value;
        console.log(name_input)

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
                    <h1></h1>
                </div>
                <div className="row">

                    <label htmlFor="header-search">
                        <span className="visually-hidden">Search sale history</span>
                    </label>
                    <input
                        value={this.searchVIn}
                        onInput={this.handleChangeVin}
                        type="text"
                        id="header-search"
                        placeholder="Search Sale history"
                        name="s"
                    />

                </div>
                <div className="container">
                    <h2>Sale history</h2>
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Salesperson</th>
                                    <th>VIN</th>
                                    <th>Customer Name</th>
                                    <th>Price</th>

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
