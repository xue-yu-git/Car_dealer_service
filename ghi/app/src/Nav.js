import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-opacity-75 bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>

            <li className="nav-item dropdown" >
              <a className=" nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Manufacturers
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><NavLink className="dropdown-item" aria-current="page" to="manufacturers">Manufacturers List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="manufacturers/new">New Manufacturer</NavLink></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className=" nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Models
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><NavLink className="dropdown-item" aria-current="page" to="models">Models List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="models/new">New Model</NavLink></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className=" nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Automobiles
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><NavLink className="dropdown-item" aria-current="page" to="automobiles">Automobiles List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="automobiles/new">New Automobile</NavLink></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className=" nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Salespersons
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><NavLink className="dropdown-item" aria-current="page" to="salespersons">Salesperson List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="salespersons/new">New Salesperson</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="salespersons/history"> Sales history by Salesperson</NavLink></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className=" nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Customers
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><NavLink className="dropdown-item" aria-current="page" to="customers">Customers List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="customers/new">New Customer</NavLink></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className=" nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><NavLink className="dropdown-item" aria-current="page" to="sales">Sales List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="sales/new">New Sale</NavLink></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className=" nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Technicians
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><NavLink className="dropdown-item" aria-current="page" to="technicians">Technician List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="technicians/new">New Technician</NavLink></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className=" nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Appointments
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><NavLink className="dropdown-item" aria-current="page" to="appointments">Appointment List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="appointments/new">New Appointment</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="appointments/history"> Appointment History</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav >
  )
}

export default Nav;
