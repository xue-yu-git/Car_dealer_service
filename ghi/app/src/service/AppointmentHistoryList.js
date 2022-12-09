import { Link } from 'react-router-dom';
import React from 'react';


class AppointmentHistoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AppointmentHistoryArray: [],
            FilteredHis: [],
        };
        // this.handleSearch = this.handleSearch.bind(this);
        this.handleChangeVin = this.handleChangeVin.bind(this);
    }

    async componentDidMount() {
        const url = 'http://localhost:8080/api/appointments/';

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                this.setState({
                    AppointmentHistoryArray: data.appointments,
                });
            }
        } catch (e) {
            console.error(e);
        }
    }


    handleChangeVin(searchVIn) {
        const value_vin = searchVIn.target.value;

        const cars = this.state.AppointmentHistoryArray;
        const vin_app_array = [];
        for (let car of cars) {
            if (car.vin === value_vin) {
                vin_app_array.push(car);
            };
        }
        this.setState({
            FilteredHis: vin_app_array,
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
                        <span className="visually-hidden">Search appointment for a car</span>
                    </label>
                    <input
                        value={this.searchVIn}
                        onInput={this.handleChangeVin}
                        type="text"
                        id="header-search"
                        placeholder="Search appointment for a car"
                        name="s"
                    />
                    {/* <button type="submit">Search</button> */}

                </div>
                <div className="container">
                    <h2>All appointment records for a car</h2>
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>VIN</th>
                                    <th>Customer Name</th>
                                    <th>Date</th>
                                    <th>Technician</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.FilteredHis.map((appointment) => {
                                    return (
                                        <tr key={appointment.id}>
                                            <td>{appointment.vin}</td>
                                            <td>{appointment.name_customer}</td>
                                            <td>{appointment.date}</td>
                                            <td>{appointment.technician.name}</td>
                                            <td>{appointment.reason}</td>
                                            <td>{appointment.status}</td>
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

export default AppointmentHistoryList;
