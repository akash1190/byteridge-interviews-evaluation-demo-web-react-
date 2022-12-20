import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import { ReactPaginate } from "react-paginate";
import { Navbar, Nav } from "react-bootstrap";
import { useEffect } from "react";
import ReactPaginate from 'react-paginate';
function Auditpage(props) {
  const { user, users } = props;
  const [data,setData] =useState([]);
const [filterval,setfilterval] =useState('');
  useEffect(() => {
    props.getUsers();
  }, []);

  const handleDeleteUser = (id) => {
    return (e) => props.deleteUser(id);
  };

const handeFilter =(e)=>{
  if(e.target.value==''){
    setData(data)
  }
  else{
    const filterResult = data.filter(item=>item.firstName.toLowerCase().include(e.target.value.toLowerCase()) || item.role.toLowerCase().include(e.target.value.toLowerCase()) || item.lastName.toLowerCase().include(e.target.value.toLowerCase()) || item.id.toLowerCase().include(e.target.value.toLowerCase()) || item.date.toLowerCase().include(e.target.value.toLowerCase()))
  if (filterResult.length>0){
    setData(filterResult)
  }
  }
}
const handlePageClick =async(event) =>{
  setCurrentpage(parseInt(event.selected))
}


  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/">Home</Link>
          </Nav.Link>
          <Nav.Link href="#features">Auditor</Nav.Link>
          <Nav.Link>
            <Link to="/login">Logout</Link>
          </Nav.Link>
        </Nav>
      </Navbar>
      <div className="col-md-6 col-md-offset-3">
<input type="text" className="" placeholder="search" value={filterVal} onInput={(e)=>handeFilter(e)}/>
      </div>
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React!!</p>
        <h3>All login audit :</h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && (
          <span className="text-danger">ERROR: {users.error}</span>
        )}
        {users.items && (
          <ul className="user-screen">
            {users.items.map((user, index) => (
              <li key={user.id}>
                {user.id + " " + user.role + " " + user.createdDate + " "}
                {user.firstName + " " + user.lastName}
                {user.deleting ? (
                  <em> - Deleting...</em>
                ) : user.deleteError ? (
                  <span className="text-danger">
                    - ERROR: {user.deleteError}
                  </span>
                ) : (
                  <span>
                    - <a onClick={handleDeleteUser(user.id)}>Delete</a>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
        
      </div>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
};

const connectedAuditPage = connect(mapState, actionCreators)(Auditpage);
export { connectedAuditPage as Auditpage };
