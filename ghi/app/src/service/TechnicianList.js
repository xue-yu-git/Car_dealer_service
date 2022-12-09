import { Link } from 'react-router-dom';
import React from 'react';


class TechnicianList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TechniciansArray: [],
        };
    }

    async componentDidMount() {
        const tech_url = 'http://localhost:8080/api/technicians/';
        try {
            const response = await fetch(tech_url);

            if (response.ok) {
                const data = await response.json();
                this.setState({ TechniciansArray: data.technician });
            }
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <div className="container">
                <h2>All The Technicians</h2>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-left">
                    <Link to="/technicians/new" className="btn btn-outline-success btn-lg btn-sm px-4 gap-3">Add A Technician</Link>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Employee Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.TechniciansArray.map((tech) => {
                                return (
                                    <tr key={tech.href}>
                                        <td>{tech.name}</td>
                                        <td>{tech.employee_num}</td>
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

export default TechnicianList;
