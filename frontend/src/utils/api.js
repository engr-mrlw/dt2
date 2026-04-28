export const saveToBackend = async (entries, token) => {
    return fetch("http://localhost:8000/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(entries)
    });
  };
  
  export const loadFromBackend = async token => {
    const res = await fetch("http://localhost:8000/entries", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  };
  