"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Input,
  Button,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Translate } from "@mui/icons-material";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

const AddCompanies = () => {
  //const [categories, setCategories] = useState([]);

  const [sizes, setSizes] = useState([]);

  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [model, setModel] = React.useState(false);
  const handleModel = () => setModel(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSubmit, setSnackbarSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [deleteSuccessSnackbar, setDeleteSuccessSnackbar] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    id: null,
  });

  const handleDelete = (row) => {
    if (row && row.id) {
      setDeleteConfirmation({ open: true, id: row.id });
      console.error("Clicked ---------------------------------------------   ");
    } else {
      console.error("Invalid Size for deletion");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", deleteConfirmation.id);

      const response = await fetch(
        `http://localhost:3000/api/company/${deleteConfirmation.id}`,
        {
          method: "DELETE",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        setDeleteSuccessSnackbar(true);
        setTimeout(() => {
          setDeleteSuccessSnackbar(false);
        }, 5000);

        const updatedCategories = sizes.filter(
          (category) => category.id !== deleteConfirmation.id
        );
        setSizes(updatedCategories);
      } else {
        console.error("Failed to delete company");
      }
    } catch (error) {
      console.error("Error deleting company:", error.message);
    } finally {
      setDeleteConfirmation({ open: false, id: null });
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ open: false, id: null });
  };

  const modelClose = () => {
    setModel(false);
    setFormData({
      id: "",
      com_title: "",
      comp_logo: "",
      comp_description: "",
      comp_phone: "",
      comp_email: "",
      comp_website: "",
      comp_rating: "",
      com_details: "",
    });
  };
  const [formData, setFormData] = useState({
    id: "",
    com_title: "",
    comp_logo: "",
    comp_description: "",
    comp_phone: "",
    comp_email: "",
    comp_website: "",
    comp_rating: "",
    com_details: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({
          ...formData,
          comp_logo: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e) => {
    setLoad(true);
    e.preventDefault();
    // Validate input fields
    if (
      !formData.com_title ||
      !formData.comp_logo ||
      !formData.comp_description ||
      !formData.comp_email ||
      !formData.comp_phone ||
      !formData.comp_website ||
      !formData.com_details ||
      !formData.comp_rating ||
      !e.target.elements.imgurl.files[0]
    ) {
      setSnackbarSubmit(true);
      setTimeout(() => {
        setSnackbarSubmit(false);
      }, 5000);
      setLoad(false);
      return;
    }
    try {
      const httpAxios = axios.create({
        baseURL: process.env.BASE_URL,
      });

      const result = await httpAxios
        .post("http://localhost:3000/api/company", formData)
        .then((response) => response.data);
      console.log(result);
      toast.success("Record Has Been added Successfully  !");

      setLoad(false);
    } catch (error) {
      console.error("Error occurred while sending data to the API", error);
      setLoad(false);
    }
  };






  const handleEdit = async (e) => {
    setLoad(true);
    e.preventDefault();

    console.log(formData);

    // Validate input fields
    if (
      !formData.com_title ||
      !formData.comp_logo ||
      !formData.comp_description ||
      !formData.comp_email ||
      !formData.comp_phone ||
      !formData.comp_website ||
      !formData.com_details ||
      !formData.comp_rating ||
      !e.target.elements.imgurl.files[0]
    ) {
      setSnackbarSubmit(true);
      setTimeout(() => {
        setSnackbarSubmit(false);
      }, 5000);
      setLoad(false);
      return;
    }
    try {
      const httpAxios = axios.create({
        baseURL: process.env.BASE_URL,
      });

      const result = await httpAxios
        .post(`http://localhost:3000/api/company/${editingCategory.id}`, editingCategory)
        .then((response) => response.data);
      console.log(result);
      toast.success("Record Has Been added Successfully  !");

      setLoad(false);
    } catch (error) {
      console.error("Error occurred while sending data to the API", error);
      setLoad(false);
    }
  };



  const handleOpen = (sizes) => {
  
    setEditingCategory(sizes);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImageFile(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/company");
        if (!response.ok) {
          throw new Error("Failed to fetch Sizes");
          console.log("Failed to fetch Sizes");
        }
        const data = await response.json();
        setSizes(data);
      } catch (error) {
        setError("Error fetching companies: " + error.message);
      }
    };

    fetchData(); // Always fetch data on component mount

    // Now, fetch data again whenever categories change
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },

      {
        Header: "Title",
        accessor: "com_title",
      },
      {
        Header: "Logo",
        accessor: "comp_logo",
        Cell: ({ value }) => {
          const imagePath = value.trim(); // Adjust based on your actual data structure
          const imageUrl = `/companies/${imagePath}`;

          return (
            <img
              src={imageUrl}
              alt="Image"
              style={{ maxWidth: "50px", maxHeight: "50px" }}
            />
          );
        },
      },

      {
        Header: "Description",
        accessor: "comp_description",
      },

      {
        Header: "Mobile No",
        accessor: "comp_phone",
      },

      {
        Header: "Email",
        accessor: "comp_email",
      },

      {
        Header: "Website",
        accessor: "comp_website",
      },

      {
        Header: "Action",
        accessor: "updateButton",
        Cell: ({ row }) => (
          <div className=" flex gap-6">
            <FaUserEdit
              onClick={() => handleOpen(row.original)}
              style={{
                fontSize: "26px",
                color: "#006a5c",
                paddingRight: "6px",
                cursor: "pointer",
              }}
            />

            <MdDeleteForever
              onClick={() => handleDelete(row.original)}
              style={{ fontSize: "26px", color: "#b03f37", cursor: "pointer" }}
            />
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: sizes,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

  // ------------------------------------  Code to Update the Data  --------------------------------------------

  const handleSave = async () => {
    setLoading(true);
    console.log(editingCategory);
    try {
      const httpAxios = axios.create({
        baseURL: process.env.BASE_URL,
      });

      const result = await httpAxios
        .put("http://localhost:3000/api/company/1", editingCategory)
        .then((response) => response.data);
      console.log(result);
      toast.success("Record Has Been added Successfully  !");

      setLoad(false);

      console.log("done");

      const updatedResponse = await fetch("http://localhost:3000/api/company");

      if (!updatedResponse.ok) {
        throw new Error("Failed to fetch updated company");
      }

      const updatedCategories = await updatedResponse.json();

      // Update the state with the new list of categories
      setSizes(updatedCategories);

      handleClose();

      // Show Snackbar for 5 seconds
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 5000);

      setLoading(false);
    } catch (error) {
      console.error("Error saving category:", error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Toolbar>
          <Input
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value || undefined)}
            placeholder={`Search`}
          />
        </Toolbar>

        <Button
          className=" font=[18px] px-3 py-2 font-normal"
          style={{
            height: "40px",
            backgroundColor: "#E3B505",
            color: "black",
          }}
          onClick={handleModel}
        >
          ADD New
        </Button>
      </div>

      <TableContainer component={Paper} {...getTableProps()}>
        <Table>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: sizes.length }]}
        colSpan={5}
        count={sizes.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        showLastButton={true}
        showFirstButton={true}
        SelectProps={{
          inputProps: { "aria-label": "rows per page" },
          native: true,
        }}
        onPageChange={(event, newPage) => gotoPage(newPage)}
        onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
      />

      {/* ---------------------------------  Code for Dialogue for Add Size    ------------------------------------- */}

      <Dialog
        open={model}
        style={{ maxwidth: "clamp(320px, 100%, 450px)" }}
        onClose={modelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle id="modal-modal-title">
          <Typography variant="h6" component="div">
            New Company
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Company Name"
              type="text"
              name="com_title"
              value={formData.com_title}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", width: "330px" }}
            />

            <br />

            <TextField
              label="Phone"
              type="text"
              name="comp_phone"
              value={formData.comp_phone}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", marginBottom: "10px" }}
            />

            <br />

            <TextField
              label="Email"
              name="comp_email"
              type="text"
              value={formData.comp_email}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", marginBottom: "10px" }}
            />

            <TextField
              label="Website"
              name="comp_website"
              type="text"
              value={formData.comp_website}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", marginBottom: "10px" }}
            />

            <TextField
              label="Rating"
              name="comp_rating"
              type="number"
              value={formData.comp_rating}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", marginBottom: "10px" }}
            />

            <TextField
              label="Description"
              name="comp_description"
              type="text"
              value={formData.comp_description}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", marginBottom: "10px" }}
            />

            <TextField
              label="Details"
              name="com_details"
              type="text"
              value={formData.com_details}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", marginBottom: "10px" }}
            />

            <label style={{ fontSize: "13px", color: "2b2b2b" }}>
              Upload Image:
            </label>
            <br />
            <input
              type="file"
              accept="image/*"
              name="imgurl"
              onChange={handleImageChange}
              style={{ display: "block", height: "36px", width: "100%" }}
            />
            {formData.image && (
              <img
                src={formData.comp_logo}
                alt="Uploaded"
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  marginTop: "10px",
                }}
              />
            )}

            <br />
            <DialogActions>
              <Button
                type="submit"
                disabled={load}
                variant="contained"
                className=" font=[18px] flex content-center items-center justify-center px-8 py-2 font-normal"
                style={{
                  backgroundColor: "#E3B505",
                  color: "black",
                }}
              >
                {`${load ? "Loading...." : "Save"}`}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* -------------------------     Code for Edit Size       ----------------------------------- */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ width: "clamp(320px, 100%, 450px)", margin: "auto" }}
      >
        <DialogTitle id="modal-modal-title">
          <Typography variant="h6" component="div">
            Edit Company Data
          </Typography>
        </DialogTitle>
        <DialogContent>
          {editingCategory && (
            <form>
              <TextField
                label="ID"
                value={editingCategory.id}
                fullWidth
                disabled
                style={{ marginTop: "20px", display: "none" }}
              />

              <TextField
                label="Company Title"
                name="com_title"
                value={editingCategory.com_title}
                fullWidth
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    size_title: e.target.value,
                  })
                }
                style={{ marginTop: "20px" }}
              />

              <TextField
                label="Description"
                name="comp_description"
                value={editingCategory.comp_description}
                fullWidth
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    size_width: e.target.value,
                  })
                }
                style={{ marginTop: "20px" }}
              />

              <TextField
                label="Phone Number"
                name="comp_phone"
                value={editingCategory.comp_phone}
                fullWidth
                multiline
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    size_height: e.target.value,
                  })
                }
                style={{ marginTop: "20px" }}
              />

              <TextField
                label="Email"
                name="comp_email"
                value={editingCategory.comp_email}
                fullWidth
                multiline
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    size_height: e.target.value,
                  })
                }
                style={{ marginTop: "20px" }}
              />

              <TextField
                label="Website"
                name="comp_website"
                value={editingCategory.comp_website}
                fullWidth
                multiline
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    size_height: e.target.value,
                  })
                }
                style={{ marginTop: "20px" }}
              />

              <TextField
                label="Rating"
                name="comp_rating"
                value={editingCategory.comp_rating}
                fullWidth
                multiline
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    size_height: e.target.value,
                  })
                }
                style={{ marginTop: "20px" }}
              />

              <TextField
                label="Details"
                name="com_details"
                value={editingCategory.com_details}
                fullWidth
                multiline
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    size_height: e.target.value,
                  })
                }
                style={{ marginTop: "20px" }}
              />

              {imageFile && (
                <img
                  src={`/companies/${editingCategory.comp_logo}`}
                  alt="Image Preview"
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    marginTop: "10px",
                  }}
                />
              )}




              

              <DialogActions>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={loading}
                  style={{ marginTop: "20px", width: "100%" }}
                >
                  {`${loading ? "Loading...." : "Save"}`}
                </Button>
              </DialogActions>
              {console.log(JSON.stringify(formData))}
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success">Category saved successfully!</Alert>
      </Snackbar>
      <Snackbar
        open={snackbarSubmit}
        autoHideDuration={5000}
        onClose={() => setSnackbarSubmit(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error">Please fill in all the required fields.</Alert>
      </Snackbar>
      <Snackbar
        open={deleteSuccessSnackbar}
        autoHideDuration={5000}
        onClose={() => setDeleteSuccessSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="warning">Category successfully deleted!</Alert>
      </Snackbar>

      <Dialog
        open={deleteConfirmation.open}
        onClose={handleCancelDelete}
        aria-labelledby="delete-confirmation-title"
        aria-describedby="delete-confirmation-description"
      >
        <DialogTitle id="delete-confirmation-title">
          <Typography variant="h6" component="div">
            Confirm Deletion
          </Typography>
        </DialogTitle>
        <DialogContent>
          {deleteConfirmation.id && (
            <Typography variant="body1">
              Are you sure you want to delete the category with ID{" "}
              {deleteConfirmation.id}?
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCompanies;
