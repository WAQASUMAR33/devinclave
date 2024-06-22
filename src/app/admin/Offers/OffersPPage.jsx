"use client";
import React, { useState, useEffect, useRef } from "react";
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
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import dynamic from 'next/dynamic';

// Dynamically import the editor since it might use 'self' or 'window'
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const OffersPPage = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
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

  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/company");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setFormData({ ...formData, ["comp_id"]: selectedOption });
    console.log("The value is  :" + selectedOption);
  };

  const handleConfirmDelete = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", deleteConfirmation.id);

      const response = await fetch(
        `http://localhost:3000/api/offers/${deleteConfirmation.id}`,
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
        console.error("Failed to delete offers");
      }
    } catch (error) {
      console.error("Error deleting offers:", error.message);
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
      comp_id: "",
      offer_type: "",
      offer_title: "",
      offer_code: "",
      offer_description: "",
      offer_link1: "",
      offer_link2: "",
      offer_users: "",
      offer_expiry: "",
      offer_isverify: "",
      offer_details:""
    });
  };
  const [formData, setFormData] = useState({
    id: "",
    comp_id: "",
    offer_type: "",
    offer_title: "",
    offer_code: "",
    offer_description: "",
    offer_link1: "",
    offer_link2: "",
    offer_users: "",
    offer_expiry: "",
    offer_isverify: "",
    offer_details:""
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
    console.log(content);
  
   
    console.log(formData);

   // Validate input fields
    if (
      !formData.comp_id ||
      !formData.offer_type ||
      !formData.offer_title ||
      !formData.offer_code ||
      !formData.offer_description ||
      !formData.offer_link1 ||
      !formData.offer_link2 ||
      !formData.offer_users ||
      !formData.offer_expiry ||
      !formData.offer_isverify
    ) {
      setSnackbarSubmit(true);
      setTimeout(() => {
        setSnackbarSubmit(false);
      }, 5000);
      setLoad(false);
      return;
    }
    try {
      console.log(formData);
      const httpAxios = axios.create({
        baseURL: process.env.BASE_URL,
      });

      const result = await httpAxios
        .post("http://localhost:3000/api/offers", formData)
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
      !formData.comp_id ||
      !formData.offer_type ||
      !formData.offer_title ||
      !formData.offer_code ||
      !formData.offer_description ||
      !formData.offer_link1 ||
      !formData.offer_link2 ||
      !formData.offer_users ||
      !formData.offer_expiry ||
      !formData.offer_isverify ||
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
        .post(
          `http://localhost:3000/api/offers/${editingCategory.id}`,
          editingCategory
        )
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
    console.log("working");
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
        const response = await fetch("http://localhost:3000/api/offers");
        if (!response.ok) {
          throw new Error("Failed to fetch Sizes");
          console.log("Failed to fetch Sizes");
        }
        const data = await response.json();
        setSizes(data);
      } catch (error) {
        setError("Error fetching offers: " + error.message);
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
        Header: "Company",
        accessor: "comp_id",
      },

      {
        Header: "Offer Title",
        accessor: "offer_title",
      },

      {
        Header: "Offer Tyoe",
        accessor: "offer_type",
      },

      {
        Header: "Offer Code",
        accessor: "offer_code",
      },

      {
        Header: "Offer Expiry",
        accessor: "offer_expiry",
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

  const handleSave = async () => {
    setLoading(true);
    console.log(editingCategory);
    try {
      const httpAxios = axios.create({
        baseURL: process.env.BASE_URL,
      });

      const result = await httpAxios
        .put("http://localhost:3000/api/offers/1", editingCategory)
        .then((response) => response.data);
      console.log(result);
      toast.success("Record Has Been added Successfully  !");

      setLoad(false);

      console.log("done");

      const updatedResponse = await fetch("http://localhost:3000/api/offers");

      if (!updatedResponse.ok) {
        throw new Error("Failed to fetch updated offers");
      }

      const updatedCategories = await updatedResponse.json();

      setSizes(updatedCategories);

      handleClose();

      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 5000);

      setLoading(false);
    } catch (error) {
      console.error("Error saving offers:", error.message);
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

      <Dialog
        open={model}
        style={{ maxwidth: "width:720px" }}
        onClose={modelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle id="modal-modal-title">
          <Typography variant="h6" component="div">
            New Offer
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <h3 style={{ marginTop: "20px", width: "100%" }}>Select Company</h3>

            <select
              value={selectedOption}
              onChange={handleChange}
              style={{ marginTop: "20px", width: "100%", padding: "10px" }}
            >
              <option key={0} value="Select Company">
                Select Company
              </option>
              {data.map((item) => (
                <option key={item.com_title} value={item.com_title}>
                  {item.com_title}
                </option>
              ))}
            </select>
            <br />

            <h3 style={{ marginTop: "20px", width: "100%" }}>Offer Type</h3>

            <select
              label="Offer Type"
              name="offer_type"
              value={formData.offer_type}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "10px", width: "100%", padding: "10px" }}
            >
              <option value="Code">Code</option>
              <option value="No">No</option>
            </select>

            <br />
            <TextField
              label="Offer Title"
              type="text"
              name="offer_title"
              value={formData.offer_title}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}
            />

            <br />

            <TextField
              label="Offer Code"
              type="text"
              name="offer_code"
              value={formData.offer_code}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}
            />

            <br />

            <TextField
              label="Offer Description"
              name="offer_description"
              type="text"
              value={formData.offer_description}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}
            />

            <TextField
              label="Offer Link 1"
              name="offer_link1"
              type="text"
              value={formData.offer_link1}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}
            />

            <TextField
              label="Offer Link 2"
              name="offer_link2"
              type="text"
              value={formData.offer_link2}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}
            />

            <TextField
              label="Offer Users"
              name="offer_users"
              type="text"
              value={formData.offer_users}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}
            />

            <TextField
              label="Offer Expiry"
              name="offer_expiry"
              type="text"
              value={formData.offer_expiry}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}
            />

            <h3 style={{ marginTop: "20px", width: "100%", width: "330px" }}>
              Is Verify
            </h3>

            <select
              label="Is Verify"
              name="offer_isverify"
              value={formData.offer_isverify}
              onChange={handleInputChange}
              fullWidth
              style={{ marginTop: "20px", width: "100%", padding: "10px" }}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <br />

            <JoditEditor
              ref={editor}
              value={formData.offer_details}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
              onChange={(newContent)=>
                setFormData({
                  ...formData,
                  ["offer_details"]: newContent,
                })
              } 
            />
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

export default OffersPPage;
