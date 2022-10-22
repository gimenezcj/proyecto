import React, { useState } from "react";

import BootstrapTable from "react-bootstrap-table-next";
import transformers from "./transformerStub.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

//import cellEditFactory from "react-bootstrap-table2-editor";
//import paginationFactory from "react-bootstrap-table2-paginator";
//import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

//import Button from "@material-ui/core/Button";
//import AddIcon from "@material-ui/icons/Add";
////import DeleteIcon from "@material-ui/icons/Delete";
//
//import TLMIdForm from "./TLMIdForm";

const key = transformers.map(el => el.id);

//const { SearchBar } = Search;

const entry = {
  id: null,
  area: null,
  rating: null,
  voltage: null,
  lat: null,
  Long: null
};

export default function ReactBootstrapTableTLM() {
  // To delete rows you be able to select rows
  const [state, setState] = useState({
    row: null,
    state: null,
    oldValue: null
  });

  const [products, setProducts] = useState(transformers); // transformers products
  const [open, setOpen] = useState(false); // control for adding diaglog

  // hide checkbox for selection
  const selectRowProp = {
    mode: "checkbox",
    hideSelectColumn: true
  };

  // validator for number fields
  const numberValidator = (newValue, row, column) => {
    if (isNaN(newValue)) {
      return {
        valid: false,
        message: "This field should be numeric"
      };
    }
    return true;
  };

  const columns = [
    {
      dataField: "id",
      text: "TLM id",
      sort: true
    },
    {
      dataField: "area",
      text: "Area Name",
      sort: true
    },
    {
      dataField: "rating",
      text: "Power rating",
      type: "number",
      validator: numberValidator,
      sort: true
    },
    {
      dataField: "voltage",
      text: "Voltage",
      type: "number",
      validator: numberValidator,
      sort: true
    },
    {
      dataField: "lat",
      text: "Latitude",
      type: "number",
      validator: numberValidator
    },
    {
      dataField: "Long",
      text: "Longitude",
      type: "number",
      validator: numberValidator
    },
    {
      dataField: "state",
      text: "State",
      isDummyField: true,

      hidden: true
    },
    {
      dataField: "actions",
      text: "Actions",
      editable: false,
      isDummyField: true,
      formatExtraData: state,
      formatter: (cellContent, row) => {
        if (row.state)
          return (
            <div>Hola
            </div>
          );
        else
          return (
            <div>
Hola2
            </div>
          );
      }
    }
  ];

  const defaultSorted = [
    {
      dataField: "name",
      order: "ascd"
    }
  ];


  return (
    <>

      <BootstrapTable
        keyField="id"
        selectRow={selectRowProp}
        data={products}
        columns={columns}
        defaultSorted={defaultSorted}

      />

    </>
  );
}
