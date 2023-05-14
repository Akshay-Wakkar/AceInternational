import React from "react";
import Select from "react-select";
function DynamicSelect({ data, holder, changeHandler, multi }) {
  const styles = {
    container: (base) => ({
      ...base,
      flex: 1,
    }),
    control: (base) => ({
      ...base,
      border: "1px solid rgb(209 213 219)",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid rgb(17 24 39)",
      },
    }),
    input: (base) => ({
      ...base,
      color: "rgb(75 85 99)",
      paddingLeft: "6px",
      paddingBottom: "3px",
      fontSize: "1rem",
      lineHeight: "1.25rem",
      // opacity: "0 !important",
    }),
    menu: (base) => ({
      ...base,
      color: "rgb(75 85 99)",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#a1a9bb",
      paddingLeft: "6px",

      fontSize: "0.870rem",
      lineHeight: "1.25rem",
    }),
  };
  return (
    <Select
      isMulti={multi}
      options={data}
      defaultValue={data[0]}
      onChange={(options) => {
        var option = multi ? options : options.value;
        changeHandler(option);
      }}
      getOptionValue={(option) => option.label}
      styles={styles}
      placeholder={holder}
    />
  );
}

export default DynamicSelect;
