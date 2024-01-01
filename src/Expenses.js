import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import { Table, Form, FormGroup, Container, Button } from 'reactstrap';
import { Link, Navigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css'
import { DateTime } from 'luxon';
import { CurrencyRupee, Wallet2 } from 'react-bootstrap-icons';
import { HashLoader } from 'react-spinners';
import classNames from 'classnames';
import Select from 'react-select';

class Expenses extends Component {

    emptyItem = {
        id: 0,
        expenseDate: new Date(),
        description: '',
        location: '',
        category: {
            id: 1,
            name: ''
        }
    }

    constructor(props) {
        super(props);
        console.log('Super props:'+super.props)
        this.state = {
            date: new Date(),
            isLoading: true,
            categories: [],
            expenses: [],
            item: this.emptyItem
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleDropDownChange = this.handleDropDownChange.bind(this);
    }

    async componentDidMount() {
        const response = await fetch(`/v1/categories`);
        const body = await response.json();

        this.setState({ categories: body, isLoading: false });

        const expensesResponse = await fetch(`/v1/expenses`);
        const expensesResponseBody = await expensesResponse.json();
        console.log('Expenses from backend:'+JSON.stringify(expensesResponseBody));

        this.setState({ expenses: expensesResponseBody, isLoading: false });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        console.log('Form item:'+item);
        item.id = Math.floor(Math.random() * 999);
        
        
        await fetch(`/v1/expenses`, {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }
        )

        console.log(this.state);
        console.log(this.props);
        // console.log(this.props.history);
        // navigate('/expenses');
        <Navigate to={'/'}/>
        // console.log(this.props.useNavigate);
    }

    handleChange(event) {
        const target = event.target; // can be a textbox or a dropdown or any entity getting user input
        console.log('Event target: '+target);
        const value = target.value; // get the value from the textbox or dropdown
        const name = target.name; // get the fieldName whose value would be extracted and updated
        
        console.log('Target value: '+value);
        console.log('Target name: '+name);
        let item = {...this.state.item};
        item[name] = value; // update the fieldName with value
        this.setState({item});
        console.log(this.state.item);
    }

    handleDropDownChange(event) {
        const target = event.target; // can be a textbox or a dropdown or any entity getting user input
        console.log('Event target: '+target);
        const value = target.value; // get the value from the textbox or dropdown
        const name = target.name; // get the fieldName whose value would be extracted and updated
        const categoryId = target[event.target.selectedIndex].id;
        let item = {...this.state.item};
        console.log('Item in dropdown:'+item);
        let category = item.category;
        category['id'] = categoryId;
        category[name] = value;
        item.category = category; // update the fieldName with value
        this.setState({item});
        console.log(this.state.item);
    }

    handleDateChange(date) {
        let item = {...this.state.item};
        item.expenseDate = date;
        console.log('Expense Date is: '+date);
        this.setState({item});
        console.log(item)
    }

    async remove(id) {
        await fetch(`/v1/expenses/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedExpenses = [...this.state.expenses].filter(expense => expense.id !== id);
            this.setState({expenses: updatedExpenses});
        });
    }

    render() {
        const title = <h3><CurrencyRupee color="royalblue" className={classNames('ml-4', 'style-expense-icon')}/>Add Expense</h3>;
        const { categories } = this.state;
        const { expenses, isLoading } = this.state;

        if (isLoading)
            return (<div className='page-loader'><h3><HashLoader aria-label="Loading App"></HashLoader>Loading..</h3></div>);

        let expenseRows = expenses.map(expense =>
            <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.location}</td>
                <td>{DateTime.fromISO(expense.expenseDate).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}</td>
                <td>{expense.category.name}</td>
                <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete</Button></td>
            </tr>

        );

        /**Using plain html select */
        let optionList =
            categories.map(category =>
                <option key={category.id} id={category.id}>{category.name}</option>
            )

            /** Using React-select component */
        // let optionsList = categories.map(category =>
        //     ({ 'key': category.id, 'value': category.name, 'label': category.name })
        // )

        return (
            <div>
                <AppNav />
                <Container>
                    {title}

                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <label htmlFor="title" className="expense-form-label">Title</label>
                            <input type="text" name="description" id="title" className="expense-form-input" onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="category" className="expense-form-label">Category</label>
                            {/* <Select options={optionsList} onChange={this.handleDropDownChange} id="id" name="name" className="expense-form-input"/> */}
                            <select onChange={this.handleDropDownChange} id="id" name="name" className="expense-form-input">{optionList}</select>
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="expenseDate" className="expense-form-label">Expense Date</label>
                            <DatePicker selected={this.state.item.expenseDate} className="expense-form-input" onChange={this.handleDateChange} />
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="location" className="expense-form-label">Location</label>
                            <input type="text" name="location" id="location" className="expense-form-input" onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <Button color="primary" type="submit" className={'style-expense-icon'}>Save</Button>{''}
                            <Button color="secondary" tag={Link} to="/categories" className={'style-expense-icon'}>Cancel</Button>
                        </FormGroup>

                    </Form>
                </Container>

                <Container>

                    <h3><Wallet2 color="royalblue" className={classNames("ml-4", "style-expense-icon")}/>Expense List</h3>
                    <Table hover responsive bordered className="mt-4">
                        <thead className="table-dark">
                            <tr>
                                <th width="20%">Description</th>
                                <th width="10%">Location</th>
                                <th>Expense Date</th>
                                <th>Category</th>
                                <th width="10%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenseRows}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Expenses;