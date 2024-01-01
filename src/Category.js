import React, { Component } from 'react';
import AppNav from './AppNav';
import {HashLoader} from 'react-spinners';
import { Table, Container, Button } from 'reactstrap';
import { CashStack } from 'react-bootstrap-icons';
import classNames from 'classnames';
import './App.css'

class Category extends Component {
    state = { 
        isLoading : true,
        categories : []
     } 

     async componentDidMount() {
       const response= await fetch(`/v1/categories`)
       const body = await response.json();
       this.setState({categories: body, isLoading: false});
     }

     async remove(id) {
        await fetch(`/v1/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedExpenseCategories = [...this.state.categories].filter(expenseCategory => expenseCategory.id !== id);
            this.setState({categories: updatedExpenseCategories});
        });
    }

    render() { 
        const {categories, isLoading} = this.state;
        if(isLoading)
           return (<div className="page-loader"><h3><HashLoader aria-label="Loading App"></HashLoader>Loading...</h3></div>);
        
           let expenseCategoryRows = categories.map(expenseCategory =>
            <tr key={expenseCategory.id}>
                <td>{expenseCategory.name}</td>
                <td><Button size="sm" color="danger" onClick={() => this.remove(expenseCategory.id)}>Delete</Button></td>
            </tr>
           );

        return (
            <div>
                <AppNav/>

                <Container>

                    <h3><CashStack color="royalblue" className={classNames("ml-4", "style-category")}/>Expense Categories</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="20%">Category</th>
                                <th width="10%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenseCategoryRows}
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
}
 
export default Category;