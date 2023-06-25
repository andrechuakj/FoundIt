import React from "react";
import categories from "../categories";
import { Dropdown } from "react-bootstrap";

const CategoryDropdown = ({ category, setCategory }) => {
  const dropdownStyle = {
    background: "white",
    border: "white",
    color: "black",
  };
  return (
    <>
      <Dropdown style={{}}>
        <Dropdown.Toggle style={dropdownStyle} id="nested-dropdown-toggle">
          {category == null
            ? "Please select category"
            : "Category selected: " + category}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {categories.map((items) => (
            <Dropdown drop="end">
              <Dropdown.Toggle
                id="nested-dropdown-toggle"
                style={dropdownStyle}
              >
                {items.label}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {items.items.map((item) => (
                  <Dropdown.Item onClick={() => setCategory(item.label)}>
                    {item.label}
                  </Dropdown.Item>
                ))}{" "}
              </Dropdown.Menu>
            </Dropdown>
          ))}
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => setCategory(null)}>
            Remove filter
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default CategoryDropdown;
