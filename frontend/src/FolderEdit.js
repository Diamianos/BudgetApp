import React, {Component} from 'react'
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import AppNavbar from "./AppNavbar";
import {Link, withRouter} from "react-router-dom";

class FolderEdit extends Component{
    emptyItem = {
        name:'',
        amount: ''
    };

    constructor(props){
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        if (this.props.match.params.id !== 'new'){
            const folder = await(await fetch(`/folder/${this.props.match.params.id}`)).json();
            this.setState({item: folder});
        }
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event){
        event.preventDefault();
        const {item} = this.state;

        await fetch('/folder' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Folder' : 'Add Folder'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="amount">Amount</Label>
                        <Input type="text" name="amount" id="amount" value={item.amount || ''}
                               onChange={this.handleChange} autoComplete="amount"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(FolderEdit);