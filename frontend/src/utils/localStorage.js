export const saveEntries = entries =>
    localStorage.setItem("dt_entries", JSON.stringify(entries));
  
  export const loadEntries = () =>
    JSON.parse(localStorage.getItem("dt_entries") || "[]");
  
  export const saveForm = form =>
    localStorage.setItem("dt_form", JSON.stringify(form));
  
  export const loadForm = () =>
    JSON.parse(localStorage.getItem("dt_form") || "{}");
  
  export const saveDarkMode = mode =>
    localStorage.setItem("dt_dark_mode", mode ? "true" : "false");
  
  export const loadDarkMode = () =>
    localStorage.getItem("dt_dark_mode") === "true";
  