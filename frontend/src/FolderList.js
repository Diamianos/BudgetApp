import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from "reactstrap";
import {Link} from "react-router-dom";
import AppNavbar from "./AppNavbar";

class FolderList extends Component {

    constructor(props){
        super(props);
        this.state = {folder: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/folder')
            .then(response => response.json())
            .then(data => this.setState({folder: data}));
    }

    async remove(id){
        await fetch(`/folder/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedFolder = [...this.state.folder].filter(i => i.id !== id);
            this.setState({folder: updatedFolder});
        });
    }

    render(){
        const {folder, isLoading} = this.state;

        if (isLoading){
            return <p>Loading...</p>;
        }

        const folderList = folder.map(f => {
            return <tr key={f.id}>
                <td style={{whiteSpace: 'nowrap'}}>{f.name}</td>
                <td>{f.amount}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/folder/" + f.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(f.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/folder/new">Add Folder</Button>
                    </div>
                    <h3>Folders</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Amount</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {folderList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default FolderList;