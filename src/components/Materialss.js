//student view page
//Teacher view page
import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Card,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import axios from "axios";
export default function Materialss() {
  //const token = localStorage.getItem("jwt");
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const name = queryParam.get("teacher");
  const [categories, setCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [filterText, setFilterText] = useState("");

  const [page, setPage] = useState(0); // Current page index
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const jwt = localStorage.getItem("jwt");
  //   const role = localStorage.getItem("role");
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    summary: "",
    name: "",

    created_at: new Date().toISOString(),
  });

  const [editMaterial, setEditMaterial] = useState({
    title: "",
    summary: "",
    name: "",
    created_at: new Date().toISOString(), // Set current datetime
  });

  const handleClickOpenEdit = (material) => {
    setEditMaterial(material);
    setOpenEdit(true);
  };

  const handleChange = (e) => {
    setNewMaterial({ ...newMaterial, [e.target.name]: e.target.value });
  };

  const handleChangeEdit = (e) => {
    setEditMaterial({ ...editMaterial, [e.target.name]: e.target.value });
  };

  const handleConfirmOpen = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };
  const handleConfirmClose = (id) => {
    setDeleteId(null);
    setConfirmOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDelete = async (id) => {
    setSnackbarOpen(true);
    try {
      await axiosInstance.delete(`http://localhost:8080/api/material/${id}`);
      setMaterials(materials.filter((material) => materials.id !== id));

      setSnackbarMessage("Material was deleted successfully!");
      setSnackbarSeverity("success");

      handleConfirmClose();
    } catch (error) {
      console.log("Error occured deleting the material: ", error);
      setSnackbarMessage("An error occured trying to delete a material.");
      setSnackbarSeverity("warning");
    }
  };

  const handleEditMaterial = async () => {
    setSnackbarOpen(true);
    try {
      const response = await axiosInstance.put(
        `http://localhost:8080/api/material/${editMaterial.id}`,
        {
          ...editMaterial,
          updatedAt: new Date().toISOString(), // Set current datetime
        }
      );
      setMaterials(
        materials.map((materials) =>
          materials.id === editMaterial.id ? response.data : materials
        )
      );
      setSnackbarMessage("Material was updated successfully!");
      setSnackbarSeverity("success");
      handleCloseEdit();
    } catch (error) {
      setSnackbarMessage(
        "There was an error updating the material! Please try again"
      );
      setSnackbarSeverity("warning");
      console.log("Error occured updating the material", error);
    }
  };

  const handleAddMaterial = async () => {
    setSnackbarOpen(true);
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/api/material",
        {
          ...newMaterial,
          createdAt: new Date().toISOString(), // Set current datetime
        }
      );
      setMaterials([...materials, response.data]);
      setNewMaterial({
        title: "",
        summary: "",
        name: "",
        createdAt: new Date().toISOString(),
      });
      setSnackbarMessage("Material was added successfully!");
      setSnackbarSeverity("success");
      handleClose();
    } catch (error) {
      setSnackbarMessage(
        "There was an error adding a material! Please try again"
      );
      setSnackbarSeverity("warning");
      console.log("There was an error adding the material!", error);
    }
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
    setPage(0);
  };

  const filteredMaterials = materials.filter(
    (material) => material.name === name
  );

  //   useEffect(() => {
  //     axiosInstance
  //       .get("http://localhost:8080/api/material")
  //       .then((response) => {
  //         setMaterials(response.data);
  //       })
  //       .catch((error) => {
  //         console.log("There was an error fetching the materials", error);
  //       });
  //   }, []);

  useEffect(() => {
    console.log("Token being sent:", jwt);

    axios
      .get("http://localhost:8080/api/material", {
        headers: {
          Authorization: `Bearer ${jwt}`, // Pass token in Authorization header
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setMaterials(response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the materials", error);
      });
  }, []);

  // useEffect(() => {
  //   axiosInstance
  //     .get("http://localhost:8080/categories")
  //     .then((response) => {
  //       setCategories(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("There was an error fetching the categories", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   axiosInstance
  //     .get("http://localhost:8080/subCategories")
  //     .then((response) => {
  //       setAllSubCategories(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("There was an error fetching the suCategories", error);
  //     });
  // }, []);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset the table to the first page whenever rows per page changes
  };

  // const handleCategoryChange = (event) => {
  //   const selectedCategoryId = event.target.value;
  //   setNewMaterial({
  //     ...newMaterial,
  //     categoryid: selectedCategoryId,
  //     subcategoryid: "",
  //   });

  //   const filteredSubCategories = allSubCategories.filter(
  //     (subCategory) => subCategory.categoryid === Number(selectedCategoryId)
  //   );
  //   setFilteredSubCategories(filteredSubCategories);
  // };

  // const handleSubCategoryChange = (event) => {
  //   const selectedSubCategoryId = event.target.value;
  //   setNewMaterial({
  //     ...newMaterial,
  //     subcategoryid: selectedSubCategoryId,
  //   });
  // };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="20%"
      padding="2rem"
      border="ActiveBorder"
      fullWidth
    >
      <Card
        sx={{
          width: "80%",
          padding: "2rem",
          border: "2px solid black",
          borderRadius: "8px",
        }}
      >
        <TableContainer>
          {/* <Box display="flex" justifyContent="flex-start">
            <Button variant="contained" onClick={handleClickOpen}>
              {" "}
              Add New 
            </Button>
          </Box> */}

          <Box display="flex" justifyContent="flex-end">
            <TextField
              label="Search Materials"
              variant="outlined"
              value={filterText}
              onChange={handleFilterChange}
            ></TextField>
          </Box>
          <hr></hr>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }} scope="col">
                  #
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} scope="col">
                  Title
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} scope="col">
                  Summary
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} scope="col">
                  Name
                </TableCell>
                {/* <TableCell sx={{ fontWeight: "bold" }} scope="col">
                  Date Added
                </TableCell> */}
                <TableCell scope="col"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMaterials !== null ? (
                filteredMaterials

                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((material, index) => (
                    <TableRow
                      key={material.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell sx={{ fontSize: "1.1rem" }} scope="row">
                        {page * rowsPerPage + index + 1}
                      </TableCell>

                      <TableCell sx={{ fontSize: "1.1rem" }}>
                        <Link
                          to={`/material`}
                          state={{ currentMaterial: material }}
                        >
                          {material.title}
                        </Link>
                      </TableCell>

                      <TableCell sx={{ fontSize: "1.1rem" }}>
                        {material.summary}
                      </TableCell>
                      <TableCell sx={{ fontSize: "1.1rem" }}>
                        {material.name}
                      </TableCell>
                      <TableCell sx={{ fontSize: "1.1rem" }}>
                        {new Date(material.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="center">
                        {/* <IconButton
                          color="secondary"
                          onClick={() => handleConfirmOpen(material.id)}
                        >
                          <DeleteIcon />
                        </IconButton> */}
                        {/* <IconButton
                          color="secondary"
                          onClick={() => handleClickOpenEdit(material)}
                        >
                          <EditIcon />
                        </IconButton> */}
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell>Loading... </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            sx={{ fontSize: "1.1rem" }}
            component="div"
            count={materials != null ? materials.length : 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
          />
        </TableContainer>
        <hr></hr>
      </Card>
      {/* Confirmation Dialog for Deletion */}
      <Dialog
        open={confirmOpen}
        style={{ width: "600px", maxWidth: "600px" }} // Custom width
        onClose={handleConfirmClose}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this material?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(deleteId);
            }}
            color="secondary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Dialog for Adding New Material */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Material</DialogTitle>
        <DialogContent>
          {/* <select
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginBottom: "15px",
              fontSize: "16px",
            }}
            id="categoryid"
            onChange={handleCategoryChange}
            value={newMaterial.categoryid}
          >
            <option>Choose...</option>
            {categories
              .filter((c) => c.title != null)
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
          </select>
          <select
            id="subcategoryid"
            onChange={handleSubCategoryChange}
            value={newMaterial.subcategoryid}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginBottom: "15px",
              fontSize: "16px",
            }}
          >
            <option>Choose...</option>
            {filteredSubCategories.map((subCategory) => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.description}
              </option>
            ))}
          </select> */}
          <TextField
            margin="dense"
            name="title"
            label="Material Title"
            type="text"
            fullWidth
            value={newMaterial.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="summary"
            label="Summary"
            type="text"
            fullWidth
            value={newMaterial.summary}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={newMaterial.name}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAddMaterial}
            color="primary"
            variant="contained"
          >
            Add Material
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Dialog for Editing Material */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Material</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Material Title"
            type="text"
            fullWidth
            value={editMaterial.title}
            onChange={handleChangeEdit}
          />
          <TextField
            margin="dense"
            name="summary"
            label="Summary"
            type="text"
            fullWidth
            value={editMaterial.summary}
            onChange={handleChangeEdit}
          />
          <TextField
            margin="dense"
            name="name"
            label="name"
            type="text"
            fullWidth
            value={editMaterial.name}
            onChange={handleChangeEdit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleEditMaterial}
          >
            Update Material
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: "80px",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
