import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from "reactstrap";
import {Link} from "react-router-dom";

class FolderList extends Component {

    constructor(props){
        super(props);
        this.state = {folders: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/folder')
            .then(response => response.json())
            .then(data => this.setState({folders: data}));
    }

    async remove(id){
        await fetch(`/folder/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedFolders = [...this.state.folders].filter(i => i.id !== id);
            this.setState({folders: updatedFolders});
        });
    }

    render(){
        const {folders, isLoading} = this.state;

        if (isLoading){
            return <p>Loading...</p>;
        }

        const folderList = folders.map(folder => {
            return <tr key={folder.id}>
                <td style={{whiteSpace: 'nowrap'}}>{folder.name}</td>
                <td>{folder.balance}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/folder/" + folder.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(folder.id)}>Delete</Button>
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
                            <th width="30%">Email</th>
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