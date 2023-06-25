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
      <Dropdown>
        <Dropdown.Toggle style={dropdownStyle} id="nested-dropdown-toggle">
          {category == null
            ? "Please select category"
            : "Category selected: " + category}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {categories.map((items) => (
            <Dropdown drop="end" key={items.label}>
              <Dropdown.Toggle id={items.label} style={dropdownStyle}>
                {items.label}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {items.items.map((item) => (
                  <Dropdown.Item
                    onClick={() => setCategory(item.label)}
                    key={item.label}
                  >
                    {item.label}
                  </Dropdown.Item>
                ))}{" "}
              </Dropdown.Menu>
            </Dropdown>
          ))}
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => setCategory(null)} key={"none"}>
            Remove filter
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default CategoryDropdown;
